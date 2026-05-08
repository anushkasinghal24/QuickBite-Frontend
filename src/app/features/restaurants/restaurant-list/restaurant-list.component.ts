import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../../../core/services/api.services';
import { Restaurant } from '../../../core/models';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filtered: Restaurant[] = [];
  loading = true;
  searchQuery = '';
  selectedCity = '';
  selectedCuisine = '';
  sortBy = 'rating';
  showVegOnly = false;
  useNearbySearch = false;
  searchMode: 'all' | 'keyword' | 'city' | 'nearby' = 'all';
  nearbyRadius = 10;
  currentLatitude: number | null = null;
  currentLongitude: number | null = null;
  locationError = '';
  minRating: number | null = null;
  maxDeliveryMin: number | null = null;
  costForTwoMax: number | null = null;
  cuisines: string[] = ['All'];

  constructor(private svc: RestaurantService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.searchQuery     = p['q'] || '';
      this.selectedCity    = p['city'] || '';
      this.selectedCuisine = p['cuisine'] || '';
      this.nearbyRadius    = Number(p['radius'] || 10);
      this.minRating       = p['minRating'] != null ? Number(p['minRating']) : null;
      this.maxDeliveryMin  = p['maxDelivery'] != null ? Number(p['maxDelivery']) : null;
      this.costForTwoMax   = p['maxCost'] != null ? Number(p['maxCost']) : null;
      const nearbyRequested = p['nearby'] === '1' || p['nearby'] === 'true';
      this.searchMode      = nearbyRequested
        ? 'nearby'
        : (this.searchQuery.trim() ? 'keyword' : (this.selectedCity.trim() ? 'city' : 'all'));

      if (nearbyRequested) {
        this.useMyLocation();
        return;
      }

      this.load();
    });
  }

  load() {
    this.loading = true;
    this.locationError = '';

    const keyword = this.searchQuery.trim();
    const city = this.selectedCity.trim();

    let source$: Observable<Restaurant[]>;
    if (this.searchMode === 'nearby' && this.currentLatitude != null && this.currentLongitude != null) {
      source$ = this.svc.getNearby(this.currentLatitude, this.currentLongitude, this.nearbyRadius);
    } else if (this.searchMode === 'keyword' && keyword) {
      source$ = this.svc.search(keyword);
    } else if (this.searchMode === 'city' && city) {
      source$ = this.svc.getByCity(city);
    } else if (keyword) {
      source$ = this.svc.search(keyword);
    } else if (city) {
      source$ = this.svc.getByCity(city);
    } else {
      source$ = this.svc.getAll();
    }

    source$.subscribe({
      next: data => {
        this.restaurants = data;
        this.updateCuisineOptions(data);
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.restaurants = [];
        this.cuisines = ['All'];
        this.applyFilters();
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let res = [...this.restaurants];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      res = res.filter(r => {
        const haystack = [
          r.name,
          r.description,
          r.cuisine,
          r.city,
          r.address
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (this.selectedCity.trim()) {
      const city = this.selectedCity.trim().toLowerCase();
      res = res.filter(r => (r.city || '').toLowerCase().includes(city));
    }

    if (this.selectedCuisine && this.selectedCuisine !== 'All') {
      res = res.filter(r => (r.cuisine || '').toLowerCase() === this.selectedCuisine.toLowerCase());
    }

    if (this.minRating != null) {
      res = res.filter(r => (r.avgRating ?? 0) >= this.minRating!);
    }

    if (this.maxDeliveryMin != null) {
      res = res.filter(r => (r.estimatedDeliveryMin ?? 999) <= this.maxDeliveryMin!);
    }

    if (this.showVegOnly) {
      const hasMenuData = res.some(r => Array.isArray(r.menuCategories) && r.menuCategories.length > 0);
      if (hasMenuData) {
        res = res.filter(r => {
          const menu = r.menuCategories || [];
          return menu.some(cat => (cat.items || []).some(item => item.isVeg));
        });
      }
    }

    if (this.costForTwoMax != null) {
      res = res.filter(r => (r.costForTwo ?? r.minOrderAmount ?? 0) <= this.costForTwoMax!);
    }

    if (this.sortBy === 'rating')   res.sort((a,b) => b.avgRating - a.avgRating);
    if (this.sortBy === 'delivery') res.sort((a,b) => a.estimatedDeliveryMin - b.estimatedDeliveryMin);
    if (this.sortBy === 'name')     res.sort((a,b) => a.name.localeCompare(b.name));
    this.filtered = res;
  }

  private updateCuisineOptions(restaurants: Restaurant[]): void {
    const unique = [...new Set(
      (restaurants || [])
        .map(r => r.cuisine?.trim())
        .filter((c): c is string => !!c)
    )].sort((a, b) => a.localeCompare(b));

    const current = this.selectedCuisine?.trim();
    const hasSelected = current ? unique.some(c => c.toLowerCase() === current.toLowerCase()) : false;
    if (current && !hasSelected) {
      unique.unshift(current);
    }

    this.cuisines = ['All', ...unique];
  }

  selectCuisine(c: string) {
    this.selectedCuisine = c === 'All' ? '' : c;
    this.applyFilters();
  }

  searchByKeyword() {
    this.searchMode = 'keyword';
    this.useNearbySearch = false;
    this.load();
  }

  searchByCity() {
    this.searchMode = 'city';
    this.useNearbySearch = false;
    this.currentLatitude = null;
    this.currentLongitude = null;
    this.load();
  }

  useMyLocation() {
    this.locationError = '';

    if (!navigator.geolocation) {
      this.locationError = 'Location access is not available in this browser.';
      return;
    }

    this.loading = true;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.useNearbySearch = true;
        this.searchMode = 'nearby';
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
        this.load();
      },
      () => {
        this.loading = false;
        this.locationError = 'We could not read your current location.';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCity = '';
    this.selectedCuisine = '';
    this.sortBy = 'rating';
    this.showVegOnly = false;
    this.useNearbySearch = false;
    this.searchMode = 'all';
    this.currentLatitude = null;
    this.currentLongitude = null;
    this.minRating = null;
    this.maxDeliveryMin = null;
    this.costForTwoMax = null;
    this.load();
  }
}
