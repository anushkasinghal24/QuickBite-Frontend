"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[180],{

/***/ 2180:
/*!****************************************************************!*\
  !*** ./src/app/features/orders/checkout/checkout.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckoutComponent: () => (/* binding */ CheckoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/api.services */ 9439);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/ui.services */ 8749);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7901);









function CheckoutComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Delivery address is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CheckoutComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CheckoutComponent_div_30_Template_div_click_0_listener() {
      const pm_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.selectedMode = pm_r2.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 27)(4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pm_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", ctx_r2.selectedMode === pm_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](pm_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](pm_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](pm_r2.desc);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r2.selectedMode === pm_r2.id);
  }
}
function CheckoutComponent_div_31_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Insufficient balance. Please add money to wallet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CheckoutComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 31)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDCB3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div")(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, CheckoutComponent_div_31_p_7_Template, 2, 0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Wallet Balance: \u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](6, 2, ctx_r2.walletBalance, "1.2-2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.walletBalance < ((ctx_r2.cart == null ? null : ctx_r2.cart.totalPrice) || 0));
  }
}
function CheckoutComponent_div_37_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 40)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", item_r4.name, " \u00D7 ", item_r4.quantity, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", item_r4.price * item_r4.quantity, "");
  }
}
function CheckoutComponent_div_37_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 36)(1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Discount");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u2212\u20B9", ctx_r2.cart.discount, "");
  }
}
function CheckoutComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, CheckoutComponent_div_37_div_1_Template, 5, 3, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 36)(4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Subtotal");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, CheckoutComponent_div_37_div_8_Template, 5, 1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 36)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Delivery");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "FREE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 36)(15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "GST (5%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](19, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 39)(22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Total Payable");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](26, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.cart.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", ctx_r2.cart.totalPrice, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.cart.discount);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](19, 5, ctx_r2.cart.totalPrice * 0.05, "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](26, 8, ctx_r2.getFinalAmount(), "1.0-0"), "");
  }
}
function CheckoutComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\uD83D\uDE80 Place Order");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CheckoutComponent_span_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 41);
  }
}
let CheckoutComponent = /*#__PURE__*/(() => {
  class CheckoutComponent {
    constructor(fb, cartSvc, orderSvc, paymentSvc, auth, cartState, toast, router) {
      this.fb = fb;
      this.cartSvc = cartSvc;
      this.orderSvc = orderSvc;
      this.paymentSvc = paymentSvc;
      this.auth = auth;
      this.cartState = cartState;
      this.toast = toast;
      this.router = router;
      this.cart = null;
      this.walletBalance = 0;
      this.selectedMode = 'COD';
      this.loading = false;
      this.paymentMethods = [{
        id: 'COD',
        icon: '💵',
        name: 'Cash on Delivery',
        desc: 'Pay when your order arrives'
      }, {
        id: 'WALLET',
        icon: '💳',
        name: 'QuickBite Wallet',
        desc: 'Use your wallet balance'
      }, {
        id: 'UPI',
        icon: '📱',
        name: 'UPI / PhonePe / GPay',
        desc: 'Pay via any UPI app'
      }, {
        id: 'CARD',
        icon: '💳',
        name: 'Credit / Debit Card',
        desc: 'Visa, Mastercard, Amex'
      }];
      this.form = this.fb.group({
        deliveryAddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
        specialInstructions: ['']
      });
    }
    ngOnInit() {
      if (this.auth.currentUser) {
        this.cartSvc.getCart(this.auth.currentUser.userId).subscribe({
          next: c => this.cart = c,
          error: () => {}
        });
        this.paymentSvc.getWalletBalance(this.auth.currentUser.userId).subscribe({
          next: b => this.walletBalance = b,
          error: () => {}
        });
      }
    }
    getFinalAmount() {
      if (!this.cart) return 0;
      return this.cart.totalPrice - (this.cart.discount || 0) + Math.round(this.cart.totalPrice * 0.05);
    }
    placeOrder() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
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
      this.orderSvc.placeOrder(payload).subscribe({
        next: order => {
          this.paymentSvc.processPayment({
            orderId: order.orderId,
            customerId: this.auth.currentUser.userId,
            amount: finalAmount,
            mode: this.selectedMode
          }).subscribe({
            next: () => {
              this.cartState.clear();
              this.toast.success('Order placed successfully! 🎉');
              this.router.navigate(['/orders', order.orderId, 'track']);
            },
            error: err => {
              this.loading = false;
              this.toast.error(err?.error?.message || 'Order placed, but payment failed');
              this.router.navigate(['/orders', order.orderId, 'track']);
            }
          });
        },
        error: err => {
          this.loading = false;
          this.toast.error(err?.error?.message || 'Failed to place order');
        }
      });
    }
    get addr() {
      return this.form.get('deliveryAddress');
    }
    static {
      this.ɵfac = function CheckoutComponent_Factory(t) {
        return new (t || CheckoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.CartService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.PaymentService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__.CartStateService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: CheckoutComponent,
        selectors: [["app-checkout"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 45,
        vars: 10,
        consts: [[1, "page-header"], [1, "container"], [1, "container", "checkout-page"], [1, "checkout-layout"], [1, "checkout-form-panel"], [1, "card", "checkout-section"], [1, "card-header"], [1, "card-body"], [3, "formGroup"], [1, "form-group"], [1, "form-label"], ["formControlName", "deliveryAddress", "rows", "3", "placeholder", "Flat no, Building, Street, Area, City, Pincode", 1, "form-control"], ["class", "form-error", 4, "ngIf"], ["formControlName", "specialInstructions", "type", "text", "placeholder", "E.g. Ring doorbell, leave at gate...", 1, "form-control"], [1, "payment-methods"], ["class", "payment-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["class", "wallet-balance-card", 4, "ngIf"], [1, "checkout-summary"], [1, "card"], [2, "margin-bottom", "20px"], [4, "ngIf"], [1, "btn", "btn-primary", "btn-lg", "w-full", 2, "margin-top", "20px", 3, "click", "disabled"], ["class", "spinner", "style", "width:20px;height:20px;border-width:2px", 4, "ngIf"], [1, "secure-note"], [1, "form-error"], [1, "payment-option", 3, "click"], [1, "pm-icon"], [1, "pm-info"], [1, "pm-name"], [1, "pm-desc"], [1, "pm-radio"], [1, "wallet-balance-card"], ["class", "text-error text-sm", 4, "ngIf"], [1, "text-error", "text-sm"], ["class", "order-item-row", 4, "ngFor", "ngForOf"], [1, "divider"], [1, "summary-row"], ["class", "summary-row", 4, "ngIf"], [1, "text-success"], [1, "summary-row", "total-row"], [1, "order-item-row"], [1, "spinner", 2, "width", "20px", "height", "20px", "border-width", "2px"]],
        template: function CheckoutComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Checkout \uD83D\uDCB3");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Almost there! Review and place your order.");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 2)(7, "div", 3)(8, "div", 4)(9, "div", 5)(10, "div", 6)(11, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\uD83D\uDCCD Delivery Address");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 7)(14, "form", 8)(15, "div", 9)(16, "label", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Full Delivery Address");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "textarea", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, CheckoutComponent_span_19_Template, 2, 0, "span", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 9)(21, "label", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Special Instructions (optional)");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "input", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 5)(25, "div", 6)(26, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "\uD83D\uDCB0 Payment Method");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 7)(29, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, CheckoutComponent_div_30_Template, 9, 7, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, CheckoutComponent_div_31_Template, 8, 5, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 17)(33, "div", 18)(34, "div", 7)(35, "h3", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Order Summary");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, CheckoutComponent_div_37_Template, 27, 11, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "button", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CheckoutComponent_Template_button_click_38_listener() {
              return ctx.placeOrder();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, CheckoutComponent_span_39_Template, 2, 0, "span", 20)(40, CheckoutComponent_span_40_Template, 1, 0, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "p", 23)(42, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "\uD83D\uDD12");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, " 100% secure payment. Your data is encrypted.");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("error", ctx.addr.invalid && ctx.addr.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.addr.invalid && ctx.addr.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.paymentMethods);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.selectedMode === "WALLET");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.cart);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.loading || ctx.form.invalid);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DecimalPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName],
        styles: [".checkout-page[_ngcontent-%COMP%]{padding:32px 0 64px;}\n.checkout-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;\n  @media(max-width:1024px){grid-template-columns:1fr;}}\n.checkout-section[_ngcontent-%COMP%]{margin-bottom:16px;}\n.payment-methods[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;}\n.payment-option[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:14px;border:1.5px solid var(--border-color);border-radius:var(--border-radius-md);cursor:pointer;transition:all var(--transition-fast);\n  &.selected{border-color:var(--brand-primary);background:rgba(255,75,43,.05);}\n  &:hover:not(.selected){border-color:var(--text-muted);}\n}\n.pm-icon[_ngcontent-%COMP%]{font-size:1.4rem;flex-shrink:0;}\n.pm-info[_ngcontent-%COMP%]{flex:1;}\n.pm-name[_ngcontent-%COMP%]{font-weight:600;font-size:.9rem;}\n.pm-desc[_ngcontent-%COMP%]{font-size:.78rem;color:var(--text-muted);}\n.pm-radio[_ngcontent-%COMP%]{width:18px;height:18px;border-radius:50%;border:2px solid var(--border-color);position:relative;flex-shrink:0;\n  &.active{border-color:var(--brand-primary);&::after{content:'';position:absolute;top:3px;left:3px;width:8px;height:8px;border-radius:50%;background:var(--brand-primary);}}\n}\n.wallet-balance-card[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:var(--border-radius-md);padding:14px;margin-top:12px;\n  p{margin:4px 0 0;}\n}\n.order-item-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:.875rem;padding:5px 0;color:var(--text-secondary);}\n.summary-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:.9rem;padding:6px 0;}\n.total-row[_ngcontent-%COMP%]{font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--text-primary);}\n.secure-note[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:.78rem;color:var(--text-muted);text-align:center;justify-content:center;margin-top:12px;}\n.w-full[_ngcontent-%COMP%]{width:100%;}"]
      });
    }
  }
  return CheckoutComponent;
})();

/***/ })

}]);