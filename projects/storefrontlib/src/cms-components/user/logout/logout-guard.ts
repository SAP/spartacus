import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  CmsService,
  PageType,
  RoutingService,
} from '@spartacus/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  static GUARD_NAME = 'LogoutGuard';

  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected routing: RoutingService
  ) {}

  canActivate(): Observable<any> {
    this.logout();

    return this.cms
      .hasPage({
        id: '/logout',
        type: PageType.CONTENT_PAGE,
      })
      .pipe(
        tap(hasPage => {
          if (!hasPage) {
            this.routing.go(['/']);
          }
        })
      );
  }

  protected logout(): void {
    this.auth.logout();
  }
}
