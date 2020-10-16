import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import { BasicAuthService } from '../services/basic-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected basicAuthService: BasicAuthService) {}

  initOAuthCallback(): void {
    this.basicAuthService.initOAuthCallback();
  }

  loginWithRedirect(): boolean {
    return this.basicAuthService.loginWithRedirect();
  }

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  public authorize(userId: string, password: string): void {
    this.basicAuthService.authorize(userId, password);
  }

  /**
   * Returns the user's token
   */
  public getToken(): Observable<AuthToken> {
    return this.basicAuthService.getToken();
  }

  /**
   * Logout a storefront customer
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
}
