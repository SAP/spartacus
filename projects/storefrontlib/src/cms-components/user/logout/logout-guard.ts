import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  AuthService,
  CmsService,
  PageType,
  RoutingService,
  SemanticPathService,
  ProtectedRoutesService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  /**
   * @deprecated since 1.4
   * Check #5666 for more info
   *
   * TODO(issue:5666) Deprecated since 1.4
   */
  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected routing: RoutingService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes?: ProtectedRoutesService,
    protected featureConfig?: FeatureConfigService
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
    // TODO(issue:5666) Deprecated since 1.4
    const cxRoute: string =
      this.featureConfig.isLevel('1.4') &&
      this.protectedRoutes &&
      this.protectedRoutes.shouldProtect
        ? 'login'
        : 'home';

    this.routing.go({ cxRoute });
  }

  protected logout(): void {
    this.auth.logout();
  }
}
