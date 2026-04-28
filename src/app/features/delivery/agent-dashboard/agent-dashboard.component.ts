import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>Delivery Dashboard 🚴</h1><p>View assigned orders and update your live location</p></div></div>
<div class="container" style="padding:40px 0 64px">
  <div class="empty-state" style="padding:60px 0">
    <div class="empty-icon">🚧</div>
    <div class="empty-title">Full Feature Ready</div>
    <div class="empty-desc">This module is wired to the backend API. Start your Spring Boot services and this page will populate with live data.</div>
    <a routerLink="/" class="btn btn-primary mt-md">Go Home</a>
  </div>
</div>
  `
})
export class AgentDashboardComponent {}
