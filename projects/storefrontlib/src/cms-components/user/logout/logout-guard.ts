import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  CmsService,
  PageType,
  RoutingService,
  UrlService,
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
    protected routing: RoutingService,
    protected urlService: UrlService
  ) {}

  canActivate(): Observable<any> {
    this.logout();

    return this.cms
      .hasPage({
        id: this.urlService.getSemanticUrl('logout'),
        type: PageType.CONTENT_PAGE,
      })
      .pipe(
        tap(hasPage => {
          if (!hasPage) {
            this.routing.go({ cxRoute: 'home' });
          }
        })
      );
  }

  protected logout(): void {
    this.auth.logout();
  }
}
