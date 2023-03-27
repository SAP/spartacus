/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Config,
  ConfigInitializer,
  ConfigInitializerService,
  I18nConfig,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 * Inspired by https://stackoverflow.com/a/67588414
 */
@Injectable({
  providedIn: 'root',
})
export class CustomI18nConfigInitializer implements ConfigInitializer {
  readonly scopes = ['i18n.backend.loadPath']; // declare config key that you will resolve
  readonly configFactory = () => this.resolveConfig().toPromise();

  constructor(
    protected configInit: ConfigInitializerService,
    private occEndpoints: OccEndpointsService
  ) {}

  protected resolveConfig(): Observable<I18nConfig> {
    return this.configInit.getStable('context.baseSite').pipe(
      take(1),
      map(() => {
        // eslint-disable-next-line no-console
        console.log(
          'i18n config initializer, load path: ' +
            this.occEndpoints.buildUrl('i18n')
        );
        return {
          i18n: {
            backend: {
              loadPath: this.occEndpoints.buildUrl('i18n'),
            },
          },
        } as Config;
      })
    );
  }
}
