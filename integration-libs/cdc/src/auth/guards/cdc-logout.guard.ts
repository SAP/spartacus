import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  SemanticPathService,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { CdcAuthService } from '../facade';

/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcLogoutGuard extends LogoutGuard {
  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
    protected cdcAuthService: CdcAuthService
  ) {
    super(auth, cms, semanticPathService, protectedRoutes, router);
  }

  protected logout(): Promise<any> {
    return Promise.all([super.logout(), this.cdcAuthService.logoutFromCdc()]);
  }
}
