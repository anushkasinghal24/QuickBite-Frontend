import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  selectedCuisine = '';
  sortBy = 'rating';
  showVegOnly = false;

  cuisines = ['All','Pizza','Burgers','Sushi','Indian','Chinese','Mexican','Healthy','Desserts','Italian'];

  constructor(private svc: RestaurantService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.searchQuery    = p['q']       || '';
      this.selectedCuisine = p['cuisine'] || '';
    });
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => { this.restaurants = data; this.applyFilters(); this.loading = false; },
      error: ()   => { this.restaurants = []; this.applyFilters(); this.loading = false; }
    });
  }

  applyFilters() {
    let res = [...this.restaurants];
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      res = res.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.city.toLowerCase().includes(q));
    }
    if (this.selectedCuisine && this.selectedCuisine !== 'All') {
      res = res.filter(r => r.cuisine.toLowerCase() === this.selectedCuisine.toLowerCase());
    }
    if (this.sortBy === 'rating')   res.sort((a,b) => b.avgRating - a.avgRating);
    if (this.sortBy === 'delivery') res.sort((a,b) => a.estimatedDeliveryMin - b.estimatedDeliveryMin);
    if (this.sortBy === 'name')     res.sort((a,b) => a.name.localeCompare(b.name));
    this.filtered = res;
  }

  selectCuisine(c: string) { this.selectedCuisine = c === 'All' ? '' : c; this.applyFilters(); }
}
