/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import { RoutingConfig } from '../config/routing-config';

@Injectable({ providedIn: 'root' })
export class SecurePortalConfigInitializer implements ConfigInitializer {
  readonly scopes = ['routing'];
  readonly configFactory = () => this.resolveConfig().toPromise();

  constructor(
    protected baseSiteService: BaseSiteService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Emits the Routing config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<RoutingConfig> {
    return this.configInit.getStable('context').pipe(
      switchMap((config) => {
        const siteUid = config?.context?.[BASE_SITE_CONTEXT_ID]?.[0];
        return this.baseSiteService.get(siteUid).pipe(
          tap((baseSite) => {
            if (!baseSite) {
              throw new Error(
                `Error: Cannot get base site config for ${siteUid}.`
              );
            }
          }),
          map((baseSite) => this.getRoutingConfig(baseSite)),
          take(1)
        );
      })
    );
  }

  protected getRoutingConfig(source: BaseSite | undefined): RoutingConfig {
    const result = {
      routing: {
        protected: source?.requiresAuthentication,
      },
    };
    return result;
  }
}
