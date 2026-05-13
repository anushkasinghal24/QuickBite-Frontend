import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { DeliveryService, OrderService } from '../../../core/services/api.services';
import { DeliveryAgent, Order, OrderStatus } from '../../../core/models';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>Live Tracking 📍</h1><p>Track your order in real-time</p></div></div>
<div class="container" style="padding:32px 0 64px">
  <div *ngIf="loading" class="flex justify-center" style="padding:60px"><div class="spinner"></div></div>

  <div *ngIf="!loading && errorMessage" class="empty-state" style="padding:80px 0">
    <div class="empty-icon">📍</div>
    <div class="empty-title">Tracking unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
    <a routerLink="/orders" class="btn btn-primary mt-md">Back to Orders</a>
  </div>

  <div *ngIf="!loading && order" class="tracking-layout">
    <div class="status-hero card animate-scaleIn">
      <div class="status-icon-big">{{ getCurrentIcon() }}</div>
      <h2 class="status-title">{{ getStatusMessage() }}</h2>
      <p class="status-sub">{{ getStatusDetail() }}</p>

      <div class="eta-chip" *ngIf="!isDelivered">
        <span>⏱</span> Estimated arrival: <strong>{{ eta }}</strong>
      </div>

      <div class="delivered-badge animate-scaleIn" *ngIf="isDelivered">
        🎉 Delivered successfully!
      </div>
    </div>

    <div class="card tracking-steps animate-fadeInUp delay-200">
      <div class="steps-list">
        <div *ngFor="let step of steps; let i = index" class="step-item"
             [class.done]="isStepDone(step.status)"
             [class.active]="order.orderStatus === step.status">
          <div class="step-circle">
            <span *ngIf="isStepDone(step.status)">✓</span>
            <span *ngIf="order.orderStatus === step.status && !isStepDone(step.status)">{{ step.icon }}</span>
            <span *ngIf="!isStepDone(step.status) && order.orderStatus !== step.status">{{ i + 1 }}</span>
          </div>
          <div class="step-connector" *ngIf="i < steps.length - 1" [class.done]="isStepDone(steps[i + 1].status)"></div>
          <div class="step-label">{{ step.label }}</div>
        </div>
      </div>
    </div>

    <div class="tracking-info animate-fadeInUp delay-300">
      <div class="card" style="padding:var(--space-lg)">
        <h4 style="margin-bottom:16px">Order #{{ order.orderId }}</h4>
        <ng-container *ngIf="order.items.length; else noItems">
          <div *ngFor="let item of order.items" class="track-item">
            <span>{{ item.name }}</span><span>×{{ item.quantity }}</span>
          </div>
        </ng-container>
        <ng-template #noItems>
          <div class="text-muted" style="font-size:.875rem;padding:4px 0 8px">
            Item details are loading.
          </div>
        </ng-template>
        <div class="divider"></div>
        <div class="flex justify-between">
          <span class="text-muted">Total</span>
          <strong>₹{{ order.finalAmount || 0 }}</strong>
        </div>
      </div>

      <div class="card agent-card" *ngIf="assignedAgent && order.orderStatus !== 'PLACED' && order.orderStatus !== 'CONFIRMED'">
        <div class="agent-avatar">🚴</div>
        <div class="agent-info">
          <div class="agent-name">{{ assignedAgentLabel }}</div>
          <div class="text-sm text-muted">Your delivery agent</div>
          <div class="text-sm text-muted" *ngIf="assignedAgent?.phone">Phone: {{ assignedAgent.phone }}</div>
        </div>
        <a [href]="'tel:' + assignedAgent.phone" class="btn btn-secondary btn-sm" *ngIf="assignedAgent?.phone">
          📞 Call
        </a>
      </div>
    </div>

    <a routerLink="/orders" class="btn btn-ghost" style="margin-top:8px">← Back to Orders</a>
  </div>
</div>
  `,
  styles: [`
.tracking-layout{display:flex;flex-direction:column;gap:20px;max-width:600px;margin:0 auto;}
.status-hero{padding:40px var(--space-xl);text-align:center;background:var(--bg-card);}
.status-icon-big{font-size:4rem;margin-bottom:16px;animation:float 2s ease-in-out infinite;}
.status-title{font-family:var(--font-display);font-size:1.5rem;font-weight:800;margin-bottom:8px;}
.status-sub{color:var(--text-muted);margin-bottom:20px;}
.eta-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,75,43,.08);border:1px solid rgba(255,75,43,.2);border-radius:var(--border-radius-full);padding:8px 18px;font-size:.875rem;color:var(--brand-primary);}
.delivered-badge{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:var(--border-radius-full);padding:10px 24px;font-size:1rem;font-weight:700;color:var(--success);}
.tracking-steps{padding:var(--space-lg);}
.steps-list{display:flex;align-items:flex-start;justify-content:space-between;position:relative;}
.step-item{display:flex;flex-direction:column;align-items:center;gap:8px;flex:1;position:relative;}
.step-circle{width:40px;height:40px;border-radius:50%;border:2px solid var(--border-color);display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:700;background:var(--bg-base);transition:all var(--transition-base);z-index:1;
  .step-item.done &{background:var(--success);border-color:var(--success);color:white;}
  .step-item.active &{background:var(--brand-primary);border-color:var(--brand-primary);color:white;animation:pulse-ring 1.5s infinite;}
}
.step-connector{position:absolute;top:20px;left:50%;width:100%;height:2px;background:var(--border-color);z-index:0;&.done{background:var(--success);}}
.step-label{font-size:.72rem;text-align:center;color:var(--text-muted);font-weight:500;max-width:70px;}
.track-item{display:flex;justify-content:space-between;font-size:.875rem;padding:5px 0;color:var(--text-secondary);}
.agent-card{display:flex;align-items:center;gap:16px;padding:var(--space-md)!important;}
.agent-avatar{width:48px;height:48px;border-radius:50%;background:var(--brand-gradient);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;}
.agent-info{flex:1;}
.agent-name{font-weight:700;}
  `]
})
export class OrderTrackingComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  assignedAgent: DeliveryAgent | null = null;
  loading = true;
  errorMessage = '';
  eta = '15-20 mins';
  private pollSub?: Subscription;

  steps = [
    { status: 'PLACED', icon: '🕐', label: 'Ordered' },
    { status: 'CONFIRMED', icon: '✅', label: 'Confirmed' },
    { status: 'PREPARING', icon: '👨‍🍳', label: 'Preparing' },
    { status: 'READY_TO_PICK_UP', icon: '📍', label: 'Ready for pickup' },
    { status: 'PICKED_UP', icon: '🛵', label: 'On the way' },
    { status: 'DELIVERED', icon: '🏠', label: 'Delivered' },
  ] as const;

  statusOrder: OrderStatus[] = ['PLACED', 'CONFIRMED', 'PREPARING', 'READY_TO_PICK_UP', 'PICKED_UP', 'DELIVERED'];

  constructor(private route: ActivatedRoute, private orderSvc: OrderService, private deliverySvc: DeliveryService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
    this.pollSub = interval(15000).subscribe(() => {
      if (!this.isDelivered) this.load(id);
    });
  }

  load(id: number): void {
    this.orderSvc.getById(id).subscribe({
      next: o => {
        this.order = o;
        this.loading = false;
        this.errorMessage = '';
        this.loadAssignedAgent();
      },
      error: () => {
        this.order = null;
        this.assignedAgent = null;
        this.loading = false;
        this.errorMessage = 'Tracking data is temporarily unavailable.';
      }
    });
  }

  private loadAssignedAgent(): void {
    const agentId = this.order?.deliveryAgentId;
    if (!agentId) {
      this.assignedAgent = null;
      return;
    }

    this.deliverySvc.getById(agentId).subscribe({
      next: agent => this.assignedAgent = agent,
      error: () => {
        this.assignedAgent = null;
      }
    });
  }

  get assignedAgentLabel(): string {
    if (!this.assignedAgent) {
      return this.order?.agentName || `Agent #${this.order?.deliveryAgentId ?? 'N/A'}`;
    }
    return `${this.assignedAgent.fullName} (Agent #${this.assignedAgent.agentId})`;
  }

  get isDelivered(): boolean {
    return this.order?.orderStatus === 'DELIVERED';
  }

  isStepDone(status: OrderStatus): boolean {
    if (!this.order) return false;
    const idx = this.statusOrder.indexOf(status);
    const cur = this.statusOrder.indexOf(this.order.orderStatus as OrderStatus);
    return idx <= cur && this.order.orderStatus !== 'CANCELLED';
  }

  getCurrentIcon(): string {
    const status = this.order?.orderStatus;
    if (!status) return '🕐';

    const icons: Record<OrderStatus, string> = {
      PLACED: '🕐',
      CONFIRMED: '✅',
      PREPARING: '👨‍🍳',
      READY_TO_PICK_UP: '📍',
      PICKED_UP: '🛵',
      DELIVERED: '🎉',
      CANCELLED: '❌',
    };

    return icons[status];
  }

  getStatusMessage(): string {
    const status = this.order?.orderStatus;
    if (!status) return 'Processing...';

    const messages: Record<OrderStatus, string> = {
      PLACED: 'Order Received!',
      CONFIRMED: 'Restaurant Confirmed!',
      PREPARING: 'Chef is cooking...',
      READY_TO_PICK_UP: 'Ready for pickup',
      PICKED_UP: 'On the way to you!',
      DELIVERED: 'Delivered! Enjoy!',
      CANCELLED: 'Order Cancelled',
    };

    return messages[status];
  }

  getStatusDetail(): string {
    const status = this.order?.orderStatus;
    if (!status) return '';

    const details: Record<OrderStatus, string> = {
      PLACED: 'Your order has been placed and is waiting for restaurant confirmation.',
      CONFIRMED: 'Great! The restaurant has confirmed your order and will start soon.',
      PREPARING: 'Your food is being freshly prepared with care.',
      READY_TO_PICK_UP: 'The restaurant has packed your order and a delivery agent is on the way to collect it.',
      PICKED_UP: 'Our delivery agent has picked up your order and is headed your way.',
      DELIVERED: 'Your order has been delivered. Bon appetit!',
      CANCELLED: 'Your order was cancelled.',
    };

    return details[status];
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }
}
