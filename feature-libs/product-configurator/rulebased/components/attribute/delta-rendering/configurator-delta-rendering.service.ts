import { Injectable, inject } from '@angular/core';
import { ObjectComparisonUtils } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  Configurator,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';
import { EMPTY, Observable, filter, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ConfiguratorDeltaRenderingService {
  protected configuratorRouterExtractorService = inject(
    ConfiguratorRouterExtractorService
  );
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected isInitialRendering: boolean = true;
  protected lastAttributeSupplement:
    | Configurator.AttributeSupplement
    | undefined;
  protected valuePrices: { [key: string]: Configurator.PriceDetails } = {};

  /**
   * Returns an observable that shall be used by all components supporting delta rendering mode.
   * It will monitor the price supplements of configuration observable and emit true if price supplements
   * matching the given attribute key have changed.
   * Additionally it returns always true for the first emission of the underlying configuration observable.
   * This ensures that a enclosing UI component will initially render, even if the async pricing request ist still running,
   * so that the UI is not blocked. Afterwards a rerender shall only occur if prices change.
   * This all assumes that the enclosing UI component itself gets recreated or rerendered (triggered elsewhere) whenever the attribute itself changes content wise.
   *
   * @param isDeltaRendering flag indicating whether delta rendering is activated in the current context
   * @param attributeKey key of the attribute for which the prices should be checked for changes
   * @returns observable that emits 'true' each time there is the need to rerender the enclosing component due to an price change
   */
  public rerender(
    isDeltaRendering: boolean,
    attributeKey: string
  ): Observable<boolean> {
    return isDeltaRendering
      ? this.configuratorRouterExtractorService.extractRouterData().pipe(
          switchMap((routerData) => {
            return this.configuratorCommonsService
              .getConfiguration(routerData.owner)
              .pipe(
                // Initially render domain values (DDLB options) without prices, so UI is not blocked, otherwise only re-ender if prices changed.
                // Changes of attribute itself are already handled in the attribute composition directive.
                filter(
                  (config) =>
                    this.isInitialRendering || !!config.priceSupplements
                ),
                switchMap((config) => {
                  if (this.isInitialRendering) {
                    return of(true);
                  }
                  const pricesChanged = this.checkForValuePriceChanges(
                    config,
                    attributeKey
                  );
                  return pricesChanged ? of(true) : EMPTY;
                }),
                tap(() => (this.isInitialRendering = false))
              );
          })
        )
      : of(true); // no async pricing -> we can render directly with prices
  }

  /**
   * Merges value price data received via @see {ConfiguratorValuePriceChanged} events into the given value, if available.
   * As the value might be read-only a new object will be returned combining price and value.
   *
   * @param value the value
   * @returns the new value with price
   */
  public mergePriceIntoValue(value: Configurator.Value): Configurator.Value {
    const valueName = value.name;
    if (valueName && this.valuePrices[valueName]) {
      value = { ...value, valuePrice: this.valuePrices[valueName] };
    }
    return value;
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
    attributeKey: string
  ): boolean {
    const attributeSupplement = config.priceSupplements?.find(
      (supplement) => supplement.attributeUiKey === attributeKey
    );
    const changed = !ObjectComparisonUtils.deepEqualObjects(
      this.lastAttributeSupplement ?? {},
      attributeSupplement ?? {}
    );
    if (changed) {
      this.lastAttributeSupplement = attributeSupplement;
      attributeSupplement?.valueSupplements.forEach((valueSupplement) =>
        this.storeValuePrice(
          valueSupplement.attributeValueKey,
          valueSupplement.priceValue
        )
      );
    }
    return changed;
  }

  protected storeValuePrice(
    valueName: string,
    valuePrice: Configurator.PriceDetails
  ) {
    this.valuePrices[valueName] = valuePrice;
  }
}
