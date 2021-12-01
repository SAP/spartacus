import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { AuthService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotCheckoutAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn().pipe(
      withLatestFrom(this.activeCartFacade.isGuestCart()),
      map(([isLoggedIn, isGuestCart]) => {
        if (isLoggedIn) {
          return this.router.parseUrl(this.semanticPathService.get('home'));
        } else if (isGuestCart) {
          return this.router.parseUrl(this.semanticPathService.get('cart'));
        }
        return !isLoggedIn;
      })
    );
  }
}
