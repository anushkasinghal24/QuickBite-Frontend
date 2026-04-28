"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[865],{

/***/ 9865:
/*!****************************************************************************!*\
  !*** ./src/app/features/auth/oauth2-callback/oauth2-callback.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuth2CallbackComponent: () => (/* binding */ OAuth2CallbackComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);





function OAuth2CallbackComponent_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.message);
  }
}
function OAuth2CallbackComponent_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
function OAuth2CallbackComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 7);
  }
}
let OAuth2CallbackComponent = /*#__PURE__*/(() => {
  class OAuth2CallbackComponent {
    constructor(route, router, auth) {
      this.route = route;
      this.router = router;
      this.auth = auth;
      this.loading = true;
      this.message = 'We are signing you in safely.';
      this.error = '';
    }
    ngOnInit() {
      const token = this.route.snapshot.queryParamMap.get('token');
      const refresh = this.route.snapshot.queryParamMap.get('refresh');
      if (!token) {
        this.fail('Missing login token. Please try again.');
        return;
      }
      this.auth.setTokens(token, refresh);
      this.auth.getProfile().subscribe({
        next: user => {
          this.loading = false;
          this.router.navigate([this.routeForRole(user.role)]);
        },
        error: () => this.fail('Could not finish sign in. Please log in again.')
      });
    }
    fail(message) {
      this.loading = false;
      this.error = message;
      window.setTimeout(() => this.router.navigate(['/login']), 1800);
    }
    routeForRole(role) {
      const routes = {
        ADMIN: '/admin',
        OWNER: '/owner',
        AGENT: '/agent',
        CUSTOMER: '/home'
      };
      return routes[role] || '/home';
    }
    static {
      this.ɵfac = function OAuth2CallbackComponent_Factory(t) {
        return new (t || OAuth2CallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: OAuth2CallbackComponent,
        selectors: [["app-oauth2-callback"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 9,
        vars: 3,
        consts: [[1, "oauth-callback"], [1, "card"], [1, "eyebrow"], [4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "error"], [1, "spinner"]],
        template: function OAuth2CallbackComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "p", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "QuickBite");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Completing sign in");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OAuth2CallbackComponent_p_6_Template, 2, 1, "p", 3)(7, OAuth2CallbackComponent_p_7_Template, 2, 1, "p", 4)(8, OAuth2CallbackComponent_div_8_Template, 1, 0, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.error);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf],
        styles: ["[_nghost-%COMP%] {\n      display: block;\n      min-height: 100vh;\n      background: linear-gradient(135deg, #fff7f0 0%, #fff 55%, #ffe3d7 100%);\n      color: #1f2937;\n      font-family: inherit;\n    }\n    .oauth-callback[_ngcontent-%COMP%] {\n      min-height: 100vh;\n      display: grid;\n      place-items: center;\n      padding: 24px;\n    }\n    .card[_ngcontent-%COMP%] {\n      width: min(100%, 440px);\n      border-radius: 24px;\n      padding: 32px;\n      background: rgba(255, 255, 255, 0.88);\n      box-shadow: 0 24px 80px rgba(255, 76, 43, 0.18);\n      border: 1px solid rgba(255, 76, 43, 0.12);\n      backdrop-filter: blur(14px);\n      text-align: center;\n    }\n    .eyebrow[_ngcontent-%COMP%] {\n      margin: 0 0 8px;\n      letter-spacing: 0.18em;\n      text-transform: uppercase;\n      font-size: 0.75rem;\n      color: #ff4b2b;\n      font-weight: 700;\n    }\n    h1[_ngcontent-%COMP%] {\n      margin: 0 0 12px;\n      font-size: 2rem;\n      line-height: 1.1;\n    }\n    p[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #4b5563;\n    }\n    .error[_ngcontent-%COMP%] {\n      color: #b91c1c;\n    }\n    .spinner[_ngcontent-%COMP%] {\n      width: 42px;\n      height: 42px;\n      margin: 24px auto 0;\n      border-radius: 50%;\n      border: 4px solid rgba(255, 75, 43, 0.15);\n      border-top-color: #ff4b2b;\n      animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n    }\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }"]
      });
    }
  }
  return OAuth2CallbackComponent;
})();

/***/ })

}]);