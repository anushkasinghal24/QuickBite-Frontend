import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService, ReviewService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { Order, OrderStatus, SubmitReviewRequest } from '../../../core/models';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>Order Details 📋</h1></div></div>
<div class="container" style="padding:32px 0 64px">
  <div *ngIf="loading" class="flex justify-center" style="padding:60px"><div class="spinner"></div></div>

  <div *ngIf="!loading && errorMessage" class="empty-state" style="padding:80px 0">
    <div class="empty-icon">📦</div>
    <div class="empty-title">Order unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div *ngIf="!loading && order" class="order-detail-layout">
    <div class="order-main">
      <!-- Status Timeline -->
      <div class="card" style="padding:var(--space-lg)">
        <div class="flex justify-between items-center" style="margin-bottom:24px;flex-wrap:wrap;gap:8px">
          <h3>Order #{{ order.orderId }}</h3>
          <span class="badge" [ngClass]="getStatusClass(order.orderStatus)">{{ order.orderStatus }}</span>
        </div>

        <div class="order-timeline">
          <div *ngFor="let step of timelineSteps" class="timeline-item"
               [class.completed]="isCompleted(step.status)"
               [class.active]="order.orderStatus === step.status">
            <div class="tl-content">
              <div class="tl-icon">{{ step.icon }}</div>
              <div>
                <div class="tl-title">{{ step.label }}</div>
                <div class="tl-time text-xs text-muted" *ngIf="isCompleted(step.status)">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items -->
      <div class="card" style="margin-top:16px">
        <div class="card-header"><h4>🍽️ Order Items</h4></div>
        <div class="card-body">
          <div *ngFor="let item of order.items" class="order-item-row">
            <div class="flex items-center gap-md">
              <span class="item-qty-badge">{{ item.quantity }}×</span>
              <span>{{ item.name }}</span>
            </div>
            <span class="price">₹{{ item.price * item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="order-sidebar">
      <!-- Payment Info -->
      <div class="card" style="margin-bottom:16px">
        <div class="card-body">
          <h4 style="margin-bottom:16px">💰 Payment Details</h4>
          <div class="detail-row"><span>Mode</span><span class="badge badge-info">{{ order.modeOfPayment }}</span></div>
          <div class="detail-row"><span>Subtotal</span><span>₹{{ order.totalAmount }}</span></div>
          <div class="detail-row" *ngIf="order.discount"><span class="text-success">Discount</span><span class="text-success">−₹{{ order.discount }}</span></div>
          <div class="divider"></div>
          <div class="detail-row total"><span>Total Paid</span><span>₹{{ order.finalAmount }}</span></div>
        </div>
      </div>

      <!-- Delivery Info -->
      <div class="card" style="margin-bottom:16px">
        <div class="card-body">
          <h4 style="margin-bottom:16px">📍 Delivery Info</h4>
          <div class="detail-row"><span>Address</span></div>
          <p style="font-size:.875rem;margin:4px 0 12px">{{ order.deliveryAddress }}</p>
          <div *ngIf="order.agentName" class="detail-row"><span>Delivery Agent</span><span>{{ order.agentName }}</span></div>
        </div>
      </div>

      <!-- Actions -->
      <div class="card">
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <a [routerLink]="['/orders', order.orderId, 'track']" class="btn btn-primary"
             *ngIf="['PLACED','CONFIRMED','PREPARING','PICKED_UP'].includes(order.orderStatus)">
            📍 Track Live
          </a>
          <button class="btn btn-secondary" *ngIf="order.orderStatus === 'DELIVERED' && !hasReview"
                  (click)="openReview()">⭐ Rate Order</button>
          <button class="btn btn-danger btn-sm" *ngIf="order.orderStatus === 'PLACED'"
                  (click)="cancelOrder()">Cancel Order</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.order-detail-layout{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start;
  @media(max-width:1024px){grid-template-columns:1fr;}}
.order-timeline{display:flex;flex-direction:column;gap:0;}
.timeline-item{display:flex;position:relative;padding-left:40px;padding-bottom:20px;
  &:last-child{padding-bottom:0;}
  &::before{content:'';position:absolute;left:15px;top:20px;width:2px;bottom:0;background:var(--border-color);}
  &:last-child::before{display:none;}
  &.completed::before{background:var(--success);}
  &.active::before{background:var(--brand-primary);}
}
.tl-content{display:flex;align-items:center;gap:12px;position:relative;
  &::before{content:'';position:absolute;left:-29px;width:14px;height:14px;border-radius:50%;background:var(--bg-base);border:2px solid var(--border-color);z-index:1;}
}
.timeline-item.completed .tl-content::before{background:var(--success);border-color:var(--success);}
.timeline-item.active .tl-content::before{background:var(--brand-primary);border-color:var(--brand-primary);}
.tl-icon{font-size:1.3rem;}
.tl-title{font-weight:600;font-size:.9rem;}
.order-item-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-color);&:last-child{border:none;}}
.item-qty-badge{background:var(--bg-input);border-radius:4px;padding:2px 8px;font-size:.8rem;font-weight:700;}
.detail-row{display:flex;justify-content:space-between;align-items:center;font-size:.875rem;padding:5px 0;color:var(--text-secondary);&.total{font-weight:700;color:var(--text-primary);font-family:var(--font-display);}}
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  errorMessage = '';
  hasReview = false;

  timelineSteps = [
    { status: 'PLACED',    icon: '🕐', label: 'Order Placed' },
    { status: 'CONFIRMED', icon: '✅', label: 'Confirmed by Restaurant' },
    { status: 'PREPARING', icon: '👨‍🍳', label: 'Preparing your food' },
    { status: 'PICKED_UP', icon: '🛵', label: 'Picked up by agent' },
    { status: 'DELIVERED', icon: '🏠', label: 'Delivered!' },
  ];

  statusOrder = ['PLACED','CONFIRMED','PREPARING','PICKED_UP','DELIVERED'];

  constructor(
    private route: ActivatedRoute,
    private orderSvc: OrderService,
    private reviewSvc: ReviewService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderSvc.getById(id).subscribe({
      next: o => {
        this.order = o;
        this.loading = false;
        this.errorMessage = '';
        this.loadReviewState(o.orderId);
      },
      error: () => { this.order = null; this.loading = false; this.errorMessage = 'Order details are temporarily unavailable.'; }
    });
  }

  loadReviewState(orderId: number) {
    this.reviewSvc.getByOrder(orderId).subscribe({
      next: () => this.hasReview = true,
      error: () => this.hasReview = false
    });
  }

  isCompleted(status: string): boolean {
    if (!this.order) return false;
    const idx = this.statusOrder.indexOf(status);
    const cur = this.statusOrder.indexOf(this.order.orderStatus);
    return idx < cur;
  }

  getStatusClass(s: OrderStatus): string {
    return {PLACED:'badge-info',CONFIRMED:'badge-brand',PREPARING:'badge-warning',PICKED_UP:'badge-warning',DELIVERED:'badge-success',CANCELLED:'badge-error'}[s] || 'badge-neutral';
  }

  cancelOrder() {
    if (!this.order) return;
    this.orderSvc.cancelOrder(this.order.orderId).subscribe({ next: () => { this.order!.orderStatus = 'CANCELLED'; this.toast.success('Order cancelled'); }, error: () => this.toast.error('Failed to cancel') });
  }

  openReview() {
    if (!this.order || this.order.orderStatus !== 'DELIVERED') return;
    if (this.hasReview) {
      this.toast.info('You have already submitted a review for this order.');
      return;
    }

    const foodRating = Number(window.prompt('Rate the food from 1 to 5:', '5'));
    if (!Number.isInteger(foodRating) || foodRating < 1 || foodRating > 5) {
      this.toast.error('Please enter a food rating between 1 and 5.');
      return;
    }

    const deliveryRatingInput = this.order.deliveryAgentId
      ? window.prompt('Rate the delivery from 1 to 5 (optional):', '5')
      : null;
    let parsedDeliveryRating: number | undefined;
    if (deliveryRatingInput !== null) {
      parsedDeliveryRating = Number(deliveryRatingInput);
      if (!Number.isInteger(parsedDeliveryRating) || parsedDeliveryRating < 1 || parsedDeliveryRating > 5) {
        this.toast.error('Please enter a delivery rating between 1 and 5.');
        return;
      }
    }

    const comment = window.prompt('Add a short comment (optional):', '') || undefined;

    const payload: SubmitReviewRequest = {
      orderId: this.order.orderId,
      restaurantId: this.order.restaurantId,
      agentId: this.order.deliveryAgentId,
      foodRating,
      deliveryRating: parsedDeliveryRating,
      comment
    };

    this.reviewSvc.addReview(payload).subscribe({
      next: () => {
        this.hasReview = true;
        this.toast.success('Review submitted successfully.');
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to submit review')
    });
  }
}
