/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { RoutingConfig } from '../config/routing-config';

@Injectable({ providedIn: 'root' })
export class SecurePortalConfigInitializer implements ConfigInitializer {
  readonly scopes = ['routing'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());

  protected platformId = inject(PLATFORM_ID);

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
    return this.baseSiteService.get().pipe(
      tap((baseSite) => {
        if (!baseSite) {
          // On the server during build, log a warning instead of throwing
          // to allow the build process to continue
          if (isPlatformServer(this.platformId)) {
            /* eslint-disable-next-line no-console */
            console.warn(
              `[Spartacus] Cannot get current base site config during SSR/build. ` +
                `This is expected during build-time route extraction. ` +
                `Returning default routing config.`
            );
          } else {
            throw new Error(`Error: Cannot get current base site config .`);
          }
        }
      }),
      map((baseSite) => this.getRoutingConfig(baseSite)),
      take(1)
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
