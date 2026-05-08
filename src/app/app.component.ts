import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastContainerComponent } from './shared/components/toast/toast-container.component';
import { ThemeService } from './core/services/ui.services';
import { ServiceHealthIssue, ServiceHealthService } from './core/services/service-health.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, ToastContainerComponent],
  styles: [`
    .service-banner {
      position: sticky;
      top: 0;
      z-index: 40;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      background: linear-gradient(90deg, rgba(255, 91, 54, 0.16), rgba(255, 91, 54, 0.08));
      border-bottom: 1px solid rgba(255, 91, 54, 0.22);
      color: #8e2f1b;
      backdrop-filter: blur(10px);
    }
    .service-banner strong {
      font-size: 0.95rem;
      letter-spacing: 0.01em;
    }
    .service-banner span {
      font-size: 0.88rem;
      opacity: 0.9;
    }
    .service-banner small {
      margin-left: auto;
      font-size: 0.8rem;
      opacity: 0.8;
    }
    @media (max-width: 640px) {
      .service-banner small {
        margin-left: 0;
        width: 100%;
      }
    }
  `],
  template: `
    <div *ngIf="activeIssues.length" class="service-banner" role="status" aria-live="polite">
      <strong>{{ activeIssues[0].label }} is temporarily unavailable.</strong>
      <span>{{ activeIssues[0].message }}</span>
      <small *ngIf="activeIssues.length > 1">+{{ activeIssues.length - 1 }} more service issue(s)</small>
    </div>
    <app-navbar />
    <main class="page-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-toast-container />
  `
})
export class AppComponent implements OnInit, OnDestroy {
  activeIssues: ServiceHealthIssue[] = [];
  private sub = new Subscription();

  constructor(
    private theme: ThemeService,
    private health: ServiceHealthService
  ) {}

  ngOnInit() {
    this.sub.add(this.health.issues$.subscribe(issues => {
      this.activeIssues = issues;
    }));
    /* Theme already applied in ThemeService constructor */
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
