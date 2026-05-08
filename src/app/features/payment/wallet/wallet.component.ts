import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { WalletStatement } from '../../../core/models';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="page-header"><div class="container"><h1>My Wallet</h1><p>Manage your QuickBite wallet balance</p></div></div>
<div class="container" style="padding:32px 0 64px">
  <div class="wallet-layout">

    <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:4px">
      <div class="empty-icon">💳</div>
      <div class="empty-title">Wallet unavailable</div>
      <div class="empty-desc">{{ errorMessage }}</div>
    </div>

    <div class="balance-card animate-scaleIn">
      <div class="balance-bg"></div>
      <div class="balance-content">
        <div class="balance-label">Available Balance</div>
        <div class="balance-amount">₹{{ balance | number:'1.2-2' }}</div>
        <div class="balance-meta">QuickBite Wallet · Secure & Instant</div>
      </div>
      <div class="wallet-icon-bg">💳</div>
    </div>

    <div class="card animate-fadeInUp delay-200">
      <div class="card-header"><h4>➕ Add Money</h4></div>
      <div class="card-body">
        <div class="quick-amounts">
          <button *ngFor="let a of [100,200,500,1000]" class="amount-chip"
                  [class.active]="addAmount === a" (click)="addAmount = a">₹{{ a }}</button>
        </div>
        <div class="flex gap-md" style="margin-top:16px">
          <input type="number" class="form-control" placeholder="Custom amount" [(ngModel)]="addAmount" min="1">
          <button class="btn btn-primary" (click)="addMoney()" [disabled]="!addAmount || loading">
            <span *ngIf="!loading">Add Money</span>
            <span *ngIf="loading" class="spinner" style="width:16px;height:16px;border-width:2px"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="card animate-fadeInUp delay-300">
      <div class="card-header"><h4>📜 Transaction History</h4></div>
      <div *ngIf="statements.length; else noTxn">
        <div *ngFor="let s of statements" class="txn-row">
          <div class="txn-icon" [class.credit]="s.type==='CREDIT'" [class.debit]="s.type==='DEBIT'">
            {{ s.type === 'CREDIT' ? '⬆️' : '⬇️' }}
          </div>
          <div class="txn-info">
            <div class="txn-desc">{{ s.description }}</div>
            <div class="txn-date text-xs text-muted">{{ s.createdAt | date:'medium' }}</div>
          </div>
          <div class="txn-amount" [class.credit]="s.type==='CREDIT'" [class.debit]="s.type==='DEBIT'">
            {{ s.type === 'CREDIT' ? '+' : '-' }}₹{{ s.amount }}
          </div>
        </div>
      </div>
      <ng-template #noTxn>
        <div class="empty-state" style="padding:40px">
          <div class="empty-icon">📭</div>
          <div class="empty-title">No transactions yet</div>
          <div class="empty-desc">Add money to your wallet to get started.</div>
        </div>
      </ng-template>
    </div>
  </div>
</div>
  `,
  styles: [`
.wallet-layout{display:flex;flex-direction:column;gap:20px;max-width:600px;margin:0 auto;}
.balance-card{background:var(--brand-gradient);border-radius:var(--border-radius-xl);padding:40px;color:white;position:relative;overflow:hidden;}
.balance-bg{position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:rgba(255,255,255,.1);border-radius:50%;}
.balance-content{position:relative;z-index:1;}
.balance-label{font-size:.85rem;font-weight:600;opacity:.8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;}
.balance-amount{font-family:var(--font-display);font-size:3rem;font-weight:800;color:white;line-height:1;margin-bottom:8px;}
.balance-meta{font-size:.82rem;opacity:.7;}
.wallet-icon-bg{position:absolute;bottom:-10px;right:30px;font-size:5rem;opacity:.15;z-index:0;}
.quick-amounts{display:flex;gap:10px;flex-wrap:wrap;}
.amount-chip{padding:8px 18px;border-radius:var(--border-radius-full);border:1.5px solid var(--border-color);background:var(--bg-input);font-weight:600;font-size:.875rem;cursor:pointer;transition:all var(--transition-fast);
  &.active,&:hover{background:var(--brand-primary);border-color:var(--brand-primary);color:white;}}
.txn-row{display:flex;align-items:center;gap:14px;padding:14px var(--space-lg);border-bottom:1px solid var(--border-color);&:last-child{border:none;}}
.txn-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;
  &.credit{background:rgba(34,197,94,.1);}
  &.debit{background:rgba(239,68,68,.1);}
}
.txn-info{flex:1;}
.txn-desc{font-size:.875rem;font-weight:500;}
.txn-amount{font-weight:700;font-family:var(--font-display);&.credit{color:var(--success);}&.debit{color:var(--error);}}
  `]
})
export class WalletComponent implements OnInit {
  balance = 0;
  statements: WalletStatement[] = [];
  addAmount: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(private paymentSvc: PaymentService, public auth: AuthService, private toast: ToastService) {}

  ngOnInit() {
    if (this.auth.currentUser) {
      this.paymentSvc.getWalletBalance(this.auth.currentUser.userId).subscribe({
        next: b => { this.balance = b; this.errorMessage = ''; },
        error: () => { this.balance = 0; this.errorMessage = 'Wallet details are temporarily unavailable.'; }
      });
      this.paymentSvc.getWalletStatements(this.auth.currentUser.userId).subscribe({
        next: s => this.statements = s,
        error: () => { this.statements = []; }
      });
    }
  }

  addMoney() {
    if (!this.addAmount || !this.auth.currentUser) return;
    this.loading = true;
    this.paymentSvc.createWalletTopUpOrder({
      customerId: this.auth.currentUser.userId,
      amount: this.addAmount
    }).subscribe({
      next: gateway => this.openRazorpayCheckout(gateway),
      error: () => {
        this.toast.error('Failed to start wallet top-up');
        this.loading = false;
      }
    });
  }

  private async openRazorpayCheckout(gateway: { keyId: string; razorpayOrderId: string; amount: number; currency: string }) {
    const loaded = await this.loadRazorpayScript();
    if (!loaded) {
      this.loading = false;
      this.toast.error('Razorpay checkout failed to load.');
      return;
    }

    const RazorpayCtor = (window as any).Razorpay;
    if (!RazorpayCtor) {
      this.loading = false;
      this.toast.error('Razorpay is not available in this browser.');
      return;
    }

    const options = {
      key: gateway.keyId,
      amount: Math.round(gateway.amount * 100),
      currency: gateway.currency || 'INR',
      name: 'QuickBite Wallet',
      description: 'Add money to wallet',
      order_id: gateway.razorpayOrderId,
      prefill: {
        name: this.auth.currentUser?.fullName || '',
        email: this.auth.currentUser?.email || '',
        contact: this.auth.currentUser?.phone || ''
      },
      theme: { color: '#ff4b2b' },
      modal: {
        ondismiss: () => {
          this.loading = false;
          this.toast.info('Wallet top-up cancelled.');
        }
      },
      handler: (response: any) => {
        this.paymentSvc.verifyWalletTopUpPayment({
          customerId: this.auth.currentUser!.userId,
          amount: gateway.amount,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
        }).subscribe({
          next: () => {
            this.paymentSvc.addToWallet(this.auth.currentUser!.userId, gateway.amount, response.razorpay_payment_id).subscribe({
              next: w => {
                this.balance = w.balance;
                this.toast.success(`₹${gateway.amount} added to wallet!`);
                this.addAmount = null;
                this.loading = false;
              },
              error: () => {
                this.loading = false;
                this.toast.error('Payment verified, but wallet credit failed.');
              }
            });
          },
          error: () => {
            this.loading = false;
            this.toast.error('Wallet payment verification failed.');
          }
        });
      }
    };

    const rzp = new RazorpayCtor(options);
    rzp.on('payment.failed', (response: any) => {
      this.loading = false;
      this.toast.error(response?.error?.description || 'Payment failed');
    });
    rzp.open();
  }

  private loadRazorpayScript(): Promise<boolean> {
    return new Promise(resolve => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
}
