import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  showPass = false;
  googleOAuthUrl = '/oauth2/authorization/google';
  githubOAuthUrl = '/oauth2/authorization/github';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
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
}
