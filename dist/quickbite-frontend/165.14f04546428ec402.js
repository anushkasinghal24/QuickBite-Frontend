"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[165],{

/***/ 3165:
/*!**************************************************************!*\
  !*** ./src/app/features/auth/register/register.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/ui.services */ 8749);









function RegisterComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegisterComponent_div_41_Template_div_click_0_listener() {
      const r_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.selectRole(r_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", ctx_r2.selectedRole === r_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](r_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](r_r2.name);
  }
}
function RegisterComponent_span_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.fullName.hasError("required") ? "Name is required" : "Minimum 2 characters", " ");
  }
}
function RegisterComponent_span_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.email.hasError("required") ? "Email is required" : "Invalid email", " ");
  }
}
function RegisterComponent_span_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Enter a valid 10-digit Indian mobile number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_76_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.password.hasError("required") ? "Password is required" : "Minimum 6 characters", " ");
  }
}
function RegisterComponent_span_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Create Account \uD83D\uDE80");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 38);
  }
}
let RegisterComponent = /*#__PURE__*/(() => {
  class RegisterComponent {
    constructor(fb, auth, toast, router) {
      this.fb = fb;
      this.auth = auth;
      this.toast = toast;
      this.router = router;
      this.loading = false;
      this.showPass = false;
      this.selectedRole = 'CUSTOMER';
      this.roles = [{
        id: 'CUSTOMER',
        icon: '👤',
        name: 'Customer',
        desc: 'Order food'
      }, {
        id: 'OWNER',
        icon: '🏪',
        name: 'Restaurant Owner',
        desc: 'Manage restaurant'
      }, {
        id: 'AGENT',
        icon: '🚴',
        name: 'Delivery Agent',
        desc: 'Deliver orders'
      }];
      this.form = this.fb.group({
        fullName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(2)]],
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]],
        phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.pattern(/^[6-9]\d{9}$/)]],
        password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)]]
      });
    }
    selectRole(role) {
      this.selectedRole = role;
    }
    submit() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.loading = true;
      const payload = {
        ...this.form.value,
        role: this.selectedRole
      };
      this.auth.register(payload).subscribe({
        next: res => {
          this.toast.success(`Welcome to QuickBite, ${res.user.fullName}! 🎉`);
          this.router.navigate([res.user.role === 'CUSTOMER' ? '/home' : res.user.role === 'OWNER' ? '/owner' : res.user.role === 'AGENT' ? '/agent' : '/home']);
        },
        error: err => {
          this.loading = false;
          this.toast.error(err?.error?.message || 'Registration failed. Please try again.');
        }
      });
    }
    get fullName() {
      return this.form.get('fullName');
    }
    get email() {
      return this.form.get('email');
    }
    get phone() {
      return this.form.get('phone');
    }
    get password() {
      return this.form.get('password');
    }
    static {
      this.ɵfac = function RegisterComponent_Factory(t) {
        return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: RegisterComponent,
        selectors: [["app-register"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
        decls: 92,
        vars: 19,
        consts: [[1, "auth-page"], [1, "auth-left"], [1, "auth-left-content"], [1, "brand-logo"], [1, "logo-text"], [1, "gradient-text"], [1, "auth-left-title"], [1, "auth-features"], [1, "af-item"], [1, "food-illustration"], [1, "auth-right"], [1, "auth-form-wrapper", "animate-fadeInUp"], [1, "auth-title"], [1, "auth-subtitle"], [1, "form-group"], [1, "form-label"], [1, "role-grid"], ["class", "role-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["novalidate", "", 1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "input-wrapper"], [1, "input-icon"], ["formControlName", "fullName", "type", "text", "placeholder", "Your full name", 1, "form-control", "with-icon"], ["class", "form-error", 4, "ngIf"], ["formControlName", "email", "type", "email", "placeholder", "you@example.com", 1, "form-control", "with-icon"], ["formControlName", "phone", "type", "tel", "placeholder", "10-digit mobile number", 1, "form-control", "with-icon"], ["formControlName", "password", "placeholder", "Min 6 characters", 1, "form-control", "with-icon", "with-icon-right", 3, "type"], ["type", "button", 1, "pass-toggle", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", "w-full", 3, "disabled"], [4, "ngIf"], ["class", "spinner", "style", "width:20px;height:20px;border-width:2px", 4, "ngIf"], [1, "auth-switch"], ["routerLink", "/login"], [1, "terms-note"], ["href", "#"], [1, "role-card", 3, "click"], [1, "role-icon"], [1, "role-name"], [1, "form-error"], [1, "spinner", 2, "width", "20px", "height", "20px", "border-width", "2px"]],
        template: function RegisterComponent_Template(rf, ctx) {
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
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Join the");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "food revolution.");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Whether you're a food lover, restaurant owner or delivery agent \u2014 QuickBite has a place for you.");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 7)(17, "div", 8)(18, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "\uD83C\uDF81");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, " \u20B9100 off your first order");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 8)(22, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "\uD83D\uDE80");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, " Instant account setup");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 8)(26, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "\uD83D\uDD12");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, " Secure & private");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "\uD83E\uDD58 \uD83C\uDF71 \uD83E\uDD57 \uD83C\uDF69 \uD83E\uDDC1");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 10)(32, "div", 11)(33, "h1", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Create account \u2728");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Start your QuickBite journey today");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 14)(38, "label", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "I am a...");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, RegisterComponent_div_41_Template, 5, 4, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "form", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_42_listener() {
              return ctx.submit();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 14)(44, "label", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Full Name");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 19)(47, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "\uD83D\uDC64");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](49, "input", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](50, RegisterComponent_span_50_Template, 2, 1, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "div", 14)(52, "label", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53, "Email Address");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "div", 19)(55, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, "\uD83D\uDCE7");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](57, "input", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](58, RegisterComponent_span_58_Template, 2, 1, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "div", 14)(60, "label", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, "Phone Number");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "div", 19)(63, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "\uD83D\uDCF1");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](65, "input", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](66, RegisterComponent_span_66_Template, 2, 0, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "div", 14)(68, "label", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](69, "Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](70, "div", 19)(71, "span", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](72, "\uD83D\uDD12");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](73, "input", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "button", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegisterComponent_Template_button_click_74_listener() {
              return ctx.showPass = !ctx.showPass;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](76, RegisterComponent_span_76_Template, 2, 1, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](77, "button", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](78, RegisterComponent_span_78_Template, 2, 0, "span", 28)(79, RegisterComponent_span_79_Template, 1, 0, "span", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "p", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](81, " Already have an account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "a", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "Sign in \u2192");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](84, "p", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](85, " By registering, you agree to our ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](86, "a", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](87, "Terms of Service");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](88, " and ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](89, "a", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](90, "Privacy Policy");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](91, ". ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](41);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.roles);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.fullName.invalid && ctx.fullName.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.fullName.invalid && ctx.fullName.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.email.invalid && ctx.email.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.email.invalid && ctx.email.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.phone.invalid && ctx.phone.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.phone.invalid && ctx.phone.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("error", ctx.password.invalid && ctx.password.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.showPass ? "text" : "password");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.showPass ? "\uD83D\uDE48" : "\uD83D\uDC41\uFE0F", " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.password.invalid && ctx.password.touched);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
        styles: [".auth-page[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n@media (max-width: 900px) {\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n.auth-left[_ngcontent-%COMP%] {\n  background: var(--brand-gradient);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px;\n  position: relative;\n  overflow: hidden;\n}\n.auth-left[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: -100px;\n  right: -100px;\n  width: 400px;\n  height: 400px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 50%;\n}\n.auth-left[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -80px;\n  left: -60px;\n  width: 300px;\n  height: 300px;\n  background: rgba(255, 255, 255, 0.06);\n  border-radius: 50%;\n}\n@media (max-width: 900px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n.auth-left-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  color: white;\n  max-width: 360px;\n}\n\n.brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 40px;\n}\n.brand-logo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-size: 2rem;\n}\n.brand-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: white;\n}\n.brand-logo[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .gradient-text[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  -webkit-text-fill-color: rgba(255, 255, 255, 0.85);\n  background: none;\n}\n\n.auth-left-title[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 2.5rem;\n  font-weight: 800;\n  line-height: 1.1;\n  margin-bottom: 16px;\n  letter-spacing: -0.02em;\n}\n\n.auth-left-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 1rem;\n  margin-bottom: 40px;\n}\n\n.auth-features[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin-bottom: 48px;\n}\n\n.af-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.9);\n  font-weight: 500;\n}\n.af-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\n.food-illustration[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  letter-spacing: 8px;\n  opacity: 0.7;\n}\n\n\n\n.auth-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px var(--space-xl);\n  background: var(--bg-base);\n  overflow-y: auto;\n}\n\n.auth-form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n\n.auth-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 2rem;\n  font-weight: 800;\n  margin-bottom: 8px;\n  letter-spacing: -0.02em;\n}\n\n.auth-subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  margin-bottom: 36px;\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  font-size: 1rem;\n  z-index: 1;\n  pointer-events: none;\n}\n\n.form-control.with-icon[_ngcontent-%COMP%] {\n  padding-left: 44px;\n}\n\n.form-control.with-icon-right[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n\n.pass-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1rem;\n  padding: 4px;\n}\n\n.form-row-flex[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin: -4px 0 12px;\n}\n\n.forgot-link[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--brand-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.w-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.divider-text[_ngcontent-%COMP%] {\n  text-align: center;\n  position: relative;\n  margin: 20px 0;\n}\n.divider-text[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: var(--border-color);\n}\n.divider-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--bg-base);\n  padding: 0 16px;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n\n.oauth-btns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n\n.oauth-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 11px;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--border-radius-md);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  text-decoration: none;\n  transition: all var(--transition-fast);\n  background: var(--bg-surface);\n}\n.oauth-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--brand-primary);\n  background: rgba(255, 75, 43, 0.04);\n  color: var(--brand-primary);\n}\n\n.auth-switch[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  font-size: 0.875rem;\n  color: var(--text-muted);\n}\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--brand-primary);\n  font-weight: 600;\n}\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n\n\n.role-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n\n.role-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 16px 8px;\n  border: 1.5px solid var(--border-color);\n  border-radius: var(--border-radius-md);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  background: var(--bg-surface);\n}\n.role-card[_ngcontent-%COMP%]   .role-icon[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n}\n.role-card[_ngcontent-%COMP%]   .role-name[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.role-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--brand-primary);\n  background: rgba(255, 75, 43, 0.08);\n}\n.role-card.selected[_ngcontent-%COMP%]   .role-name[_ngcontent-%COMP%] {\n  color: var(--brand-primary);\n}\n.role-card[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: var(--border-focus);\n}\n\n.terms-note[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 12px;\n  font-size: 0.78rem;\n  color: var(--text-muted);\n}\n.terms-note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--brand-primary);\n  text-decoration: none;\n}\n.terms-note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}"]
      });
    }
  }
  return RegisterComponent;
})();

/***/ })

}]);