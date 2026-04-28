"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[235],{

/***/ 7235:
/*!*************************************************************!*\
  !*** ./src/app/features/payment/wallet/wallet.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletComponent: () => (/* binding */ WalletComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/api.services */ 9439);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/ui.services */ 8749);








const _c0 = () => [100, 200, 500, 1000];
function WalletComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 25)(1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDCB3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Wallet unavailable");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.errorMessage);
  }
}
function WalletComponent_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WalletComponent_button_27_Template_button_click_0_listener() {
      const a_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.addAmount = a_r4);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const a_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.addAmount === a_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", a_r4, "");
  }
}
function WalletComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Add Money");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function WalletComponent_span_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 30);
  }
}
function WalletComponent_div_37_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 34)(4, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("credit", s_r5.type === "CREDIT")("debit", s_r5.type === "DEBIT");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", s_r5.type === "CREDIT" ? "\u2B06\uFE0F" : "\u2B07\uFE0F", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](s_r5.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](8, 13, s_r5.createdAt, "medium"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("credit", s_r5.type === "CREDIT")("debit", s_r5.type === "DEBIT");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", s_r5.type === "CREDIT" ? "+" : "-", "\u20B9", s_r5.amount, " ");
  }
}
function WalletComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, WalletComponent_div_37_div_1_Template, 11, 16, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.statements);
  }
}
function WalletComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 38)(1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDCED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No transactions yet");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Add money to your wallet to get started.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
let WalletComponent = /*#__PURE__*/(() => {
  class WalletComponent {
    constructor(paymentSvc, auth, toast) {
      this.paymentSvc = paymentSvc;
      this.auth = auth;
      this.toast = toast;
      this.balance = 0;
      this.statements = [];
      this.addAmount = null;
      this.loading = false;
      this.errorMessage = '';
    }
    ngOnInit() {
      if (this.auth.currentUser) {
        this.paymentSvc.getWalletBalance(this.auth.currentUser.userId).subscribe({
          next: b => {
            this.balance = b;
            this.errorMessage = '';
          },
          error: () => {
            this.balance = 0;
            this.errorMessage = 'Wallet details are temporarily unavailable.';
          }
        });
        this.paymentSvc.getWalletStatements(this.auth.currentUser.userId).subscribe({
          next: s => this.statements = s,
          error: () => {
            this.statements = [];
          }
        });
      }
    }
    addMoney() {
      if (!this.addAmount || !this.auth.currentUser) return;
      this.loading = true;
      this.paymentSvc.addToWallet(this.auth.currentUser.userId, this.addAmount).subscribe({
        next: w => {
          this.balance = w.balance;
          this.toast.success(`₹${this.addAmount} added to wallet! 💳`);
          this.addAmount = null;
          this.loading = false;
        },
        error: () => {
          this.toast.error('Failed to add money');
          this.loading = false;
        }
      });
    }
    static {
      this.ɵfac = function WalletComponent_Factory(t) {
        return new (t || WalletComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.PaymentService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__.ToastService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: WalletComponent,
        selectors: [["app-wallet"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 40,
        vars: 13,
        consts: [["noTxn", ""], [1, "page-header"], [1, "container"], [1, "container", 2, "padding", "32px 0 64px"], [1, "wallet-layout"], ["class", "empty-state", "style", "margin-bottom:4px", 4, "ngIf"], [1, "balance-card", "animate-scaleIn"], [1, "balance-bg"], [1, "balance-content"], [1, "balance-label"], [1, "balance-amount"], [1, "balance-meta"], [1, "wallet-icon-bg"], [1, "card", "animate-fadeInUp", "delay-200"], [1, "card-header"], [1, "card-body"], [1, "quick-amounts"], ["class", "amount-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "flex", "gap-md", 2, "margin-top", "16px"], ["type", "number", "placeholder", "Custom amount", "min", "1", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner", "style", "width:16px;height:16px;border-width:2px", 4, "ngIf"], [1, "card", "animate-fadeInUp", "delay-300"], [4, "ngIf", "ngIfElse"], [1, "empty-state", 2, "margin-bottom", "4px"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-desc"], [1, "amount-chip", 3, "click"], [1, "spinner", 2, "width", "16px", "height", "16px", "border-width", "2px"], ["class", "txn-row", 4, "ngFor", "ngForOf"], [1, "txn-row"], [1, "txn-icon"], [1, "txn-info"], [1, "txn-desc"], [1, "txn-date", "text-xs", "text-muted"], [1, "txn-amount"], [1, "empty-state", 2, "padding", "40px"]],
        template: function WalletComponent_Template(rf, ctx) {
          if (rf & 1) {
            const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "My Wallet \uD83D\uDCB3");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Manage your QuickBite wallet balance");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 3)(7, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, WalletComponent_div_8_Template, 7, 1, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 8)(12, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Available Balance");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](16, "number");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "QuickBite Wallet \u00B7 Secure & Instant");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "\uD83D\uDCB3");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 13)(22, "div", 14)(23, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "\u2795 Add Money");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 15)(26, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, WalletComponent_button_27_Template, 2, 3, "button", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 18)(29, "input", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function WalletComponent_Template_input_ngModelChange_29_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
              _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.addAmount, $event) || (ctx.addAmount = $event);
              return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "button", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WalletComponent_Template_button_click_30_listener() {
              _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
              return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.addMoney());
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, WalletComponent_span_31_Template, 2, 0, "span", 21)(32, WalletComponent_span_32_Template, 1, 0, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 23)(34, "div", 14)(35, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "\uD83D\uDCDC Transaction History");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, WalletComponent_div_37_Template, 2, 1, "div", 24)(38, WalletComponent_ng_template_38_Template, 7, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          }
          if (rf & 2) {
            const noTxn_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](39);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.errorMessage);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](16, 9, ctx.balance, "1.2-2"), "");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](12, _c0));
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.addAmount);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.addAmount || ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.statements.length)("ngIfElse", noTxn_r6);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
        styles: [".wallet-layout[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px;max-width:600px;margin:0 auto;}\n.balance-card[_ngcontent-%COMP%]{background:var(--brand-gradient);border-radius:var(--border-radius-xl);padding:40px;color:white;position:relative;overflow:hidden;}\n.balance-bg[_ngcontent-%COMP%]{position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:rgba(255,255,255,.1);border-radius:50%;}\n.balance-content[_ngcontent-%COMP%]{position:relative;z-index:1;}\n.balance-label[_ngcontent-%COMP%]{font-size:.85rem;font-weight:600;opacity:.8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;}\n.balance-amount[_ngcontent-%COMP%]{font-family:var(--font-display);font-size:3rem;font-weight:800;color:white;line-height:1;margin-bottom:8px;}\n.balance-meta[_ngcontent-%COMP%]{font-size:.82rem;opacity:.7;}\n.wallet-icon-bg[_ngcontent-%COMP%]{position:absolute;bottom:-10px;right:30px;font-size:5rem;opacity:.15;z-index:0;}\n.quick-amounts[_ngcontent-%COMP%]{display:flex;gap:10px;flex-wrap:wrap;}\n.amount-chip[_ngcontent-%COMP%]{padding:8px 18px;border-radius:var(--border-radius-full);border:1.5px solid var(--border-color);background:var(--bg-input);font-weight:600;font-size:.875rem;cursor:pointer;transition:all var(--transition-fast);\n  &.active,&:hover{background:var(--brand-primary);border-color:var(--brand-primary);color:white;}}\n.txn-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:14px var(--space-lg);border-bottom:1px solid var(--border-color);&:last-child{border:none;}}\n.txn-icon[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;\n  &.credit{background:rgba(34,197,94,.1);}\n  &.debit{background:rgba(239,68,68,.1);}\n}\n.txn-info[_ngcontent-%COMP%]{flex:1;}\n.txn-desc[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500;}\n.txn-amount[_ngcontent-%COMP%]{font-weight:700;font-family:var(--font-display);&.credit{color:var(--success);}&.debit{color:var(--error);}}"]
      });
    }
  }
  return WalletComponent;
})();

/***/ })

}]);