import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  showPass = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      oauthRole: ['CUSTOMER', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const oauthError = this.route.snapshot.queryParamMap.get('oauthError');
    if (oauthError) {
      this.toast.error(oauthError);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      });
    }
  }

  get googleOAuthUrl(): string {
    return `${environment.authUrl}/oauth2/authorization/google?role=${encodeURIComponent(this.oauthRole.value || 'CUSTOMER')}&origin=login`;
  }

  get githubOAuthUrl(): string {
    return `${environment.authUrl}/oauth2/authorization/github?role=${encodeURIComponent(this.oauthRole.value || 'CUSTOMER')}&origin=login`;
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const payload = {
      email: String(this.email.value || '').trim(),
      password: String(this.password.value || '')
    };
    this.auth.login(payload).subscribe({
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

  private redirectByRole(role: string) {
    const routes: Record<string, string> = {
      ADMIN: '/admin', OWNER: '/owner', AGENT: '/agent', CUSTOMER: '/home'
    };
    this.router.navigate([routes[role] || '/home']);
  }

  get email()    { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }
  get oauthRole() { return this.form.get('oauthRole')!; }
}
