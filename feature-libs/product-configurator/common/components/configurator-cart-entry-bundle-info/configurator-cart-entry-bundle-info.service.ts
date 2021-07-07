import { Injectable, isDevMode } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import {
  ConfigurationInfo,
  ConfigurationInfoFields,
  ConfigurationInfoSpecialFields,
} from '../../core/model/common-configurator.model';

/**
 * Service for mapping of the CPQ line items from order entry
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorCartEntryBundleInfoService {
  /**
   * Retrieves the CPQ line items for an order entry
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {LineItem[]} - Line item array
   */
  retrieveLineItems(entry: OrderEntry): LineItem[] {
    let lineItems: LineItem[] = [];
    if (entry?.configurationInfos) {
      const configurationInfos: ConfigurationInfo[] = entry.configurationInfos.filter(
        (configurationInfo) =>
          configurationInfo &&
          (configurationInfo.configurationLabel ||
            configurationInfo.configurationValue)
      );
      const firstLabel: string =
        configurationInfos[0]?.configurationLabel ?? '';
      const firstValue: string =
        configurationInfos[0]?.configurationValue ?? '';

      if (firstLabel !== ConfigurationInfoSpecialFields.VERSION) {
        configurationInfos.forEach((configurationInfo) =>
          lineItems.push(this.prepareLineItem(configurationInfo))
        );
      } else if (
        firstLabel === ConfigurationInfoSpecialFields.VERSION &&
        Number(firstValue) >= 2
      ) {
        lineItems = this.processConfigurationInfos(configurationInfos);
      } else {
        this.logWarning('Wrong ConfigurationInfo version');
      }
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

  protected processConfigurationInfos(
    configurationInfos: ConfigurationInfo[]
  ): LineItem[] {
    const lineItemMap: Map<number, LineItem> = new Map();
    configurationInfos.forEach((configurationInfo) =>
      this.processConfigurationInfoEntry(lineItemMap, configurationInfo)
    );
    // sort
    const lineItemMapSorted: Map<number, LineItem> = new Map<number, LineItem>(
      Array.from(lineItemMap).sort((a, b) => {
        return a[0] - b[0];
      })
    );
    // convert to array
    const lineItems: LineItem[] = Array.from(lineItemMapSorted.values());
    return lineItems;
  }

  protected processConfigurationInfoEntry(
    lineItemMap: Map<number, LineItem>,
    configurationInfo: ConfigurationInfo
  ): void {
    if (configurationInfo.configurationLabel) {
      const configurationInfoSplitted: string[] = configurationInfo.configurationLabel.split(
        ConfigurationInfoSpecialFields.LINEITEM_DELIMITER
      );
      if (
        configurationInfoSplitted[0] === ConfigurationInfoSpecialFields.LINEITEM
      ) {
        const configurationInfoValue: string = configurationInfo.configurationValue
          ? configurationInfo.configurationValue
          : '';
        this.addLineItemData(
          lineItemMap,
          configurationInfoSplitted,
          configurationInfoValue
        );
      }
    }
  }

  protected addLineItemData(
    lineItemMap: Map<number, LineItem>,
    configurationInfoSplitted: string[],
    configurationInfoValue: string
  ): void {
    if (configurationInfoSplitted.length === 3) {
      const lineItemNumber: number = Number(configurationInfoSplitted[1]);
      const lineItem: LineItem = this.getOrCreateLineItem(
        lineItemMap,
        lineItemNumber
      );
      switch (configurationInfoSplitted[2]) {
        case ConfigurationInfoFields.NAME:
          lineItem.name = configurationInfoValue;
          break;
        case ConfigurationInfoFields.QTY:
          lineItem.formattedQuantity = configurationInfoValue;
          break;
        case ConfigurationInfoFields.FORMATTED_PRICE:
          lineItem.formattedPrice = configurationInfoValue;
          break;
        case ConfigurationInfoFields.KEY:
        case ConfigurationInfoFields.PRICE_VALUE:
          break;
        default: {
          this.logWarning('Wrong LineItem format');
        }
      }
    } else {
      this.logWarning('Wrong LineItem format');
    }
  }

  protected getOrCreateLineItem(
    lineItemMap: Map<number, LineItem>,
    lineItemNumber: number
  ): LineItem {
    const lineItem: LineItem = lineItemMap.get(lineItemNumber) ?? {
      name: '',
      formattedQuantity: '',
      formattedPrice: '',
    };
    if (!lineItemMap.get(lineItemNumber)) {
      lineItemMap.set(lineItemNumber, lineItem);
    }
    return lineItem;
  }

  protected logWarning(text: string): void {
    if (isDevMode()) {
      console.warn(text);
    }
  }
}
