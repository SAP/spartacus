/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { BASE_SITE_CONTEXT_ID } from 'core-libs/core/src/site-context/providers/context-ids';
import { map, Observable } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { SiteContextParamsService } from '../../../site-context/services';

/**
 * This class adds the base-site context to the redirect URI.
 *
 * This is useful when hosting multiple sites on the same domain and differentiating the base site
 * through the URL path.  Adding the context to the redirect URI
 * helps Spartacus to determine which base site to activate when returning from the authorization server.
 */
@Injectable({ providedIn: 'root' })
export class DynamicAuthConfigService {
  protected baseSiteService = inject(BaseSiteService);
  protected siteContextParamsService = inject(SiteContextParamsService);
  // protected siteContextUrlSerializer = inject(SiteContextUrlSerializer);

  protected generateClientId(_activeBaseSite: string, baseConfig: AuthConfig) {
    return baseConfig.clientId;
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

/**
 * This implementation of `DynamicAuthConfigService` adds the base-site context to
 * the redirect URI and adds the base-site as a suffix to the client ID.
 *
 * This is useful when hosting multiple sites on the same domain.  Adding the context to the redirect URI
 * helps Spartacus to determine which base site to activate when returning from the authorization server.
 */
@Injectable()
export class ClientIdSuffixDynamicAuthConfigService extends DynamicAuthConfigService {
  protected generateClientId(activeBaseSite: string, baseConfig: AuthConfig) {
    return `${baseConfig.clientId}_${activeBaseSite}`;
  }
}
