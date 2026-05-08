import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription, interval, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { RestaurantService, OrderService, NotificationService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { Notification, Restaurant, Order } from '../../../core/models';

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

  <div *ngIf="latestAlert" class="card alert-card" style="margin-bottom:24px">
    <div class="alert-pill">Live order alert</div>
    <div class="alert-title">{{ normalizeText(latestAlert.title) }}</div>
    <div class="alert-msg">{{ normalizeText(latestAlert.message) }}</div>
    <div class="alert-meta">
      <span class="badge badge-brand">Audio</span>
      <span class="badge">{{ latestAlert.channel || 'APP' }}</span>
      <a class="btn btn-primary btn-sm" [routerLink]="latestAlertLink || '/owner/orders'">Open Orders</a>
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

    <div *ngIf="selectedRestaurant" class="selected-restaurant professional-selected">
      <div class="rest-avatar-pro">
        <img *ngIf="selectedRestaurant.imageUrl" [src]="selectedRestaurant.imageUrl" alt="Logo">
        <span *ngIf="!selectedRestaurant.imageUrl">{{ selectedRestaurant.name.charAt(0) }}</span>
      </div>
      <div class="selected-meta">
        <div class="meta-title-row">
          <h3 class="rest-name">{{ selectedRestaurant.name }}</h3>
          <div class="status-badges">
            <span class="pro-pill" [class.pro-pill-success]="selectedRestaurant.approvalStatus === 'APPROVED'" [class.pro-pill-warning]="selectedRestaurant.approvalStatus !== 'APPROVED'">
              {{ selectedRestaurant.approvalStatus || 'PENDING' }}
            </span>
            <span class="pro-pill" [class.pro-pill-active]="selectedRestaurant.isOpen" [class.pro-pill-inactive]="!selectedRestaurant.isOpen">
              {{ selectedRestaurant.isOpen ? '● Open' : '● Closed' }}
            </span>
          </div>
        </div>
        <p class="rest-info-text">{{ selectedRestaurant.cuisine }} · {{ selectedRestaurant.city }} · {{ selectedRestaurant.address }}</p>
      </div>
      <div class="selected-actions-pro">
        <button class="btn-pro-sm btn-pro-outline" (click)="editRestaurant(selectedRestaurant)">
          ⚙️ Edit Profile
        </button>
        <button class="btn-pro-sm" [class.btn-pro-danger]="selectedRestaurant.isOpen" [class.btn-pro-success]="!selectedRestaurant.isOpen" (click)="toggleOpen()" [disabled]="selectedRestaurant.approvalStatus !== 'APPROVED'">
          {{ selectedRestaurant.isOpen ? 'Close Shop' : 'Open Shop' }}
        </button>
        <a routerLink="/owner/menu" class="btn-pro-sm btn-pro-primary">Manage Menu</a>
      </div>
    </div>
  </div>

  <!-- ── Create / Edit Restaurant Section ── -->
  <div class="card section-card professional-card" *ngIf="showCreate || isEditing" style="margin-bottom:24px">
    <div class="section-head-pro">
      <div class="icon-box rest-icon">{{ isEditing ? '✏️' : '🏪' }}</div>
      <div>
        <h3 class="section-title">{{ isEditing ? 'Edit Restaurant Profile' : 'Register New Restaurant' }}</h3>
        <p class="section-subtitle">{{ isEditing ? 'Update your business details and brand identity' : 'Launch your restaurant on QuickBite today' }}</p>
      </div>
      <button class="btn-icon" (click)="cancelForm()" *ngIf="isEditing || (showCreate && restaurants.length)">✕</button>
    </div>

    <div class="pro-form-box">
      <!-- Image Preview Section -->
      <div class="pro-brand-preview" *ngIf="createForm.imageUrl">
        <div class="preview-label">Brand Identity Preview</div>
        <div class="preview-img-box">
          <img [src]="createForm.imageUrl" (error)="createForm.imageUrl = undefined" alt="Restaurant Preview">
        </div>
      </div>

      <div class="grid pro-dashboard-form">
        <!-- ── Group 1: Basic Info ── -->
        <div class="form-section-label full">Basic Information</div>
        <div class="field-group">
          <label class="pro-label">Restaurant Name</label>
          <input class="pro-input" [(ngModel)]="createForm.name" placeholder="e.g. Punjabi Dhaba" />
        </div>
        <div class="field-group">
          <label class="pro-label">Cuisine Speciality</label>
          <input class="pro-input" [(ngModel)]="createForm.cuisine" placeholder="North Indian, Chinese..." />
        </div>
        <div class="field-group full">
          <label class="pro-label">Brand Description</label>
          <textarea class="pro-input pro-textarea" rows="3" [(ngModel)]="createForm.description" placeholder="A short catchphrase or description of your food..."></textarea>
        </div>

        <!-- ── Group 2: Contact & Branding ── -->
        <div class="form-section-label full">Contact & Branding</div>
        <div class="field-group">
          <label class="pro-label">Business Phone</label>
          <input class="pro-input" [(ngModel)]="createForm.phone" placeholder="9876543210" />
        </div>
        <div class="field-group">
          <label class="pro-label">Business Email</label>
          <input class="pro-input" type="email" [(ngModel)]="createForm.email" placeholder="hello@restaurant.com" />
        </div>
        <div class="field-group full">
          <label class="pro-label">Restaurant Image (Logo/Storefront URL)</label>
          <input class="pro-input" [(ngModel)]="createForm.imageUrl" placeholder="https://image-link.com/photo.jpg" />
        </div>

        <!-- ── Group 3: Location ── -->
        <div class="form-section-label full">Location Details</div>
        <div class="field-group full">
          <label class="pro-label">Full Address</label>
          <input class="pro-input" [(ngModel)]="createForm.address" placeholder="Building, Street, Area" />
        </div>
        <div class="field-group">
          <label class="pro-label">City</label>
          <input class="pro-input" [(ngModel)]="createForm.city" placeholder="e.g. Delhi" />
        </div>
        <div class="field-group">
          <label class="pro-label">State</label>
          <input class="pro-input" [(ngModel)]="createForm.state" placeholder="e.g. Delhi" />
        </div>
        <div class="field-group">
          <label class="pro-label">Pincode</label>
          <input class="pro-input" [(ngModel)]="createForm.pincode" placeholder="110001" />
        </div>
        <div class="field-group">
          <label class="pro-label">GPS Latitude</label>
          <input class="pro-input" type="number" step="0.000001" [(ngModel)]="createForm.latitude" />
        </div>
        <div class="field-group">
          <label class="pro-label">GPS Longitude</label>
          <input class="pro-input" type="number" step="0.000001" [(ngModel)]="createForm.longitude" />
        </div>

        <!-- ── Group 4: Logistics ── -->
        <div class="form-section-label full">Operations & Logistics</div>
        <div class="field-group">
          <label class="pro-label">Delivery Radius (km)</label>
          <input class="pro-input" type="number" step="0.1" [(ngModel)]="createForm.deliveryRadius" />
        </div>
        <div class="field-group">
          <label class="pro-label">Min Order (₹)</label>
          <input class="pro-input" type="number" step="1" [(ngModel)]="createForm.minOrderAmount" />
        </div>
        <div class="field-group">
          <label class="pro-label">Cost for Two (₹)</label>
          <input class="pro-input" type="number" step="1" [(ngModel)]="createForm.costForTwo" />
        </div>
        <div class="field-group">
          <label class="pro-label">Delivery Time (min)</label>
          <input class="pro-input" type="number" step="1" [(ngModel)]="createForm.estimatedDeliveryMin" />
        </div>
        <div class="field-group">
          <label class="pro-label">Opening Time</label>
          <input class="pro-input" type="time" [(ngModel)]="createForm.openingTime" />
        </div>
        <div class="field-group">
          <label class="pro-label">Closing Time</label>
          <input class="pro-input" type="time" [(ngModel)]="createForm.closingTime" />
        </div>
      </div>

      <div class="pro-form-actions-main">
        <button class="btn-pro btn-pro-primary" (click)="saveRestaurantAction()" [disabled]="saving">
          <span *ngIf="!saving">{{ isEditing ? 'Update Profile' : 'Launch Restaurant' }}</span>
          <span *ngIf="saving" class="spinner-small"></span>
        </button>
        <button class="btn-pro btn-pro-ghost" (click)="cancelForm()">Cancel</button>
      </div>
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

  <div class="card professional-card" style="margin-top:24px" *ngIf="recentOrders.length">
    <div class="section-head-pro">
      <div class="icon-box" style="background:#f0f9ff; color:#0284c7">📋</div>
      <div style="flex:1">
        <h3 class="section-title">Recent Orders</h3>
        <p class="section-subtitle">Real-time update of your restaurant's incoming orders</p>
      </div>
      <a routerLink="/owner/orders" class="btn-pro-sm btn-pro-outline">View Full History</a>
    </div>

    <div class="orders-list-pro">
      <div *ngFor="let o of recentOrders" class="pro-order-row">
        <div class="order-main-info">
          <div class="order-id-pro">Order #{{ o.orderId }}</div>
          <div class="order-sub-pro">{{ o.items.length }} item(s) • ₹{{ o.finalAmount }}</div>
        </div>
        
        <div class="order-status-box">
          <span class="pro-pill" [ngClass]="getStatusClass(o.orderStatus)">
            {{ o.orderStatus === 'PLACED' ? 'ORDERED' : o.orderStatus }}
          </span>
        </div>

        <div class="order-actions-pro">
          <button *ngIf="o.orderStatus === 'PLACED'" class="btn-pro-sm btn-pro-primary" (click)="updateStatus(o, 'CONFIRMED')">Confirm Order</button>
          <button *ngIf="o.orderStatus === 'CONFIRMED'" class="btn-pro-sm btn-pro-success" (click)="updateStatus(o, 'PREPARING')">Start Cooking</button>
          <button *ngIf="o.orderStatus === 'PREPARING'" class="btn-pro-sm btn-pro-active" (click)="updateStatus(o, 'READY_TO_PICK_UP')">Food Ready</button>
        </div>
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
.alert-card{padding:18px;border:1px solid rgba(255,75,43,.22);background:linear-gradient(135deg,rgba(255,75,43,.08),rgba(255,255,255,.96))}
.alert-pill{display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;background:rgba(255,75,43,.14);color:var(--brand-primary);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
.alert-title{font-weight:800;font-size:1.05rem;margin-bottom:6px}
.alert-msg{color:var(--text-secondary);line-height:1.5}
.alert-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px}
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

/* Professional Redesign Styles */
.professional-card {
  border: none;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
}

.section-head-pro {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.rest-icon { background: #fff7ed; border: 1px solid #ffedd5; }

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.pro-form-box {
  padding: 24px;
}

.form-section-label {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--brand-primary);
  margin: 24px 0 12px;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-section-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pro-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
}

.pro-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s;
  background: #fff;
}

.pro-input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 4px rgba(255,75,43,0.1);
}

.pro-textarea {
  min-height: 100px;
  resize: vertical;
}

.pro-brand-preview {
  background: #f8fafc;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.preview-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
}

.preview-img-box {
  width: 140px;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  background: #fff;
}

.preview-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pro-dashboard-form {
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.pro-form-actions-main {
  margin-top: 32px;
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.btn-pro-primary {
  background: var(--brand-primary);
  color: #fff;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pro-ghost {
  background: #f1f5f9;
  color: #475569;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
}

.professional-selected {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  padding: 24px !important;
}

.rest-avatar-pro {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: var(--brand-gradient);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  overflow: hidden;
}

.rest-avatar-pro img { width: 100%; height: 100%; object-fit: cover; }

.meta-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
}

.rest-name { font-size: 1.5rem; font-weight: 900; color: #0f172a; margin: 0; }

.status-badges { display: flex; gap: 8px; }

.pro-pill {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.pro-pill-success { background: #dcfce7; color: #15803d; }
.pro-pill-warning { background: #fef9c3; color: #a16207; }
.pro-pill-active { background: #eff6ff; color: #1d4ed8; }
.pro-pill-inactive { background: #f1f5f9; color: #64748b; }

.rest-info-text { font-size: 0.95rem; color: #64748b; margin: 0; }

.selected-actions-pro {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-pro-sm {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-pro-primary { background: var(--brand-primary); color: #fff; }
.btn-pro-outline { background: #fff; border: 1.5px solid #e2e8f0; color: #475569; }
.btn-pro-success { background: #22c55e; color: #fff; }
.btn-pro-danger { background: #ef4444; color: #fff; }

.btn-icon {
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 900;
}

.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Recent Orders Pro Styles */
.orders-list-pro { padding: 0 12px; }
.pro-order-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  border-bottom: 1px solid #f1f5f9;
  gap: 16px;
}
.pro-order-row:last-child { border: none; }
.order-main-info { flex: 1; min-width: 140px; }
.order-id-pro { font-weight: 800; color: #1e293b; font-size: 1rem; }
.order-sub-pro { font-size: 0.85rem; color: #64748b; margin-top: 2px; }
.order-status-box { width: 120px; display: flex; justify-content: center; }
.order-actions-pro { width: 150px; display: flex; justify-content: flex-end; }

@keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class OwnerDashboardComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  recentOrders: Order[] = [];
  latestAlert: Notification | null = null;
  latestAlertLink: string | null = null;
  showCreate = false;
  isEditing = false;
  editingId: number | null = null;
  saving = false;
  errorMessage = '';
  createForm: Partial<Restaurant> = this.defaultCreateForm();
  stats = { todayOrders: 0, todayRevenue: 0, pendingOrders: 0 };
  private notifPollSub = new Subscription();
  private locationTimer?: number;
  private locationSyncBusy = false;
  private seenNotificationIds = new Set<number>();
  statsCards = [
    { label: 'Restaurants', value: 0, note: 'Owned by you' },
    { label: 'Orders Today', value: 0, note: 'Live platform orders' },
    { label: 'Pending', value: 0, note: 'Awaiting action' },
    { label: 'Revenue Today', value: 'Rs. 0', note: 'Current restaurant' },
  ];

  constructor(
    private restSvc: RestaurantService,
    private orderSvc: OrderService,
    private notifSvc: NotificationService,
    public auth: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
    this.startAlertPolling();
  }

  ngOnDestroy(): void {
    this.notifPollSub.unsubscribe();
    if (this.locationTimer) {
      window.clearInterval(this.locationTimer);
      this.locationTimer = undefined;
    }
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
          if (this.locationTimer) {
            window.clearInterval(this.locationTimer);
            this.locationTimer = undefined;
          }
        }
      },
      error: () => {
        this.errorMessage = 'Restaurant dashboard data is temporarily unavailable.';
        if (this.locationTimer) {
          window.clearInterval(this.locationTimer);
          this.locationTimer = undefined;
        }
      }
    });
  }

  private startAlertPolling(): void {
    if (!this.auth.currentUser) {
      return;
    }

    this.notifPollSub.unsubscribe();
    this.notifPollSub = interval(20000).pipe(
      startWith(0),
      switchMap(() => this.notifSvc.getByRecipient(this.auth.currentUser!.userId).pipe(
        catchError(() => of([] as Notification[]))
      ))
    ).subscribe(notifications => {
      this.handleOrderAlerts(notifications);
    });
  }

  private handleOrderAlerts(notifications: Notification[]): void {
    const sorted = [...notifications].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    if (!this.seenNotificationIds.size) {
      this.seenNotificationIds = new Set(sorted.map(n => n.notificationId));
      this.updateLatestAlert(sorted);
      return;
    }

    const newAlerts = sorted.filter(n => !this.seenNotificationIds.has(n.notificationId) && (n.audible || n.type === 'NEW_ORDER_ALERT'));
    this.seenNotificationIds = new Set(sorted.map(n => n.notificationId));
    this.updateLatestAlert(sorted);

    if (!newAlerts.length) {
      return;
    }

    const newest = newAlerts[0];
    this.latestAlert = newest;
    this.latestAlertLink = this.resolveAlertLink(newest);
    this.toast.info(this.normalizeText(newest.title) || 'New order received');
    this.playOrderTone();
  }

  private updateLatestAlert(notifications: Notification[]): void {
    const latest = notifications.find(n => n.audible || n.type === 'NEW_ORDER_ALERT');
    if (!latest) {
      return;
    }
    this.latestAlert = latest;
    this.latestAlertLink = this.resolveAlertLink(latest);
  }

  private resolveAlertLink(notification: Notification): string {
    const type = (notification.type || notification.relatedType || '').toUpperCase();
    if ((type === 'ORDER' || type === 'NEW_ORDER_ALERT' || type === 'DELIVERY') && notification.relatedId) {
      return `/orders/${notification.relatedId}`;
    }
    if (type === 'PAYMENT' || notification.relatedType === 'PAYMENT') {
      return '/wallet';
    }
    if (notification.relatedType === 'RESTAURANT' && notification.relatedId) {
      return `/restaurants/${notification.relatedId}`;
    }
    const deepLink = this.normalizeLink(notification.deepLinkUrl);
    return deepLink || '/owner/orders';
  }

  normalizeLink(link?: string | null): string | null {
    const value = (link || '').trim();
    if (!value) return null;
    return value.startsWith('/') ? value : `/${value}`;
  }

  normalizeText(value?: string): string {
    return (value || '')
      .replace(/Ã°Å¸â€â€|Ã°ÂŸâ€™Â¬|Ã°ÂŸâ€¦|Ã°ÂŸâ€”Â¨|Ã°ÂŸâ€”Â§|Ã°ÂŸâ€”Â©|Ã°ÂŸâ€”Âª|Ã°ÂŸâ€”Â«|Ã°ÂŸâ€”Â¬|Ã°ÂŸâ€”Â®|Ã°ÂŸâ€”Â¯/g, '')
      .replace(/Ã¢â€šÂ¹|Ã¢â‚¬Â¹|Ã¢â‚¬Å¡Â¹|â‚¹|Â₹|Ã‚Â₹|ÃƒÂ¢Ã¢â€šÂ¹/g, '₹')
      .replace(/Ã¢â‚¬â„¢|â€™|Â’/g, "'")
      .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€”|â€“|â€”/g, '-')
      .replace(/\s+\./g, '.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private playOrderTone(): void {
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextCtor) return;
      const ctx = new AudioContextCtor();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = 620;
      gain.gain.value = 0.055;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      window.setTimeout(() => {
        oscillator.stop();
        ctx.close().catch(() => { });
      }, 260);
    } catch {
      // Best-effort only; browsers may block audio until the user interacts.
    }
  }

  selectRestaurant(restaurantId: number, loadOrders = true): void {
    this.restSvc.getById(restaurantId).subscribe({
      next: restaurant => {
        this.selectedRestaurant = restaurant;
        if (loadOrders) {
          this.loadOrders(restaurant.restaurantId);
        }
        this.startLocationSync(restaurant.restaurantId);
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
      costForTwo: this.createForm.costForTwo != null ? Number(this.createForm.costForTwo) : undefined,
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
    this.isEditing = false;
    this.editingId = null;
  }

  editRestaurant(restaurant: Restaurant): void {
    this.isEditing = true;
    this.editingId = restaurant.restaurantId;
    this.showCreate = false;
    this.createForm = { ...restaurant };
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  cancelForm(): void {
    this.resetCreateForm();
    this.showCreate = false;
  }

  saveRestaurantAction(): void {
    if (this.isEditing && this.editingId) {
      this.updateRestaurant();
    } else {
      this.createRestaurant();
    }
  }

  updateRestaurant(): void {
    if (!this.editingId || !this.auth.currentUser) return;

    this.saving = true;
    this.restSvc.update(this.editingId, this.createForm).subscribe({
      next: restaurant => {
        this.toast.success('Restaurant profile updated');
        this.saving = false;
        this.resetCreateForm();
        this.loadRestaurants();
      },
      error: err => {
        this.saving = false;
        this.toast.error(err?.error?.message || 'Failed to update restaurant');
      }
    });
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
      READY_TO_PICK_UP: 'badge-warning',
      PICKED_UP: 'badge-warning',
      DELIVERED: 'badge-success',
      CANCELLED: 'badge-error'
    }[status] || 'badge-neutral';
  }

  private startLocationSync(restaurantId: number): void {
    if (!navigator.geolocation) {
      return;
    }

    if (this.locationTimer) {
      window.clearInterval(this.locationTimer);
    }

    const syncOnce = () => {
      if (this.locationSyncBusy) {
        return;
      }
      this.locationSyncBusy = true;

      navigator.geolocation.getCurrentPosition(pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        this.restSvc.update(restaurantId, { latitude, longitude }).subscribe({
          next: () => {
            if (this.selectedRestaurant && this.selectedRestaurant.restaurantId === restaurantId) {
              this.selectedRestaurant.latitude = latitude;
              this.selectedRestaurant.longitude = longitude;
            }
            this.locationSyncBusy = false;
          },
          error: () => {
            this.locationSyncBusy = false;
          }
        });
      }, () => {
        this.locationSyncBusy = false;
      }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 8000 });
    };

    syncOnce();
    this.locationTimer = window.setInterval(syncOnce, 8000);
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
      costForTwo: 0,
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
