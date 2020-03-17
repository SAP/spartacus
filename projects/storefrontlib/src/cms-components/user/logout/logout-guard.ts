import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  AuthService,
  CmsService,
  PageType,
  ProtectedRoutesService,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected routing: RoutingService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService
  ) {}

  canActivate(): Observable<any> {
    this.logout();

    return this.cms
      .hasPage({
        id: this.semanticPathService.get('logout'),
        type: PageType.CONTENT_PAGE,
      })
      .pipe(
        tap(hasPage => {
          if (!hasPage) {
            this.redirect();
          }
        })
      );
  }

  protected redirect(): void {
    const cxRoute: string =
      this.protectedRoutes && this.protectedRoutes.shouldProtect
        ? 'login'
        : 'home';

    this.routing.go({ cxRoute });
  }

  protected logout(): void {
    this.auth.logout();
  }
}
