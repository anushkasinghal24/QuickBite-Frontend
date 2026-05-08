import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentService } from '../../../core/services/api.services';
import { ToastService } from '../../../core/services/ui.services';
import { Payment } from '../../../core/models';

@Component({
  selector: 'app-admin-finance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Finance & Refunds</h1>
    <p>Track revenue, refund status, and commission estimates</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div class="controls card">
    <div>
      <label>Start date</label>
      <input class="input" type="date" [(ngModel)]="startDate" />
    </div>
    <div>
      <label>End date</label>
      <input class="input" type="date" [(ngModel)]="endDate" />
    </div>
    <div>
      <label>Commission %</label>
      <input class="input" type="number" [(ngModel)]="commissionRate" step="0.5" min="0" />
    </div>
    <button class="btn btn-primary" (click)="loadFinance()">Refresh</button>
    <a routerLink="/admin" class="btn btn-ghost">Back to dashboard</a>
  </div>

  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Finance data unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:24px">
    <div class="card stat-card" *ngFor="let card of summaryCards">
      <div class="stat-label">{{ card.label }}</div>
      <div class="stat-value">{{ card.value }}</div>
      <div class="stat-note">{{ card.note }}</div>
    </div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <h3>Refund policy</h3>
      <p class="text-muted">Refunds to the original payment method are marked as initiated here and the external gateway typically settles them in 3 to 5 business days. Refunds to wallet are credited instantly.</p>
      <div class="policy-box">
        <div><strong>Original</strong> - gateway-backed settlement</div>
        <div><strong>Wallet</strong> - immediate credit</div>
      </div>
    </div>

    <div class="card panel">
      <h3>Mode breakdown</h3>
      <div class="stack">
        <div class="mode-row" *ngFor="let row of modeBreakdown">
          <div>{{ row.label }}</div>
          <strong>{{ row.count }}</strong>
        </div>
      </div>
    </div>
  </div>

  <div class="card panel" style="margin-top:24px">
    <div class="panel-head">
      <div>
        <h3 style="margin:0 0 4px">Payment ledger</h3>
        <p class="text-muted" style="margin:0">Refund paid orders directly from here.</p>
      </div>
      <button class="btn btn-ghost btn-sm" (click)="loadFinance()">Reload</button>
    </div>

    <div *ngIf="payments.length; else noPayments" class="ledger">
      <div *ngFor="let payment of payments" class="ledger-row">
        <div class="ledger-main">
          <div class="ledger-title">Payment #{{ payment.paymentId }} · Order #{{ payment.orderId }}</div>
          <div class="ledger-meta">{{ payment.mode }} · {{ payment.status }} · {{ payment.createdAt | date:'short' }}</div>
          <div class="ledger-meta">Amount: ₹{{ payment.amount | number:'1.0-2' }} <span *ngIf="payment.refundedAt">· Refunded {{ payment.refundedAt | date:'short' }}</span></div>
        </div>
        <div class="ledger-side">
          <span class="badge" [class.badge-success]="payment.status === 'PAID'" [class.badge-warning]="payment.status === 'PENDING'">{{ payment.status }}</span>
          <select class="input" [(ngModel)]="refundModes[payment.paymentId]">
            <option value="WALLET">Refund to wallet</option>
            <option value="ORIGINAL">Refund to original</option>
          </select>
          <button class="btn btn-primary btn-sm" (click)="refund(payment)" [disabled]="payment.status !== 'PAID'">Refund</button>
        </div>
      </div>
    </div>

    <ng-template #noPayments>
      <div class="empty-copy">No payments found in the selected date range.</div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.controls{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr)) auto auto;gap:14px;align-items:flex-end;padding:18px;margin-bottom:20px}
.controls label{display:block;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:6px}
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:stretch}
.stat-card{padding:20px 18px;display:flex;flex-direction:column;gap:8px;min-height:112px}
.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.stat-value{font-size:clamp(1.55rem,2.3vw,1.8rem);font-weight:800;overflow-wrap:anywhere}
.stat-note{font-size:.82rem;color:var(--text-muted);line-height:1.45;overflow-wrap:anywhere;margin-top:auto}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.policy-box{display:flex;flex-direction:column;gap:8px;margin-top:12px;color:var(--text-muted)}
.stack{display:flex;flex-direction:column;gap:10px;margin-top:12px}
.mode-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-color)}
.mode-row:last-child{border-bottom:none}
.ledger{display:flex;flex-direction:column;gap:12px}
.ledger-row{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 0;border-bottom:1px solid var(--border-color)}
.ledger-row:last-child{border-bottom:none;padding-bottom:0}
.ledger-title{font-weight:800}
.ledger-meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.ledger-side{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.empty-copy{color:var(--text-muted)}
@media (max-width: 900px){
  .controls{grid-template-columns:1fr 1fr}
  .controls .btn,.controls .input{width:100%}
  .summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .two-up{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .controls{grid-template-columns:1fr}
  .summary-grid{grid-template-columns:1fr}
  .ledger-row,.ledger-side{align-items:flex-start}
  .ledger-side .btn,.ledger-side .input{width:100%}
}
  `]
})
export class AdminFinanceComponent implements OnInit {
  startDate = '';
  endDate = '';
  commissionRate = 15;
  errorMessage = '';
  payments: Payment[] = [];
  revenue = 0;
  summaryCards = [
    { label: 'Revenue', value: '₹0', note: 'Selected date range' },
    { label: 'Refunded', value: '₹0', note: 'Paid back to users' },
    { label: 'Net after commission', value: '₹0', note: 'Estimate only' },
    { label: 'Payments', value: '0', note: 'Loaded from payment ledger' },
  ];
  modeBreakdown: Array<{ label: string; count: number }> = [];
  refundModes: Record<number, 'WALLET' | 'ORIGINAL'> = {};

  constructor(private paymentSvc: PaymentService, private toast: ToastService) {}

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today.toISOString().slice(0, 10);
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
    this.loadFinance();
  }

  loadFinance(): void {
    forkJoin({
      payments: this.paymentSvc.getAllPayments().pipe(catchError(() => of([] as Payment[]))),
      revenue: this.paymentSvc.getRevenue(this.startDate, this.endDate).pipe(catchError(() => of(0)))
    }).subscribe({
      next: data => {
        this.payments = data.payments;
        this.revenue = data.revenue;
        this.errorMessage = '';
        this.refundModes = Object.fromEntries(this.payments.map(payment => [payment.paymentId, 'ORIGINAL']));

        const refunded = this.payments.filter(payment => payment.status === 'REFUNDED').reduce((sum, payment) => sum + (payment.amount || 0), 0);
        const commission = this.revenue * (Number(this.commissionRate) / 100);
        const netAfterCommission = this.revenue - commission - refunded;

        this.summaryCards = [
          { label: 'Revenue', value: `₹${this.revenue.toFixed(2)}`, note: `${this.startDate} to ${this.endDate}` },
          { label: 'Refunded', value: `₹${refunded.toFixed(2)}`, note: 'Already refunded payments' },
          { label: 'Net after commission', value: `₹${netAfterCommission.toFixed(2)}`, note: `${this.commissionRate}% commission estimate` },
          { label: 'Payments', value: `${this.payments.length}`, note: 'Loaded from payment ledger' },
        ];

        this.modeBreakdown = ['COD', 'CARD', 'UPI', 'WALLET'].map(mode => ({
          label: mode,
          count: this.payments.filter(payment => payment.mode === mode).length
        }));
      },
      error: () => this.errorMessage = 'Could not load finance data.'
    });
  }

  refund(payment: Payment): void {
    const refundTo = this.refundModes[payment.paymentId] || 'ORIGINAL';
    this.paymentSvc.refundWithMode(payment.paymentId, refundTo).subscribe({
      next: updated => {
        this.toast.success(`Payment #${updated.paymentId} refund started`);
        this.loadFinance();
      },
      error: err => this.toast.error(err?.error?.message || 'Refund failed')
    });
  }
}
