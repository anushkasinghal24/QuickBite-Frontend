"use strict";
(self["webpackChunkquickbite_frontend"] = self["webpackChunkquickbite_frontend"] || []).push([[738],{

/***/ 3738:
/*!*************************************************!*\
  !*** ./src/app/features/home/home.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _core_services_api_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/api.services */ 9439);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);









const _c0 = () => ["Pizza", "Biryani", "Sushi", "Burgers"];
const _c1 = () => [1, 2, 3, 4, 5, 6];
const _c2 = a0 => ["/restaurants", a0];
function HomeComponent_span_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_span_28_Template_span_click_0_listener() {
      const t_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.browseCuisine(t_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](t_r2);
  }
}
function HomeComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 60)(1, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("animation-delay", i_r5 * 100 + "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r4.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r4.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r4.label);
  }
}
function HomeComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_div_68_Template_div_click_0_listener() {
      const c_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.browseCuisine(c_r7.name));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("animation-delay", i_r8 * 50 + "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r7.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r7.name);
  }
}
function HomeComponent_div_81_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 72)(4, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, HomeComponent_div_81_div_1_Template, 5, 0, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c1));
  }
}
function HomeComponent_div_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83C\uDF7D\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Restaurants unavailable");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.errorMessage);
  }
}
function HomeComponent_div_83_div_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2B50 Top Rated");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HomeComponent_div_83_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 92)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83D\uDD34 Currently Closed");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_83_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 79)(1, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, HomeComponent_div_83_div_1_div_3_Template, 2, 0, "div", 82)(4, HomeComponent_div_83_div_1_div_4_Template, 3, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 84)(6, "div", 85)(7, "h3", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 87)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "\u2B50");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "p", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 89)(18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "\u00B7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "\u00B7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const r_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("animation-delay", i_r10 * 80 + "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](16, _c2, r_r9.restaurantId));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", r_r9.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", r_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", r_r9.avgRating > 4.5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !r_r9.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](r_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](14, 13, r_r9.avgRating, "1.1-1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](r_r9.cuisine);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u23F1\uFE0F ", r_r9.estimatedDeliveryMin, " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u20B9", r_r9.minOrderAmount, " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](r_r9.city);
  }
}
function HomeComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, HomeComponent_div_83_div_1_Template, 28, 18, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.featuredRestaurants);
  }
}
function HomeComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83C\uDF7D\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "No restaurants found");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "There are no approved restaurants available yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 93)(1, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("animation-delay", i_r12 * 100 + "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r11.step);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r11.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r11.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r11.desc);
  }
}
function HomeComponent_a_105_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \uD83D\uDE80 Get Started Free ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
let HomeComponent = /*#__PURE__*/(() => {
  class HomeComponent {
    constructor(restaurantService, auth, router) {
      this.restaurantService = restaurantService;
      this.auth = auth;
      this.router = router;
      this.searchQuery = '';
      this.featuredRestaurants = [];
      this.loading = true;
      this.errorMessage = '';
      this.cuisines = [{
        icon: '🍕',
        name: 'Pizza'
      }, {
        icon: '🍔',
        name: 'Burgers'
      }, {
        icon: '🍣',
        name: 'Sushi'
      }, {
        icon: '🍜',
        name: 'Chinese'
      }, {
        icon: '🌮',
        name: 'Mexican'
      }, {
        icon: '🍛',
        name: 'Indian'
      }, {
        icon: '🥗',
        name: 'Healthy'
      }, {
        icon: '🍰',
        name: 'Desserts'
      }, {
        icon: '🍗',
        name: 'Chicken'
      }, {
        icon: '🥙',
        name: 'Wraps'
      }];
      this.stats = [{
        value: '500+',
        label: 'Restaurants',
        icon: '🏪'
      }, {
        value: '50K+',
        label: 'Happy Customers',
        icon: '😊'
      }, {
        value: '30 min',
        label: 'Avg Delivery',
        icon: '⚡'
      }, {
        value: '4.8★',
        label: 'App Rating',
        icon: '⭐'
      }];
      this.howItWorks = [{
        step: '01',
        icon: '📍',
        title: 'Choose Location',
        desc: 'Find restaurants near you based on your location or delivery address.'
      }, {
        step: '02',
        icon: '🍽️',
        title: 'Browse Menu',
        desc: 'Explore menus, read reviews, and pick your favourite dishes.'
      }, {
        step: '03',
        icon: '💳',
        title: 'Place Order',
        desc: 'Add to cart, apply promo codes, and pay securely.'
      }, {
        step: '04',
        icon: '🚀',
        title: 'Fast Delivery',
        desc: 'Track your order live as our riders bring it right to you.'
      }];
    }
    ngOnInit() {
      this.loadFeatured();
    }
    loadFeatured() {
      this.loading = true;
      this.errorMessage = '';
      this.restaurantService.getAll().subscribe({
        next: data => {
          this.featuredRestaurants = data.slice(0, 8);
          this.loading = false;
        },
        error: err => {
          console.error('Failed to load restaurants:', err);
          this.loading = false;
          this.featuredRestaurants = [];
          this.errorMessage = 'We could not load restaurants right now. Please try again in a moment.';
        }
      });
    }
    search() {
      if (this.searchQuery.trim()) {
        this.router.navigate(['/restaurants'], {
          queryParams: {
            q: this.searchQuery
          }
        });
      }
    }
    browseCuisine(cuisine) {
      this.router.navigate(['/restaurants'], {
        queryParams: {
          cuisine
        }
      });
    }
    getRatingStars(rating) {
      return Array.from({
        length: 5
      }, (_, i) => i < Math.round(rating) ? '★' : '☆');
    }
    static {
      this.ɵfac = function HomeComponent_Factory(t) {
        return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_api_services__WEBPACK_IMPORTED_MODULE_0__.RestaurantService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: HomeComponent,
        selectors: [["app-home"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
        decls: 117,
        vars: 11,
        consts: [[1, "hero-section"], [1, "hero-bg"], [1, "blob-1"], [1, "blob-2"], [1, "blob-3"], [1, "container", "hero-content"], [1, "hero-left", "animate-fadeInUp"], [1, "hero-badge", "animate-fadeIn"], [1, "pulse-dot"], [1, "hero-title"], [1, "gradient-text"], [1, "hero-subtitle"], [1, "search-bar", "hero-search"], [1, "search-icon"], ["type", "text", "placeholder", "Search for restaurants or cuisines...", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-primary", "btn-sm", "btn-search", 3, "click"], [1, "quick-tags", "animate-fadeInUp", "delay-200"], [1, "text-sm", "text-muted"], ["class", "quick-tag", 3, "click", 4, "ngFor", "ngForOf"], [1, "hero-right", "animate-fadeIn", "delay-300"], [1, "hero-visual"], [1, "hero-img-wrapper", "animate-float"], ["src", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85", "alt", "Vegetarian food platter", 1, "hero-main-img"], [1, "float-card", "float-card-1", "animate-slideInLeft", "delay-400"], [1, "fc-icon"], [1, "fc-title"], [1, "fc-sub"], [1, "float-card", "float-card-2", "animate-slideInLeft", "delay-500"], [1, "float-card", "float-card-3", "animate-fadeInUp", "delay-500"], [1, "stats-section"], [1, "container"], [1, "stats-grid"], ["class", "stat-item animate-fadeInUp", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "section", "cuisines-section"], [1, "section-header"], [1, "section-title"], [1, "section-subtitle"], [1, "cuisines-grid"], ["class", "cuisine-card animate-scaleIn", 3, "animation-delay", "click", 4, "ngFor", "ngForOf"], [1, "section"], [1, "section-header", "flex", "justify-between", "items-center", "flex-wrap", "gap-md"], ["routerLink", "/restaurants", 1, "btn", "btn-secondary"], ["class", "grid grid-auto", 4, "ngIf"], ["class", "empty-state", "style", "margin-top:24px", 4, "ngIf"], [1, "section", "how-section"], [1, "section-header", "text-center"], [1, "how-grid"], ["class", "how-card animate-fadeInUp", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "cta-section"], [1, "cta-card"], [1, "cta-content", "animate-fadeInUp"], [1, "cta-btns"], ["routerLink", "/register", "class", "btn btn-primary btn-lg", 4, "ngIf"], ["routerLink", "/restaurants", 1, "btn", "btn-secondary", "btn-lg"], [1, "cta-emoji-cluster"], [1, "animate-float"], [1, "animate-float", "delay-200"], [1, "animate-float", "delay-400"], [1, "animate-float", "delay-100"], [1, "quick-tag", 3, "click"], [1, "stat-item", "animate-fadeInUp"], [1, "stat-icon-big"], [1, "stat-value-big"], [1, "stat-label-text"], [1, "cuisine-card", "animate-scaleIn", 3, "click"], [1, "cuisine-icon"], [1, "cuisine-name"], [1, "grid", "grid-auto"], ["class", "card", "style", "height:300px", 4, "ngFor", "ngForOf"], [1, "card", 2, "height", "300px"], [1, "skeleton", 2, "height", "180px", "border-radius", "0"], [1, "card-body"], [1, "skeleton", 2, "height", "20px", "width", "70%", "margin-bottom", "8px", "border-radius", "4px"], [1, "skeleton", 2, "height", "14px", "width", "90%", "border-radius", "4px"], [1, "empty-state", 2, "margin-top", "24px"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-desc"], ["class", "restaurant-card animate-fadeInUp", 3, "animation-delay", "routerLink", 4, "ngFor", "ngForOf"], [1, "restaurant-card", "animate-fadeInUp", 3, "routerLink"], [1, "card-image"], [1, "cover", 3, "src", "alt"], ["class", "offer-badge", 4, "ngIf"], ["class", "closed-overlay", 4, "ngIf"], [1, "card-content"], [1, "flex", "justify-between", "items-center"], [1, "restaurant-name"], [1, "rating-pill"], [1, "cuisine-tag"], [1, "restaurant-meta"], [1, "meta-divider"], [1, "offer-badge"], [1, "closed-overlay"], [1, "how-card", "animate-fadeInUp"], [1, "how-step"], [1, "how-icon"], ["routerLink", "/register", 1, "btn", "btn-primary", "btn-lg"]],
        template: function HomeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 0)(1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 2)(3, "div", 3)(4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5)(6, "div", 6)(7, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "span", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\uD83D\uDE80 Free delivery on first order");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "h1", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " Craving something");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "delicious?");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, " \uD83C\uDF74 ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "p", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, " Discover restaurants nearby, browse menus, and get your favourite food delivered in minutes. Fresh, fast, and always satisfying. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 12)(20, "span", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "\uD83D\uDD0D");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "input", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function HomeComponent_Template_input_ngModelChange_22_listener($event) {
              _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchQuery, $event) || (ctx.searchQuery = $event);
              return $event;
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.enter", function HomeComponent_Template_input_keyup_enter_22_listener() {
              return ctx.search();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_23_listener() {
              return ctx.search();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Search");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 16)(26, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Popular:");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, HomeComponent_span_28_Template, 2, 1, "span", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 19)(30, "div", 20)(31, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "img", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 23)(34, "span", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "\u26A1");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div")(37, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Fast Delivery");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Avg 28 min");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 27)(42, "span", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "\u2B50");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "div")(45, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Top Rated");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "500+ restaurants");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "div", 28)(50, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51, "\uD83D\uDEF5");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53, "On the way!");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "section", 29)(55, "div", 30)(56, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](57, HomeComponent_div_57_Template, 7, 5, "div", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "section", 33)(59, "div", 30)(60, "div", 34)(61, "h2", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](62, "What are you ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "span", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "craving?");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "p", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66, "Browse by your favourite cuisine type");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "div", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](68, HomeComponent_div_68_Template, 5, 4, "div", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "section", 39)(70, "div", 30)(71, "div", 40)(72, "div")(73, "h2", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](74, "Featured ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](75, "span", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](76, "Restaurants");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](77, "p", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](78, "Handpicked favourites with fast delivery");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](79, "a", 41);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](80, "View All \u2192");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](81, HomeComponent_div_81_Template, 2, 2, "div", 42)(82, HomeComponent_div_82_Template, 7, 1, "div", 43)(83, HomeComponent_div_83_Template, 2, 1, "div", 42)(84, HomeComponent_div_84_Template, 7, 0, "div", 43);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](85, "section", 44)(86, "div", 30)(87, "div", 45)(88, "h2", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](89, "How it ");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](90, "span", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](91, "works");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](92, "p", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](93, "Get your food in 4 simple steps");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](94, "div", 46);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](95, HomeComponent_div_95_Template, 9, 6, "div", 47);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](96, "section", 48)(97, "div", 30)(98, "div", 49)(99, "div", 50)(100, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](101, "Ready to order? \uD83C\uDF89");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](102, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](103, "Join 50,000+ happy customers. Sign up and get \u20B9100 off your first order!");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](104, "div", 51);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](105, HomeComponent_a_105_Template, 2, 0, "a", 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](106, "a", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](107, "Browse Restaurants");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](108, "div", 54)(109, "span", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](110, "\uD83C\uDF55");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](111, "span", 56);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](112, "\uD83C\uDF54");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](113, "span", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](114, "\uD83C\uDF63");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](115, "span", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](116, "\uD83C\uDF2E");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchQuery);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](10, _c0));
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](29);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.stats);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.cuisines);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.errorMessage);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.errorMessage && ctx.featuredRestaurants.length);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.errorMessage && !ctx.featuredRestaurants.length);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.howItWorks);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.auth.isLoggedIn);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
        styles: ["@charset \"UTF-8\";\n\n\n.hero-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  align-items: center;\n  padding-top: 80px;\n  padding-bottom: 80px;\n  min-height: calc(100vh - var(--navbar-height));\n}\n@media (max-width: 900px) {\n  .hero-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-top: 48px;\n    padding-bottom: 48px;\n    min-height: auto;\n  }\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(255, 75, 43, 0.1);\n  border: 1px solid rgba(255, 75, 43, 0.2);\n  border-radius: var(--border-radius-full);\n  padding: 6px 16px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--brand-primary);\n  margin-bottom: 24px;\n}\n\n.pulse-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: var(--brand-primary);\n  border-radius: 50%;\n  animation: pulse-ring 1.5s infinite;\n  flex-shrink: 0;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(2.5rem, 6vw, 4rem);\n  font-weight: 800;\n  line-height: 1.1;\n  margin-bottom: 20px;\n  letter-spacing: -0.03em;\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n  margin-bottom: 32px;\n  max-width: 480px;\n}\n\n.hero-search[_ngcontent-%COMP%] {\n  max-width: 520px;\n  margin-bottom: 20px;\n}\n\n.quick-tags[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 8px;\n}\n\n.quick-tag[_ngcontent-%COMP%] {\n  padding: 5px 14px;\n  border-radius: var(--border-radius-full);\n  background: var(--bg-input);\n  font-size: 0.82rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  border: 1px solid var(--border-color);\n  color: var(--text-secondary);\n}\n.quick-tag[_ngcontent-%COMP%]:hover {\n  background: var(--brand-primary);\n  color: white;\n  border-color: var(--brand-primary);\n}\n\n\n\n.hero-right[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.hero-visual[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 480px;\n}\n\n.hero-img-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.hero-main-img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1/1;\n  object-fit: cover;\n  border-radius: 32px;\n  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(255, 75, 43, 0.1);\n}\n\n.float-card[_ngcontent-%COMP%] {\n  position: absolute;\n  background: var(--bg-glass);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: var(--border-radius-md);\n  padding: 10px 16px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  box-shadow: var(--shadow-lg);\n  white-space: nowrap;\n}\n\n.float-card-1[_ngcontent-%COMP%] {\n  bottom: 20%;\n  left: -10%;\n  animation: float 6s ease-in-out infinite;\n}\n\n.float-card-2[_ngcontent-%COMP%] {\n  top: 20%;\n  right: -8%;\n  animation: float 7s ease-in-out infinite reverse;\n}\n\n.float-card-3[_ngcontent-%COMP%] {\n  bottom: 8%;\n  right: 10%;\n  animation: float 5s ease-in-out infinite 1s;\n  font-size: 1.2rem;\n}\n\n.fc-icon[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n}\n\n.fc-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n\n.fc-sub[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n\n\n\n.stats-section[_ngcontent-%COMP%] {\n  background: var(--brand-gradient);\n  padding: 48px 0;\n  margin: 0;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-lg);\n}\n@media (max-width: 768px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n  color: white;\n}\n\n.stat-icon-big[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 8px;\n}\n\n.stat-value-big[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 2rem;\n  font-weight: 800;\n  color: white;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n\n.stat-label-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.75);\n  font-weight: 500;\n}\n\n\n\n.cuisines-section[_ngcontent-%COMP%] {\n  background: var(--bg-base);\n}\n\n.section-header[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-xl);\n}\n\n.cuisines-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  gap: var(--space-md);\n}\n@media (max-width: 1200px) {\n  .cuisines-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(5, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .cuisines-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n    gap: var(--space-sm);\n  }\n}\n\n.cuisine-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 20px 12px;\n  border-radius: var(--border-radius-lg);\n  background: var(--bg-card);\n  border: 1.5px solid var(--border-color);\n  cursor: pointer;\n  transition: all var(--transition-base);\n}\n.cuisine-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--brand-primary);\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-brand);\n  background: rgba(255, 75, 43, 0.04);\n}\n.cuisine-card[_ngcontent-%COMP%]:hover   .cuisine-icon[_ngcontent-%COMP%] {\n  transform: scale(1.2);\n}\n\n.cuisine-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  transition: transform var(--transition-base);\n}\n\n.cuisine-name[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-align: center;\n}\n\n\n\n.rating-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  background: rgba(34, 197, 94, 0.1);\n  color: #16a34a;\n  padding: 3px 8px;\n  border-radius: var(--border-radius-full);\n  font-size: 0.8rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.cuisine-tag[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--brand-primary);\n  font-weight: 600;\n  margin: 4px 0;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n\n\n.how-section[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n}\n\n.how-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-xl);\n  position: relative;\n}\n@media (max-width: 1024px) {\n  .how-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .how-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.how-grid[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 30px;\n  left: 10%;\n  right: 10%;\n  height: 2px;\n  background: linear-gradient(90deg, var(--brand-primary), var(--brand-secondary));\n  border-radius: 2px;\n  opacity: 0.25;\n}\n@media (max-width: 1024px) {\n  .how-grid[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n}\n\n.how-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 12px;\n  padding: var(--space-xl) var(--space-lg);\n  border-radius: var(--border-radius-xl);\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  transition: all var(--transition-base);\n  position: relative;\n}\n.how-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(255, 75, 43, 0.3);\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n}\n.how-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n}\n.how-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-muted);\n  line-height: 1.6;\n  margin: 0;\n}\n\n.how-step[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 20px;\n  font-family: var(--font-display);\n  font-size: 0.75rem;\n  font-weight: 800;\n  color: var(--brand-primary);\n  background: rgba(255, 75, 43, 0.1);\n  border: 1px solid rgba(255, 75, 43, 0.2);\n  padding: 2px 10px;\n  border-radius: var(--border-radius-full);\n}\n\n.how-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n\n\n\n.cta-section[_ngcontent-%COMP%] {\n  padding: var(--space-3xl) 0;\n}\n\n.cta-card[_ngcontent-%COMP%] {\n  background: var(--brand-gradient);\n  border-radius: 32px;\n  padding: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 40px;\n  position: relative;\n  overflow: hidden;\n}\n.cta-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: -80px;\n  right: -80px;\n  width: 300px;\n  height: 300px;\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 50%;\n}\n@media (max-width: 768px) {\n  .cta-card[_ngcontent-%COMP%] {\n    padding: var(--space-xl);\n    flex-direction: column;\n    text-align: center;\n  }\n}\n\n.cta-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: white;\n  font-size: clamp(1.6rem, 3vw, 2.2rem);\n  margin-bottom: 12px;\n}\n.cta-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 1rem;\n  margin-bottom: 28px;\n}\n\n.cta-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  flex-wrap: wrap;\n}\n.cta-btns[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.5);\n  color: white;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(8px);\n}\n.cta-btns[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n}\n\n.cta-emoji-cluster[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-size: 3rem;\n  flex-shrink: 0;\n  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));\n}\n@media (max-width: 768px) {\n  .cta-emoji-cluster[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}"]
      });
    }
  }
  return HomeComponent;
})();

/***/ })

}]);