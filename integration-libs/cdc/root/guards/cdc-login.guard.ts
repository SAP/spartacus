import { Injectable } from '@angular/core';
import { AuthService, AuthConfigService } from '@spartacus/core';
import { CmsPageGuard, LoginGuard } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';

/**
 * @override
 *
 * CDC version of login guard.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcLoginGuard extends LoginGuard {
  constructor(
    protected authService: AuthService,
    protected authConfigService: AuthConfigService,
    protected cmsPageGuard: CmsPageGuard
  ) {
    super(authService, authConfigService, cmsPageGuard);
  }

  protected shouldRenderCMSPage(): Observable<Boolean> {
    return of(true); // always load CMS Login Page
  }
}
