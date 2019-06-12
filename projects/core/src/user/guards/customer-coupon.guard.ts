import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { RoutingConfigService } from '../../routing/configurable-routes/routing-config.service';
import { RoutingService } from '../../routing/facade/routing.service';
import { UserService } from '../facade/user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerCouponGuard implements CanActivate {
  private subscription = new Subscription();
  couponCode$: Observable<string>;
  constructor(
    protected routingConfigService: RoutingConfigService,
    private routing: RoutingService,
    protected router: Router,
    private messageService: GlobalMessageService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    this.couponCode$ = this.routing
      .getRouterState()
      .pipe(map(routingData => routingData.state.params['couponCode']));

    this.userService.claimCustomerCoupon('CustomerCoupon3');

    this.subscription.add(
      this.userService
        .getRemoveUserResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );

    return of(
      this.router.parseUrl(
        this.routingConfigService.getRouteConfig('home').paths[0]
      )
    );
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.messageService.add(
        { key: 'Your have cliam a coupon.' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
}
