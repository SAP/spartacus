import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { OrderDetailsService } from '../../order-details/order-details.service';

@Injectable({
  providedIn: 'root',
})
export class CancelOrReturnRequestInputGuard implements CanActivate {
  constructor(
    private orderDetailsService: OrderDetailsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.orderDetailsService.cancelOrReturnRequestInputs) {
      return true;
    } else {
      const urlSegments: string[] = route.url.map(seg => seg.path);
      urlSegments.pop();
      return this.router.parseUrl(urlSegments.join('/'));
    }
  }
}
