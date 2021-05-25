import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';

/**
 * Checks if there isn't any logged in user.
 * Use to protect pages dedicated only for guests (eg. login page).
 */
@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    this.authRedirectService.reportNotAuthGuard();

    // redirect, if user is already logged in:
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return this.router.parseUrl(this.semanticPathService.get('home'));
        }
        return !isLoggedIn;
      })
    );
  }
}
