import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { RestaurantService, OrderService, DeliveryService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { DeliveryAgent, Order, Restaurant, OrderStatus } from '../../../core/models';

@Component({
  selector: 'app-owner-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Incoming Orders</h1>
    <p>Accept, prepare, and track orders for your restaurant</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Orders unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="card section-card" style="margin-bottom:24px">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Restaurant switcher</h3>
        <p class="text-muted" style="margin:0">Choose the restaurant whose orders you want to manage.</p>
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

    <div *ngIf="!restaurants.length" class="empty-copy">
      Create a restaurant first to start receiving orders.
    </div>
  </div>

  <div *ngIf="selectedRestaurant" class="card section-card">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">{{ selectedRestaurant.name }}</h3>
        <p class="text-muted" style="margin:0">{{ selectedRestaurant.city }} · {{ selectedRestaurant.cuisine }}</p>
      </div>
      <div class="badge-row">
        <span class="badge">{{ orders.length }} orders</span>
        <span class="badge badge-brand">{{ pendingCount }} pending</span>
      </div>
    </div>

    <div *ngIf="loading" class="flex justify-center" style="padding:40px 0">
      <div class="spinner"></div>
    </div>

    <div *ngIf="!loading && orders.length; else emptyOrders" class="orders-stack">
      <div class="order-card" *ngFor="let order of orders">
        <div class="order-top">
          <div>
            <div class="order-id">Order #{{ order.orderId }}</div>
            <div class="order-meta">{{ order.orderDate | date:'medium' }} · {{ getItemCount(order) }} item{{ getItemCount(order) === 1 ? '' : 's' }}</div>
          </div>
          <span class="badge" [ngClass]="getStatusClass(order.orderStatus)">{{ order.orderStatus }}</span>
        </div>

        <div class="order-items-box" *ngIf="order.items.length; else noOrderItems">
          <div class="items-grid-pro">
            <div *ngFor="let item of order.items" class="pro-item-row">
              <span class="item-qty-badge">{{ item.quantity }}x</span>
              <span class="item-name-pro">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <ng-template #noOrderItems>
          <div class="empty-copy">Item details are not available yet.</div>
        </ng-template>

        <div class="assignment-box">
          <div class="assignment-head">
            <span class="text-muted text-sm">Delivery assignment</span>
            <span class="badge" [class.badge-success]="order.deliveryAgentId" [class.badge-warning]="!order.deliveryAgentId">
              {{ order.deliveryAgentId ? 'ASSIGNED' : 'PENDING' }}
            </span>
          </div>
          <div *ngIf="order.deliveryAgentId; else noAgentAssigned" class="assignment-grid">
            <div class="assignment-row">
              <span>Agent</span>
              <strong>{{ getAgentLabel(order.deliveryAgentId) }}</strong>
            </div>
            <div class="assignment-row" *ngIf="getAgent(order.deliveryAgentId)?.phone">
              <span>Phone</span>
              <strong>{{ getAgent(order.deliveryAgentId)?.phone }}</strong>
            </div>
            <div class="assignment-row" *ngIf="getAgent(order.deliveryAgentId)?.currentOrderId != null">
              <span>Agent current order</span>
              <strong>#{{ getAgent(order.deliveryAgentId)?.currentOrderId }}</strong>
            </div>
          </div>
          <ng-template #noAgentAssigned>
            <div class="empty-copy" style="margin:0">No delivery agent has been assigned yet.</div>
          </ng-template>
        </div>

        <div class="order-bottom">
          <div class="price-block">
            <span class="text-muted text-sm">Payable</span>
            <span class="price">₹{{ order.finalAmount | number:'1.0-0' }}</span>
          </div>
          <div class="action-row">
            <a [routerLink]="['/orders', order.orderId, 'track']" class="btn btn-ghost btn-sm">Track</a>
            <button *ngIf="order.orderStatus === 'PLACED'" class="btn btn-primary btn-sm" (click)="updateStatus(order, 'CONFIRMED')">Accept</button>
            <button *ngIf="order.orderStatus === 'CONFIRMED'" class="btn btn-secondary btn-sm" (click)="updateStatus(order, 'PREPARING')">Start Cooking</button>
            <button *ngIf="order.orderStatus === 'PREPARING'" class="btn btn-secondary btn-sm" (click)="updateStatus(order, 'READY_TO_PICK_UP')">Ready for Pickup</button>
          </div>
        </div>
      </div>
    </div>

    <ng-template #emptyOrders>
      <div class="empty-copy" style="padding:24px 0">No active orders yet for this restaurant.</div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.section-card{padding:20px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.restaurant-switcher{display:flex;flex-wrap:wrap;gap:10px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.badge-row{display:flex;gap:8px;flex-wrap:wrap}
.orders-stack{display:flex;flex-direction:column;gap:14px}
.order-card{border:1px solid var(--border-color);border-radius:18px;padding:16px;background:var(--bg-card)}
.order-top{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.order-id{font-weight:800}
.order-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.order-items{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.item-chip{background:var(--bg-input);border-radius:999px;padding:4px 10px;font-size:.8rem}
.order-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px solid var(--border-color);padding-top:12px}
.price-block{display:flex;flex-direction:column}
.price{font-size:1.1rem;font-weight:800}
.action-row{display:flex;gap:8px;flex-wrap:wrap}
.empty-copy{color:var(--text-muted)}
.order-items-box { margin-bottom: 16px; background: #f8fafc; border-radius: 12px; padding: 12px; border: 1px solid #f1f5f9; }
.items-grid-pro { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.pro-item-row { display: flex; align-items: center; gap: 10px; }
.item-qty-badge { background: var(--brand-primary); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; }
.item-name-pro { font-size: 0.9rem; font-weight: 600; color: #334155; }
.assignment-box { margin-bottom: 16px; padding: 12px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-input); }
.assignment-head { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
.assignment-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:10px; }
.assignment-row { display:flex; flex-direction:column; gap:4px; padding:10px 12px; border:1px solid rgba(148,163,184,.22); border-radius:12px; background:#fff; min-width:0; }
.assignment-row span { color: var(--text-muted); font-size: .74rem; text-transform: uppercase; letter-spacing: .08em; }
.assignment-row strong { overflow-wrap:anywhere; }
@media(max-width:720px){
  .assignment-grid { grid-template-columns: 1fr; }
}
  `]
})
export class OwnerOrdersComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  selectedRestaurant: Restaurant | null = null;
  orders: Order[] = [];
  deliveryAgentsById: Record<number, DeliveryAgent> = {};
  loading = false;
  errorMessage = '';

  constructor(
    private restaurantSvc: RestaurantService,
    private orderSvc: OrderService,
    private deliverySvc: DeliveryService,
    public auth: AuthService,
    private toast: ToastService
  ) { }

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
    this.loading = true;
    this.restaurantSvc.getById(restaurantId).subscribe({
      next: restaurant => {
        this.selectedRestaurant = restaurant;
        this.orderSvc.getByRestaurant(restaurantId).subscribe({
          next: orders => {
            this.orders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
            this.loadDeliveryAgents(this.orders);
            this.loading = false;
          },
          error: () => {
            this.orders = [];
            this.deliveryAgentsById = {};
            this.loading = false;
            this.errorMessage = 'Could not load orders for the selected restaurant.';
          }
        });
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load restaurant details.';
      }
    });
  }

  loadDeliveryAgents(orders: Order[]): void {
    const agentIds = Array.from(new Set(
      orders
        .map(order => order.deliveryAgentId)
        .filter((id): id is number => typeof id === 'number' && id > 0)
    ));

    if (!agentIds.length) {
      this.deliveryAgentsById = {};
      return;
    }

    forkJoin(agentIds.map(agentId =>
      this.deliverySvc.getById(agentId).pipe(catchError(() => of(null)))
    )).subscribe(agents => {
      const nextMap: Record<number, DeliveryAgent> = {};
      agents.forEach(agent => {
        if (agent?.agentId) {
          nextMap[agent.agentId] = agent;
        }
      });
      this.deliveryAgentsById = nextMap;
    });
  }

  updateStatus(order: Order, status: OrderStatus): void {
    this.orderSvc.updateStatus(order.orderId, status).subscribe({
      next: updated => {
        order.orderStatus = updated.orderStatus;
        this.toast.success(`Order #${order.orderId} updated to ${updated.orderStatus}`);
        if (this.selectedRestaurantId != null) {
          this.selectRestaurant(this.selectedRestaurantId);
        }
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update order')
    });
  }

  get pendingCount(): number {
    return this.orders.filter(order => order.orderStatus === 'PLACED').length;
  }

  getStatusClass(status: OrderStatus): string {
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

  getItemCount(order: Order): number {
    return order.items?.length || order.itemCount || 0;
  }

  getAgent(agentId?: number | null): DeliveryAgent | null {
    if (!agentId) {
      return null;
    }
    return this.deliveryAgentsById[agentId] || null;
  }

  getAgentLabel(agentId?: number | null): string {
    const agent = this.getAgent(agentId);
    if (!agent) {
      return `Agent #${agentId}`;
    }
    return `${agent.fullName} (Agent #${agent.agentId})`;
  }
}
