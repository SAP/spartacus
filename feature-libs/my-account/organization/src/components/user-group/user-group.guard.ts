import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserGroupService, RoutingService, UserGroup } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class UserGroupGuard implements CanActivate {
  constructor(
    protected userGroupService: UserGroupService,
    protected routingService: RoutingService
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    console.log(' GUARD ACTIVATED');
    const code = activatedRoute.params['code'];
    return this.userGroupService.get(code).pipe(
      map((userGroup) => {
        console.log(userGroup);
        if (this.isEmpty(userGroup)) {
          this.routingService.go({ cxRoute: 'userGroup' });
          return false;
        } else {
          return true;
        }
      })
    );
  }

  protected isEmpty(userGroup: UserGroup) {
    return Object.keys(userGroup).length === 0;
  }
}
