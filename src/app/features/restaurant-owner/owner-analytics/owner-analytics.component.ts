import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RestaurantService, OrderService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { Restaurant, RevenueAnalytics } from '../../../core/models';

@Component({
  selector: 'app-owner-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Analytics and Earnings</h1>
    <p>Revenue, top items, and peak order hours for your restaurant</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Analytics unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="card section-card" style="margin-bottom:24px">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Restaurant switcher</h3>
        <p class="text-muted" style="margin:0">Select a restaurant to view its business performance.</p>
      </div>
      <a routerLink="/owner" class="btn btn-ghost">Back to dashboard</a>
    </div>

    <div class="restaurant-switcher" *ngIf="restaurants.length">
      <button
        *ngFor="let restaurant of restaurants"
        class="switch-btn"
        [class.active]="selectedRestaurantId === restaurant.restaurantId"
        (click)="selectRestaurant(restaurant.restaurantId)">
        {{ restaurant.name }}
      </button>
    </div>
  </div>

  <div *ngIf="selectedRestaurant && analytics" class="analytics-grid">
    <div class="card metric">
      <div class="metric-label">Total Revenue</div>
      <div class="metric-value">₹{{ analytics.totalRevenue | number:'1.0-0' }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Monthly Revenue</div>
      <div class="metric-value">₹{{ analytics.monthlyRevenue | number:'1.0-0' }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Orders</div>
      <div class="metric-value">{{ analytics.totalOrders }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Delivered</div>
      <div class="metric-value">{{ analytics.deliveredOrders }}</div>
    </div>
  </div>

  <div *ngIf="selectedRestaurant && analytics" class="grid two-up" style="margin-top:24px">
    <div class="card panel">
      <h3>{{ selectedRestaurant.name }}</h3>
      <p class="text-muted" style="margin-top:4px">{{ selectedRestaurant.city }} · {{ selectedRestaurant.cuisine }}</p>
      <div class="summary-list">
        <div class="summary-row"><span>Daily revenue</span><strong>₹{{ analytics.dailyRevenue | number:'1.0-0' }}</strong></div>
        <div class="summary-row"><span>Weekly revenue</span><strong>₹{{ analytics.weeklyRevenue | number:'1.0-0' }}</strong></div>
        <div class="summary-row"><span>Pending orders</span><strong>{{ analytics.pendingOrders }}</strong></div>
        <div class="summary-row"><span>Cancelled orders</span><strong>{{ analytics.cancelledOrders }}</strong></div>
        <div class="summary-row"><span>Average rating</span><strong>{{ selectedRestaurant.avgRating | number:'1.1-1' }}</strong></div>
      </div>
    </div>

    <div class="card panel">
      <h3>Top Selling Items</h3>
      <div *ngIf="analytics.topSellingItems?.length; else noTopItems" class="stack">
        <div class="bar-row" *ngFor="let item of analytics.topSellingItems">
          <div>
            <div class="bar-label">{{ item.itemName }}</div>
            <div class="bar-meta">{{ item.quantitySold }} sold</div>
          </div>
          <div class="bar-track">
            <div class="bar-fill" [style.width.%]="getTopItemWidth(item.quantitySold)"></div>
          </div>
          <div class="bar-value">₹{{ item.revenue | number:'1.0-0' }}</div>
        </div>
      </div>
      <ng-template #noTopItems>
        <div class="empty-copy">No item-level analytics yet.</div>
      </ng-template>
    </div>
  </div>

  <div *ngIf="selectedRestaurant && analytics" class="card panel" style="margin-top:24px">
    <h3>Peak Hours</h3>
    <div class="peak-grid">
      <div class="peak-card" *ngFor="let hour of analytics.peakHours">
        <div class="peak-hour">{{ hour.label }}</div>
        <div class="peak-count">{{ hour.orderCount }} orders</div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.section-card{padding:20px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.restaurant-switcher{display:flex;flex-wrap:wrap;gap:10px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.analytics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.metric{padding:18px}
.metric-label{text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);font-size:.78rem;margin-bottom:8px}
.metric-value{font-size:1.9rem;font-weight:800}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.summary-list{display:flex;flex-direction:column;gap:10px;margin-top:16px}
.summary-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-color)}
.summary-row:last-child{border-bottom:none;padding-bottom:0}
.stack{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.bar-row{display:grid;grid-template-columns:140px 1fr 70px;gap:10px;align-items:center}
.bar-label{font-weight:700}
.bar-meta{font-size:.78rem;color:var(--text-muted)}
.bar-track{height:10px;background:rgba(100,116,139,.14);border-radius:999px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--brand-primary),#ff8d56);border-radius:999px}
.bar-value{text-align:right;font-weight:700}
.peak-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-top:14px}
.peak-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card)}
.peak-hour{font-weight:800}
.peak-count{font-size:.85rem;color:var(--text-muted);margin-top:4px}
.empty-copy{color:var(--text-muted);padding:10px 0}
  `]
})
export class OwnerAnalyticsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  selectedRestaurant: Restaurant | null = null;
  analytics: RevenueAnalytics | null = null;
  errorMessage = '';

  constructor(
    private restaurantSvc: RestaurantService,
    private orderSvc: OrderService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    if (!this.auth.currentUser) return;
    this.restaurantSvc.getByOwner(this.auth.currentUser.userId).subscribe({
      next: restaurants => {
        this.restaurants = restaurants;
        this.errorMessage = '';
        if (restaurants.length) {
          this.selectRestaurant(this.selectedRestaurantId ?? restaurants[0].restaurantId);
        }
      },
      error: () => this.errorMessage = 'Could not load your restaurants.'
    });
  }

  selectRestaurant(restaurantId: number): void {
    this.selectedRestaurantId = restaurantId;
    this.restaurantSvc.getById(restaurantId).subscribe({
      next: restaurant => {
        this.selectedRestaurant = restaurant;
        this.orderSvc.getRestaurantAnalytics(restaurantId).subscribe({
          next: analytics => {
            this.analytics = analytics;
            this.errorMessage = '';
          },
          error: () => this.errorMessage = 'Analytics data could not be loaded.'
        });
      },
      error: () => this.errorMessage = 'Could not load restaurant details.'
    });
  }

  getTopItemWidth(quantitySold: number): number {
    const max = Math.max(1, ...(this.analytics?.topSellingItems || []).map(item => item.quantitySold));
    return Math.max(8, Math.round((quantitySold / max) * 100));
  }
}
