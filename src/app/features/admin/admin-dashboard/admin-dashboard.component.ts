import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { RestaurantService, OrderService, PaymentService, DeliveryService, ReviewService } from '../../../core/services/api.services';
import { User, Restaurant, Order, DeliveryAgent, Review } from '../../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Admin Panel</h1>
    <p>Platform-wide management, approvals, and live operations</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Admin data unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:24px">
    <div class="card stat-card" *ngFor="let card of summaryCards">
      <div class="stat-label">{{ card.label }}</div>
      <div class="stat-value">{{ card.value }}</div>
      <div class="stat-note">{{ card.note }}</div>
    </div>
  </div>

  <div class="card" style="padding:20px;margin-bottom:24px">
    <div class="flex justify-between items-center" style="margin-bottom:14px">
      <div>
        <h3 style="margin:0 0 6px">Quick Actions</h3>
        <p class="text-muted" style="margin:0">Jump to the areas that need admin attention first.</p>
      </div>
      <a routerLink="/admin/analytics" class="btn btn-primary">Open Analytics</a>
    </div>
    <div class="action-grid">
      <a routerLink="/admin/users" class="action-tile">Manage Users</a>
      <a routerLink="/admin/restaurants" class="action-tile">Approve Restaurants</a>
      <a routerLink="/admin/agents" class="action-tile">Manage Agents</a>
      <a routerLink="/admin/orders" class="action-tile">Monitor Orders</a>
      <a routerLink="/admin/reviews" class="action-tile">Review Moderation</a>
      <a routerLink="/admin/notifications" class="action-tile">Broadcast Notifications</a>
      <a routerLink="/admin/finance" class="action-tile">Finance & Refunds</a>
      <a routerLink="/admin/analytics" class="action-tile">Platform Analytics</a>
    </div>
  </div>

  <div class="dual-grid">
    <div class="card panel">
      <div class="panel-head">
        <h3>Pending restaurants</h3>
        <span class="badge">{{ pendingRestaurants.length }}</span>
      </div>
      <div *ngIf="pendingRestaurants.length; else noRestaurants" class="stack">
        <div class="mini-row" *ngFor="let restaurant of pendingRestaurants">
          <div>
            <div class="mini-title">{{ restaurant.name }}</div>
            <div class="mini-meta">{{ restaurant.city }} · {{ restaurant.cuisine }} · {{ restaurant.approvalStatus }}</div>
          </div>
          <span class="pill">{{ restaurant.isOpen ? 'Open' : 'Closed' }}</span>
        </div>
      </div>
      <ng-template #noRestaurants>
        <div class="empty-copy">No restaurants waiting for approval.</div>
      </ng-template>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <h3>Pending agents</h3>
        <span class="badge">{{ pendingAgents.length }}</span>
      </div>
      <div *ngIf="pendingAgents.length; else noAgents" class="stack">
        <div class="mini-row" *ngFor="let agent of pendingAgents">
          <div>
            <div class="mini-title">{{ agent.fullName }}</div>
            <div class="mini-meta">{{ agent.vehicleType }} · {{ agent.vehicleNumber }}</div>
            <div class="mini-actions">
              <button class="btn btn-sm btn-primary" (click)="approveAgent(agent)">Approve</button>
              <a routerLink="/admin/agents" class="btn btn-sm btn-ghost">Open review page</a>
            </div>
          </div>
          <span class="pill">{{ agent.isVerified ? 'VERIFIED' : 'PENDING' }}</span>
        </div>
      </div>
      <ng-template #noAgents>
        <div class="empty-copy">No delivery agents waiting for verification.</div>
      </ng-template>
    </div>
  </div>

  <div class="dual-grid" style="margin-top:24px">
    <div class="card panel">
      <div class="panel-head">
        <h3>Latest users</h3>
        <span class="badge">{{ recentUsers.length }}</span>
      </div>
      <div *ngIf="recentUsers.length; else noUsers" class="stack">
        <div class="mini-row" *ngFor="let user of recentUsers">
          <div>
            <div class="mini-title">{{ user.fullName }}</div>
            <div class="mini-meta">{{ user.email }} · {{ user.role }}</div>
          </div>
          <span class="pill" [class.offline]="!user.isActive">{{ user.isActive ? 'Active' : 'Inactive' }}</span>
        </div>
      </div>
      <ng-template #noUsers>
        <div class="empty-copy">No users found.</div>
      </ng-template>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <h3>Recent orders</h3>
        <span class="badge">{{ recentOrders.length }}</span>
      </div>
      <div *ngIf="recentOrders.length; else noOrders" class="stack">
        <div class="mini-row" *ngFor="let order of recentOrders">
          <div>
            <div class="mini-title">Order #{{ order.orderId }} · {{ order.restaurantName || ('Restaurant ' + order.restaurantId) }}</div>
            <div class="mini-meta">{{ order.modeOfPayment }} · {{ order.finalAmount | currency:'INR' }} · {{ order.orderStatus }}</div>
          </div>
          <span class="pill">{{ order.orderDate | date:'short' }}</span>
        </div>
      </div>
      <ng-template #noOrders>
        <div class="empty-copy">No orders yet.</div>
      </ng-template>
    </div>
  </div>

  <div class="card panel" style="margin-top:24px">
    <div class="panel-head">
      <div>
        <h3>Latest reviews</h3>
        <p class="text-muted" style="margin:4px 0 0">Customer reviews now appear here with food and delivery ratings.</p>
      </div>
      <span class="badge">{{ recentReviews.length }}</span>
    </div>
    <div *ngIf="recentReviews.length; else noReviews" class="stack">
      <div class="review-row" *ngFor="let review of recentReviews">
        <div class="review-main">
          <div class="mini-title">Review #{{ review.reviewId }} · Order #{{ review.orderId }}</div>
          <div class="mini-meta">
            Restaurant #{{ review.restaurantId }} · Customer #{{ review.customerId }} · {{ review.reviewDate }}
          </div>
          <div class="review-text">{{ review.comment || 'No comment provided.' }}</div>
        </div>
        <div class="review-ratings">
          <span class="rating-chip">Food {{ review.foodRating }}/5</span>
          <span class="rating-chip" *ngIf="review.deliveryRating != null">Delivery {{ review.deliveryRating }}/5</span>
          <span class="rating-chip" [class.ok]="review.isVerified">{{ review.isVerified ? 'Verified' : 'Pending' }}</span>
          <span class="rating-chip warn" *ngIf="review.isFlagged">Flagged</span>
        </div>
      </div>
    </div>
    <ng-template #noReviews>
      <div class="empty-copy">No reviews yet.</div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;align-items:stretch}
.stat-card{padding:20px 18px 18px;display:flex;flex-direction:column;gap:8px;min-height:128px}
.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.stat-value{font-size:clamp(1.65rem,2.4vw,2rem);font-weight:800;line-height:1.05;overflow-wrap:anywhere}
.stat-note{font-size:.82rem;color:var(--text-muted);line-height:1.45;overflow-wrap:anywhere;margin-top:auto}
.action-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.action-tile{display:flex;align-items:center;justify-content:center;padding:14px 16px;border-radius:14px;border:1px solid var(--border-color);background:linear-gradient(180deg,#fff, #fafafa);font-weight:600;text-decoration:none;color:var(--text-primary);transition:transform .15s ease, box-shadow .15s ease}
.action-tile:hover{transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.dual-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.stack{display:flex;flex-direction:column;gap:10px}
.mini-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color)}
.mini-row:last-child{border-bottom:none;padding-bottom:0}
.mini-title{font-weight:700}
.mini-meta{font-size:.84rem;color:var(--text-muted);margin-top:2px}
.mini-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.08);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.offline{background:rgba(100,116,139,.12);color:#475569}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.empty-copy{color:var(--text-muted);padding:10px 0}
.review-row{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 0;border-bottom:1px solid var(--border-color)}
.review-row:last-child{border-bottom:none;padding-bottom:0}
.review-main{min-width:240px;flex:1}
.review-text{margin-top:8px;color:var(--text-secondary);line-height:1.5}
.review-ratings{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}
.rating-chip{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.08);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.rating-chip.ok{background:rgba(16,185,129,.12);color:#059669}
.rating-chip.warn{background:rgba(245,158,11,.12);color:#b45309}
@media (max-width: 900px){
  .summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .dual-grid{grid-template-columns:1fr}
  .action-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}
}
@media (max-width: 640px){
  .summary-grid,.dual-grid{grid-template-columns:1fr}
  .action-grid{grid-template-columns:1fr}
  .mini-row,.review-row{align-items:flex-start;flex-direction:column}
  .review-main{min-width:0}
}
  `]
})
export class AdminDashboardComponent implements OnInit {
  errorMessage = '';
  users: User[] = [];
  recentUsers: User[] = [];
  restaurants: Restaurant[] = [];
  pendingRestaurants: Restaurant[] = [];
  agents: DeliveryAgent[] = [];
  pendingAgents: DeliveryAgent[] = [];
  recentOrders: Order[] = [];
  recentReviews: Review[] = [];
  totalOrders = 0;
  revenue = 0;
  avgFoodRating = 0;
  avgDeliveryRating = 0;

  summaryCards = [
    { label: 'Users', value: 0, note: 'Registered platform accounts' },
    { label: 'Restaurants', value: 0, note: 'Approved restaurants' },
    { label: 'Pending approvals', value: 0, note: 'Restaurants + agents' },
    { label: 'Orders', value: 0, note: 'Orders across platform' },
    { label: 'Revenue', value: 'Rs. 0', note: 'Current month' },
    { label: 'Verified agents', value: 0, note: 'Delivery workforce ready' },
  ];

  constructor(
    private auth: AuthService,
    private restaurantsSvc: RestaurantService,
    private ordersSvc: OrderService,
    private paymentSvc: PaymentService,
    private deliverySvc: DeliveryService,
    private reviewSvc: ReviewService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  approveAgent(agent: DeliveryAgent): void {
    this.deliverySvc.approveAgent(agent.agentId).subscribe({
      next: updated => {
        this.pendingAgents = this.pendingAgents.filter(item => item.agentId !== agent.agentId);
        this.agents = this.agents.map(item => item.agentId === agent.agentId ? updated : item);
        this.summaryCards = [
          { label: 'Users', value: this.users.length, note: 'Registered platform accounts' },
          { label: 'Restaurants', value: this.restaurants.length, note: 'Approved restaurants' },
          { label: 'Pending approvals', value: this.pendingRestaurants.length + this.pendingAgents.length, note: 'Restaurants + agents' },
          { label: 'Orders', value: this.totalOrders, note: 'Orders across platform' },
          { label: 'Revenue', value: `Rs. ${this.revenue.toFixed(2)}`, note: 'Current month' },
          { label: 'Verified agents', value: this.agents.filter(item => item.isVerified).length, note: 'Delivery workforce ready' },
        ];
      },
      error: () => {
        this.errorMessage = `Could not approve ${agent.fullName}.`;
      }
    });
  }

  get verifiedReviewCount(): number {
    return this.recentReviews.filter(review => review.isVerified).length;
  }

  private load(): void {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
    const end = today.toISOString().slice(0, 10);

    forkJoin({
      users: this.auth.getAllUsers().pipe(catchError(() => of([] as User[]))),
      restaurants: this.restaurantsSvc.getApprovedAdmin(0, 100).pipe(catchError(() => of([] as Restaurant[]))),
      pendingRestaurants: this.restaurantsSvc.getPending().pipe(catchError(() => of([] as Restaurant[]))),
      agents: this.deliverySvc.getAll().pipe(catchError(() => of([] as DeliveryAgent[]))),
      pendingAgents: this.deliverySvc.getByStatus('PENDING').pipe(catchError(() => of([] as DeliveryAgent[]))),
      orders: this.ordersSvc.getAll().pipe(catchError(() => of([] as Order[]))),
      revenue: this.paymentSvc.getRevenue(start, end).pipe(catchError(() => of(0))),
      reviews: this.reviewSvc.getAll().pipe(catchError(() => of([] as Review[])))
    }).subscribe({
      next: data => {
        this.users = data.users;
        this.restaurants = data.restaurants;
        this.pendingRestaurants = data.pendingRestaurants;
        this.agents = data.agents;
        this.pendingAgents = data.pendingAgents;
        this.totalOrders = data.orders.length;
        this.recentUsers = [...data.users].sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()).slice(0, 5);
        this.recentOrders = [...data.orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);
        this.recentReviews = [...data.reviews]
          .sort((a, b) => new Date(b.createdAt || b.reviewDate).getTime() - new Date(a.createdAt || a.reviewDate).getTime())
          .slice(0, 5);
        const verifiedReviews = data.reviews.filter(review => review.isVerified);
        this.avgFoodRating = verifiedReviews.length
          ? Number((verifiedReviews.reduce((sum, review) => sum + (Number(review.foodRating) || 0), 0) / verifiedReviews.length).toFixed(2))
          : 0;
        const deliveryRatedReviews = verifiedReviews.filter(review => review.deliveryRating != null);
        this.avgDeliveryRating = deliveryRatedReviews.length
          ? Number((deliveryRatedReviews.reduce((sum, review) => sum + (Number(review.deliveryRating) || 0), 0) / deliveryRatedReviews.length).toFixed(2))
          : 0;
        this.revenue = data.revenue;
        this.errorMessage = '';
        this.summaryCards = [
          { label: 'Users', value: this.users.length, note: 'Registered platform accounts' },
          { label: 'Restaurants', value: this.restaurants.length, note: 'Approved restaurants' },
          { label: 'Pending approvals', value: this.pendingRestaurants.length + this.pendingAgents.length, note: 'Restaurants + agents' },
          { label: 'Orders', value: this.totalOrders, note: 'Orders across platform' },
          { label: 'Reviews', value: data.reviews.length, note: 'Customer feedback records' },
          { label: 'Food rating', value: this.avgFoodRating.toFixed(2), note: 'Verified review average' },
          { label: 'Delivery rating', value: this.avgDeliveryRating.toFixed(2), note: 'Verified review average' },
          { label: 'Revenue', value: `Rs. ${this.revenue.toFixed(2)}`, note: 'Current month' },
          { label: 'Verified agents', value: this.agents.filter(agent => agent.isVerified).length, note: 'Delivery workforce ready' },
        ];
      },
      error: () => {
        this.errorMessage = 'The admin dashboard could not load live service data.';
      }
    });
  }
}
