import { Injectable, inject } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  CmsActivatedRouteSnapshot,
  RoutingService,
} from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OppsCmsPageGuard extends CmsPageGuard {
  protected authRedirectService = inject(AuthRedirectService);
  protected authService = inject(AuthService);
  protected router = inject(Router);
  protected routingService = inject(RoutingService);
  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    {
      if (route.queryParams['loginrequired'] === 'true') {
        const url = `/login?redirectUrl=${this.getResolvedUrl(route)}`;
        const tree: UrlTree = this.router.parseUrl(url);
        return of(tree);
      } else return super.canActivate(route, state);
    }
  }
  getResolvedUrl(route: CmsActivatedRouteSnapshot): string {
    let url = route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
    const queryParam = route.queryParamMap;
    if (queryParam.keys.length > 0) {
      url +=
        '?' +
        queryParam.keys
          .map((key) =>
            queryParam
              .getAll(key)
              .map((value) => {
                if (key !== 'loginrequired') return key + '=' + value;
              })
              .join('&')
          )
          .join('&');
    }
    return url;
  }
}

// example url:
// http://localhost:4200/apparel-uk-spa/en/GBP/product/300062456/helmet-women-tsg-lotus-graphic-designs-wms-butterfly-lxl?loginrequired=true
// user: steve.smith@gmail.com welcome
