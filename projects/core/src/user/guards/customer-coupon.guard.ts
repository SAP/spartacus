import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { RoutingConfigService } from '../../routing/configurable-routes/routing-config.service';
import { RoutingService } from '../../routing/facade/routing.service';
@Injectable({
  providedIn: 'root',
})
export class CustomerCouponGuard implements CanActivate {
  couponCode$: Observable<string>;
  constructor(
    protected routingConfigService: RoutingConfigService,
    private routing: RoutingService,
    protected router: Router,
    private messageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    this.couponCode$ = this.routing
      .getRouterState()
      .pipe(map(routingData => routingData.state.params['couponCode']));

    this.messageService.add(
      { key: 'Your have cliam a coupon.' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    return of(
      this.router.parseUrl(
        this.routingConfigService.getRouteConfig('home').paths[0]
      )
    );
  }
}
