import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service serves storage role for AuthRedirectService.
 * Used by AuthStatePersistenceService to store redirect url for OAuth flows that rely on redirects.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRedirectStorageService {
  constructor() {}

  private redirectUrl$: Observable<string> = new BehaviorSubject<string>(
    undefined
  );

  /**
   * Get redirect url after logging in.
   *
   * @returns observable with the redirect url as string
   */
  getRedirectUrl(): Observable<string> {
    return this.redirectUrl$;
  }

  /**
   * Set url to redirect to after login.
   *
   * @param redirectUrl
   */
  setRedirectUrl(redirectUrl: string): void {
    (this.redirectUrl$ as BehaviorSubject<string>).next(redirectUrl);
  }
}
