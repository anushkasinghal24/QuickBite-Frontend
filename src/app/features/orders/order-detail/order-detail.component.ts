import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeliveryService, OrderService, ReviewService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { DeliveryAgent, Order, OrderStatus, Review, SubmitReviewRequest } from '../../../core/models';

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
      <div class="card" style="margin-bottom:16px;padding:var(--space-lg)">
        <div class="order-hero">
          <div>
            <div class="eyebrow">Order #{{ order.orderId }}</div>
            <h2 class="hero-title">{{ order.restaurantName || 'QuickBite Restaurant' }}</h2>
            <div class="hero-meta">
              <span>{{ getItemCount(order) }} item{{ getItemCount(order) === 1 ? ' : 's' }}</span>
              <span>•</span>
              <span>{{ order.modeOfPayment || 'Payment pending' }}</span>
              <span>•</span>
              <span>{{ order.orderDate ? (order.orderDate | date:'medium') : 'Date unavailable' }}</span>
            </div>
          </div>
          <span class="badge" [ngClass]="getStatusClass(order.orderStatus)">{{ order.orderStatus }}</span>
        </div>
      </div>

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
          <div *ngIf="order.items.length; else noItems">
            <div *ngFor="let item of order.items" class="order-item-row">
              <div class="flex items-center gap-md">
                <span class="item-qty-badge">{{ item.quantity }}×</span>
                <span>{{ item.name }}</span>
              </div>
              <span class="price">₹{{ item.price * item.quantity }}</span>
            </div>
          </div>
          <ng-template #noItems>
            <div class="empty-desc" style="padding:12px 0 4px">
              Item details are not available yet. The page will show the full item list once the backend order payload is loaded.
            </div>
          </ng-template>
        </div>
      </div>
    </div>

    <div class="order-sidebar">
      <!-- Payment Info -->
      <div class="card" style="margin-bottom:16px">
        <div class="card-body">
          <h4 style="margin-bottom:16px">💰 Payment Details</h4>
          <div class="detail-row"><span>Mode</span><span class="badge badge-info">{{ order.modeOfPayment || 'N/A' }}</span></div>
          <div class="detail-row"><span>Subtotal</span><span>₹{{ formatMoney(order.totalAmount) }}</span></div>
          <div class="detail-row" *ngIf="order.discount"><span class="text-success">Discount</span><span class="text-success">−₹{{ formatMoney(order.discount) }}</span></div>
          <div class="divider"></div>
          <div class="detail-row total"><span>Total Paid</span><span>₹{{ formatMoney(order.finalAmount) }}</span></div>
        </div>
      </div>

      <!-- Delivery Info -->
      <div class="card" style="margin-bottom:16px">
        <div class="card-body">
          <h4 style="margin-bottom:16px">📍 Delivery Info</h4>
          <div class="detail-row"><span>Address</span></div>
          <p style="font-size:.875rem;margin:4px 0 12px">{{ order.deliveryAddress || 'Delivery address will appear once the order is hydrated from the backend.' }}</p>
          <div *ngIf="assignedAgent; else noAgent" class="agent-summary">
            <div class="detail-row"><span>Delivery Agent</span><span>{{ assignedAgentNameLabel }}</span></div>
            <div class="detail-row text-sm" *ngIf="canViewAgentPhone && assignedAgent.phone"><span>Phone</span><span>{{ assignedAgent.phone }}</span></div>
          </div>
          <ng-template #noAgent>
            <div class="detail-row"><span>Delivery Agent</span><span class="text-muted">{{ order.deliveryAgentId ? 'Loading agent details...' : 'Not assigned yet' }}</span></div>
          </ng-template>
        </div>
      </div>

      <!-- Actions -->
      <div class="card">
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <a [routerLink]="['/orders', order.orderId, 'track']" class="btn btn-primary"
             *ngIf="['PLACED','CONFIRMED','PREPARING','READY_TO_PICK_UP','PICKED_UP'].includes(order.orderStatus)">
            📍 Track Live
          </a>
          <button class="btn btn-secondary" *ngIf="order.orderStatus === 'DELIVERED' && !currentReview && auth.isCustomer"
                  (click)="openReview()">⭐ Rate Order</button>
          <button class="btn btn-ghost" *ngIf="order.orderStatus === 'DELIVERED' && currentReview && auth.isCustomer"
                  (click)="editReview()">Edit Review</button>
          <button class="btn btn-danger btn-sm" *ngIf="order.orderStatus === 'PLACED'"
                  (click)="cancelOrder()">Cancel Order</button>
        </div>
      </div>

      <div class="card" *ngIf="currentReview" style="margin-top:16px">
        <div class="card-body">
          <div class="flex justify-between items-center" style="margin-bottom:10px;gap:10px;flex-wrap:wrap">
            <h4 style="margin:0">Your Review</h4>
            <span class="badge" [class.badge-success]="currentReview.isVerified">
              {{ currentReview.isVerified ? 'Verified' : 'Submitted' }}
            </span>
          </div>
          <div class="detail-row"><span>Food</span><span>{{ currentReview.foodRating }}/5</span></div>
          <div class="detail-row" *ngIf="currentReview.deliveryRating != null"><span>Delivery</span><span>{{ currentReview.deliveryRating }}/5</span></div>
          <p style="margin:10px 0 0;color:var(--text-secondary)">{{ currentReview.comment || 'No comment provided.' }}</p>
          <p *ngIf="!auth.isCustomer" style="margin:10px 0 0;color:var(--text-muted);font-size:.82rem">
            This review is read-only for restaurant owners, delivery agents, and admins.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.order-detail-layout{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start;
  @media(max-width:1024px){grid-template-columns:1fr;}}
.order-hero{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;}
.eyebrow{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--brand-primary);font-weight:700;margin-bottom:6px;}
.hero-title{font-family:var(--font-display);font-size:1.6rem;font-weight:800;margin:0 0 6px;}
.hero-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:var(--text-muted);font-size:.85rem;}
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
.agent-summary{display:flex;flex-direction:column;gap:2px;padding-top:2px;}
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  errorMessage = '';
  currentReview: Review | null = null;
  assignedAgent: DeliveryAgent | null = null;

  timelineSteps = [
    { status: 'PLACED',    icon: '🕐', label: 'Order Placed' },
    { status: 'CONFIRMED', icon: '✅', label: 'Confirmed by Restaurant' },
    { status: 'PREPARING', icon: '👨‍🍳', label: 'Preparing your food' },
    { status: 'READY_TO_PICK_UP', icon: '📍', label: 'Ready for pickup' },
    { status: 'PICKED_UP', icon: '🛵', label: 'Picked up by agent' },
    { status: 'DELIVERED', icon: '🏠', label: 'Delivered!' },
  ];

  statusOrder = ['PLACED','CONFIRMED','PREPARING','READY_TO_PICK_UP','PICKED_UP','DELIVERED'];

  constructor(
    private route: ActivatedRoute,
    private orderSvc: OrderService,
    private deliverySvc: DeliveryService,
    private reviewSvc: ReviewService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const stateOrder = this.readRouteStateOrder(id);

    if (stateOrder) {
      this.order = stateOrder;
      this.loading = false;
      this.errorMessage = '';
      this.loadReviewState(stateOrder.orderId);
      this.loadAssignedAgent(stateOrder.deliveryAgentId);
      this.refreshOrderFromApi(id);
      return;
    }

    this.refreshOrderFromApi(id);
  }

  private refreshOrderFromApi(id: number) {
    this.orderSvc.getById(id).subscribe({
      next: o => {
        this.order = o;
        this.loading = false;
        this.errorMessage = '';
        this.loadReviewState(o.orderId);
        this.loadAssignedAgent(o.deliveryAgentId);
      },
      error: () => {
        if (this.order) {
          this.loading = false;
          this.errorMessage = 'Showing the last known order details. Live refresh is temporarily unavailable.';
          return;
        }
        this.order = null;
        this.loading = false;
        this.errorMessage = 'Order details are temporarily unavailable.';
      }
    });
  }

  private readRouteStateOrder(id: number): Order | null {
    const candidate = (history.state?.order || null) as Order | null;
    if (!candidate || candidate.orderId !== id) {
      return null;
    }
    return candidate;
  }

  loadReviewState(orderId: number) {
    this.reviewSvc.getByOrder(orderId).subscribe({
      next: review => this.currentReview = review,
      error: () => this.currentReview = null
    });
  }

  private loadAssignedAgent(agentId?: number | null) {
    if (!agentId) {
      this.assignedAgent = null;
      return;
    }

    this.deliverySvc.getById(agentId).subscribe({
      next: agent => this.assignedAgent = agent,
      error: () => this.assignedAgent = null
    });
  }

  isCompleted(status: string): boolean {
    if (!this.order) return false;
    const idx = this.statusOrder.indexOf(status);
    const cur = this.statusOrder.indexOf(this.order.orderStatus);
    return idx < cur;
  }

  getStatusClass(s: OrderStatus): string {
    return {PLACED:'badge-info',CONFIRMED:'badge-brand',PREPARING:'badge-warning',READY_TO_PICK_UP:'badge-warning',PICKED_UP:'badge-warning',DELIVERED:'badge-success',CANCELLED:'badge-error'}[s] || 'badge-neutral';
  }

  getItemCount(order: Order): number {
    return order.items?.length || order.itemCount || 0;
  }

  formatMoney(value: number | undefined | null): string {
    return Number(value || 0).toLocaleString('en-IN');
  }

  get canViewAgentPhone(): boolean {
    return this.auth.isOwner || this.auth.isAdmin;
  }

  get assignedAgentNameLabel(): string {
    if (!this.assignedAgent) {
      return this.order?.deliveryAgentId ? `Agent #${this.order.deliveryAgentId}` : 'Not assigned yet';
    }
    return this.assignedAgent.fullName || `Agent #${this.assignedAgent.agentId}`;
  }

  cancelOrder() {
    if (!this.order) return;
    this.orderSvc.cancelOrder(this.order.orderId).subscribe({ next: () => { this.order!.orderStatus = 'CANCELLED'; this.toast.success('Order cancelled'); }, error: () => this.toast.error('Failed to cancel') });
  }

  openReview() {
    if (!this.order || this.order.orderStatus !== 'DELIVERED') return;
    const payload = this.collectReviewInput();
    if (!payload) return;

    this.reviewSvc.addReview(payload).subscribe({
      next: review => {
        this.currentReview = review;
        this.toast.success('Review submitted successfully.');
      },
      error: err => this.toast.error(this.extractReviewError(err, 'Failed to submit review'))
    });
  }

  editReview() {
    if (!this.order || !this.currentReview || !this.auth.isCustomer) {
      this.toast.error('Only the customer who wrote the review can edit it.');
      return;
    }
    const payload = this.collectReviewInput(this.currentReview);
    if (!payload) return;

    this.reviewSvc.updateReview(this.currentReview.reviewId, payload).subscribe({
      next: review => {
        this.currentReview = review;
        this.toast.success('Review updated successfully.');
      },
      error: err => this.toast.error(this.extractReviewError(err, 'Failed to update review'))
    });
  }

  private collectReviewInput(existing?: Review): SubmitReviewRequest | null {
    if (!this.order) return null;

    const foodDefault = String(existing?.foodRating ?? 5);
    const foodRating = Number(window.prompt('Rate the food from 1 to 5:', foodDefault));
    if (!Number.isInteger(foodRating) || foodRating < 1 || foodRating > 5) {
      this.toast.error('Please enter a food rating between 1 and 5.');
      return null;
    }

    const deliveryRatingInput = this.order.deliveryAgentId
      ? window.prompt('Rate the delivery from 1 to 5 (optional):', String(existing?.deliveryRating ?? 5))
      : null;
    let parsedDeliveryRating: number | undefined;
    if (deliveryRatingInput !== null && deliveryRatingInput.trim() !== '') {
      parsedDeliveryRating = Number(deliveryRatingInput);
      if (!Number.isInteger(parsedDeliveryRating) || parsedDeliveryRating < 1 || parsedDeliveryRating > 5) {
        this.toast.error('Please enter a delivery rating between 1 and 5.');
        return null;
      }
    }

    const comment = window.prompt('Add a short comment (optional):', existing?.comment || '') || undefined;

    return {
      orderId: this.order.orderId,
      restaurantId: this.order.restaurantId,
      agentId: this.order.deliveryAgentId ?? undefined,
      foodRating,
      deliveryRating: parsedDeliveryRating,
      comment
    };
  }

  private extractReviewError(err: any, fallback: string): string {
    return err?.error?.message || err?.error?.data?.message || err?.message || fallback;
  }
}




