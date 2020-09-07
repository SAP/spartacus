import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Permission, SemanticPathService } from '@spartacus/core';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistPermissionGuard implements CanActivate {
  constructor(
    protected permissionService: PermissionService,
    protected router: Router,
    protected semanticPathService: SemanticPathService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: '',
    };

    urlParams.code = activatedRoute.params['permissionCode'];

    return this.permissionService.get(urlParams.code).pipe(
      map((permission) => {
        if (permission && this.isValid(permission)) {
          return true;
        }

        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(permission: Permission): boolean {
    return Object.keys(permission).length !== 0;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('permission'));
  }
}
