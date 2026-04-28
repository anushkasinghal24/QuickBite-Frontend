"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[806],{

/***/ 3806:
/*!*******************************************************************!*\
  !*** ./src/app/features/notifications/notifications.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationsComponent: () => (/* binding */ NotificationsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/api.services */ 9439);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/ui.services */ 8749);






function NotificationsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 10)(1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDD14");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Notifications unavailable");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
function NotificationsComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NotificationsComponent_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.markAllRead());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u2705 Mark all read");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function NotificationsComponent_div_11_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 23);
  }
}
function NotificationsComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NotificationsComponent_div_11_div_1_Template_div_click_0_listener() {
      const n_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.markRead(n_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 18)(4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, NotificationsComponent_div_11_div_1_div_11_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const n_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("unread", !n_r4.isRead);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r0.getNotifClass(n_r4.type));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.getNotifIcon(n_r4.type));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](n_r4.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](n_r4.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](10, 8, n_r4.sentAt, "medium"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !n_r4.isRead);
  }
}
function NotificationsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, NotificationsComponent_div_11_div_1_Template, 12, 11, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.notifications);
  }
}
function NotificationsComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 24)(1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83D\uDD14");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "No notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "You're all caught up! Notifications about your orders will appear here.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
let NotificationsComponent = /*#__PURE__*/(() => {
  class NotificationsComponent {
    get unreadCount() {
      return this.notifications.filter(n => !n.isRead).length;
    }
    constructor(svc, auth, toast) {
      this.svc = svc;
      this.auth = auth;
      this.toast = toast;
      this.notifications = [];
      this.loading = true;
      this.errorMessage = '';
    }
    ngOnInit() {
      if (this.auth.currentUser) {
        this.svc.getByRecipient(this.auth.currentUser.userId).subscribe({
          next: n => {
            this.notifications = n.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
            this.loading = false;
            this.errorMessage = '';
          },
          error: () => {
            this.notifications = [];
            this.loading = false;
            this.errorMessage = 'Notifications are temporarily unavailable.';
          }
        });
      }
    }
    markRead(n) {
      if (n.isRead) return;
      n.isRead = true;
      this.svc.markRead(n.notificationId).subscribe({
        error: () => {}
      });
    }
    markAllRead() {
      if (!this.auth.currentUser) return;
      this.notifications.forEach(n => n.isRead = true);
      this.svc.markAllRead(this.auth.currentUser.userId).subscribe({
        next: () => this.toast.success('All notifications marked as read'),
        error: () => {}
      });
    }
    getNotifIcon(type) {
      return {
        ORDER: '📦',
        PAYMENT: '💳',
        PROMO: '🎁',
        DELIVERY: '🛵'
      }[type] || '🔔';
    }
    getNotifClass(type) {
      return type.toLowerCase();
    }
    static {
      this.ɵfac = function NotificationsComponent_Factory(t) {
        return new (t || NotificationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_2__.ToastService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: NotificationsComponent,
        selectors: [["app-notifications"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 14,
        vars: 6,
        consts: [["noNotif", ""], [1, "page-header"], [1, "container"], [1, "container", 2, "padding", "32px 0 64px"], [2, "max-width", "680px", "margin", "0 auto"], ["class", "empty-state", "style", "margin-bottom:20px", 4, "ngIf"], [1, "flex", "justify-between", "items-center", 2, "margin-bottom", "20px"], [1, "text-muted"], ["class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], [4, "ngIf", "ngIfElse"], [1, "empty-state", 2, "margin-bottom", "20px"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-desc"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["class", "notif-item card animate-fadeInUp", 3, "unread", "click", 4, "ngFor", "ngForOf"], [1, "notif-item", "card", "animate-fadeInUp", 3, "click"], [1, "notif-icon", 3, "ngClass"], [1, "notif-body"], [1, "notif-title"], [1, "notif-msg"], [1, "notif-time", "text-xs", "text-muted"], ["class", "unread-dot", 4, "ngIf"], [1, "unread-dot"], [1, "empty-state", 2, "padding", "80px 0"]],
        template: function NotificationsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Notifications \uD83D\uDD14");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 3)(5, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, NotificationsComponent_div_6_Template, 7, 1, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6)(8, "p", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, NotificationsComponent_button_10_Template, 2, 0, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, NotificationsComponent_div_11_Template, 2, 1, "div", 9)(12, NotificationsComponent_ng_template_12_Template, 7, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          }
          if (rf & 2) {
            const noNotif_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.errorMessage);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx.unreadCount, " unread notification", ctx.unreadCount !== 1 ? "s" : "", "");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.unreadCount);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.notifications.length)("ngIfElse", noNotif_r5);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe],
        styles: [".notif-item[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all var(--transition-fast);border-radius:var(--border-radius-md);border:1px solid var(--border-color);background:var(--bg-card);\n  &.unread{background:rgba(255,75,43,.03);border-color:rgba(255,75,43,.2);}\n  &:hover{box-shadow:var(--shadow-sm);}\n}\n.notif-icon[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;\n  &.order{background:rgba(59,130,246,.1);}\n  &.payment{background:rgba(34,197,94,.1);}\n  &.promo{background:rgba(255,167,38,.1);}\n  &.delivery{background:rgba(255,75,43,.1);}\n}\n.notif-body[_ngcontent-%COMP%]{flex:1;}\n.notif-title[_ngcontent-%COMP%]{font-weight:600;font-size:.9rem;margin-bottom:3px;}\n.notif-msg[_ngcontent-%COMP%]{font-size:.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:5px;}\n.unread-dot[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;background:var(--brand-primary);flex-shrink:0;margin-top:4px;}"]
      });
    }
  }
  return NotificationsComponent;
})();

/***/ })

}]);