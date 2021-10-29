import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotCheckoutAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected activeCartService: ActiveCartService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return this.router.parseUrl(this.semanticPathService.get('home'));
        } else if (this.activeCartService.isGuestCart()) {
          return this.router.parseUrl(this.semanticPathService.get('cart'));
        }
        return !isLoggedIn;
      })
    );
  }
}
