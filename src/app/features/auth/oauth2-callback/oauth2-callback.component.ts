import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-oauth2-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oauth-callback">
      <div class="card">
        <p class="eyebrow">QuickBite</p>
        <h1>Completing sign in</h1>
        <p *ngIf="!error">{{ message }}</p>
        <p *ngIf="error" class="error">{{ error }}</p>
        <div class="spinner" *ngIf="loading"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #fff7f0 0%, #fff 55%, #ffe3d7 100%);
      color: #1f2937;
      font-family: inherit;
    }
    .oauth-callback {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .card {
      width: min(100%, 440px);
      border-radius: 24px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 24px 80px rgba(255, 76, 43, 0.18);
      border: 1px solid rgba(255, 76, 43, 0.12);
      backdrop-filter: blur(14px);
      text-align: center;
    }
    .eyebrow {
      margin: 0 0 8px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 0.75rem;
      color: #ff4b2b;
      font-weight: 700;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 2rem;
      line-height: 1.1;
    }
    p {
      margin: 0;
      color: #4b5563;
    }
    .error {
      color: #b91c1c;
    }
    .spinner {
      width: 42px;
      height: 42px;
      margin: 24px auto 0;
      border-radius: 50%;
      border: 4px solid rgba(255, 75, 43, 0.15);
      border-top-color: #ff4b2b;
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class OAuth2CallbackComponent implements OnInit {
  loading = true;
  message = 'We are signing you in safely.';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
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

  private fail(message: string): void {
    this.loading = false;
    this.error = message;
    window.setTimeout(() => this.router.navigate(['/login']), 1800);
  }

  private routeForRole(role: string): string {
    const routes: Record<string, string> = {
      ADMIN: '/admin',
      OWNER: '/owner',
      AGENT: '/agent',
      CUSTOMER: '/home'
    };
    return routes[role] || '/home';
  }
}
