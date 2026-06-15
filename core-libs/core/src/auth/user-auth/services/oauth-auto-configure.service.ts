/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { map, Observable } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../../site-context/services';
import { AuthConfig as SpartacusAuthConfig } from '../config/auth-config';

/**
 * This class handles auto-configuration of the oAuth library.  This is primarily to set base-site dependent
 * context to the configuration, such as the redirect URI.
 *
 * This is useful when hosting multiple sites on the same domain and differentiating the base site
 * through the URL path.  Adding the context to the redirect URI
 * helps Spartacus to determine which base site to activate when returning from the authorization server.
 */
@Injectable({ providedIn: 'root' })
export class OAuthAutoConfigureService {
  protected authConfig = inject(SpartacusAuthConfig);
  protected baseSiteService = inject(BaseSiteService);
  protected siteContextParamsService = inject(SiteContextParamsService);

  protected generateClientId(activeBaseSite: string, baseConfig: AuthConfig) {
    return this.authConfig.authentication?.autoConfigure?.baseSiteSuffix
      ? `${baseConfig.clientId}_${activeBaseSite}`
      : baseConfig.clientId;
  }

  protected generateRedirectUri(
    activeBaseSite: string,
    baseConfig: AuthConfig
  ) {
    if (
      this.siteContextParamsService
        .getUrlEncodingParameters()
        .includes(BASE_SITE_CONTEXT_ID)
    ) {
      return (
        (baseConfig.redirectUri ?? '') +
        `/${encodeURIComponent(activeBaseSite)}`
      );
    } else {
      return baseConfig.redirectUri;
    }
  }

  getConfig(baseConfig: AuthConfig): Observable<AuthConfig> {
    return this.baseSiteService.getActive().pipe(
      map((baseSite) => ({
        ...baseConfig,
        clientId: this.generateClientId(baseSite, baseConfig),
        redirectUri: this.generateRedirectUri(baseSite, baseConfig),
      }))
    );
  }
}
