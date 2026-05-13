import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestaurantService, ReviewService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { Restaurant, Review } from '../../../core/models';

@Component({
  selector: 'app-owner-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Review Moderation</h1>
    <p>Inspect customer feedback and flag anything that needs admin review</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Review data unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="card panel" style="margin-bottom:20px">
    <div class="panel-head">
      <div>
        <h3 style="margin:0 0 4px">Restaurant selector</h3>
        <p class="text-muted" style="margin:0">Pick a restaurant to view its public review feed.</p>
      </div>
      <a routerLink="/owner" class="btn btn-ghost btn-sm">Back</a>
    </div>

    <div class="switcher" *ngIf="restaurants.length">
      <button
        *ngFor="let restaurant of restaurants"
        class="switch-btn"
        [class.active]="selectedRestaurantId === restaurant.restaurantId"
        (click)="selectRestaurant(restaurant.restaurantId)">
        {{ restaurant.name }}
      </button>
    </div>

    <div *ngIf="selectedRestaurant" class="selected">
      <div>
        <div class="selected-title">{{ selectedRestaurant.name }}</div>
        <div class="selected-meta">{{ selectedRestaurant.city }} · {{ selectedRestaurant.cuisine }}</div>
      </div>
      <div class="badge-row">
        <span class="badge">Avg {{ averageRating | number:'1.1-1' }}</span>
        <span class="badge">{{ reviews.length }} reviews</span>
      </div>
    </div>
  </div>

  <div *ngIf="selectedRestaurant" class="stack">
    <div *ngFor="let review of reviews" class="card review-card">
      <div class="review-top">
        <div>
          <div class="review-title">Review #{{ review.reviewId }}</div>
          <div class="review-meta">{{ review.customerName || ('Customer #' + review.customerId) }} · {{ review.reviewDate }}</div>
        </div>
        <div class="badge-row">
          <span class="badge" [class.badge-success]="review.isVerified">{{ review.isVerified ? 'Verified' : 'Pending' }}</span>
          <span class="badge badge-warning" *ngIf="review.isFlagged">Flagged</span>
        </div>
      </div>

      <div class="review-ratings">
        <span>Food {{ review.foodRating }}/5</span>
        <span *ngIf="review.deliveryRating != null">Delivery {{ review.deliveryRating }}/5</span>
      </div>

      <div class="review-comment">{{ review.comment || 'No comment provided.' }}</div>
      <div class="review-flag" *ngIf="review.flagReason">Flag reason: {{ review.flagReason }}</div>

      <div class="flag-box">
        <input class="input" [(ngModel)]="flagReasons[review.reviewId]" placeholder="Reason to flag this review" />
        <button class="btn btn-primary btn-sm" (click)="flag(review)">Flag Review</button>
      </div>
    </div>
  </div>

  <div *ngIf="!selectedRestaurant" class="empty-state">
    <div class="empty-icon">⭐</div>
    <div class="empty-title">Select a restaurant</div>
    <div class="empty-desc">We will show the review feed here so you can flag anything that needs moderation.</div>
  </div>
</div>
  `,
  styles: [`
.panel{padding:20px;margin-bottom:24px}
.panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.switcher{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.selected{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:14px;border:1px solid var(--border-color);border-radius:16px;background:linear-gradient(180deg,#fff,#fafafa)}
.selected-title{font-weight:800;font-size:1.05rem}
.selected-meta{color:var(--text-muted);margin-top:4px}
.badge-row{display:flex;gap:8px;flex-wrap:wrap}
.stack{display:flex;flex-direction:column;gap:14px}
.review-card{padding:18px}
.review-top{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.review-title{font-weight:800}
.review-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.review-ratings{display:flex;gap:10px;flex-wrap:wrap;font-size:.84rem;color:var(--text-muted);margin-bottom:10px}
.review-comment{color:var(--text-secondary);line-height:1.55;margin-bottom:10px}
.review-flag{font-size:.88rem;color:var(--brand-primary);font-weight:700;margin-bottom:10px}
.flag-box{display:flex;gap:10px;flex-wrap:wrap}
.flag-box .input{flex:1;min-width:220px}
  `]
})
export class OwnerReviewsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  selectedRestaurant: Restaurant | null = null;
  reviews: Review[] = [];
  averageRating = 0;
  errorMessage = '';
  flagReasons: Record<number, string> = {};

  constructor(
    private restSvc: RestaurantService,
    private reviewSvc: ReviewService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    if (!this.auth.currentUser) return;
    this.restSvc.getByOwner(this.auth.currentUser.userId).pipe(
      catchError(() => of([] as Restaurant[]))
    ).subscribe(restaurants => {
      this.restaurants = restaurants;
      this.errorMessage = '';
      if (restaurants.length) {
        this.selectRestaurant(this.selectedRestaurantId ?? restaurants[0].restaurantId);
      }
    });
  }

  selectRestaurant(restaurantId: number): void {
    this.selectedRestaurantId = restaurantId;
    this.selectedRestaurant = this.restaurants.find(r => r.restaurantId === restaurantId) || null;
    forkJoin({
      reviews: this.reviewSvc.getByRestaurant(restaurantId).pipe(catchError(() => of([] as Review[]))),
      summary: this.reviewSvc.getRestaurantSummary(restaurantId).pipe(catchError(() => of({ avgRating: 0 })))
    }).subscribe({
      next: data => {
        this.reviews = [...data.reviews].sort((a, b) => new Date(b.createdAt || b.reviewDate).getTime() - new Date(a.createdAt || a.reviewDate).getTime());
        this.averageRating = Number(data.summary?.avgRating || 0);
      },
      error: () => {
        this.reviews = [];
        this.averageRating = 0;
        this.errorMessage = 'Could not load reviews for the selected restaurant.';
      }
    });
  }

  flag(review: Review): void {
    const reason = (this.flagReasons[review.reviewId] || '').trim();
    if (!reason) {
      this.toast.error('Please enter a flag reason first.');
      return;
    }

    this.reviewSvc.flagReview(review.reviewId, reason).subscribe({
      next: () => {
        this.toast.success(`Review #${review.reviewId} flagged`);
        this.flagReasons[review.reviewId] = '';
        if (this.selectedRestaurantId) {
          this.selectRestaurant(this.selectedRestaurantId);
        }
      },
      error: () => this.toast.error('Failed to flag review')
    });
  }
}
