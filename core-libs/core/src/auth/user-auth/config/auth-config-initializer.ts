/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { FeatureToggles } from '../../../features-config/feature-toggles';
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

  private featureToggles = inject(FeatureToggles);

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
    return this.addBaseSiteToClientIdEnabled(config)
      ? `${config.authentication?.client_id ?? ''}_${activeBaseSite}`
      : config.authentication?.client_id;
  }

  /**
   * Generates the Redirect URI based on provided static config and the dynamic base site.
   *
   * **When the "oauthCallbackPage" feature flag is disabled:**
   *
   * Appends the base site to the redirect URI.
   *
   * **When the "oauthCallbackPage" feature flag is enabled:**
   *
   * The configured redirect URI will be
   * modified depending on whether it is relative or absolute.
   * - Relative URIs are interpreted as a custom oAuth callback path.  The page origin will be used
   *   for the host, and base site will be added if enabled before the custom path.
   * - Absolute URIs will be treated as the intended value.  The base site
   *   will be appended to the path if enabled.
   */
  protected generateRedirectUri(activeBaseSite: string, config: AuthConfig) {
    const shouldAppendBaseSite = this.addBaseSiteToRedirectUriEnabled(config);
    const configuredRedirectUri =
      config.authentication?.OAuthLibConfig?.redirectUri;

    if (this.featureToggles.oauthCallbackPage) {
      const isAbsolute = !!configuredRedirectUri?.match(/^https?:\/\//);

      // use absolute redirect URI as URL base
      const urlSegments: string[] = [
        isAbsolute
          ? (configuredRedirectUri as string)
          : (this.getDefaultRedirectUri() ?? ''),
      ];

      if (shouldAppendBaseSite) {
        urlSegments.push(encodeURIComponent(activeBaseSite));
      }

      // Use relative redirect URI as page path
      if (!isAbsolute && configuredRedirectUri) {
        urlSegments.push(this.trimLeadingSlash(configuredRedirectUri));
      }

      return urlSegments.join('/');
    } else {
      // urlRoot is the provided config value or the system default
      const urlRoot = configuredRedirectUri ?? this.getDefaultRedirectUri();

      if (shouldAppendBaseSite) {
        return `${urlRoot}/${this.trimLeadingSlash(encodeURIComponent(activeBaseSite))}`;
      } else {
        return urlRoot;
      }
    }
  }

  /**
   * Should client ID be suffixed with the base site
   */
  protected addBaseSiteToClientIdEnabled(config: AuthConfig) {
    const baseSiteSuffix =
      config.authentication?.initializerOptions?.baseSiteSuffix;

    return (
      baseSiteSuffix === true ||
      (baseSiteSuffix === 'auto' && this.baseSiteInUrl())
    );
  }

  /**
   * Should redirect URI include the base site
   */
  protected addBaseSiteToRedirectUriEnabled(config: AuthConfig) {
    const addBaseSiteToRedirectUri =
      config.authentication?.initializerOptions?.addBaseSiteToRedirectUri;

    return (
      addBaseSiteToRedirectUri === true ||
      (addBaseSiteToRedirectUri === 'auto' && this.baseSiteInUrl())
    );
  }

  protected baseSiteInUrl() {
    return this.siteContextParamsService
      .getUrlEncodingParameters()
      .includes(BASE_SITE_CONTEXT_ID);
  }

  protected getDefaultRedirectUri() {
    return !this.isSSR ? this.windowRef.nativeWindow?.location.origin : '';
  }

  protected trimLeadingSlash(path: string): string {
    return path.startsWith('/') ? path.substring(1) : path;
  }
}
