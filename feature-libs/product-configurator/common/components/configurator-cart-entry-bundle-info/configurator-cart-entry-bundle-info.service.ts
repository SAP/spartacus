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
   * Retrieves the number of CPQ line items for an order entry
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {number} - number of line items
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
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {LineItem[]} - Line item array
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
        ? this.removeDelimiter(configurationInfo.configurationLabel)
        : '',
      formattedQuantity:
        quantityAndPrice.length >= 1 ? quantityAndPrice[0].trim() : '',
      formattedPrice:
        quantityAndPrice.length >= 2 ? quantityAndPrice[1].trim() : '',
    };
  }

  protected removeDelimiter(label: string): string {
    let preparedLabel: string = label.trim();
    if (preparedLabel) {
      const lastCharacter: string = preparedLabel.charAt(
        preparedLabel.length - 1
      );
      if (lastCharacter === ':') {
        preparedLabel = preparedLabel.substr(0, preparedLabel.length - 1);
      }
    }
    return preparedLabel;
  }
}
