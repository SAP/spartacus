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

  public reRender(
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
   * Extracts the relevant value prices from the price supplements
   * and stores them within the component. Returns a boolean indicating
   * whether there were any value price changes.
   *
   * @param config current config
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

  /**
   * Event handler to be called when a value price changes.
   *
   * @param event event with the new value price
   */
  public storeValuePrice(
    valueName: string,
    valuePrice: Configurator.PriceDetails
  ) {
    this.valuePrices[valueName] = valuePrice;
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
}
