import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PermissionService, RoutingService, Permission } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ActivePermissionGuard implements CanActivate {
  constructor(
    protected permissionService: PermissionService,
    protected routingService: RoutingService
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.params['code'];
    return this.permissionService.get(code).pipe(
      map((permission) => {
        if (permission && this.isActive(permission)) {
          return true;
        }

        this.routingService.go({ cxRoute: 'permission' });
        return false;
      })
    );
  }

  protected isActive(permission: Permission): boolean {
    return permission.active;
  }
}
