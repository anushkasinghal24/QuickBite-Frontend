"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[604],{

/***/ 2604:
/*!************************************************************************!*\
  !*** ./src/app/features/orders/order-detail/order-detail.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderDetailComponent: () => (/* binding */ OrderDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/api.services */ 9439);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/ui.services */ 8749);








const _c0 = () => ["PLACED", "CONFIRMED", "PREPARING", "PICKED_UP"];
const _c1 = a0 => ["/orders", a0, "track"];
function OrderDetailComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderDetailComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDCE6");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Order unavailable");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
function OrderDetailComponent_div_7_div_9_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Completed");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderDetailComponent_div_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 37)(1, "div", 38)(2, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div")(5, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, OrderDetailComponent_div_7_div_9_div_7_Template, 2, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("completed", ctx_r0.isCompleted(step_r2.status))("active", ctx_r0.order.orderStatus === step_r2.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](step_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](step_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.isCompleted(step_r2.status));
  }
}
function OrderDetailComponent_div_7_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 43)(1, "div", 44)(2, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", item_r3.quantity, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", item_r3.price * item_r3.quantity, "");
  }
}
function OrderDetailComponent_div_7_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26)(1, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Discount");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u2212\u20B9", ctx_r0.order.discount, "");
  }
}
function OrderDetailComponent_div_7_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Delivery Agent");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.order.agentName);
  }
}
function OrderDetailComponent_div_7_a_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " \uD83D\uDCCD Track Live ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c1, ctx_r0.order.orderId));
  }
}
function OrderDetailComponent_div_7_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function OrderDetailComponent_div_7_button_51_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.openReview());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u2B50 Rate Order");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderDetailComponent_div_7_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function OrderDetailComponent_div_7_button_52_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.cancelOrder());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Cancel Order");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderDetailComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12)(1, "div", 13)(2, "div", 14)(3, "div", 15)(4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, OrderDetailComponent_div_7_div_9_Template, 8, 7, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 19)(11, "div", 20)(12, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "\uD83C\uDF7D\uFE0F Order Items");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, OrderDetailComponent_div_7_div_15_Template, 8, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 23)(17, "div", 24)(18, "div", 21)(19, "h4", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "\uD83D\uDCB0 Payment Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 26)(22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Mode");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 26)(27, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Subtotal");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, OrderDetailComponent_div_7_div_31_Template, 5, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 30)(34, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Total Paid");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 24)(39, "div", 21)(40, "h4", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "\uD83D\uDCCD Delivery Info");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "div", 26)(43, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "p", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](47, OrderDetailComponent_div_7_div_47_Template, 5, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 32)(49, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](50, OrderDetailComponent_div_7_a_50_Template, 2, 3, "a", 34)(51, OrderDetailComponent_div_7_button_51_Template, 2, 0, "button", 35)(52, OrderDetailComponent_div_7_button_52_Template, 2, 0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Order #", ctx_r0.order.orderId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r0.getStatusClass(ctx_r0.order.orderStatus));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.order.orderStatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.timelineSteps);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.order.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.order.modeOfPayment);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", ctx_r0.order.totalAmount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.order.discount);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u20B9", ctx_r0.order.finalAmount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.order.deliveryAddress);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.order.agentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](14, _c0).includes(ctx_r0.order.orderStatus));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.order.orderStatus === "DELIVERED" && !ctx_r0.hasReview);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.order.orderStatus === "PLACED");
  }
}
let OrderDetailComponent = /*#__PURE__*/(() => {
  class OrderDetailComponent {
    constructor(route, orderSvc, reviewSvc, auth, toast) {
      this.route = route;
      this.orderSvc = orderSvc;
      this.reviewSvc = reviewSvc;
      this.auth = auth;
      this.toast = toast;
      this.order = null;
      this.loading = true;
      this.errorMessage = '';
      this.hasReview = false;
      this.timelineSteps = [{
        status: 'PLACED',
        icon: '🕐',
        label: 'Order Placed'
      }, {
        status: 'CONFIRMED',
        icon: '✅',
        label: 'Confirmed by Restaurant'
      }, {
        status: 'PREPARING',
        icon: '👨‍🍳',
        label: 'Preparing your food'
      }, {
        status: 'PICKED_UP',
        icon: '🛵',
        label: 'Picked up by agent'
      }, {
        status: 'DELIVERED',
        icon: '🏠',
        label: 'Delivered!'
      }];
      this.statusOrder = ['PLACED', 'CONFIRMED', 'PREPARING', 'PICKED_UP', 'DELIVERED'];
    }
    ngOnInit() {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.orderSvc.getById(id).subscribe({
        next: o => {
          this.order = o;
          this.loading = false;
          this.errorMessage = '';
          this.loadReviewState(o.orderId);
        },
        error: () => {
          this.order = null;
          this.loading = false;
          this.errorMessage = 'Order details are temporarily unavailable.';
        }
      });
    }
    loadReviewState(orderId) {
      this.reviewSvc.getByOrder(orderId).subscribe({
        next: () => this.hasReview = true,
        error: () => this.hasReview = false
      });
    }
    isCompleted(status) {
      if (!this.order) return false;
      const idx = this.statusOrder.indexOf(status);
      const cur = this.statusOrder.indexOf(this.order.orderStatus);
      return idx < cur;
    }
    getStatusClass(s) {
      return {
        PLACED: 'badge-info',
        CONFIRMED: 'badge-brand',
        PREPARING: 'badge-warning',
        PICKED_UP: 'badge-warning',
        DELIVERED: 'badge-success',
        CANCELLED: 'badge-error'
      }[s] || 'badge-neutral';
    }
    cancelOrder() {
      if (!this.order) return;
      this.orderSvc.cancelOrder(this.order.orderId).subscribe({
        next: () => {
          this.order.orderStatus = 'CANCELLED';
          this.toast.success('Order cancelled');
        },
        error: () => this.toast.error('Failed to cancel')
      });
    }
    openReview() {
      if (!this.order || this.order.orderStatus !== 'DELIVERED') return;
      if (this.hasReview) {
        this.toast.info('You have already submitted a review for this order.');
        return;
      }
      const foodRating = Number(window.prompt('Rate the food from 1 to 5:', '5'));
      if (!Number.isInteger(foodRating) || foodRating < 1 || foodRating > 5) {
        this.toast.error('Please enter a food rating between 1 and 5.');
        return;
      }
      const deliveryRatingInput = this.order.deliveryAgentId ? window.prompt('Rate the delivery from 1 to 5 (optional):', '5') : null;
      let parsedDeliveryRating;
      if (deliveryRatingInput !== null) {
        parsedDeliveryRating = Number(deliveryRatingInput);
        if (!Number.isInteger(parsedDeliveryRating) || parsedDeliveryRating < 1 || parsedDeliveryRating > 5) {
          this.toast.error('Please enter a delivery rating between 1 and 5.');
          return;
        }
      }
      const comment = window.prompt('Add a short comment (optional):', '') || undefined;
      const payload = {
        orderId: this.order.orderId,
        restaurantId: this.order.restaurantId,
        agentId: this.order.deliveryAgentId,
        foodRating,
        deliveryRating: parsedDeliveryRating,
        comment
      };
      this.reviewSvc.addReview(payload).subscribe({
        next: () => {
          this.hasReview = true;
          this.toast.success('Review submitted successfully.');
        },
        error: err => this.toast.error(err?.error?.message || 'Failed to submit review')
      });
    }
    static {
      this.ɵfac = function OrderDetailComponent_Factory(t) {
        return new (t || OrderDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.ReviewService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__.ToastService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: OrderDetailComponent,
        selectors: [["app-order-detail"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 8,
        vars: 3,
        consts: [[1, "page-header"], [1, "container"], [1, "container", 2, "padding", "32px 0 64px"], ["class", "flex justify-center", "style", "padding:60px", 4, "ngIf"], ["class", "empty-state", "style", "padding:80px 0", 4, "ngIf"], ["class", "order-detail-layout", 4, "ngIf"], [1, "flex", "justify-center", 2, "padding", "60px"], [1, "spinner"], [1, "empty-state", 2, "padding", "80px 0"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-desc"], [1, "order-detail-layout"], [1, "order-main"], [1, "card", 2, "padding", "var(--space-lg)"], [1, "flex", "justify-between", "items-center", 2, "margin-bottom", "24px", "flex-wrap", "wrap", "gap", "8px"], [1, "badge", 3, "ngClass"], [1, "order-timeline"], ["class", "timeline-item", 3, "completed", "active", 4, "ngFor", "ngForOf"], [1, "card", 2, "margin-top", "16px"], [1, "card-header"], [1, "card-body"], ["class", "order-item-row", 4, "ngFor", "ngForOf"], [1, "order-sidebar"], [1, "card", 2, "margin-bottom", "16px"], [2, "margin-bottom", "16px"], [1, "detail-row"], [1, "badge", "badge-info"], ["class", "detail-row", 4, "ngIf"], [1, "divider"], [1, "detail-row", "total"], [2, "font-size", ".875rem", "margin", "4px 0 12px"], [1, "card"], [1, "card-body", 2, "display", "flex", "flex-direction", "column", "gap", "10px"], ["class", "btn btn-primary", 3, "routerLink", 4, "ngIf"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], ["class", "btn btn-danger btn-sm", 3, "click", 4, "ngIf"], [1, "timeline-item"], [1, "tl-content"], [1, "tl-icon"], [1, "tl-title"], ["class", "tl-time text-xs text-muted", 4, "ngIf"], [1, "tl-time", "text-xs", "text-muted"], [1, "order-item-row"], [1, "flex", "items-center", "gap-md"], [1, "item-qty-badge"], [1, "price"], [1, "text-success"], [1, "btn", "btn-primary", 3, "routerLink"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-danger", "btn-sm", 3, "click"]],
        template: function OrderDetailComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Order Details \uD83D\uDCCB");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, OrderDetailComponent_div_5_Template, 2, 0, "div", 3)(6, OrderDetailComponent_div_6_Template, 7, 1, "div", 4)(7, OrderDetailComponent_div_7_Template, 53, 15, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.errorMessage);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.order);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
        styles: [".order-detail-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start;\n  @media(max-width:1024px){grid-template-columns:1fr;}}\n.order-timeline[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:0;}\n.timeline-item[_ngcontent-%COMP%]{display:flex;position:relative;padding-left:40px;padding-bottom:20px;\n  &:last-child{padding-bottom:0;}\n  &::before{content:'';position:absolute;left:15px;top:20px;width:2px;bottom:0;background:var(--border-color);}\n  &:last-child::before{display:none;}\n  &.completed::before{background:var(--success);}\n  &.active::before{background:var(--brand-primary);}\n}\n.tl-content[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;position:relative;\n  &::before{content:'';position:absolute;left:-29px;width:14px;height:14px;border-radius:50%;background:var(--bg-base);border:2px solid var(--border-color);z-index:1;}\n}\n.timeline-item.completed[_ngcontent-%COMP%]   .tl-content[_ngcontent-%COMP%]::before{background:var(--success);border-color:var(--success);}\n.timeline-item.active[_ngcontent-%COMP%]   .tl-content[_ngcontent-%COMP%]::before{background:var(--brand-primary);border-color:var(--brand-primary);}\n.tl-icon[_ngcontent-%COMP%]{font-size:1.3rem;}\n.tl-title[_ngcontent-%COMP%]{font-weight:600;font-size:.9rem;}\n.order-item-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-color);&:last-child{border:none;}}\n.item-qty-badge[_ngcontent-%COMP%]{background:var(--bg-input);border-radius:4px;padding:2px 8px;font-size:.8rem;font-weight:700;}\n.detail-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:.875rem;padding:5px 0;color:var(--text-secondary);&.total{font-weight:700;color:var(--text-primary);font-family:var(--font-display);}}"]
      });
    }
  }
  return OrderDetailComponent;
})();

/***/ })

}]);