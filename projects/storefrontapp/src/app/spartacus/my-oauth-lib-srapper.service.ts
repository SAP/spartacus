import { inject, Injectable, Provider } from '@angular/core';
import { BaseSiteService, OAuthLibWrapperService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyOAuthLibWrapperService extends OAuthLibWrapperService {
  protected subscription: Subscription | undefined;
  protected baseSiteService = inject(BaseSiteService);

  protected override initialize() {
    this.baseSiteService ??= inject(BaseSiteService);

    const config = this.generateCustomerLoginConfig();

    // this.oAuthService.configure(config);
    this.subscription?.unsubscribe();
    this.subscription = this.baseSiteService
      .getActive()
      .subscribe((baseSite) => {
        const dynamicConfig = {
          ...config,
          clientId: config.clientId + `_${baseSite}`,
          redirectUri: config.redirectUri + `/${encodeURIComponent(baseSite)}`,
        };

        console.log('setting config', dynamicConfig);

        this.oAuthService.configure(dynamicConfig);
      });

    // reconfigure after getting language
    this.federatedLoginService.detectContext();
    if (this.federatedLoginService.enabled) {
      this.federatedLoginParamsSub?.unsubscribe();
      this.federatedLoginParamsSub = this.federatedLoginService
        .getParameters()
        .subscribe((parameterString) => {
          const updatedConfig = this.generateCustomerLoginConfig();

          updatedConfig.loginUrl +=
            (updatedConfig.loginUrl.includes('?') ? '&' : '?') +
            parameterString;

          this.oAuthService.configure(updatedConfig);
        });
    }
  }
}

/** Override the existing `OAuthLibWrapperService` with our custom version */
export const oAuthLibWrapperServiceOverride: Provider = {
  provide: OAuthLibWrapperService,
  useClass: MyOAuthLibWrapperService,
};
