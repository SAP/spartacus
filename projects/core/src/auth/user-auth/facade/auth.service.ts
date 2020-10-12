import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import { BasicAuthService } from '../services/basic-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected basicAuthService: BasicAuthService) {
    this.initImplicit();
  }

  initImplicit() {
    this.basicAuthService.initImplicit();
  }

  loginWithImplicitFlow() {
    this.basicAuthService.loginWithImplicitFlow();
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
   * This function provides the userId the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   *
   * It returns the userId of the current storefront user or 'anonymous'
   * in the case there are no signed in user in the storefront.
   *
   * The user id of a regular customer session is 'current'.  In the case of an
   * asm customer emulation session, the userId will be the customerId.
   */
  public getOccUserId(): Observable<string> {
    return this.basicAuthService.getOccUserId();
  }

  /**
   * Calls provided callback with current user id.
   *
   * @param cb callback function to invoke
   */
  public invokeWithUserId(cb: (userId: string) => any): Subscription {
    return this.basicAuthService.invokeWithUserId(cb);
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
