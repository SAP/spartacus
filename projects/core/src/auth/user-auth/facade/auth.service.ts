import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthService } from '../services/basic-auth.service';

/**
 * Auth facade on BasicAuthService and AsmAuthService.
 * This service should be used in components, other core features.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected basicAuthService: BasicAuthService) {}

  /**
   * Check params in url and if there is an code/token then try to login with those.
   */
  public checkOAuthParamsInUrl(): void {
    this.basicAuthService.checkOAuthParamsInUrl();
  }

  /**
   * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
   */
  public loginWithRedirect(): boolean {
    return this.basicAuthService.loginWithRedirect();
  }

  /**
   * Loads a new user token with Resource Owner Password Flow.
   * @param userId
   * @param password
   */
  public authorize(userId: string, password: string): void {
    this.basicAuthService.authorize(userId, password);
  }

  /**
   * Logout a storefront customer.
   */
  public logout(): Promise<any> {
    return this.basicAuthService.logout();
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  public isUserLoggedIn(): Observable<boolean> {
    return this.basicAuthService.isUserLoggedIn();
  }

  /**
   * Initialize logout procedure by redirecting to the `logout` endpoint.
   */
  public initLogout(): void {
    this.basicAuthService.initLogout();
  }
}
