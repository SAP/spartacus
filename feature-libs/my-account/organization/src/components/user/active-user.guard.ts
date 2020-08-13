import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { B2BUserService, RoutingService, B2BUser } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserGuard implements CanActivate {
  constructor(
    protected userService$: B2BUserService,
    protected routingService: RoutingService,
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.params['code'];
    return this.userService$.get(code).pipe(
      map((user) => {
        if (user && this.isActive(user)) {
          return true;
        }

        this.routingService.go({ cxRoute: 'user' });
        return false;
      })
    );
  }

  protected isActive(user: B2BUser): boolean {
    return user.active;
  }
}
