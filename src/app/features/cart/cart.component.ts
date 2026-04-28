import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/api.services';
import { AuthService } from '../../core/services/auth.service';
import { CartStateService, ToastService } from '../../core/services/ui.services';
import { Cart } from '../../core/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
<div class="page-header">
  <div class="container">
    <h1 class="animate-fadeInUp">Your Cart 🛒</h1>
    <p class="animate-fadeInUp delay-100">Review your items before checkout</p>
  </div>
</div>

<div class="container cart-page">
  <div *ngIf="loading" class="loading-center"><div class="spinner"></div></div>

  <ng-container *ngIf="!loading">
    <div *ngIf="cart && cart.items.length; else emptyCart" class="cart-layout">

      <!-- Items -->
      <div class="cart-items-panel">
        <div class="card">
          <div class="card-header">
            <h3>{{ cart.items.length }} item{{ cart.items.length !== 1 ? 's' : '' }}</h3>
            <button class="btn btn-ghost btn-sm text-error" (click)="clearCart()">🗑️ Clear Cart</button>
          </div>

          <div class="cart-item-list">
            <div *ngFor="let item of cart.items" class="cart-row animate-fadeInUp">
              <img *ngIf="item.imageUrl" [src]="item.imageUrl" [alt]="item.name" class="cart-item-img">
              <div *ngIf="!item.imageUrl" class="cart-item-img-placeholder">🍽️</div>

              <div class="cart-item-info">
                <div class="flex items-center gap-sm">
                  <div class="veg-indicator" [class.veg]="item.isVeg" [class.non-veg]="!item.isVeg"></div>
                  <h4 class="cart-item-name">{{ item.name }}</h4>
                </div>
                <p class="cart-item-price">₹{{ item.price }} each</p>
              </div>

              <div class="cart-item-actions">
                <div class="qty-counter">
                  <button (click)="updateQty(item, -1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="updateQty(item, 1)">+</button>
                </div>
                <span class="cart-item-total">₹{{ item.price * item.quantity }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Promo Code -->
        <div class="card" style="margin-top:16px">
          <div class="card-body">
            <h4 style="margin-bottom:12px">🎁 Have a promo code?</h4>
            <div class="promo-input">
              <input type="text" class="form-control" placeholder="Enter promo code" [(ngModel)]="promoCode">
              <button class="btn btn-secondary" (click)="applyPromo()" [disabled]="!promoCode.trim()">Apply</button>
            </div>
            <p *ngIf="cart.promoCode" class="text-success text-sm mt-sm">✅ "{{ cart.promoCode }}" applied! You saved ₹{{ cart.discount }}</p>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="cart-summary">
        <div class="card">
          <div class="card-body">
            <h3 style="margin-bottom:20px">Order Summary</h3>

            <div class="summary-row"><span>Subtotal</span><span>₹{{ cart.totalPrice }}</span></div>
            <div class="summary-row" *ngIf="cart.discount"><span class="text-success">Discount</span><span class="text-success">−₹{{ cart.discount }}</span></div>
            <div class="summary-row"><span>Delivery fee</span><span class="text-success">FREE</span></div>
            <div class="summary-row"><span>Taxes & charges</span><span>₹{{ (cart.totalPrice * 0.05) | number:'1.0-0' }}</span></div>
            <div class="divider"></div>
            <div class="summary-row total-row">
              <span>Total</span>
              <span>₹{{ (cart.totalPrice - (cart.discount||0) + (cart.totalPrice*0.05)) | number:'1.0-0' }}</span>
            </div>

            <a routerLink="/checkout" class="btn btn-primary btn-lg w-full" style="margin-top:20px;text-align:center;display:block">
              Proceed to Checkout →
            </a>

            <a routerLink="/restaurants" class="btn btn-ghost w-full" style="margin-top:10px;text-align:center;display:block">
              ← Continue Shopping
            </a>
          </div>
        </div>

        <!-- Savings Card -->
        <div class="savings-card" *ngIf="cart.discount">
          <span>🎉</span>
          <div>
            <strong>You're saving ₹{{ cart.discount }}!</strong>
            <p>Promo code applied successfully.</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Empty Cart -->
    <ng-template #emptyCart>
      <div class="empty-state" style="padding:80px 0">
        <div class="empty-icon">🛒</div>
        <div class="empty-title">Your cart is empty</div>
        <div class="empty-desc">Looks like you haven't added anything yet. Explore restaurants and add items to get started!</div>
        <a routerLink="/restaurants" class="btn btn-primary mt-md">Browse Restaurants</a>
      </div>
    </ng-template>
  </ng-container>
</div>
  `,
  styles: [`
.cart-page { padding: 32px 0 64px; }
.loading-center { display:flex;justify-content:center;padding:60px; }
.cart-layout { display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;
  @media(max-width:1024px){grid-template-columns:1fr;} }
.cart-items-panel {}
.cart-item-list { padding: 0 var(--space-md); }
.cart-row { display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid var(--border-color);
  &:last-child{border-bottom:none;} }
.cart-item-img { width:72px;height:64px;border-radius:var(--border-radius-md);object-fit:cover;flex-shrink:0; }
.cart-item-img-placeholder { width:72px;height:64px;border-radius:var(--border-radius-md);background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-size:1.8rem;flex-shrink:0; }
.cart-item-info { flex:1;min-width:0; }
.cart-item-name { font-weight:600;font-size:.95rem;margin-bottom:4px; }
.cart-item-price { font-size:.82rem;color:var(--text-muted); }
.cart-item-actions { display:flex;flex-direction:column;align-items:flex-end;gap:8px; }
.cart-item-total { font-family:var(--font-display);font-weight:700; }
.promo-input { display:flex;gap:10px; input{flex:1;} }
.summary-row { display:flex;justify-content:space-between;font-size:.9rem;padding:6px 0;color:var(--text-secondary); }
.total-row { font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--text-primary); }
.savings-card { background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:var(--border-radius-md);padding:16px;display:flex;gap:12px;align-items:flex-start;margin-top:16px;
  strong{color:var(--success);} p{font-size:.8rem;color:var(--text-muted);margin:4px 0 0;} }
.w-full{width:100%;}
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  promoCode = '';

  constructor(
    private cartSvc: CartService,
    public auth: AuthService,
    private cartState: CartStateService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() { this.loadCart(); }

  loadCart() {
    if (!this.auth.currentUser) { this.loading = false; return; }
    this.cartSvc.getCart(this.auth.currentUser.userId).subscribe({
      next: c => { this.cart = c; this.cartState.setCart(c.items); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  updateQty(item: any, delta: number) {
    if (!this.cart) return;
    const newQty = item.quantity + delta;
    const customerId = this.cart.customerId || this.auth.currentUser?.userId;
    if (!customerId) return;
    if (newQty < 1) {
      this.cartSvc.removeItem(customerId, item.itemId).subscribe({ next: c => { this.cart = c; this.cartState.setCart(c.items); }, error: () => this.toast.error('Failed') });
    } else {
      this.cartSvc.updateQty(customerId, item.itemId, newQty).subscribe({ next: c => { this.cart = c; this.cartState.setCart(c.items); }, error: () => this.toast.error('Failed') });
    }
  }

  clearCart() {
    if (!this.auth.currentUser) return;
    this.cartSvc.clearCart(this.auth.currentUser.userId).subscribe({ next: () => { this.cart = null; this.cartState.clear(); this.toast.info('Cart cleared'); }, error: () => this.toast.error('Failed') });
  }

  applyPromo() {
    if (!this.cart || !this.promoCode.trim()) return;
    const customerId = this.cart.customerId || this.auth.currentUser?.userId;
    if (!customerId) return;
    this.cartSvc.applyPromo(customerId, this.promoCode).subscribe({
      next: c => { this.cart = c; this.toast.success(`Promo "${this.promoCode}" applied! 🎉`); },
      error: () => this.toast.error('Invalid promo code')
    });
  }
}
