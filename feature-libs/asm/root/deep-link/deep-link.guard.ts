import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { AsmEnablerService } from '../services/asm-enabler.service';
import { DeepLinkService, ParamData } from './deep-link.service';

export const paramDataKeys = ['customerId', 'orderId', 'cartId'];

@Injectable({
  providedIn: 'root',
})
export class DeepLinkGuard implements CanActivate {
  static guardName = 'DeepLinkGuard';

  constructor(
    protected router: Router,
    protected routingService: RoutingService,
    protected asmEnablerService: AsmEnablerService,
    protected semanticPathService: SemanticPathService,
    protected service: DeepLinkService,
  ) {}

  /**
   * Tries to load the CMS page data for the anticipated route and returns:
   * - `true` - if it can be activated
   * - `false` - if it cannot be activated
   * - `UrlTree` - if user should be redirected to a given `UrlTree`
   *
   * If the route can be activated, it fires additional calculations on the CMS components present on this CMS page,
   * based on their configuration (`cmsComponents` config).
   *
   * For more, see docs of the `DeepLinkGuardService.canActivatePage`.
   */
  canActivate(
    route: CmsActivatedRouteSnapshot,
  ): UrlTree | boolean {
    if (('/' + route.url.map(urlSegment => urlSegment.path).join('/')) === this.semanticPathService.get('asmDeepLink')) {
      const paramData = Object.entries(route.queryParams).reduce((current: ParamData, entry) => {
        if (paramDataKeys.includes(entry[0])) {
          current[entry[0]] = entry[1];
        }
        return current;
      }, {});

      this.service.setParamData(paramData);

      const homeUrlTree = this.router.parseUrl(
        this.semanticPathService.get('home') ?? ''
      );

      return homeUrlTree;
    } else {
      return true;
    }
  }
}
