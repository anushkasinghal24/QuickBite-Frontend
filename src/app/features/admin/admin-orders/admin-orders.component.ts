import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService, DeliveryService } from '../../../core/services/api.services';
import { Order, DeliveryAgent, OrderStatus } from '../../../core/models';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>All Orders</h1>
    <p>Monitor platform orders, status changes, and delivery assignment</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Orders unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:24px">
    <div class="card summary-card" *ngFor="let card of summaryCards">
      <div class="summary-label">{{ card.label }}</div>
      <div class="summary-value">{{ card.value }}</div>
    </div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <div class="panel-head">
        <h3>Active orders</h3>
        <span class="badge">{{ activeOrders.length }}</span>
      </div>
      <div *ngIf="activeOrders.length; else noActive" class="stack">
        <div class="order-card" *ngFor="let order of activeOrders">
          <div class="row-top">
            <div>
              <div class="order-title">Order #{{ order.orderId }} · {{ order.restaurantName || ('Restaurant ' + order.restaurantId) }}</div>
              <div class="order-meta">{{ order.finalAmount | currency:'INR' }} · {{ order.modeOfPayment }} · {{ order.orderDate | date:'short' }}</div>
            </div>
            <span class="pill">{{ order.orderStatus }}</span>
          </div>

          <div class="row-bottom">
            <select class="input compact" [(ngModel)]="statusDraft[order.orderId]">
              <option *ngFor="let status of orderStatuses" [value]="status">{{ status }}</option>
            </select>
            <button class="btn btn-primary" (click)="updateStatus(order)">Update status</button>
          </div>

          <div class="row-bottom">
            <select class="input compact" [(ngModel)]="agentDraft[order.orderId]">
              <option [ngValue]="null">Assign delivery agent</option>
              <option *ngFor="let agent of verifiedAgents" [ngValue]="agent.agentId">
                {{ agent.fullName }} (#{{ agent.agentId }})
              </option>
            </select>
            <button class="btn btn-ghost" (click)="assignAgent(order)">Assign</button>
          </div>
        </div>
      </div>
      <ng-template #noActive>
        <div class="empty-copy">No active orders right now.</div>
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
            <div class="mini-title">#{{ order.orderId }} · {{ order.restaurantName || ('Restaurant ' + order.restaurantId) }}</div>
            <div class="mini-meta">Customer #{{ order.customerId }} · {{ order.modeOfPayment }} · {{ order.finalAmount | currency:'INR' }}</div>
          </div>
          <span class="pill muted">{{ order.orderStatus }}</span>
        </div>
      </div>
      <ng-template #noOrders>
        <div class="empty-copy">No orders have been placed yet.</div>
      </ng-template>
    </div>
  </div>
</div>
  `,
  styles: [`
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.summary-card{padding:18px}
.summary-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px}
.summary-value{font-size:1.8rem;font-weight:800}
.two-up{grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.stack{display:flex;flex-direction:column;gap:12px}
.order-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card);display:flex;flex-direction:column;gap:12px}
.row-top,.row-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.order-title{font-weight:800}
.order-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.muted{background:rgba(100,116,139,.12);color:#475569}
.input.compact{padding:9px 10px;min-width:220px}
.mini-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color)}
.mini-row:last-child{border-bottom:none;padding-bottom:0}
.mini-title{font-weight:700}
.mini-meta{font-size:.82rem;color:var(--text-muted);margin-top:2px}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.empty-copy{color:var(--text-muted);padding:10px 0}
  `]
})
export class AdminOrdersComponent implements OnInit {
  recentOrders: Order[] = [];
  activeOrders: Order[] = [];
  verifiedAgents: DeliveryAgent[] = [];
  errorMessage = '';
  statusDraft: Record<number, OrderStatus> = {};
  agentDraft: Record<number, number | null> = {};
  orderStatuses: OrderStatus[] = ['PLACED', 'CONFIRMED', 'PREPARING', 'PICKED_UP', 'DELIVERED', 'CANCELLED'];
  summaryCards = [
    { label: 'Total orders', value: 0 },
    { label: 'Active orders', value: 0 },
    { label: 'Delivered', value: 0 },
    { label: 'Cancelled', value: 0 },
  ];

  constructor(private ordersSvc: OrderService, private deliverySvc: DeliveryService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.ordersSvc.getAll().subscribe({
      next: orders => {
        this.recentOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 12);
        this.statusDraft = Object.fromEntries(this.recentOrders.map(order => [order.orderId, order.orderStatus])) as Record<number, OrderStatus>;
        this.errorMessage = '';
        this.refreshSummary(orders);
      },
      error: () => this.errorMessage = 'Could not load all orders.'
    });

    this.ordersSvc.getAllActive().subscribe({
      next: orders => {
        this.activeOrders = orders;
        this.refreshSummary(this.recentOrders);
      },
      error: () => this.errorMessage = 'Could not load active orders.'
    });

    this.deliverySvc.getByStatus('VERIFIED').subscribe({
      next: agents => this.verifiedAgents = agents,
      error: () => this.errorMessage = 'Could not load verified agents.'
    });
  }

  updateStatus(order: Order): void {
    const status = this.statusDraft[order.orderId];
    if (!status || status === order.orderStatus) {
      return;
    }

    this.ordersSvc.updateStatus(order.orderId, status).subscribe({
      next: updated => {
        order.orderStatus = updated.orderStatus;
      },
      error: () => this.errorMessage = `Could not update order #${order.orderId}.`
    });
  }

  assignAgent(order: Order): void {
    const agentId = this.agentDraft[order.orderId];
    if (!agentId) {
      this.errorMessage = 'Select a verified agent first.';
      return;
    }

    this.ordersSvc.assignAgent(order.orderId, agentId).subscribe({
      next: updated => {
        order.deliveryAgentId = updated.deliveryAgentId;
      },
      error: () => this.errorMessage = `Could not assign agent to order #${order.orderId}.`
    });
  }

  private refreshSummary(orders: Order[]): void {
    this.summaryCards = [
      { label: 'Total orders', value: orders.length },
      { label: 'Active orders', value: this.activeOrders.length },
      { label: 'Delivered', value: orders.filter(order => order.orderStatus === 'DELIVERED').length },
      { label: 'Cancelled', value: orders.filter(order => order.orderStatus === 'CANCELLED').length },
    ];
  }
}
