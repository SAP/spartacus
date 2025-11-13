/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { RoutingConfig } from '../config/routing-config';

@Injectable({ providedIn: 'root' })
export class SecurePortalConfigInitializer implements ConfigInitializer {
  protected baseSiteService = inject(BaseSiteService);
  protected configInit = inject(ConfigInitializerService);

  readonly scopes = ['routing'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  /**
   * Emits the Routing config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<RoutingConfig> {
    return this.baseSiteService.get().pipe(
      tap((baseSite) => {
        if (!baseSite) {
          throw new Error(`Error: Cannot get current base site config .`);
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
