/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { map, Observable } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import {
  SiteContextParamsService,
  SiteContextUrlSerializer,
} from '../../../site-context/services';
import { AuthConfigService } from './auth-config.service';

@Injectable()
// @Injectable({ providedIn: 'root' })
export class DynamicAuthConfigService {
  protected baseSiteService = inject(BaseSiteService);
  protected authConfigService = inject(AuthConfigService);
  protected siteContextParamsService = inject(SiteContextParamsService);
  protected siteContextUrlSerializer = inject(SiteContextUrlSerializer);

  generateClientId(activeBaseSite: string) {
    return `${this.authConfigService.getClientId()}_${activeBaseSite}`;
  }

  getConfig(baseConfig: AuthConfig): Observable<AuthConfig> {
    return this.baseSiteService.getActive().pipe(
      map((baseSite) => ({
        ...baseConfig,
        clientId: this.generateClientId(baseSite),
        redirectUri:
          baseConfig.redirectUri + `/${encodeURIComponent(baseSite)}`,
      }))
    );
  }
}
