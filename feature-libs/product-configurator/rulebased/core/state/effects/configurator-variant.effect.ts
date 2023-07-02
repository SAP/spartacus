/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { ConfiguratorType } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { ConfiguratorCoreConfig } from '../../config/configurator-core.config';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';

@Injectable()
/**
 * Rulebased configurator effects related to variant search
 */
export class ConfiguratorVariantEffects {
  protected logger = inject(LoggerService);

  searchVariants$: Observable<
    | ConfiguratorActions.SearchVariantsSuccess
    | ConfiguratorActions.SearchVariantsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfiguratorActions.SEARCH_VARIANTS),
      filter(
        () =>
          this.configuratorCoreConfig.productConfigurator
            ?.enableVariantSearch === true
      ),
      filter(
        (action: ConfiguratorActions.SearchVariants) =>
          action.payload.owner.configuratorType === ConfiguratorType.VARIANT
      ),
      switchMap((action: ConfiguratorActions.SearchVariants) => {
        return this.configuratorCommonsConnector
          .searchVariants(action.payload)
          .pipe(
            switchMap((result: Configurator.Variant[]) => [
              new ConfiguratorActions.SearchVariantsSuccess({
                ownerKey: action.payload.owner.key,
                variants: result,
              }),
            ]),
            catchError((error) => [
              new ConfiguratorActions.SearchVariantsFail({
                ownerKey: action.payload.owner.key,
                error: normalizeHttpError(error, this.logger),
              }),
            ])
          );
      })
    )
  );

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector,
    protected configuratorCoreConfig: ConfiguratorCoreConfig
  ) {}
}
