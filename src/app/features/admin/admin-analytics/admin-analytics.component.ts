import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { RestaurantService, OrderService, PaymentService, DeliveryService } from '../../../core/services/api.services';
import { User, Restaurant, Order, DeliveryAgent, Payment } from '../../../core/models';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Platform Analytics</h1>
    <p>Revenue, orders, users, and operational health</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div class="card controls">
    <div>
      <label>Start date</label>
      <input class="input" type="date" [(ngModel)]="startDate" />
    </div>
    <div>
      <label>End date</label>
      <input class="input" type="date" [(ngModel)]="endDate" />
    </div>
    <button class="btn btn-primary" (click)="loadAnalytics()">Refresh</button>
    <a routerLink="/admin" class="btn btn-ghost">Back to dashboard</a>
  </div>

  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Analytics unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:24px">
    <div class="card metric" *ngFor="let metric of metrics">
      <div class="metric-label">{{ metric.label }}</div>
      <div class="metric-value">{{ metric.value }}</div>
      <div class="metric-note">{{ metric.note }}</div>
    </div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <h3>Order status breakdown</h3>
      <div class="stack">
        <div class="bar-row" *ngFor="let row of orderBreakdown">
          <div class="bar-label">{{ row.label }}</div>
          <div class="bar-track"><div class="bar-fill" [style.width.%]="row.percent"></div></div>
          <div class="bar-value">{{ row.count }}</div>
        </div>
      </div>
    </div>

    <div class="card panel">
      <h3>Platform health</h3>
      <div class="health-list">
        <div class="health-row">Approved restaurants <strong>{{ restaurants.length }}</strong></div>
        <div class="health-row">Pending approvals <strong>{{ pendingRestaurants }}</strong></div>
        <div class="health-row">Verified agents <strong>{{ verifiedAgents }}</strong></div>
        <div class="health-row">Pending agents <strong>{{ pendingAgents }}</strong></div>
        <div class="health-row">Recent payments <strong>{{ payments.length }}</strong></div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.controls{display:grid;grid-template-columns:repeat(2,minmax(160px,1fr)) auto auto;gap:14px;align-items:end;padding:18px;margin-bottom:20px}
.controls label{display:block;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:6px}
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.metric{padding:18px}
.metric-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px}
.metric-value{font-size:1.8rem;font-weight:800}
.metric-note{font-size:.82rem;color:var(--text-muted);margin-top:6px}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.stack{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.bar-row{display:grid;grid-template-columns:120px 1fr 48px;gap:10px;align-items:center}
.bar-label{font-size:.9rem;font-weight:600}
.bar-track{height:12px;background:rgba(100,116,139,.14);border-radius:999px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--brand-primary),#ff8d56);border-radius:999px}
.bar-value{text-align:right;font-weight:700}
.health-list{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.health-row{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color);color:var(--text-muted)}
.health-row:last-child{border-bottom:none;padding-bottom:0}
  `]
})
export class AdminAnalyticsComponent implements OnInit {
  startDate = '';
  endDate = '';
  errorMessage = '';
  users: User[] = [];
  restaurants: Restaurant[] = [];
  pendingRestaurants = 0;
  agents: DeliveryAgent[] = [];
  pendingAgents = 0;
  verifiedAgents = 0;
  orders: Order[] = [];
  payments: Payment[] = [];
  revenue = 0;
  metrics = [
    { label: 'Revenue', value: 'Rs. 0', note: 'Date range total' },
    { label: 'Orders', value: 0, note: 'Orders in range' },
    { label: 'Customers', value: 0, note: 'Registered customers' },
    { label: 'Owners', value: 0, note: 'Restaurant owners' },
  ];
  orderBreakdown: Array<{ label: string; count: number; percent: number }> = [];

  constructor(
    private auth: AuthService,
    private restaurantsSvc: RestaurantService,
    private ordersSvc: OrderService,
    private paymentsSvc: PaymentService,
    private deliverySvc: DeliveryService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today.toISOString().slice(0, 10);
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    forkJoin({
      users: this.auth.getAllUsers().pipe(catchError(() => of([] as User[]))),
      restaurants: this.restaurantsSvc.getAllPaged(0, 100).pipe(catchError(() => of([] as Restaurant[]))),
      pendingRestaurants: this.restaurantsSvc.getPending().pipe(catchError(() => of([] as Restaurant[]))),
      agents: this.deliverySvc.getAll().pipe(catchError(() => of([] as DeliveryAgent[]))),
      pendingAgents: this.deliverySvc.getByStatus('PENDING').pipe(catchError(() => of([] as DeliveryAgent[]))),
      orders: this.ordersSvc.getAll().pipe(catchError(() => of([] as Order[]))),
      payments: this.paymentsSvc.getAllPayments().pipe(catchError(() => of([] as Payment[]))),
      revenue: this.paymentsSvc.getRevenue(this.startDate, this.endDate).pipe(catchError(() => of(0)))
    }).subscribe({
      next: data => {
        this.users = data.users;
        this.restaurants = data.restaurants;
        this.pendingRestaurants = data.pendingRestaurants.length;
        this.agents = data.agents;
        this.pendingAgents = data.pendingAgents.length;
        this.verifiedAgents = data.agents.filter(agent => agent.isVerified).length;
        this.orders = data.orders;
        this.payments = data.payments;
        this.revenue = data.revenue;
        this.errorMessage = '';

        this.metrics = [
          { label: 'Revenue', value: `Rs. ${this.revenue.toFixed(2)}`, note: `${this.startDate} to ${this.endDate}` },
          { label: 'Orders', value: this.orders.length, note: 'Orders in range' },
          { label: 'Customers', value: this.users.filter(user => user.role === 'CUSTOMER').length, note: 'Registered customers' },
          { label: 'Owners', value: this.users.filter(user => user.role === 'OWNER').length, note: 'Restaurant owners' },
        ];

        const total = this.orders.length || 1;
        const statuses: OrderStatusLike[] = ['PLACED', 'CONFIRMED', 'PREPARING', 'PICKED_UP', 'DELIVERED', 'CANCELLED'];
        this.orderBreakdown = statuses.map(status => {
          const count = this.orders.filter(order => order.orderStatus === status).length;
          return { label: status, count, percent: Math.round((count / total) * 100) };
        });
      },
      error: () => {
        this.errorMessage = 'Analytics service data could not be collected.';
      }
    });
  }
}

type OrderStatusLike = 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
