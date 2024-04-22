import { Injectable, inject, isDevMode } from '@angular/core';
import { RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {
  AuthRedirectService,
  CmsActivatedRouteSnapshot,
  LoggerService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OppsConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class OppsLoginRequiredGuard {
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);
  protected authRedirectService = inject(AuthRedirectService);
  protected logger = inject(LoggerService);
  protected config = inject(OppsConfig);
  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const navigation = this.router.getCurrentNavigation();
    if (!this.config.opps?.loginRequired?.urlParameter && isDevMode()) {
      this.logger.warn(
        `There is no url query parameter configured for OPPS login-required feature`
      );
    }
    const urlParameter = this.config.opps?.loginRequired?.urlParameter ?? '';
    if (route.queryParams[urlParameter] === 'true' && navigation?.finalUrl) {
      const url = this.router.serializeUrl(navigation.finalUrl);
      const urlTree = this.router.parseUrl(url);
      delete urlTree.queryParams.loginRequired;
      const newUrl = this.router.serializeUrl(urlTree);
      this.authRedirectService.setRedirectUrl(newUrl);
      return of(
        this.router.parseUrl(this.semanticPathService.get('login') ?? '')
      );
    }
    return of(true);
  }
}
