import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.reconcileStoredSession();
  }

  get currentUser(): User | null { return this.currentUserSubject.value; }
  get isLoggedIn(): boolean { return !!this.getToken(); }
  get isAdmin(): boolean { return this.currentUser?.role === 'ADMIN'; }
  get isOwner(): boolean { return this.currentUser?.role === 'OWNER'; }
  get isAgent(): boolean { return this.currentUser?.role === 'AGENT'; }
  get isCustomer(): boolean { return this.currentUser?.role === 'CUSTOMER'; }

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, req).pipe(
      map(response => response.data!),
      tap(res => this.storeSession(res))
    );
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, req).pipe(
      map(response => response.data!),
      tap(res => this.storeSession(res))
    );
  }

  logout(): void {
    // Logout is handled locally so it stays safe even when the access token
    // is already expired or missing.
    localStorage.removeItem('qb_token');
    localStorage.removeItem('qb_refresh');
    localStorage.removeItem('qb_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null { return localStorage.getItem('qb_token'); }

  refreshToken(): Observable<AuthResponse> {
    const refresh = localStorage.getItem('qb_refresh');
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/refresh`, { refreshToken: refresh }).pipe(
      map(response => response.data!),
      tap(res => this.storeSession(res))
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/profile`).pipe(
      map(response => response.data!),
      tap(user => {
        localStorage.setItem('qb_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/profile`, data).pipe(
      map(response => response.data!),
      tap(user => {
        localStorage.setItem('qb_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  changePassword(oldPass: string, newPass: string): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/password`, {
      currentPassword: oldPass,
      newPassword: newPass,
      confirmNewPassword: newPass
    }).pipe(
      map(() => undefined)
    );
  }

  getAllUsers(role?: User['role']): Observable<User[]> {
    let params = new HttpParams();
    if (role) {
      params = params.set('role', role);
    }
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/admin/users`, { params }).pipe(
      map(response => response.data || [])
    );
  }

  searchUsers(name: string): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/admin/users/search`, {
      params: new HttpParams().set('name', name)
    }).pipe(map(response => response.data || []));
  }

  suspendUser(userId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/admin/users/${userId}/suspend`, {}).pipe(
      map(() => undefined)
    );
  }

  reactivateUser(userId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/admin/users/${userId}/reactivate`, {}).pipe(
      map(() => undefined)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/admin/users/${userId}`).pipe(
      map(() => undefined)
    );
  }

  private storeSession(res: AuthResponse): void {
    this.setTokens(res.accessToken ?? res.token, res.refreshToken);
    localStorage.setItem('qb_user', JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
  }

  setTokens(token: string, refreshToken?: string | null): void {
    if (!token) {
      return;
    }
    localStorage.setItem('qb_token', token);
    if (refreshToken) {
      localStorage.setItem('qb_refresh', refreshToken);
    }
  }

  private getStoredUser(): User | null {
    try {
      const u = localStorage.getItem('qb_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  }

  private reconcileStoredSession(): void {
    const token = this.getToken();
    const user = this.currentUserSubject.value;

    // If storage is incomplete or corrupted, clear it immediately so the app
    // does not boot into a phantom logged-in state.
    if (!token || !user) {
      if (token || user) {
        this.logoutSilently();
      }
      return;
    }

    // Validate the stored token once on app startup. If the token is stale or
    // the backend is unavailable, keep the cached user for now but do not force
    // a logout on transient network errors.
    this.http.post<ApiResponse<unknown>>(`${this.apiUrl}/validate-token`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        // Session is valid; nothing to do.
      },
      error: err => {
        if (err?.status === 401 || err?.status === 403) {
          this.logoutSilently();
        }
      }
    });
  }

  private logoutSilently(): void {
    localStorage.removeItem('qb_token');
    localStorage.removeItem('qb_refresh');
    localStorage.removeItem('qb_user');
    this.currentUserSubject.next(null);
  }
}
