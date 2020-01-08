import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderAmendService } from '../order-amend.service';

@Injectable({
  providedIn: 'root',
})
export class CancelOrReturnRequestInputGuard implements CanActivate {
  constructor(
    private router: Router,
    protected orderAmendService: OrderAmendService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.orderAmendService.getForm().pipe(
      map(form => {
        if (!form.valid) {
          const urlSegments: string[] = route.url.map(seg => seg.path);
          urlSegments.pop();
          return this.router.parseUrl(urlSegments.join('/'));
        } else {
          return true;
        }
      })
    );
  }
}
