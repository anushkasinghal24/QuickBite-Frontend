import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../core/services/api.services';
import { AuthService } from '../../core/services/auth.service';
import { Restaurant } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  nearbyRadius = 10;
  featuredRestaurants: Restaurant[] = [];
  loading = true;
  errorMessage = '';

  cuisines = [
    { icon: '🍕', name: 'Pizza' },
    { icon: '🍔', name: 'Burgers' },
    { icon: '🍣', name: 'Sushi' },
    { icon: '🍜', name: 'Chinese' },
    { icon: '🌮', name: 'Mexican' },
    { icon: '🍛', name: 'Indian' },
    { icon: '🥗', name: 'Healthy' },
    { icon: '🍰', name: 'Desserts' },
    { icon: '🍗', name: 'Chicken' },
    { icon: '🥙', name: 'Wraps' },
  ];

  stats = [
    { value: '500+', label: 'Restaurants', icon: '🏪' },
    { value: '50K+', label: 'Happy Customers', icon: '😊' },
    { value: '30 min', label: 'Avg Delivery', icon: '⚡' },
    { value: '4.8★', label: 'App Rating', icon: '⭐' },
  ];

  howItWorks = [
    { step: '01', icon: '📍', title: 'Choose Location', desc: 'Find restaurants near you based on your location or delivery address.' },
    { step: '02', icon: '🍽️', title: 'Browse Menu', desc: 'Explore menus, read reviews, and pick your favourite dishes.' },
    { step: '03', icon: '💳', title: 'Place Order', desc: 'Add to cart, apply promo codes, and pay securely.' },
    { step: '04', icon: '🚀', title: 'Fast Delivery', desc: 'Track your order live as our riders bring it right to you.' },
  ];

  constructor(
    private restaurantService: RestaurantService,
    public auth: AuthService,
    private router: Router
  ) {}

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
      this.router.navigate(['/restaurants'], { queryParams: { q: this.searchQuery } });
    }
  }

  searchNearby() {
    this.router.navigate(['/restaurants'], {
      queryParams: {
        nearby: 1,
        radius: this.nearbyRadius
      }
    });
  }

  browseCuisine(cuisine: string) {
    this.router.navigate(['/restaurants'], { queryParams: { cuisine } });
  }

  getRatingStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? '★' : '☆');
  }
}
