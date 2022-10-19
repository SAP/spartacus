/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { RoutingConfig } from '../config/routing-config';

@Injectable({ providedIn: 'root' })
export class SecurePortalConfigInitializer implements ConfigInitializer {
  readonly scopes = ['routing'];
  readonly configFactory = () => this.resolveConfig().toPromise();

  constructor(
    protected baseSiteService: BaseSiteService,
    protected javaRegExpConverter: JavaRegExpConverter,
    protected winRef: WindowRef
  ) {}

  private get currentUrl(): string {
    return this.winRef.location.href as string;
  }

  /**
   * Emits the site context config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<RoutingConfig> {
    return this.baseSiteService.getAll().pipe(
      map((baseSites) =>
        baseSites?.find((site) => this.isCurrentBaseSite(site))
      ),
      filter((baseSite: any) => {
        if (!baseSite) {
          throw new Error(
            `Error: Cannot get base site config! Current url (${this.currentUrl}) doesn't match any of url patterns of any base sites.`
          );
        }
        return Boolean(baseSite);
      }),
      map((baseSite) => this.getRoutingConfig(baseSite)),
      take(1)
    );
  }

  protected getRoutingConfig(source: BaseSite): RoutingConfig {
    const result = {
      routing: {
        protected: source.requiresAuthentication === true,
      },
    };
    return result;
  }

  private isCurrentBaseSite(site: BaseSite): boolean {
    const index = (site.urlPatterns || []).findIndex((javaRegexp: string) => {
      const jsRegexp = this.javaRegExpConverter.toJsRegExp(javaRegexp);
      if (jsRegexp) {
        const result = jsRegexp.test(this.currentUrl);
        return result;
      }
    });

    return index !== -1;
  }
}
