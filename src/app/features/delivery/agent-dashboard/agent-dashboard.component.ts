import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeliveryService, OrderService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { catchError, forkJoin, of } from 'rxjs';
import { DeliveryAgent, DeliveryHistory, OrderSummary } from '../../../core/models';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Delivery Dashboard</h1>
    <p>Go online, track your order, and keep your location updated</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Agent dashboard unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div *ngIf="needsRegistration" class="card panel" style="margin-bottom:24px">
    <div class="panel-head">
      <div>
        <h3 style="margin:0 0 4px">Set up your delivery profile</h3>
        <p class="text-muted" style="margin:0">
          We found your AGENT login, but no delivery profile yet. Complete this once and the dashboard will start working.
        </p>
      </div>
    </div>

    <form [formGroup]="registerForm" class="registration-grid">
      <div class="field">
        <label class="form-label">Full Name</label>
        <input class="input" formControlName="fullName" placeholder="Your name" />
      </div>
      <div class="field">
        <label class="form-label">Phone</label>
        <input class="input" formControlName="phone" placeholder="Phone number" />
      </div>
      <div class="field">
        <label class="form-label">Vehicle Type</label>
        <select class="input" formControlName="vehicleType">
          <option value="">Select vehicle</option>
          <option value="BIKE">Bike</option>
          <option value="CYCLE">Cycle</option>
          <option value="SCOOTER">Scooter</option>
          <option value="CAR">Car</option>
        </select>
      </div>
      <div class="field">
        <label class="form-label">Vehicle Number</label>
        <input class="input" formControlName="vehicleNumber" placeholder="DL01AB1234" />
      </div>
    </form>

    <div class="action-row" style="margin-top:16px">
      <button class="btn btn-primary" (click)="registerProfile()" [disabled]="registering || registerForm.invalid">
        {{ registering ? 'Saving...' : 'Create Delivery Profile' }}
      </button>
      <button class="btn btn-ghost" (click)="refresh()">I already have a profile</button>
    </div>
  </div>

  <div *ngIf="agent" class="grid summary-grid">
    <div class="card metric">
      <div class="metric-label">Status</div>
      <div class="metric-value">{{ agent.status || (agent.isVerified ? 'VERIFIED' : 'PENDING') }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Total Deliveries</div>
      <div class="metric-value">{{ agent.totalDeliveries }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Earnings</div>
      <div class="metric-value">₹{{ (agent.totalEarnings || 0) | number:'1.0-0' }}</div>
    </div>
    <div class="card metric">
      <div class="metric-label">Average Rating</div>
      <div class="metric-value">{{ agent.avgRating | number:'1.1-1' }}</div>
    </div>
  </div>

  <div *ngIf="agent" class="grid two-up" style="margin-top:24px">
    <div class="card panel">
      <div class="panel-head">
        <div>
          <h3 style="margin:0 0 4px">{{ agent.fullName }}</h3>
          <p class="text-muted" style="margin:0">{{ agent.vehicleType }} · {{ agent.vehicleNumber }}</p>
        </div>
        <span class="badge" [class.badge-success]="agent.isAvailable" [class.badge-error]="!agent.isAvailable">
          {{ agent.isAvailable ? 'ONLINE' : 'OFFLINE' }}
        </span>
      </div>

      <div class="empty-copy" *ngIf="!agent.isVerified" style="margin-bottom:12px">
        Your profile is pending admin verification, so you cannot go online yet.
      </div>

      <div class="summary-list">
        <div class="summary-row"><span>Phone</span><strong>{{ agent.phone }}</strong></div>
        <div class="summary-row"><span>Current order</span><strong>{{ assignedOrder?.orderId || 'None' }}</strong></div>
        <div class="summary-row"><span>Location</span><strong>{{ agent.currentLatitude || 'N/A' }}, {{ agent.currentLongitude || 'N/A' }}</strong></div>
        <div class="summary-row"><span>Last update</span><strong>{{ agent.locationUpdatedAt | date:'short' }}</strong></div>
      </div>

      <div class="action-row" style="margin-top:16px">
        <button class="btn btn-secondary btn-sm" (click)="toggleAvailability()" [disabled]="!agent.isVerified">
          {{ agent.isAvailable ? 'Go Offline' : 'Go Online' }}
        </button>
        <button class="btn btn-primary btn-sm" (click)="refresh()">Refresh</button>
        <button class="btn btn-ghost btn-sm" (click)="updateLocation()">Update Location</button>
      </div>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <div>
          <h3 style="margin:0 0 4px">Assigned Order</h3>
          <p class="text-muted" style="margin:0">Review pickup, delivery, and current status at a glance.</p>
        </div>
        <span class="badge" [class.badge-success]="assignedOrder?.orderStatus === 'READY_TO_PICK_UP' || assignedOrder?.orderStatus === 'PICKED_UP'">
          {{ assignedOrder?.orderStatus || 'NONE' }}
        </span>
      </div>
      <div *ngIf="assignedOrder; else noOrder" class="assigned-card">
        <div class="order-id-row">
          <div class="order-id-chip">Order #{{ assignedOrder.orderId }}</div>
          <div class="order-id-chip subtle">Agent #{{ assignedOrder.agentId }}</div>
          <div class="order-id-chip subtle" *ngIf="assignedOrder.estimatedDelivery">
            ETA {{ assignedOrder.estimatedDelivery | date:'shortTime' }}
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Restaurant</span>
            <strong class="detail-value">{{ assignedOrder.restaurantName || 'Restaurant unavailable' }}</strong>
          </div>
          <div class="detail-item">
            <span class="detail-label">Customer</span>
            <strong class="detail-value">{{ assignedOrder.customerName || 'Customer unavailable' }}</strong>
          </div>
          <div class="detail-item full">
            <span class="detail-label">Pickup</span>
            <strong class="detail-value">{{ assignedOrder.pickupAddress || 'Pickup address unavailable' }}</strong>
          </div>
          <div class="detail-item full">
            <span class="detail-label">Delivery</span>
            <strong class="detail-value">{{ assignedOrder.deliveryAddress || 'Delivery address unavailable' }}</strong>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <strong class="detail-value">{{ assignedOrder.orderStatus || 'UNKNOWN' }}</strong>
          </div>
          <div class="detail-item" *ngIf="assignedOrder.orderDate">
            <span class="detail-label">Placed</span>
            <strong class="detail-value">{{ assignedOrder.orderDate | date:'short' }}</strong>
          </div>
        </div>

        <div class="action-row action-row-tight" style="margin-top:16px">
          <a [routerLink]="['/orders', assignedOrder.orderId, 'track']" class="btn btn-ghost btn-sm">Track Order</a>
          <button class="btn btn-primary btn-sm" (click)="markPickedUp()" *ngIf="assignedOrder.orderStatus === 'READY_TO_PICK_UP'">Mark Picked Up</button>
          <button class="btn btn-secondary btn-sm" (click)="markDelivered()" *ngIf="assignedOrder.orderStatus === 'PICKED_UP'">Complete Delivery</button>
        </div>
      </div>
      <ng-template #noOrder>
        <div class="empty-copy">No active order assigned right now.</div>
      </ng-template>
    </div>
  </div>

  <div *ngIf="agent" class="card panel" style="margin-top:24px">
    <h3>Earnings Summary</h3>
    <div *ngIf="earnings" class="summary-list">
      <div class="summary-row"><span>Total Deliveries</span><strong>{{ earnings.totalDeliveries }}</strong></div>
      <div class="summary-row"><span>Total Earnings</span><strong>₹{{ earnings.totalEarnings | number:'1.0-0' }}</strong></div>
      <div class="summary-row"><span>Average Rating</span><strong>{{ earnings.avgRating | number:'1.1-1' }}</strong></div>
      <div class="summary-row"><span>Status</span><strong>{{ earnings.status }}</strong></div>
    </div>
  </div>

  <div *ngIf="agent" class="card panel" style="margin-top:24px">
    <div class="panel-head">
      <div>
        <h3 style="margin:0 0 4px">Delivery History</h3>
        <p class="text-muted" style="margin:0">See the orders you have delivered and where they went.</p>
      </div>
      <span class="badge badge-brand">{{ deliveryHistory.length }} orders</span>
    </div>

    <div *ngIf="agent && deliveryHistory.length < (agent.totalDeliveries || 0)" class="empty-copy" style="padding-top:0">
      {{ (agent.totalDeliveries || 0) - deliveryHistory.length }} older deliveries are counted in your total, but their full history was not saved earlier.
    </div>

    <div *ngIf="deliveryHistory.length; else noHistory" class="history-stack">
      <div class="history-card" *ngFor="let order of deliveryHistory">
        <div class="history-top">
          <div>
            <div class="history-title">Order #{{ order.orderId }}</div>
            <div class="history-meta">{{ (order.deliveredAt || order.orderDate) | date:'medium' }} · {{ order.restaurantName || 'Restaurant' }}</div>
          </div>
          <span class="badge" [class.badge-success]="order.orderStatus === 'DELIVERED'" [class.badge-warning]="order.orderStatus !== 'DELIVERED'">
            {{ order.orderStatus }}
          </span>
        </div>

        <div class="history-grid">
          <div class="history-item">
            <span>Delivery address</span>
            <strong>{{ order.deliveryAddress || 'Not available' }}</strong>
          </div>
          <div class="history-item" *ngIf="order.pickupAddress">
            <span>Pickup</span>
            <strong>{{ order.pickupAddress }}</strong>
          </div>
          <div class="history-item">
            <span>Payable</span>
            <strong>₹{{ order.finalAmount | number:'1.0-0' }}</strong>
          </div>
          <div class="history-item">
            <span>Payment</span>
            <strong>{{ order.modeOfPayment }}</strong>
          </div>
          <div class="history-item">
            <span>Items</span>
            <strong>{{ order.itemCount }}</strong>
          </div>
        </div>
      </div>
    </div>
    <ng-template #noHistory>
      <div class="empty-copy">No completed or assigned delivery history yet.</div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.metric{padding:18px}
.metric-label{text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);font-size:.78rem;margin-bottom:8px}
.metric-value{font-size:1.9rem;font-weight:800;overflow-wrap:anywhere}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:16px;flex-wrap:wrap}
.summary-list{display:flex;flex-direction:column;gap:10px}
.summary-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-color);align-items:flex-start}
.summary-row:last-child{border-bottom:none;padding-bottom:0}
.summary-row span{color:var(--text-muted);flex:0 0 110px}
.summary-row strong{flex:1;text-align:right;overflow-wrap:anywhere;min-width:0}
.action-row{display:flex;gap:8px;flex-wrap:wrap}
.action-row-tight .btn{min-width:0}
.assigned-card{border:1px solid var(--border-color);border-radius:16px;padding:16px;background:var(--bg-card);display:flex;flex-direction:column;gap:14px}
.order-id-row{display:flex;flex-wrap:wrap;gap:8px}
.order-id-chip{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.order-id-chip.subtle{background:rgba(100,116,139,.12);color:#475569}
.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.detail-item{display:flex;flex-direction:column;gap:6px;padding:12px;border:1px solid var(--border-color);border-radius:14px;background:var(--bg-input);min-width:0}
.detail-item.full{grid-column:1 / -1}
.detail-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.detail-value{font-size:.95rem;line-height:1.45;overflow-wrap:anywhere;word-break:break-word}
.empty-copy{color:var(--text-muted);padding:12px 0}
.registration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.field{display:flex;flex-direction:column;gap:6px}
.history-stack{display:flex;flex-direction:column;gap:14px}
.history-card{border:1px solid var(--border-color);border-radius:16px;padding:16px;background:var(--bg-card)}
.history-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;margin-bottom:12px}
.history-title{font-weight:800}
.history-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.history-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.history-item{display:flex;flex-direction:column;gap:6px;padding:12px;border:1px solid var(--border-color);border-radius:14px;background:var(--bg-input);min-width:0}
.history-item span{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.history-item strong{overflow-wrap:anywhere}
@media(max-width:900px){
  .detail-grid{grid-template-columns:1fr}
  .summary-row{flex-direction:column}
  .summary-row strong{text-align:left}
}
@media(max-width:720px){
  .registration-grid{grid-template-columns:1fr;}
  .two-up{grid-template-columns:1fr}
  .assigned-card{padding:14px}
  .action-row .btn{width:100%}
  .history-grid{grid-template-columns:1fr}
}
  `]
})
export class AgentDashboardComponent implements OnInit {
  agent: DeliveryAgent | null = null;
  earnings: any = null;
  assignedOrder: any = null;
  deliveryHistory: DeliveryHistory[] = [];
  errorMessage = '';
  needsRegistration = false;
  registering = false;
  registerForm;

  constructor(
    private deliverySvc: DeliveryService,
    private orderSvc: OrderService,
    public auth: AuthService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleNumber: ['', Validators.required]
    });

    const user = this.auth.currentUser;
    if (user) {
      this.registerForm.patchValue({
        fullName: user.fullName || '',
        phone: user.phone || ''
      });
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    if (!this.auth.currentUser) {
      this.errorMessage = 'Please sign in with an AGENT account.';
      return;
    }

    this.deliverySvc.getMyProfile().subscribe({
      next: agent => {
        this.agent = agent;
        this.needsRegistration = false;
        this.errorMessage = '';
        this.loadExtras(agent.agentId);
      },
      error: err => {
        if (err?.status === 404) {
          this.agent = null;
          this.assignedOrder = null;
          this.earnings = null;
          this.needsRegistration = true;
          this.errorMessage = 'No delivery profile was found for this account yet.';
          return;
        }

        this.errorMessage = 'Could not load your agent profile.';
      }
    });
  }

  registerProfile(): void {
    if (this.registerForm.invalid || !this.auth.currentUser) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registering = true;
    const payload = this.registerForm.getRawValue();
    this.deliverySvc.register({
      fullName: payload.fullName || '',
      phone: payload.phone || '',
      vehicleType: payload.vehicleType || '',
      vehicleNumber: payload.vehicleNumber || ''
    } as any).subscribe({
      next: agent => {
        this.registering = false;
        this.needsRegistration = false;
        this.agent = agent;
        this.errorMessage = '';
        this.toast.success('Delivery profile created successfully. Waiting for admin verification.');
        this.loadExtras(agent.agentId);
      },
      error: err => {
        this.registering = false;
        this.toast.error(err?.error?.message || 'Failed to create delivery profile');
      }
    });
  }

  loadExtras(agentId: number): void {
    this.deliverySvc.getAssignedOrder(agentId).subscribe({
      next: order => this.assignedOrder = order,
      error: () => this.assignedOrder = null
    });

    this.deliverySvc.getEarnings(agentId).subscribe({
      next: earnings => this.earnings = earnings,
      error: () => this.earnings = null
    });

    forkJoin({
      history: this.deliverySvc.getHistory(agentId).pipe(catchError(() => of([] as DeliveryHistory[]))),
      legacy: this.orderSvc.getByAgent(agentId).pipe(catchError(() => of([] as OrderSummary[])))
    }).subscribe({
      next: ({ history, legacy }) => {
        const merged = [
          ...history,
          ...legacy.map(order => this.mapLegacyOrder(order))
        ];

        const deduped = new Map<number, DeliveryHistory>();
        merged.forEach(entry => {
          if (!deduped.has(entry.orderId)) {
            deduped.set(entry.orderId, entry);
          }
        });

        this.deliveryHistory = [...deduped.values()].sort((a, b) =>
          new Date(b.deliveredAt || b.orderDate || 0).getTime() - new Date(a.deliveredAt || a.orderDate || 0).getTime()
        );
      },
      error: () => this.deliveryHistory = []
    });
  }

  toggleAvailability(): void {
    if (!this.agent) return;
    if (!this.agent.isVerified) {
      this.toast.error('Your profile must be verified by admin before going online.');
      return;
    }
    this.deliverySvc.setAvailability(this.agent.agentId, !this.agent.isAvailable).subscribe({
      next: () => {
        this.agent!.isAvailable = !this.agent!.isAvailable;
        this.toast.success(this.agent!.isAvailable ? 'You are now online.' : 'You are now offline.');
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update availability')
    });
  }

  updateLocation(): void {
    if (!this.agent) return;
    if (!navigator.geolocation) {
      this.toast.error('Geolocation is not available in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      this.deliverySvc.updateLocation(this.agent!.agentId, pos.coords.latitude, pos.coords.longitude).subscribe({
        next: () => {
          this.agent!.currentLatitude = pos.coords.latitude;
          this.agent!.currentLongitude = pos.coords.longitude;
          this.toast.success('Location updated.');
        },
        error: err => this.toast.error(err?.error?.message || 'Failed to update location')
      });
    }, () => {
      this.toast.error('Could not read current location.');
    }, { enableHighAccuracy: true, timeout: 10000 });
  }

  markPickedUp(): void {
    if (!this.agent || !this.assignedOrder) return;
    this.deliverySvc.pickUpOrder(this.agent.agentId, this.assignedOrder.orderId).subscribe({
      next: () => {
        this.toast.success('Order marked as picked up.');
        this.refresh();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update order')
    });
  }

  markDelivered(): void {
    if (!this.agent || !this.assignedOrder) return;
    this.deliverySvc.completeDelivery(this.agent.agentId, this.assignedOrder.orderId).subscribe({
      next: () => {
        this.toast.success('Delivery completed.');
        this.refresh();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to complete delivery')
    });
  }

  private mapLegacyOrder(order: OrderSummary): DeliveryHistory {
    return {
      historyId: undefined,
      agentId: this.agent?.agentId || 0,
      orderId: order.orderId,
      customerId: order.customerId,
      customerName: order.customerName,
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      pickupAddress: undefined,
      deliveryAddress: order.deliveryAddress,
      finalAmount: order.finalAmount || 0,
      modeOfPayment: order.modeOfPayment,
      orderStatus: order.orderStatus,
      itemCount: order.itemCount || 0,
      orderDate: order.orderDate,
      deliveredAt: order.orderDate
    };
  }
}
