import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService, PaymentService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { CartStateService, ToastService } from '../../../core/services/ui.services';
import { Cart, PaymentMode } from '../../../core/models';

type PaymentMethod = {
  id: PaymentMode;
  icon: string;
  name: string;
  desc: string;
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>Checkout 💳</h1><p>Almost there! Review and place your order.</p></div></div>

<div class="container checkout-page">
  <div class="checkout-layout">

    <!-- Left: Form -->
    <div class="checkout-form-panel">

      <!-- Delivery Address -->
      <div class="card checkout-section">
        <div class="card-header"><h4>📍 Delivery Address</h4></div>
        <div class="card-body">
          <form [formGroup]="form">
            <div class="form-group">
              <label class="form-label">Full Delivery Address</label>
              <textarea formControlName="deliveryAddress" class="form-control" rows="3"
                        placeholder="Flat no, Building, Street, Area, City, Pincode"
                        [class.error]="addr.invalid && addr.touched"></textarea>
              <span class="form-error" *ngIf="addr.invalid && addr.touched">Delivery address is required</span>
            </div>
            <div class="form-group">
              <label class="form-label">Special Instructions (optional)</label>
              <input formControlName="specialInstructions" type="text" class="form-control"
                     placeholder="E.g. Ring doorbell, leave at gate...">
            </div>
          </form>
        </div>
      </div>

      <!-- Payment Mode -->
      <div class="card checkout-section">
        <div class="card-header"><h4>💰 Payment Method</h4></div>
        <div class="card-body">
            <div class="payment-methods">
              <div *ngFor="let pm of paymentMethods"
                   class="payment-option" [class.selected]="selectedMode === pm.id"
                   (click)="selectPaymentMode(pm.id)">
              <span class="pm-icon">{{ pm.icon }}</span>
              <div class="pm-info">
                <div class="pm-name">{{ pm.name }}</div>
                <div class="pm-desc">{{ pm.desc }}</div>
              </div>
              <div class="pm-radio" [class.active]="selectedMode === pm.id"></div>
            </div>
          </div>

          <!-- Wallet Balance -->
          <div *ngIf="selectedMode === 'WALLET'" class="wallet-balance-card">
            <span>💳</span>
            <div>
              <strong>Wallet Balance: ₹{{ walletBalance | number:'1.2-2' }}</strong>
              <p *ngIf="walletBalance < (cart?.totalPrice || 0)" class="text-error text-sm">Insufficient balance. Please add money to wallet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Summary -->
    <div class="checkout-summary">
      <div class="card">
        <div class="card-body">
          <h3 style="margin-bottom:20px">Order Summary</h3>

          <div *ngIf="cart">
            <div *ngFor="let item of cart.items" class="order-item-row">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>₹{{ item.price * item.quantity }}</span>
            </div>
            <div class="divider"></div>
            <div class="summary-row"><span>Subtotal</span><span>₹{{ cart.totalPrice }}</span></div>
            <div class="summary-row" *ngIf="cart.discount"><span class="text-success">Discount</span><span class="text-success">−₹{{ cart.discount }}</span></div>
            <div class="summary-row"><span>Delivery</span><span class="text-success">FREE</span></div>
            <div class="summary-row"><span>GST (5%)</span><span>₹{{ (cart.totalPrice * 0.05) | number:'1.0-0' }}</span></div>
            <div class="divider"></div>
            <div class="summary-row total-row">
              <span>Total Payable</span>
              <span>₹{{ getFinalAmount() | number:'1.0-0' }}</span>
            </div>
          </div>

          <button class="btn btn-primary btn-lg w-full" style="margin-top:20px"
                  (click)="placeOrder()" [disabled]="loading || form.invalid">
            <span *ngIf="!loading">🚀 Place Order</span>
            <span *ngIf="loading" class="spinner" style="width:20px;height:20px;border-width:2px"></span>
          </button>

          <p class="secure-note"><span>🔒</span> 100% secure payment. Your data is encrypted.</p>
        </div>
      </div>
    </div>

  </div>
</div>
  `,
  styles: [`
.checkout-page{padding:32px 0 64px;}
.checkout-layout{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;
  @media(max-width:1024px){grid-template-columns:1fr;}}
.checkout-section{margin-bottom:16px;}
.payment-methods{display:flex;flex-direction:column;gap:10px;}
.payment-option{display:flex;align-items:center;gap:14px;padding:14px;border:1.5px solid var(--border-color);border-radius:var(--border-radius-md);cursor:pointer;transition:all var(--transition-fast);
  &.selected{border-color:var(--brand-primary);background:rgba(255,75,43,.05);}
  &:hover:not(.selected){border-color:var(--text-muted);}
}
.pm-icon{font-size:1.4rem;flex-shrink:0;}
.pm-info{flex:1;}
.pm-name{font-weight:600;font-size:.9rem;}
.pm-desc{font-size:.78rem;color:var(--text-muted);}
.pm-radio{width:18px;height:18px;border-radius:50%;border:2px solid var(--border-color);position:relative;flex-shrink:0;
  &.active{border-color:var(--brand-primary);&::after{content:'';position:absolute;top:3px;left:3px;width:8px;height:8px;border-radius:50%;background:var(--brand-primary);}}
}
.wallet-balance-card{display:flex;align-items:flex-start;gap:12px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:var(--border-radius-md);padding:14px;margin-top:12px;
  p{margin:4px 0 0;}
}
.order-item-row{display:flex;justify-content:space-between;font-size:.875rem;padding:5px 0;color:var(--text-secondary);}
.summary-row{display:flex;justify-content:space-between;font-size:.9rem;padding:6px 0;}
.total-row{font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--text-primary);}
.secure-note{display:flex;align-items:center;gap:6px;font-size:.78rem;color:var(--text-muted);text-align:center;justify-content:center;margin-top:12px;}
.w-full{width:100%;}
  `]
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  cart: Cart | null = null;
  walletBalance = 0;
  selectedMode: PaymentMode = 'COD';
  loading = false;

  paymentMethods: PaymentMethod[] = [
    { id: 'COD',    icon: '💵', name: 'Cash on Delivery', desc: 'Pay when your order arrives' },
    { id: 'WALLET', icon: '💳', name: 'QuickBite Wallet', desc: 'Use your wallet balance' },
    { id: 'UPI',    icon: '📱', name: 'UPI / PhonePe / GPay', desc: 'Pay via any UPI app' },
    { id: 'CARD',   icon: '💳', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
  ];

  constructor(
    private fb: FormBuilder,
    private cartSvc: CartService,
    private orderSvc: OrderService,
    private paymentSvc: PaymentService,
    public auth: AuthService,
    private cartState: CartStateService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      deliveryAddress: ['', Validators.required],
      specialInstructions: ['']
    });
  }

  ngOnInit() {
    const hasClientCart = this.cartState.snapshot.length > 0;
    if (hasClientCart) {
      this.hydrateCartFromClientState();
    }

    if (this.auth.currentUser && !hasClientCart) {
      this.cartSvc.getCart(this.auth.currentUser.userId).subscribe({
        next: c => this.cart = c,
        error: () => {
          // Keep the locally hydrated cart so checkout can still render.
          if (!this.cart && this.cartState.snapshot.length) {
            this.hydrateCartFromClientState();
          }
        }
      });
    }
    if (this.selectedMode === 'WALLET') {
      this.loadWalletBalance();
    }
  }

  getFinalAmount(): number {
    const subtotal = this.cart?.totalPrice ?? this.cartState.total;
    const discount = this.cart?.discount || 0;
    if (!subtotal) return 0;
    return subtotal - discount + Math.round(subtotal * 0.05);
  }

  selectPaymentMode(mode: PaymentMode): void {
    this.selectedMode = mode;
    if (mode === 'WALLET') {
      this.loadWalletBalance();
    }
  }

  private loadWalletBalance(): void {
    if (!this.auth.currentUser) return;
    this.paymentSvc.getWalletBalance(this.auth.currentUser.userId).subscribe({
      next: b => this.walletBalance = b,
      error: () => {
        this.walletBalance = 0;
        this.toast.warning('Wallet balance could not be loaded right now.');
      }
    });
  }

  private hydrateCartFromClientState(): void {
    const items = this.cartState.snapshot;
    if (!items.length) {
      return;
    }

    this.cart = {
      cartId: 0,
      customerId: this.auth.currentUser?.userId || 0,
      restaurantId: 0,
      totalPrice: this.cartState.total,
      items: items.map(item => ({ ...item })),
      promoCode: undefined,
      discount: 0
    };
  }

  placeOrder() {
    if (this.loading) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (!this.cart && !this.cartState.snapshot.length) {
      this.toast.error('Your cart is empty. Please add items before placing the order.');
      return;
    }

    const finalAmount = this.getFinalAmount();
    if (this.selectedMode === 'WALLET' && this.walletBalance < finalAmount) {
      this.toast.error('Insufficient wallet balance.');
      return;
    }
    this.loading = true;
    const payload = {
      deliveryAddress: this.form.value.deliveryAddress,
      modeOfPayment: this.selectedMode,
      specialInstructions: this.form.value.specialInstructions
    };

    if (this.selectedMode === 'UPI' || this.selectedMode === 'CARD') {
      this.startRazorpayFirst(payload, finalAmount);
      return;
    }

    this.loading = true;
    this.orderSvc.placeOrder(payload).subscribe({
      next: order => {
        if (this.selectedMode === 'COD') {
          this.paymentSvc.processPayment({
            orderId: order.orderId,
            customerId: this.auth.currentUser!.userId,
            amount: finalAmount,
            mode: this.selectedMode
          }).subscribe({
            next: () => this.finishCheckout(order.orderId, 'Order placed successfully! Please pay cash on delivery.'),
            error: err => {
              this.loading = false;
              this.toast.error(this.extractErrorMessage(err, 'Order placed, but payment record could not be saved'));
              this.router.navigate(['/orders', order.orderId, 'track']);
            }
          });
          return;
        }

        if (this.selectedMode === 'WALLET') {
          this.paymentSvc.processPayment({
            orderId: order.orderId,
            customerId: this.auth.currentUser!.userId,
            amount: finalAmount,
            mode: this.selectedMode
          }).subscribe({
            next: () => this.finishCheckout(order.orderId, 'Order placed successfully! 🎉'),
            error: err => {
              this.loading = false;
              this.toast.error(this.extractErrorMessage(err, 'Order placed, but payment failed'));
              this.router.navigate(['/orders', order.orderId, 'track']);
            }
          });
          return;
        }

        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.toast.error(this.extractErrorMessage(err, 'Failed to place order'));
      }
    });
  }

  private startRazorpayFirst(orderPayload: { deliveryAddress: string; modeOfPayment: PaymentMode; specialInstructions?: string; }, finalAmount: number): void {
    this.loading = true;
    const gatewayMode = this.selectedMode as 'CARD' | 'UPI';
    this.paymentSvc.createRazorpayCheckoutOrder({
      amount: finalAmount,
      mode: gatewayMode,
      currency: 'INR'
    }).subscribe({
      next: gateway => this.openRazorpayCheckout(orderPayload, finalAmount, gateway),
      error: err => {
        this.loading = false;
        this.toast.error(this.extractErrorMessage(err, 'Unable to start Razorpay checkout'));
      }
    });
  }

  private finishCheckout(orderId: number, message: string) {
    this.cartState.clear();
    this.toast.success(message);
    this.loading = false;
    this.router.navigate(['/orders', orderId, 'track']);
  }

  private async openRazorpayCheckout(
    orderPayload: { deliveryAddress: string; modeOfPayment: PaymentMode; specialInstructions?: string; },
    amount: number,
    gateway: { keyId: string; razorpayOrderId: string; currency: string }
  ) {
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
      amount: Math.round(amount * 100),
      currency: gateway.currency || 'INR',
      name: 'QuickBite',
      description: 'QuickBite checkout',
      order_id: gateway.razorpayOrderId.startsWith('QB-MOCK-') ? undefined : gateway.razorpayOrderId,
      prefill: {
        name: this.auth.currentUser?.fullName || '',
        email: this.auth.currentUser?.email || '',
        contact: this.auth.currentUser?.phone || ''
      },
      theme: { color: '#ff4b2b' },
      modal: {
        ondismiss: () => {
          this.loading = false;
          this.toast.info('Payment cancelled.');
        }
      },
      handler: (response: any) => {
        const finalizeOrder = () => {
          this.orderSvc.placeOrder(orderPayload).subscribe({
            next: order => {
              this.paymentSvc.processPayment({
                orderId: order.orderId,
                customerId: this.auth.currentUser!.userId,
                amount,
                mode: this.selectedMode
              }).subscribe({
                next: () => this.finishCheckout(order.orderId, 'Payment successful! Order placed successfully! 🎉'),
                error: err => {
                  this.loading = false;
                  this.toast.error(this.extractErrorMessage(err, 'Order placed, but payment record could not be saved'));
                  this.router.navigate(['/orders', order.orderId, 'track']);
                }
              });
            },
            error: err => {
              this.loading = false;
              this.toast.error(this.extractErrorMessage(err, 'Payment verified, but order could not be placed'));
            }
          });
        };

        if (gateway.razorpayOrderId.startsWith('QB-MOCK-')) {
          finalizeOrder();
          return;
        }

        this.paymentSvc.verifyRazorpayCheckoutPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
        }).subscribe({
          next: () => finalizeOrder(),
          error: err => {
            this.loading = false;
            this.toast.error(err?.error?.message || 'Payment verification failed');
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

  get addr() { return this.form.get('deliveryAddress')!; }

  private extractErrorMessage(err: any, fallback: string): string {
    const apiError = err?.error;
    if (typeof apiError === 'string' && apiError.trim()) {
      return apiError;
    }
    if (apiError?.message) {
      return apiError.message;
    }
    if (apiError?.data && typeof apiError.data === 'object') {
      const details = Object.entries(apiError.data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      if (details) return details;
    }
    if (err?.message) {
      return err.message;
    }
    return fallback;
  }
}
