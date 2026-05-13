import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/api.services';
import { ToastService } from '../../../core/services/ui.services';
import { Review } from '../../../core/models';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Review Moderation</h1>
    <p>Inspect, verify, and remove reviews that need admin attention</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Reviews unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:20px">
    <div class="card stat-card">
      <div class="stat-label">Total reviews</div>
      <div class="stat-value">{{ allReviews.length }}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Flagged</div>
      <div class="stat-value">{{ flaggedReviews.length }}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Verified</div>
      <div class="stat-value">{{ verifiedCount }}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Pending</div>
      <div class="stat-value">{{ pendingCount }}</div>
    </div>
  </div>

  <div class="card panel" style="margin-bottom:20px">
    <div class="panel-head">
      <div>
        <h3 style="margin:0 0 4px">Filters</h3>
        <p class="text-muted" style="margin:0">Narrow reviews by restaurant id or switch to flagged only.</p>
      </div>
      <a routerLink="/admin" class="btn btn-ghost btn-sm">Back</a>
    </div>
    <div class="filter-row">
      <button class="btn btn-ghost btn-sm" [class.active-btn]="tab === 'all'" (click)="setTab('all')">All</button>
      <button class="btn btn-ghost btn-sm" [class.active-btn]="tab === 'flagged'" (click)="setTab('flagged')">Flagged</button>
      <div class="filter-inline">
        <label>Restaurant ID</label>
        <input class="input" type="number" [(ngModel)]="restaurantFilter" (ngModelChange)="applyFilter()" placeholder="Any" />
      </div>
      <button class="btn btn-primary btn-sm" (click)="loadReviews()">Refresh</button>
    </div>
  </div>

  <div class="stack">
    <div *ngFor="let review of filteredReviews" class="card review-card">
      <div class="review-top">
        <div>
          <div class="review-title">Review #{{ review.reviewId }} · Order #{{ review.orderId }}</div>
          <div class="review-meta">Restaurant #{{ review.restaurantId }} · Customer #{{ review.customerId }} · {{ review.reviewDate }}</div>
        </div>
        <div class="badge-row">
          <span class="badge" [class.badge-success]="review.isVerified">{{ review.isVerified ? 'Verified' : 'Pending' }}</span>
          <span class="badge badge-warning" *ngIf="review.isFlagged">Flagged</span>
        </div>
      </div>

      <div class="rating-grid">
        <div class="rating-box">
          <div class="rating-label">Food</div>
          <div class="rating-value">{{ review.foodRating }}/5</div>
        </div>
        <div class="rating-box">
          <div class="rating-label">Delivery</div>
          <div class="rating-value">{{ review.deliveryRating || '-' }}/5</div>
        </div>
      </div>

      <div class="review-comment">{{ review.comment || 'No comment provided.' }}</div>
      <div class="review-flag" *ngIf="review.flagReason">Flag reason: {{ review.flagReason }}</div>

      <div class="action-row">
        <button class="btn btn-primary btn-sm" *ngIf="!review.isVerified" (click)="approve(review)">Approve</button>
        <button class="btn btn-ghost btn-sm" (click)="remove(review)">Delete</button>
      </div>
    </div>
  </div>

  <div *ngIf="!filteredReviews.length" class="empty-state" style="margin-top:20px">
    <div class="empty-icon">⭐</div>
    <div class="empty-title">No reviews to show</div>
    <div class="empty-desc">Try a different filter or refresh the review list.</div>
  </div>
</div>
  `,
  styles: [`
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:stretch}
.stat-card{padding:20px 18px;display:flex;flex-direction:column;gap:8px;min-height:112px}
.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.stat-value{font-size:clamp(1.55rem,2.3vw,1.9rem);font-weight:800;line-height:1.05;overflow-wrap:anywhere}
.panel{padding:20px}
.panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.filter-row{display:grid;grid-template-columns:auto auto minmax(220px,1fr) auto;align-items:end;gap:12px;margin-top:14px}
.filter-inline{display:flex;flex-direction:column;gap:6px}
.filter-inline label{font-size:.78rem;font-weight:700;color:var(--text-muted)}
.active-btn{border-color:var(--brand-primary)!important;color:var(--brand-primary)!important;background:rgba(255,75,43,.08)!important}
.stack{display:flex;flex-direction:column;gap:14px}
.review-card{padding:18px}
.review-top{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.review-title{font-weight:800}
.review-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.badge-row{display:flex;gap:8px;flex-wrap:wrap}
.rating-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:10px}
.rating-box{border:1px solid var(--border-color);border-radius:14px;padding:12px;background:var(--bg-input)}
.rating-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.rating-value{font-size:1.2rem;font-weight:800;margin-top:4px}
.review-comment{color:var(--text-secondary);line-height:1.55;margin-bottom:8px}
.review-flag{font-size:.88rem;color:var(--brand-primary);font-weight:700;margin-bottom:8px}
.action-row{display:flex;gap:10px;flex-wrap:wrap}
@media (max-width: 900px){
  .summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .filter-row{grid-template-columns:1fr 1fr}
  .filter-inline{grid-column:1 / -1}
}
@media (max-width: 640px){
  .summary-grid{grid-template-columns:1fr}
  .filter-row{grid-template-columns:1fr}
  .rating-grid{grid-template-columns:1fr}
  .action-row .btn,.filter-row .btn,.filter-row .input{width:100%}
}
  `]
})
export class AdminReviewsComponent implements OnInit {
  allReviews: Review[] = [];
  flaggedReviews: Review[] = [];
  filteredReviews: Review[] = [];
  restaurantFilter = '';
  tab: 'all' | 'flagged' = 'all';
  errorMessage = '';

  constructor(private reviewSvc: ReviewService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  get verifiedCount(): number {
    return this.allReviews.filter(r => r.isVerified).length;
  }

  get pendingCount(): number {
    return this.allReviews.filter(r => !r.isVerified).length;
  }

  loadReviews(): void {
    this.reviewSvc.getAll().subscribe({
      next: reviews => {
        this.allReviews = [...reviews].sort((a, b) => new Date(b.createdAt || b.reviewDate).getTime() - new Date(a.createdAt || a.reviewDate).getTime());
        this.flaggedReviews = this.allReviews.filter(review => review.isFlagged);
        this.applyFilter();
        this.errorMessage = '';
      },
      error: () => this.errorMessage = 'Could not load reviews.'
    });
  }

  applyFilter(): void {
    const source = this.tab === 'flagged' ? this.flaggedReviews : this.allReviews;
    const restaurantId = Number(this.restaurantFilter);
    this.filteredReviews = source.filter(review => !this.restaurantFilter || Number.isNaN(restaurantId) || review.restaurantId === restaurantId);
  }

  approve(review: Review): void {
    this.reviewSvc.verifyReview(review.reviewId).subscribe({
      next: () => {
        this.toast.success(`Review #${review.reviewId} approved`);
        this.loadReviews();
      },
      error: () => this.toast.error('Failed to approve review')
    });
  }

  remove(review: Review): void {
    this.reviewSvc.deleteReview(review.reviewId).subscribe({
      next: () => {
        this.toast.success(`Review #${review.reviewId} deleted`);
        this.loadReviews();
      },
      error: () => this.toast.error('Failed to delete review')
    });
  }

  setTab(value: 'all' | 'flagged'): void {
    this.tab = value;
    this.applyFilter();
  }
}
