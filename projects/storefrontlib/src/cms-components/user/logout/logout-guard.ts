import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  CmsService,
  PageType,
  RoutingService,
  SemanticPathService,
  ProtectedRoutesService,
} from '@spartacus/core';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(
    auth: AuthService,
    cms: CmsService,
    routing: RoutingService,
    semanticPathService: SemanticPathService,
    // tslint:disable-next-line: unified-signatures
    protectedRoutes: ProtectedRoutesService
  );
  /**
   * @deprecated since 1.4
   * Check #5666 for more info
   *
   * TODO(issue:5666) Deprecated since 1.4
   */
  constructor(
    auth: AuthService,
    cms: CmsService,
    routing: RoutingService,
    semanticPathService: SemanticPathService
  );
  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected routing: RoutingService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes?: ProtectedRoutesService
  ) {}

  canActivate(): Observable<any> {
    this.logout();

    return this.cms
      .hasPage({
        id: this.semanticPathService.get('logout'),
        type: PageType.CONTENT_PAGE,
      })
      .pipe(
        filter(hasPage => !hasPage),
        tap(() => this.redirect())
      );
  }

  protected redirect(): void {
    const cxRoute =
      this.protectedRoutes && this.protectedRoutes.isAppProtected()
        ? 'login'
        : 'home';

    this.routing.go({ cxRoute });
  }

  protected logout(): void {
    this.auth.logout();
  }
}
