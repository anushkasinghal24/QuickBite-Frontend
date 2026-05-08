import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { Order, OrderStatus } from '../../../core/models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>My Orders 📦</h1><p>Track all your past and current orders</p></div></div>
<div class="container" style="padding:32px 0 64px">
  <div *ngIf="loading" class="flex justify-center" style="padding:60px"><div class="spinner"></div></div>

  <div *ngIf="!loading && errorMessage" class="empty-state" style="padding:60px 0">
    <div class="empty-icon">📦</div>
    <div class="empty-title">Orders unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div *ngIf="!loading && orders.length" style="display:flex;flex-direction:column;gap:16px">
    <div *ngFor="let o of orders" class="order-card card animate-fadeInUp">
      <div class="order-card-header">
        <div>
          <div class="order-title">{{ getOrderTitle(o) }}</div>
          <div class="order-restaurant">{{ o.restaurantName || 'Restaurant' }}</div>
          <div class="order-meta">
            <span>{{ getItemCount(o) }} item{{ getItemCount(o) === 1 ? '' : 's' }}</span>
            <span>•</span>
            <span>{{ o.modeOfPayment }}</span>
            <span>•</span>
            <span>{{ o.orderDate | date:'short' }}</span>
          </div>
        </div>
        <div class="order-status-group">
          <span class="badge" [ngClass]="getStatusClass(o.orderStatus)">{{ getStatusIcon(o.orderStatus) }} {{ o.orderStatus }}</span>
        </div>
      </div>

      <div class="order-items-preview" *ngIf="o.items.length; else itemCountOnly">
        <span *ngFor="let item of o.items.slice(0,3)" class="order-item-chip">{{ item.name }}</span>
        <span *ngIf="o.items.length > 3" class="order-item-chip more">+{{ o.items.length - 3 }} more</span>
      </div>
      <ng-template #itemCountOnly>
        <div class="order-items-preview">
          <span class="order-item-chip">{{ getItemCount(o) }} item{{ getItemCount(o) === 1 ? '' : 's' }}</span>
        </div>
      </ng-template>

      <div class="order-card-footer">
        <div class="order-total">
          <span class="text-muted text-sm">Total</span>
          <span class="price">₹{{ o.finalAmount | number:'1.0-0' }}</span>
        </div>
        <div class="order-actions">
          <a [routerLink]="['/orders', o.orderId, 'track']" class="btn btn-primary btn-sm"
             *ngIf="['PLACED','CONFIRMED','PREPARING','READY_TO_PICK_UP','PICKED_UP'].includes(o.orderStatus)">
            📍 Track Order
          </a>
          <button type="button"
             (click)="openDetails(o)"
             class="btn btn-secondary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="!loading && !orders.length && !errorMessage" class="empty-state" style="padding:80px 0">
    <div class="empty-icon">📦</div>
    <div class="empty-title">No orders yet</div>
    <div class="empty-desc">Looks like you haven't placed any orders. Start by exploring restaurants!</div>
    <a routerLink="/restaurants" class="btn btn-primary mt-md">Browse Restaurants</a>
  </div>
</div>
  `,
  styles: [`
.order-card{padding:0;overflow:hidden;}
.order-card-header{display:flex;justify-content:space-between;align-items:flex-start;padding:var(--space-md) var(--space-lg);flex-wrap:wrap;gap:var(--space-sm);}
.order-title{font-family:var(--font-display);font-weight:800;font-size:1.05rem;line-height:1.2;}
.order-restaurant{color:var(--text-muted);font-size:.85rem;margin-top:2px;}
.order-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:var(--text-muted);font-size:.75rem;margin-top:6px;}
.order-status-group{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}
.order-items-preview{display:flex;flex-wrap:wrap;gap:6px;padding:0 var(--space-lg);margin-bottom:var(--space-md);}
.order-item-chip{background:var(--bg-input);border-radius:var(--border-radius-full);padding:3px 10px;font-size:.78rem;font-weight:500;color:var(--text-secondary);
  &.more{color:var(--brand-primary);background:rgba(255,75,43,.08);}}
.order-card-footer{display:flex;justify-content:space-between;align-items:center;padding:var(--space-md) var(--space-lg);border-top:1px solid var(--border-color);flex-wrap:wrap;gap:var(--space-sm);}
.order-total{display:flex;flex-direction:column;}
.order-actions{display:flex;gap:8px;flex-wrap:wrap;}
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  errorMessage = '';

  constructor(private orderSvc: OrderService, public auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.currentUser) {
      this.orderSvc.getByCustomer(this.auth.currentUser.userId).subscribe({
        next: o => { this.orders = o.sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()); this.loading = false; this.errorMessage = ''; },
        error: () => { this.orders = []; this.loading = false; this.errorMessage = 'Orders are temporarily unavailable.'; }
      });
    } else {
      this.loading = false;
    }
  }

  getStatusClass(s: OrderStatus): string {
    return {PLACED:'badge-info',CONFIRMED:'badge-brand',PREPARING:'badge-warning',READY_TO_PICK_UP:'badge-warning',PICKED_UP:'badge-warning',DELIVERED:'badge-success',CANCELLED:'badge-error'}[s] || 'badge-neutral';
  }

  getStatusIcon(s: OrderStatus): string {
    return {PLACED:'🕐',CONFIRMED:'✅',PREPARING:'👨‍🍳',READY_TO_PICK_UP:'📍',PICKED_UP:'🛵',DELIVERED:'✅',CANCELLED:'❌'}[s] || '';
  }

  getOrderTitle(o: Order): string {
    const restaurant = o.restaurantName?.trim();
    if (restaurant) {
      return `${restaurant}`;
    }
    const firstItem = o.items?.[0]?.name?.trim();
    if (firstItem) {
      return `${firstItem}${o.items.length > 1 ? ' +' + (o.items.length - 1) + ' more' : ''}`;
    }
    return `Order #${o.orderId}`;
  }

  getItemCount(o: Order): number {
    return o.items?.length || o.itemCount || 0;
  }

  openDetails(order: Order): void {
    this.router.navigate(['/orders', order.orderId], { state: { order } });
  }
}
