"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[842],{

/***/ 461:
/*!********************************************************!*\
  !*** ./src/app/features/auth/login/login.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/ui.services */ 8749);









function LoginComponent_span_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.email.hasError("required") ? "Email is required" : "Invalid email address", " ");
  }
}
function LoginComponent_span_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.password.hasError("required") ? "Password is required" : "Min 6 characters", " ");
  }
}
function LoginComponent_span_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Sign In \uD83D\uDE80");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 34);
  }
}
let LoginComponent = /*#__PURE__*/(() => {
  class LoginComponent {
    constructor(fb, auth, toast, router) {
      this.fb = fb;
      this.auth = auth;
      this.toast = toast;
      this.router = router;
      this.loading = false;
      this.showPass = false;
      this.googleOAuthUrl = '/oauth2/authorization/google';
      this.githubOAuthUrl = '/oauth2/authorization/github';
      this.form = this.fb.group({
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]],
        password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)]]
      });
    }
    submit() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.loading = true;
      this.auth.login(this.form.value).subscribe({
        next: res => {
          this.toast.success(`Welcome back, ${res.user.fullName}! 🎉`);
          this.redirectByRole(res.user.role);
        },
        error: err => {
          this.loading = false;
          this.toast.error(err?.error?.message || 'Invalid credentials. Please try again.');
        }
      });
    }
    redirectByRole(role) {
      const routes = {
        ADMIN: '/admin',
        OWNER: '/owner',
        AGENT: '/agent',
        CUSTOMER: '/home'
      };
      this.router.navigate([routes[role] || '/home']);
    }
    get email() {
      return this.form.get('email');
    }
    get password() {
      return this.form.get('password');
    }
    static {
      this.ɵfac = function LoginComponent_Factory(t) {
        return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: LoginComponent,
        selectors: [["app-login"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
        decls: 82,
        vars: 14,
        consts: [[1, "auth-page"], [1, "auth-left"], [1, "auth-left-content"], [1, "brand-logo"], [1, "logo-text"], [1, "gradient-text"], [1, "auth-left-title"], [1, "auth-features"], [1, "af-item"], [1, "food-illustration"], [1, "auth-right"], [1, "auth-form-wrapper", "animate-fadeInUp"], [1, "auth-title"], [1, "auth-subtitle"], ["novalidate", "", 1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "form-label"], [1, "input-wrapper"], [1, "input-icon"], ["formControlName", "email", "type", "email", "placeholder", "you@example.com", 1, "form-control", "with-icon"], ["class", "form-error", 4, "ngIf"], ["formControlName", "password", "placeholder", "Enter your password", 1, "form-control", "with-icon", "with-icon-right", 3, "type"], ["type", "button", 1, "pass-toggle", 3, "click"], [1, "form-row-flex"], ["href", "#", 1, "forgot-link"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", "w-full", 3, "disabled"], [4, "ngIf"], ["class", "spinner", "style", "width:20px;height:20px;border-width:2px", 4, "ngIf"], [1, "divider-text"], [1, "oauth-btns"], [1, "oauth-btn", 3, "href"], [1, "auth-switch"], ["routerLink", "/register"], [1, "form-error"], [1, "spinner", 2, "width", "20px", "height", "20px", "border-width", "2px"]],
        template: function LoginComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\uD83C\uDF55");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Quick");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Bite");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "h2", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Order smarter.");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Eat better.");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Join thousands of food lovers who trust QuickBite for their daily cravings.");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 7)(17, "div", 8)(18, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "\u26A1");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, " Lightning fast delivery");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 8)(22, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "\uD83D\uDD12");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, " Safe & secure payments");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 8)(26, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "\uD83C\uDF7D\uFE0F");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, " 500+ top restaurants");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 8)(30, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "\uD83C\uDF81");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, " Exclusive deals daily");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "\uD83C\uDF55 \uD83C\uDF54 \uD83C\uDF63 \uD83C\uDF2E \uD83C\uDF5C");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 10)(36, "div", 11)(37, "h1", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Welcome back \uD83D\uDC4B");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Sign in to your QuickBite account");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "form", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_41_listener() {
              return ctx.submit();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 15)(43, "label", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Email Address");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 17)(46, "span", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "\uD83D\uDCE7");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](48, "input", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, LoginComponent_span_49_Template, 2, 1, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "div", 15)(51, "label", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "div", 17)(54, "span", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "\uD83D\uDD12");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](56, "input", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "button", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_57_listener() {
              return ctx.showPass = !ctx.showPass;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](58);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](59, LoginComponent_span_59_Template, 2, 1, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "div", 23)(61, "a", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](62, "Forgot password?");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "button", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](64, LoginComponent_span_64_Template, 2, 0, "span", 26)(65, LoginComponent_span_65_Template, 1, 0, "span", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "div", 28)(67, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](68, "or continue with");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "div", 29)(70, "a", 30)(71, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](72, "\uD83D\uDD35");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](73, " Google ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "a", 30)(75, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](76, "\u26AB");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](77, " GitHub ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "p", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](79, " Don't have an account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "a", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](81, "Create one \u2192");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](41);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.email.invalid && ctx.email.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.email.invalid && ctx.email.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.password.invalid && ctx.password.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.showPass ? "text" : "password");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.showPass ? "\uD83D\uDE48" : "\uD83D\uDC41\uFE0F", " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.password.invalid && ctx.password.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx.googleOAuthUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx.githubOAuthUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
        styles: [".auth-page[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n@media (max-width: 900px) {\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n.auth-left[_ngcontent-%COMP%] {\n  background: var(--brand-gradient);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px;\n  position: relative;\n  overflow: hidden;\n}\n.auth-left[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: -100px;\n  right: -100px;\n  width: 400px;\n  height: 400px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 50%;\n}\n.auth-left[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -80px;\n  left: -60px;\n  width: 300px;\n  height: 300px;\n  background: rgba(255, 255, 255, 0.06);\n  border-radius: 50%;\n}\n@media (max-width: 900px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n.auth-left-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  color: white;\n  max-width: 360px;\n}\n\n.brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 40px;\n}\n.brand-logo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-size: 2rem;\n}\n.brand-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: white;\n}\n.brand-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .gradient-text[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  -webkit-text-fill-color: rgba(255, 255, 255, 0.85);\n  background: none;\n}\n\n.auth-left-title[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 2.5rem;\n  font-weight: 800;\n  line-height: 1.1;\n  margin-bottom: 16px;\n  letter-spacing: -0.02em;\n}\n\n.auth-left-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 1rem;\n  margin-bottom: 40px;\n}\n\n.auth-features[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin-bottom: 48px;\n}\n\n.af-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.9);\n  font-weight: 500;\n}\n.af-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\n.food-illustration[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  letter-spacing: 8px;\n  opacity: 0.7;\n}\n\n\n\n.auth-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px var(--space-xl);\n  background: var(--bg-base);\n  overflow-y: auto;\n}\n\n.auth-form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n\n.auth-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 2rem;\n  font-weight: 800;\n  margin-bottom: 8px;\n  letter-spacing: -0.02em;\n}\n\n.auth-subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  margin-bottom: 36px;\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  font-size: 1rem;\n  z-index: 1;\n  pointer-events: none;\n}\n\n.form-control.with-icon[_ngcontent-%COMP%] {\n  padding-left: 44px;\n}\n\n.form-control.with-icon-right[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n\n.pass-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1rem;\n  padding: 4px;\n}\n\n.form-row-flex[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin: -4px 0 12px;\n}\n\n.forgot-link[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--brand-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.w-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.divider-text[_ngcontent-%COMP%] {\n  text-align: center;\n  position: relative;\n  margin: 20px 0;\n}\n.divider-text[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: var(--border-color);\n}\n.divider-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--bg-base);\n  padding: 0 16px;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n\n.oauth-btns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n\n.oauth-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 11px;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--border-radius-md);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  text-decoration: none;\n  transition: all var(--transition-fast);\n  background: var(--bg-surface);\n}\n.oauth-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--brand-primary);\n  background: rgba(255, 75, 43, 0.04);\n  color: var(--brand-primary);\n}\n\n.auth-switch[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  font-size: 0.875rem;\n  color: var(--text-muted);\n}\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--brand-primary);\n  font-weight: 600;\n}\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n\n\n.role-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n\n.role-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 16px 8px;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--border-radius-md);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  background: var(--bg-surface);\n}\n.role-card[_ngcontent-%COMP%]   .role-icon[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n}\n.role-card[_ngcontent-%COMP%]   .role-name[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.role-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--brand-primary);\n  background: rgba(255, 75, 43, 0.08);\n}\n.role-card.selected[_ngcontent-%COMP%]   .role-name[_ngcontent-%COMP%] {\n  color: var(--brand-primary);\n}\n.role-card[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: var(--border-focus);\n}"]
      });
    }
  }
  return LoginComponent;
})();

/***/ })

}]);