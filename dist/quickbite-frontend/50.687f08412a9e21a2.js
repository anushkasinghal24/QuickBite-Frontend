"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[50],{

/***/ 6050:
/*!*****************************************************************************!*\
  !*** ./src/app/features/admin/admin-analytics/admin-analytics.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminAnalyticsComponent: () => (/* binding */ AdminAnalyticsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 7468);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 7673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 9437);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/api.services */ 9439);










function AdminAnalyticsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 16)(1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Analytics unavailable");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
function AdminAnalyticsComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 20)(1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const metric_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](metric_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](metric_r2.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](metric_r2.note);
  }
}
function AdminAnalyticsComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 24)(1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](row_r3.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", row_r3.percent, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](row_r3.count);
  }
}
let AdminAnalyticsComponent = /*#__PURE__*/(() => {
  class AdminAnalyticsComponent {
    constructor(auth, restaurantsSvc, ordersSvc, paymentsSvc, deliverySvc) {
      this.auth = auth;
      this.restaurantsSvc = restaurantsSvc;
      this.ordersSvc = ordersSvc;
      this.paymentsSvc = paymentsSvc;
      this.deliverySvc = deliverySvc;
      this.startDate = '';
      this.endDate = '';
      this.errorMessage = '';
      this.users = [];
      this.restaurants = [];
      this.pendingRestaurants = 0;
      this.agents = [];
      this.pendingAgents = 0;
      this.verifiedAgents = 0;
      this.orders = [];
      this.payments = [];
      this.revenue = 0;
      this.metrics = [{
        label: 'Revenue',
        value: 'Rs. 0',
        note: 'Date range total'
      }, {
        label: 'Orders',
        value: 0,
        note: 'Orders in range'
      }, {
        label: 'Customers',
        value: 0,
        note: 'Registered customers'
      }, {
        label: 'Owners',
        value: 0,
        note: 'Restaurant owners'
      }];
      this.orderBreakdown = [];
    }
    ngOnInit() {
      const today = new Date();
      this.endDate = today.toISOString().slice(0, 10);
      this.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
      this.loadAnalytics();
    }
    loadAnalytics() {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)({
        users: this.auth.getAllUsers().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        restaurants: this.restaurantsSvc.getAllPaged(0, 100).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        pendingRestaurants: this.restaurantsSvc.getPending().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        agents: this.deliverySvc.getAll().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        pendingAgents: this.deliverySvc.getByStatus('PENDING').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        orders: this.ordersSvc.getAll().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        payments: this.paymentsSvc.getAllPayments().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))),
        revenue: this.paymentsSvc.getRevenue(this.startDate, this.endDate).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(0)))
      }).subscribe({
        next: data => {
          this.users = data.users;
          this.restaurants = data.restaurants;
          this.pendingRestaurants = data.pendingRestaurants.length;
          this.agents = data.agents;
          this.pendingAgents = data.pendingAgents.length;
          this.verifiedAgents = data.agents.filter(agent => agent.isVerified).length;
          this.orders = data.orders;
          this.payments = data.payments;
          this.revenue = data.revenue;
          this.errorMessage = '';
          this.metrics = [{
            label: 'Revenue',
            value: `Rs. ${this.revenue.toFixed(2)}`,
            note: `${this.startDate} to ${this.endDate}`
          }, {
            label: 'Orders',
            value: this.orders.length,
            note: 'Orders in range'
          }, {
            label: 'Customers',
            value: this.users.filter(user => user.role === 'CUSTOMER').length,
            note: 'Registered customers'
          }, {
            label: 'Owners',
            value: this.users.filter(user => user.role === 'OWNER').length,
            note: 'Restaurant owners'
          }];
          const total = this.orders.length || 1;
          const statuses = ['PLACED', 'CONFIRMED', 'PREPARING', 'PICKED_UP', 'DELIVERED', 'CANCELLED'];
          this.orderBreakdown = statuses.map(status => {
            const count = this.orders.filter(order => order.orderStatus === status).length;
            return {
              label: status,
              count,
              percent: Math.round(count / total * 100)
            };
          });
        },
        error: () => {
          this.errorMessage = 'Analytics service data could not be collected.';
        }
      });
    }
    static {
      this.ɵfac = function AdminAnalyticsComponent_Factory(t) {
        return new (t || AdminAnalyticsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_1__.RestaurantService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_1__.OrderService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_1__.PaymentService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_1__.DeliveryService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: AdminAnalyticsComponent,
        selectors: [["app-admin-analytics"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
        decls: 53,
        vars: 10,
        consts: [[1, "page-header"], [1, "container"], [1, "container", 2, "padding", "32px 0 64px"], [1, "card", "controls"], ["type", "date", 1, "input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], ["routerLink", "/admin", 1, "btn", "btn-ghost"], ["class", "empty-state", "style", "margin-bottom:20px", 4, "ngIf"], [1, "grid", "summary-grid", 2, "margin-bottom", "24px"], ["class", "card metric", 4, "ngFor", "ngForOf"], [1, "grid", "two-up"], [1, "card", "panel"], [1, "stack"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "health-list"], [1, "health-row"], [1, "empty-state", 2, "margin-bottom", "20px"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-desc"], [1, "card", "metric"], [1, "metric-label"], [1, "metric-value"], [1, "metric-note"], [1, "bar-row"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill"], [1, "bar-value"]],
        template: function AdminAnalyticsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Platform Analytics");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Revenue, orders, users, and operational health");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 2)(7, "div", 3)(8, "div")(9, "label");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Start date");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AdminAnalyticsComponent_Template_input_ngModelChange_11_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.startDate, $event) || (ctx.startDate = $event);
              return $event;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div")(13, "label");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "End date");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "input", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AdminAnalyticsComponent_Template_input_ngModelChange_15_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.endDate, $event) || (ctx.endDate = $event);
              return $event;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminAnalyticsComponent_Template_button_click_16_listener() {
              return ctx.loadAnalytics();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Refresh");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "a", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Back to dashboard");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, AdminAnalyticsComponent_div_20_Template, 7, 1, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, AdminAnalyticsComponent_div_22_Template, 7, 3, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 10)(24, "div", 11)(25, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Order status breakdown");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, AdminAnalyticsComponent_div_28_Template, 7, 4, "div", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 11)(30, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Platform health");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 14)(33, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Approved restaurants ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "strong");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Pending approvals ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "strong");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Verified agents ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "strong");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Pending agents ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "strong");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, "Recent payments ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "strong");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.startDate);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.endDate);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.metrics);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.orderBreakdown);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.restaurants.length);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.pendingRestaurants);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.verifiedAgents);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.pendingAgents);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.payments.length);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink],
        styles: [".controls[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(160px,1fr)) auto auto;gap:14px;align-items:end;padding:18px;margin-bottom:20px}\n.controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:6px}\n.summary-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}\n.metric[_ngcontent-%COMP%]{padding:18px}\n.metric-label[_ngcontent-%COMP%]{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px}\n.metric-value[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:800}\n.metric-note[_ngcontent-%COMP%]{font-size:.82rem;color:var(--text-muted);margin-top:6px}\n.two-up[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}\n.panel[_ngcontent-%COMP%]{padding:20px}\n.stack[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-top:14px}\n.bar-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:120px 1fr 48px;gap:10px;align-items:center}\n.bar-label[_ngcontent-%COMP%]{font-size:.9rem;font-weight:600}\n.bar-track[_ngcontent-%COMP%]{height:12px;background:rgba(100,116,139,.14);border-radius:999px;overflow:hidden}\n.bar-fill[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,var(--brand-primary),#ff8d56);border-radius:999px}\n.bar-value[_ngcontent-%COMP%]{text-align:right;font-weight:700}\n.health-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-top:14px}\n.health-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color);color:var(--text-muted)}\n.health-row[_ngcontent-%COMP%]:last-child{border-bottom:none;padding-bottom:0}"]
      });
    }
  }
  return AdminAnalyticsComponent;
})();

/***/ })

}]);