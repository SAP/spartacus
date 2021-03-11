import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfigurationInfo } from '../../core/model/common-configurator.model';

/**
 * Service for mapping of the CPQ line items from order entry
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorCartEntryBundleInfoService {
  /**
   * Retrieves the numer of CPQ line items for an order entry
   * @param entry order entry
   * @returns number of line items
   */
  retrieveNumberOfLineItems(entry: OrderEntry): number {
    const numberOfLineItems: number = entry?.configurationInfos
      ? entry.configurationInfos.filter(
          (configurationInfo) =>
            configurationInfo.configurationLabel ||
            configurationInfo.configurationValue
        ).length
      : 0;
    return numberOfLineItems;
  }

  /**
   * Retrieves the CPQ line items for an order entry
   * @param entry order entry
   * @returns line item array
   */
  retrieveLineItems(entry: OrderEntry): LineItem[] {
    const lineItems: LineItem[] = [];
    if (entry?.configurationInfos) {
      entry.configurationInfos
        .filter(
          (configurationInfo) =>
            configurationInfo.configurationLabel ||
            configurationInfo.configurationValue
        )
        .forEach((configurationInfo) =>
          lineItems.push(this.prepareLineItem(configurationInfo))
        );
    }
    return lineItems;
  }

  protected prepareLineItem(configurationInfo: ConfigurationInfo): LineItem {
    const quantityAndPrice: string[] = configurationInfo.configurationValue
      ? configurationInfo.configurationValue.split('x')
      : [];
    return {
      name: configurationInfo.configurationLabel
        ? configurationInfo.configurationLabel.replace(':', '')
        : '',
      formattedQuantity:
        quantityAndPrice.length >= 1 ? quantityAndPrice[0].trim() : '',
      formattedPrice:
        quantityAndPrice.length >= 2 ? quantityAndPrice[1].trim() : '',
    };
  }
}
