import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGroupGuard implements CanActivate {
  constructor(
    protected userGroupService: UserGroupService,
    protected router: Router,
    protected semanticPathService: SemanticPathService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: '',
    };

    urlParams.code = activatedRoute.params['code'];

    return this.userGroupService.get(urlParams.code).pipe(
      map((userGroup) => {
        if (userGroup && this.isValid(userGroup)) {
          return true;
        }

        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(userGroup: UserGroup): boolean {
    return Object.keys(userGroup).length !== 0;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('userGroup'));
  }
}
