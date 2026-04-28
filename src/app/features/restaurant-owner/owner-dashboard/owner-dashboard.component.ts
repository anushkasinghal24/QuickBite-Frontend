import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantService, OrderService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { Restaurant, Order } from '../../../core/models';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Restaurant Dashboard</h1>
    <p>Register your restaurant, manage availability, and monitor orders</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:24px">
    <div class="empty-icon">🏪</div>
    <div class="empty-title">Dashboard unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid owner-grid" style="margin-bottom:24px">
    <div class="card stat-card" *ngFor="let card of statsCards">
      <div class="stat-label">{{ card.label }}</div>
      <div class="stat-value">{{ card.value }}</div>
      <div class="stat-note">{{ card.note }}</div>
    </div>
  </div>

  <div class="card section-card" style="margin-bottom:24px">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Your Restaurants</h3>
        <p class="text-muted" style="margin:0">Create a new restaurant or switch between your existing ones.</p>
      </div>
      <button class="btn btn-primary" (click)="showCreate = !showCreate">
        {{ showCreate ? 'Hide Form' : 'Create Restaurant' }}
      </button>
    </div>

    <div class="restaurant-switcher" *ngIf="restaurants.length">
      <button
        *ngFor="let restaurant of restaurants"
        class="switch-btn"
        [class.active]="selectedRestaurant?.restaurantId === restaurant.restaurantId"
        (click)="selectRestaurant(restaurant.restaurantId)">
        {{ restaurant.name }}
      </button>
    </div>

    <div class="empty-copy" *ngIf="!restaurants.length">You do not have any restaurant yet. Create your first restaurant below.</div>

    <div *ngIf="selectedRestaurant" class="selected-restaurant">
      <div class="rest-avatar">{{ selectedRestaurant.name.charAt(0) }}</div>
      <div class="selected-meta">
        <h3>{{ selectedRestaurant.name }}</h3>
        <p class="text-muted">{{ selectedRestaurant.cuisine }} · {{ selectedRestaurant.city }}</p>
        <div class="badge-row">
          <span class="badge" [class.badge-success]="selectedRestaurant.approvalStatus === 'APPROVED'" [class.badge-warning]="selectedRestaurant.approvalStatus !== 'APPROVED'">
            {{ selectedRestaurant.approvalStatus || 'PENDING' }}
          </span>
          <span class="badge" [class.badge-success]="selectedRestaurant.isOpen" [class.badge-error]="!selectedRestaurant.isOpen">
            {{ selectedRestaurant.isOpen ? 'OPEN' : 'CLOSED' }}
          </span>
        </div>
      </div>
      <div class="selected-actions">
        <button class="btn btn-secondary btn-sm" (click)="toggleOpen()" [disabled]="selectedRestaurant.approvalStatus !== 'APPROVED'">
          {{ selectedRestaurant.isOpen ? 'Close Restaurant' : 'Open Restaurant' }}
        </button>
        <a routerLink="/owner/menu" class="btn btn-secondary btn-sm">Manage Menu</a>
        <a routerLink="/owner/orders" class="btn btn-secondary btn-sm">Orders</a>
      </div>
    </div>
  </div>

  <div class="card section-card" *ngIf="showCreate || !restaurants.length" style="margin-bottom:24px">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Create Restaurant</h3>
        <p class="text-muted" style="margin:0">Fill the basics now. You can refine the profile later.</p>
      </div>
    </div>

    <div class="grid form-grid">
      <div class="form-field">
        <label>Restaurant name</label>
        <input class="input" [(ngModel)]="createForm.name" placeholder="e.g. Punjabi Dhaba" />
      </div>
      <div class="form-field">
        <label>Cuisine</label>
        <input class="input" [(ngModel)]="createForm.cuisine" placeholder="North Indian, Chinese..." />
      </div>
      <div class="form-field full">
        <label>Description</label>
        <textarea class="input" rows="3" [(ngModel)]="createForm.description" placeholder="Short brand description"></textarea>
      </div>
      <div class="form-field full">
        <label>Address</label>
        <input class="input" [(ngModel)]="createForm.address" placeholder="Street, area" />
      </div>
      <div class="form-field">
        <label>City</label>
        <input class="input" [(ngModel)]="createForm.city" placeholder="Delhi" />
      </div>
      <div class="form-field">
        <label>State</label>
        <input class="input" [(ngModel)]="createForm.state" placeholder="Delhi" />
      </div>
      <div class="form-field">
        <label>Pincode</label>
        <input class="input" [(ngModel)]="createForm.pincode" placeholder="110001" />
      </div>
      <div class="form-field">
        <label>Phone</label>
        <input class="input" [(ngModel)]="createForm.phone" placeholder="9876543210" />
      </div>
      <div class="form-field">
        <label>Email</label>
        <input class="input" type="email" [(ngModel)]="createForm.email" placeholder="restaurant@example.com" />
      </div>
      <div class="form-field">
        <label>Latitude</label>
        <input class="input" type="number" step="0.000001" [(ngModel)]="createForm.latitude" placeholder="28.61" />
      </div>
      <div class="form-field">
        <label>Longitude</label>
        <input class="input" type="number" step="0.000001" [(ngModel)]="createForm.longitude" placeholder="77.20" />
      </div>
      <div class="form-field">
        <label>Delivery radius (km)</label>
        <input class="input" type="number" step="0.1" [(ngModel)]="createForm.deliveryRadius" />
      </div>
      <div class="form-field">
        <label>Min order amount</label>
        <input class="input" type="number" step="1" [(ngModel)]="createForm.minOrderAmount" />
      </div>
      <div class="form-field">
        <label>Est. delivery time</label>
        <input class="input" type="number" step="1" [(ngModel)]="createForm.estimatedDeliveryMin" />
      </div>
      <div class="form-field">
        <label>Opening time</label>
        <input class="input" type="time" [(ngModel)]="createForm.openingTime" />
      </div>
      <div class="form-field">
        <label>Closing time</label>
        <input class="input" type="time" [(ngModel)]="createForm.closingTime" />
      </div>
      <div class="form-field full">
        <label>Image URL</label>
        <input class="input" [(ngModel)]="createForm.imageUrl" placeholder="https://..." />
      </div>
    </div>

    <div class="section-actions">
      <button class="btn btn-primary" (click)="createRestaurant()" [disabled]="saving">
        <span *ngIf="!saving">Save Restaurant</span>
        <span *ngIf="saving" class="spinner" style="width:16px;height:16px;border-width:2px"></span>
      </button>
      <button class="btn btn-ghost" (click)="resetCreateForm()">Reset</button>
    </div>
  </div>

  <div class="card section-card" *ngIf="selectedRestaurant">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Quick Actions</h3>
        <p class="text-muted" style="margin:0">Open / close your restaurant or jump to menu editing.</p>
      </div>
      <a routerLink="/owner/menu" class="btn btn-primary">Open Menu Manager</a>
    </div>

    <div class="grid action-grid">
      <div class="mini-card">
        <div class="mini-title">Orders Today</div>
        <div class="mini-value">{{ stats.todayOrders }}</div>
      </div>
      <div class="mini-card">
        <div class="mini-title">Revenue Today</div>
        <div class="mini-value">Rs. {{ stats.todayRevenue | number:'1.0-0' }}</div>
      </div>
      <div class="mini-card">
        <div class="mini-title">Pending Orders</div>
        <div class="mini-value">{{ stats.pendingOrders }}</div>
      </div>
      <div class="mini-card">
        <div class="mini-title">Avg Rating</div>
        <div class="mini-value">{{ selectedRestaurant.avgRating | number:'1.1-1' }}</div>
      </div>
    </div>
  </div>

  <div class="card" style="margin-top:24px" *ngIf="recentOrders.length">
    <div class="card-header">
      <h4>Recent Orders</h4>
      <a routerLink="/owner/orders" class="btn btn-ghost btn-sm">View All</a>
    </div>
    <div *ngFor="let o of recentOrders" class="order-row">
      <div>
        <div class="font-semibold">Order #{{ o.orderId }}</div>
        <div class="text-sm text-muted">{{ o.items.length }} item(s) · Rs. {{ o.finalAmount }}</div>
      </div>
      <span class="badge" [ngClass]="getStatusClass(o.orderStatus)">{{ o.orderStatus }}</span>
      <div class="flex gap-sm">
        <button *ngIf="o.orderStatus === 'PLACED'" class="btn btn-primary btn-sm" (click)="updateStatus(o, 'CONFIRMED')">Accept</button>
        <button *ngIf="o.orderStatus === 'CONFIRMED'" class="btn btn-secondary btn-sm" (click)="updateStatus(o, 'PREPARING')">Start Cooking</button>
        <button *ngIf="o.orderStatus === 'PREPARING'" class="btn btn-secondary btn-sm" (click)="updateStatus(o, 'PICKED_UP')">Ready for Pickup</button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.owner-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.stat-card{padding:18px}
.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px}
.stat-value{font-size:1.9rem;font-weight:800;line-height:1}
.stat-note{font-size:.82rem;color:var(--text-muted);margin-top:6px}
.section-card{padding:20px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:18px}
.restaurant-switcher{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.selected-restaurant{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;border:1px solid var(--border-color);border-radius:16px;padding:16px;background:linear-gradient(180deg,#fff,#fafafa)}
.rest-avatar{width:56px;height:56px;border-radius:16px;background:var(--brand-gradient);color:#fff;font-weight:800;font-size:1.6rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.selected-meta{flex:1;min-width:240px}
.badge-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.selected-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.form-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.form-field{display:flex;flex-direction:column;gap:6px}
.form-field.full{grid-column:1 / -1}
.form-field label{font-size:.82rem;font-weight:700;color:var(--text-muted)}
.section-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.action-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.mini-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card)}
.mini-title{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px}
.mini-value{font-size:1.5rem;font-weight:800}
.order-row{display:flex;align-items:center;justify-content:space-between;padding:14px var(--space-lg);border-bottom:1px solid var(--border-color);gap:12px;flex-wrap:wrap}
.order-row:last-child{border:none}
.empty-copy{color:var(--text-muted)}
  `]
})
export class OwnerDashboardComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  recentOrders: Order[] = [];
  showCreate = false;
  saving = false;
  errorMessage = '';
  createForm: Partial<Restaurant> = this.defaultCreateForm();
  stats = { todayOrders: 0, todayRevenue: 0, pendingOrders: 0 };
  statsCards = [
    { label: 'Restaurants', value: 0, note: 'Owned by you' },
    { label: 'Orders Today', value: 0, note: 'Live platform orders' },
    { label: 'Pending', value: 0, note: 'Awaiting action' },
    { label: 'Revenue Today', value: 'Rs. 0', note: 'Current restaurant' },
  ];

  constructor(
    private restSvc: RestaurantService,
    private orderSvc: OrderService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    if (!this.auth.currentUser) {
      return;
    }

    this.restSvc.getByOwner(this.auth.currentUser.userId).subscribe({
      next: restaurants => {
        this.restaurants = restaurants;
        this.statsCards[0].value = restaurants.length;
        this.errorMessage = '';
        if (restaurants.length) {
          const first = this.selectedRestaurant
            ? restaurants.find(r => r.restaurantId === this.selectedRestaurant!.restaurantId) || restaurants[0]
            : restaurants[0];
          this.selectRestaurant(first.restaurantId);
        } else {
          this.selectedRestaurant = null;
          this.recentOrders = [];
          this.stats = { todayOrders: 0, todayRevenue: 0, pendingOrders: 0 };
          this.statsCards[1].value = 0;
          this.statsCards[2].value = 0;
          this.statsCards[3].value = 'Rs. 0';
          this.showCreate = true;
        }
      },
      error: () => {
        this.errorMessage = 'Restaurant dashboard data is temporarily unavailable.';
      }
    });
  }

  selectRestaurant(restaurantId: number, loadOrders = true): void {
    this.restSvc.getById(restaurantId).subscribe({
      next: restaurant => {
        this.selectedRestaurant = restaurant;
        if (loadOrders) {
          this.loadOrders(restaurant.restaurantId);
        }
      },
      error: () => this.toast.error('Failed to load restaurant details')
    });
  }

  loadOrders(restaurantId: number): void {
    this.orderSvc.getByRestaurant(restaurantId).subscribe({
      next: orders => {
        const today = new Date().toDateString();
        this.recentOrders = orders.slice(0, 10);
        this.stats.pendingOrders = orders.filter(o => o.orderStatus === 'PLACED').length;
        this.stats.todayOrders = orders.filter(o => new Date(o.orderDate).toDateString() === today).length;
        this.stats.todayRevenue = orders
          .filter(o => new Date(o.orderDate).toDateString() === today)
          .reduce((sum, order) => sum + order.finalAmount, 0);
        this.statsCards[1].value = this.stats.todayOrders;
        this.statsCards[2].value = this.stats.pendingOrders;
        this.statsCards[3].value = `Rs. ${this.stats.todayRevenue.toFixed(0)}`;
      },
      error: () => {
        this.recentOrders = [];
        this.stats = { todayOrders: 0, todayRevenue: 0, pendingOrders: 0 };
        this.toast.error('Could not load recent orders right now');
      }
    });
  }

  createRestaurant(): void {
    if (!this.auth.currentUser) return;
    if (!this.createForm.name || !this.createForm.cuisine || !this.createForm.address || !this.createForm.city || !this.createForm.phone || this.createForm.latitude == null || this.createForm.longitude == null) {
      this.toast.warning('Please fill all required restaurant fields');
      return;
    }

    const payload = {
      name: this.createForm.name?.trim(),
      description: this.emptyToNull(this.createForm.description),
      cuisine: this.createForm.cuisine?.trim(),
      address: this.createForm.address?.trim(),
      city: this.createForm.city?.trim(),
      state: this.emptyToNull(this.createForm.state),
      pincode: this.emptyToNull(this.createForm.pincode),
      latitude: Number(this.createForm.latitude),
      longitude: Number(this.createForm.longitude),
      phone: String(this.createForm.phone).replace(/\s+/g, ''),
      email: this.emptyToNull(this.createForm.email),
      imageUrl: this.emptyToNull(this.createForm.imageUrl),
      deliveryRadius: this.createForm.deliveryRadius != null ? Number(this.createForm.deliveryRadius) : undefined,
      minOrderAmount: this.createForm.minOrderAmount != null ? Number(this.createForm.minOrderAmount) : undefined,
      estimatedDeliveryMin: this.createForm.estimatedDeliveryMin != null ? Number(this.createForm.estimatedDeliveryMin) : undefined,
      openingTime: this.emptyToNull(this.createForm.openingTime),
      closingTime: this.emptyToNull(this.createForm.closingTime)
    };

    this.saving = true;
    this.restSvc.register(payload).subscribe({
      next: restaurant => {
        this.toast.success(`${restaurant.name} created successfully`);
        this.saving = false;
        this.showCreate = false;
        this.resetCreateForm();
        this.loadRestaurants();
      },
      error: err => {
        this.saving = false;
        const fieldErrors = err?.error?.data && typeof err.error.data === 'object'
          ? Object.values(err.error.data).filter(Boolean).join(', ')
          : '';
        if (err?.status === 400 && fieldErrors) {
          this.toast.error(fieldErrors);
          return;
        }
        if (err?.status === 403) {
          this.toast.error('Owner access denied. Please log out and log in again with an OWNER account.');
          return;
        }
        this.toast.error(err?.error?.message || 'Failed to create restaurant');
      }
    });
  }

  resetCreateForm(): void {
    this.createForm = this.defaultCreateForm();
  }

  toggleOpen(): void {
    if (!this.selectedRestaurant) return;
    this.restSvc.toggleOpen(this.selectedRestaurant.restaurantId).subscribe({
      next: () => {
        this.selectedRestaurant!.isOpen = !this.selectedRestaurant!.isOpen;
        this.toast.success(`Restaurant ${this.selectedRestaurant!.isOpen ? 'opened' : 'closed'}`);
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update status')
    });
  }

  updateStatus(order: Order, status: string): void {
    this.orderSvc.updateStatus(order.orderId, status).subscribe({
      next: updated => {
        order.orderStatus = updated.orderStatus;
        this.toast.success(`Order #${order.orderId} updated`);
        if (this.selectedRestaurant) {
          this.loadOrders(this.selectedRestaurant.restaurantId);
        }
      },
      error: () => this.toast.error('Failed to update order status')
    });
  }

  getStatusClass(status: string): string {
    return {
      PLACED: 'badge-info',
      CONFIRMED: 'badge-brand',
      PREPARING: 'badge-warning',
      PICKED_UP: 'badge-warning',
      DELIVERED: 'badge-success',
      CANCELLED: 'badge-error'
    }[status] || 'badge-neutral';
  }

  private defaultCreateForm(): Partial<Restaurant> {
    return {
      name: '',
      description: '',
      cuisine: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      latitude: 0,
      longitude: 0,
      phone: '',
      email: '',
      imageUrl: '',
      deliveryRadius: 5,
      minOrderAmount: 0,
      estimatedDeliveryMin: 30,
      openingTime: '09:00',
      closingTime: '23:00'
    };
  }

  private emptyToNull(value: unknown): string | undefined {
    if (value == null) return undefined;
    const trimmed = String(value).trim();
    return trimmed.length ? trimmed : undefined;
  }

}
