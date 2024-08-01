/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ObjectComparisonUtils } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  EMPTY,
  filter,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../core/model/configurator.model';

/**
 * Stateful service to react on price changes of the configuration. Hence components using this service must provide it within their declaration:
 *
 * @Component({ providers: [ConfiguratorAttributePriceChangeService] })
 *
 * getChangedPrices will return an observable that emits whenever the price of a monitored attribute (identified by the provided attribute key) changes,
 * hence allowing the subscriber for example to trigger rerendering of the prices on the UI.
 */
@Injectable()
export class ConfiguratorAttributePriceChangeService {
  protected configuratorRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected lastAttributeSupplement:
    | Configurator.AttributeSupplement
    | undefined;

  /**
   * Returns an observable that shall be used by all components supporting delta rendering mode.
   * It will monitor the price supplements of configuration observable and emit true if price supplements
   * matching the given attribute key have changed.
   * Additionally it returns always true for the first emission of the underlying configuration observable.
   * This ensures that an enclosing UI component will initially render, even if the async pricing request ist still running,
   * so that the UI is not blocked. Afterwards a rerender shall only occur if prices change.
   * This all assumes that the enclosing UI component itself gets recreated or rerendered (triggered elsewhere) whenever the attribute itself changes content wise.
   *
   * @param attributeKey key of the attribute for which the prices should be checked for changes
   * @returns observable that emits 'true' each time a price changes and hence there is the need to rerender the enclosing component
   */
  getChangedPrices(
    attributeKey: string | undefined
  ): Observable<Record<string, Configurator.PriceDetails>> {
    let isInitialConfiguration: boolean = true;
    return this.configuratorRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService
          .getConfiguration(routerData.owner)
          .pipe(
            // Initially render attribute without prices, so UI is not blocked, otherwise only re-ender if prices changed.
            // Changes of attribute itself are already handled in the attribute composition directive.
            filter(
              (config) => isInitialConfiguration || !!config.priceSupplements
            ),
            switchMap((config) => {
              if (!config.priceSupplements) {
                return of({});
              }
              const changedPrices = this.checkForValuePriceChanges(
                config,
                attributeKey
              );
              return changedPrices ? of(changedPrices) : EMPTY;
            }),
            tap(() => (isInitialConfiguration = false))
          );
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Extracts the relevant value prices from the price supplements
   * and stores them within the component. Returns a boolean indicating
   * whether there were any value price changes.
   *
   * @param config current config
   * @param attributeKey key of the attribute for which the prices should be checked for changes
   * @returns {true}, only if at least one value price changed
   */
  protected checkForValuePriceChanges(
    config: Configurator.Configuration,
    attributeKey: string | undefined
  ): Record<string, Configurator.PriceDetails> | undefined {
    const attributeSupplement = config.priceSupplements?.find(
      (supplement) => supplement.attributeUiKey === attributeKey
    );
    const changed = !ObjectComparisonUtils.deepEqualObjects(
      this.lastAttributeSupplement ?? {},
      attributeSupplement ?? {}
    );
    undefined;
    if (changed) {
      let changedPrices: Record<string, Configurator.PriceDetails> = {};
      this.lastAttributeSupplement = attributeSupplement;
      attributeSupplement?.valueSupplements.forEach(
        (valueSupplement) =>
          (changedPrices[valueSupplement.attributeValueKey] =
            valueSupplement.priceValue)
      );
      return changedPrices;
    }
    return undefined;
  }
}
