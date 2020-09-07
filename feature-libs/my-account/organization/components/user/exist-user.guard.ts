import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { B2BUser, B2BUserService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard implements CanActivate {
  constructor(
    protected userService: B2BUserService,
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

    return this.userService.get(urlParams.code).pipe(
      map((user) => {
        if (user && this.isValid(user)) {
          return true;
        }

        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(user: B2BUser): boolean {
    return Object.keys(user).length !== 0;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('user'));
  }
}
