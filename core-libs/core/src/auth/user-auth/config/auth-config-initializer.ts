/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../../site-context/services';
import { WindowRef } from '../../../window/window-ref';
import { AuthConfig } from './auth-config';

@Injectable({ providedIn: 'root' })
export class AuthConfigInitializer implements ConfigInitializer {
  readonly scopes = [
    'authentication.OAuthLibConfig.redirectUri',
    'authentication.client_id',
  ];
  readonly configFactory = () => firstValueFrom(this.resolveConfig());

  protected configInit = inject(ConfigInitializerService);
  protected baseSiteService = inject(BaseSiteService);
  protected siteContextParamsService = inject(SiteContextParamsService);
  protected windowRef = inject(WindowRef);

  protected isSSR = !this.windowRef.isBrowser();

  protected resolveConfig(): Observable<AuthConfig> {
    return combineLatest({
      baseSite: this.baseSiteService.getActive(),
      authConfig: this.configInit.getStable(
        'authentication.initializerOptions'
      ),
    }).pipe(
      map(({ baseSite, authConfig }) => {
        return {
          authentication: {
            client_id: this.generateClientId(baseSite, authConfig),
            OAuthLibConfig: {
              redirectUri: this.generateRedirectUri(baseSite, authConfig),
            },
          },
        };
      })
    );
  }

  protected generateClientId(activeBaseSite: string, config: AuthConfig) {
    const baseSiteSuffix =
      config.authentication?.initializerOptions?.baseSiteSuffix;

    return baseSiteSuffix === true ||
      (baseSiteSuffix === 'auto' && this.baseSiteInUrl())
      ? `${config.authentication?.client_id ?? ''}_${activeBaseSite}`
      : config.authentication?.client_id;
  }

  protected generateRedirectUri(activeBaseSite: string, config: AuthConfig) {
    const addBaseSiteToRedirectUri =
      config.authentication?.initializerOptions?.addBaseSiteToRedirectUri;

    if (
      addBaseSiteToRedirectUri === true ||
      (addBaseSiteToRedirectUri === 'auto' && this.baseSiteInUrl())
    ) {
      const urlRoot =
        config.authentication?.OAuthLibConfig?.redirectUri ??
        (!this.isSSR ? this.windowRef.nativeWindow?.location.origin : '');

      return `${urlRoot}/${encodeURIComponent(activeBaseSite)}`;
    } else {
      return config.authentication?.OAuthLibConfig?.redirectUri;
    }
  }

  protected baseSiteInUrl() {
    return this.siteContextParamsService
      .getUrlEncodingParameters()
      .includes(BASE_SITE_CONTEXT_ID);
  }
}
