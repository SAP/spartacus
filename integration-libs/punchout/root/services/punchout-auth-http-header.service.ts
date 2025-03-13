import { inject, Injectable } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthLibWrapperService,
  OccEndpointsService,
  RoutingService,
} from '@spartacus/core';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAuthHttpHeaderService extends AuthHttpHeaderService {
  protected punchoutInitService = inject(PunchoutDetectionService);
  constructor(
    protected authService: AuthService,
    protected authStorageService: AuthStorageService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected occEndpointsService: OccEndpointsService,
    protected authRedirectService: AuthRedirectService
  ) {
    super(
      authService,
      authStorageService,
      oAuthLibWrapperService,
      routingService,
      occEndpointsService,
      globalMessageService,
      authRedirectService
    );
  }

  /**
   * @override
   *
   * On backend errors indicating expired `refresh_token` we need to logout
   * silently revoke invalid/expired token
   */
  public handleExpiredRefreshToken(): void {
    if (!this.punchoutInitService.isPunchoutSessionPage()) {
      super.handleExpiredRefreshToken();
    } else {
      this.authService.coreLogout().finally(() => {
        this.globalMessageService.remove(
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    }
  }
}
