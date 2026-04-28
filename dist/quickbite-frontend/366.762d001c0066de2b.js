"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[366],{

/***/ 366:
/*!*******************************************************!*\
  !*** ./src/app/features/profile/profile.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileComponent: () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/ui.services */ 8749);







let ProfileComponent = /*#__PURE__*/(() => {
  class ProfileComponent {
    constructor(fb, auth, toast) {
      this.fb = fb;
      this.auth = auth;
      this.toast = toast;
      this.saving = false;
      this.savingPass = false;
    }
    ngOnInit() {
      const u = this.auth.currentUser;
      this.profileForm = this.fb.group({
        fullName: [u.fullName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
        phone: [u.phone],
        email: [u.email]
      });
      this.passForm = this.fb.group({
        oldPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
        newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]]
      });
    }
    saveProfile() {
      if (this.profileForm.invalid) return;
      this.saving = true;
      this.auth.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.toast.success('Profile updated!');
          this.saving = false;
        },
        error: () => {
          this.toast.error('Failed to update');
          this.saving = false;
        }
      });
    }
    changePassword() {
      if (this.passForm.invalid) return;
      this.savingPass = true;
      this.auth.changePassword(this.passForm.value.oldPassword, this.passForm.value.newPassword).subscribe({
        next: () => {
          this.toast.success('Password updated!');
          this.passForm.reset();
          this.savingPass = false;
        },
        error: () => {
          this.toast.error('Wrong current password');
          this.savingPass = false;
        }
      });
    }
    static {
      this.ɵfac = function ProfileComponent_Factory(t) {
        return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_ui_services__WEBPACK_IMPORTED_MODULE_1__.ToastService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: ProfileComponent,
        selectors: [["app-profile"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
        decls: 61,
        vars: 14,
        consts: [[1, "page-header"], [1, "container"], [1, "container", 2, "padding", "32px 0 64px"], [1, "profile-layout"], [1, "profile-sidebar"], [1, "card", 2, "padding", "var(--space-xl)", "text-align", "center"], [1, "avatar-large"], [2, "margin", "16px 0 4px"], [1, "text-muted", "text-sm"], [1, "badge", "badge-brand", 2, "margin-top", "8px"], [1, "divider", 2, "margin", "20px 0"], [1, "profile-stat"], [1, "text-sm"], [1, "card", 2, "margin-bottom", "20px"], [1, "card-header"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-2"], [1, "form-group"], [1, "form-label"], ["formControlName", "fullName", "type", "text", 1, "form-control"], ["formControlName", "phone", "type", "tel", 1, "form-control"], ["formControlName", "email", "type", "email", "readonly", "", 1, "form-control", 2, "opacity", ".6"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "card"], ["formControlName", "oldPassword", "type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "form-control"], ["formControlName", "newPassword", "type", "password", "placeholder", "Min 6 characters", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary", 3, "disabled"]],
        template: function ProfileComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "My Profile \uD83D\uDC64");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "div", 5)(8, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "h3", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "span", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 11)(18, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "\uD83D\uDCC5");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "span", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](22, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div")(24, "div", 13)(25, "div", 14)(26, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "\u270F\uFE0F Edit Profile");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 15)(29, "form", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function ProfileComponent_Template_form_ngSubmit_29_listener() {
              return ctx.saveProfile();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 17)(31, "div", 18)(32, "label", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Full Name");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "input", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 18)(36, "label", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Phone Number");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "input", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 18)(40, "label", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Email Address");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "input", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "button", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 24)(46, "div", 14)(47, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "\uD83D\uDD12 Change Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 15)(50, "form", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function ProfileComponent_Template_form_ngSubmit_50_listener() {
              return ctx.changePassword();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 18)(52, "label", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "Current Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](54, "input", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 18)(56, "label", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "New Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](58, "input", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "button", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
          }
          if (rf & 2) {
            let tmp_0_0;
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.auth.currentUser == null ? null : ctx.auth.currentUser.fullName == null ? null : (tmp_0_0 = ctx.auth.currentUser.fullName.charAt(0)) == null ? null : tmp_0_0.toUpperCase());
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.auth.currentUser == null ? null : ctx.auth.currentUser.fullName);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.auth.currentUser == null ? null : ctx.auth.currentUser.email);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.auth.currentUser == null ? null : ctx.auth.currentUser.role);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Member since ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](22, 11, ctx.auth.currentUser == null ? null : ctx.auth.currentUser.createdAt, "MMMM yyyy"), "");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.profileForm);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.saving);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.saving ? "Saving..." : "Save Changes", " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.passForm);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.savingPass);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.savingPass ? "Updating..." : "Update Password", " ");
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
        styles: [".profile-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:260px 1fr;gap:24px;align-items:start;\n  @media(max-width:900px){grid-template-columns:1fr;}}\n.avatar-large[_ngcontent-%COMP%]{width:80px;height:80px;border-radius:50%;background:var(--brand-gradient);color:white;font-family:var(--font-display);font-size:2rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto;}\n.profile-stat[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;font-size:.875rem;color:var(--text-muted);justify-content:center;}"]
      });
    }
  }
  return ProfileComponent;
})();

/***/ })

}]);