import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantService } from '../../../core/services/api.services';
import { Restaurant } from '../../../core/models';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Manage Restaurants</h1>
    <p>Approve new restaurants and keep the marketplace clean</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Restaurant data unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <div class="panel-head">
        <h3>Pending approvals</h3>
        <span class="badge">{{ pendingRestaurants.length }}</span>
      </div>
      <div *ngIf="pendingRestaurants.length; else noPending" class="stack">
        <div class="restaurant-card" *ngFor="let restaurant of pendingRestaurants">
          <div class="restaurant-main">
            <div class="restaurant-title">{{ restaurant.name }}</div>
            <div class="restaurant-meta">{{ restaurant.city }} · {{ restaurant.cuisine }} · Owner #{{ restaurant.ownerId }}</div>
            <div class="restaurant-meta">{{ restaurant.address }}</div>
          </div>
          <div class="restaurant-stats">
            <span class="pill">{{ restaurant.approvalStatus }}</span>
            <span class="pill muted">{{ restaurant.isOpen ? 'Open' : 'Closed' }}</span>
            <span class="pill muted">₹{{ restaurant.minOrderAmount || 0 }} min</span>
          </div>
          <textarea
            class="input"
            rows="2"
            [(ngModel)]="rejectNotes[restaurant.restaurantId]"
            placeholder="Reason if you want to reject"
          ></textarea>
          <div class="actions">
            <button class="btn btn-primary" (click)="approve(restaurant)">Approve</button>
            <button class="btn btn-danger" (click)="reject(restaurant)">Reject</button>
          </div>
        </div>
      </div>
      <ng-template #noPending>
        <div class="empty-copy">No restaurants are waiting for approval.</div>
      </ng-template>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <h3>Approved restaurants</h3>
        <span class="badge">{{ restaurants.length }}</span>
      </div>
      <div *ngIf="restaurants.length; else noRestaurants" class="stack">
        <div class="mini-row" *ngFor="let restaurant of restaurants">
          <div>
            <div class="mini-title">{{ restaurant.name }}</div>
            <div class="mini-meta">{{ restaurant.city }} · {{ restaurant.cuisine }} · {{ restaurant.approvalStatus }}</div>
          </div>
          <div class="right-meta">
            <span class="pill">{{ restaurant.isOpen ? 'Open' : 'Closed' }}</span>
            <span class="pill muted">⭐ {{ restaurant.avgRating || 0 }}</span>
          </div>
        </div>
      </div>
      <ng-template #noRestaurants>
        <div class="empty-copy">No approved restaurants found yet.</div>
      </ng-template>
    </div>
  </div>
</div>
  `,
  styles: [`
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.stack{display:flex;flex-direction:column;gap:12px}
.restaurant-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card);display:flex;flex-direction:column;gap:10px}
.restaurant-title{font-weight:800;font-size:1rem}
.restaurant-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.restaurant-stats{display:flex;gap:8px;flex-wrap:wrap}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.muted{background:rgba(100,116,139,.12);color:#475569}
.actions{display:flex;gap:10px;flex-wrap:wrap}
.mini-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color)}
.mini-row:last-child{border-bottom:none;padding-bottom:0}
.mini-title{font-weight:700}
.mini-meta{font-size:.82rem;color:var(--text-muted);margin-top:2px}
.right-meta{display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.empty-copy{color:var(--text-muted);padding:10px 0}
  `]
})
export class AdminRestaurantsComponent implements OnInit {
  pendingRestaurants: Restaurant[] = [];
  restaurants: Restaurant[] = [];
  rejectNotes: Record<number, string> = {};
  errorMessage = '';

  constructor(private restaurantSvc: RestaurantService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.restaurantSvc.getPending().subscribe({
      next: items => {
        this.pendingRestaurants = items;
        this.rejectNotes = Object.fromEntries(items.map(item => [item.restaurantId, ''])) as Record<number, string>;
        this.errorMessage = '';
      },
      error: () => this.errorMessage = 'Could not load pending restaurants.'
    });

    this.restaurantSvc.getAllPaged(0, 100).subscribe({
      next: items => this.restaurants = items,
      error: () => this.errorMessage = 'Could not load restaurants.'
    });
  }

  approve(restaurant: Restaurant): void {
    this.restaurantSvc.approve(restaurant.restaurantId, 'APPROVED').subscribe({
      next: () => this.removePending(restaurant.restaurantId),
      error: () => this.errorMessage = `Could not approve ${restaurant.name}.`
    });
  }

  reject(restaurant: Restaurant): void {
    const reason = (this.rejectNotes[restaurant.restaurantId] || '').trim() || 'Rejected by admin';
    this.restaurantSvc.approve(restaurant.restaurantId, 'REJECTED', reason).subscribe({
      next: () => this.removePending(restaurant.restaurantId),
      error: () => this.errorMessage = `Could not reject ${restaurant.name}.`
    });
  }

  private removePending(restaurantId: number): void {
    this.pendingRestaurants = this.pendingRestaurants.filter(item => item.restaurantId !== restaurantId);
    delete this.rejectNotes[restaurantId];
  }
}
