/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import {
  ConfigurationInfo,
  ConfigurationInfoFields,
  ConfigurationInfoSpecialFields,
} from '../../core/model/common-configurator.model';
import { LineItem } from './configurator-cart-entry-bundle-info.model';

/**
 * Maps a `ConfigurationInfo` field onto the line item property it fills.
 */
const LINE_ITEM_FIELD_SETTERS: {
  [field: string]: (lineItem: LineItem, value: string) => void;
} = {
  [ConfigurationInfoFields.NAME]: (lineItem, value) => (lineItem.name = value),
  [ConfigurationInfoFields.QTY]: (lineItem, value) =>
    (lineItem.formattedQuantity = value),
  [ConfigurationInfoFields.FORMATTED_PRICE]: (lineItem, value) =>
    (lineItem.formattedPrice = value),
  [ConfigurationInfoFields.ROW_ID]: (lineItem, value) =>
    (lineItem.rowId = value),
  [ConfigurationInfoFields.CONFIGURABLE]: (lineItem, value) =>
    (lineItem.configurable = value === 'true'),
  [ConfigurationInfoFields.KEY]: (lineItem, value) =>
    (lineItem.productCode = value),
};

/**
 * Service for mapping of the CPQ line items from order entry
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorCartEntryBundleInfoService {
  protected logger = inject(LoggerService);

  /**
   * Retrieves the CPQ line items for an order entry
   *
   * @param entry - Order entry
   * @returns Line item array
   */
  retrieveLineItems(entry: OrderEntry): LineItem[] {
    let lineItems: LineItem[] = [];
    if (entry.configurationInfos) {
      const configurationInfos: ConfigurationInfo[] =
        entry.configurationInfos.filter(
          (configurationInfo) =>
            configurationInfo &&
            (configurationInfo.configurationLabel ||
              configurationInfo.configurationValue)
        );
      const firstLabel = configurationInfos[0]?.configurationLabel;
      const firstValue = configurationInfos[0]?.configurationValue;

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

    const lastCharacter: string = preparedLabel.charAt(
      preparedLabel.length - 1
    );
    if (lastCharacter === ':') {
      preparedLabel = preparedLabel.substring(0, preparedLabel.length - 1);
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
      const configurationInfoSplit: string[] =
        configurationInfo.configurationLabel.split(
          ConfigurationInfoSpecialFields.LINE_ITEM_DELIMITER
        );
      if (
        configurationInfoSplit[0] === ConfigurationInfoSpecialFields.LINE_ITEM
      ) {
        const configurationInfoValue: string =
          configurationInfo.configurationValue
            ? configurationInfo.configurationValue
            : '';
        this.addLineItemData(
          lineItemMap,
          configurationInfoSplit,
          configurationInfoValue
        );
      }
    }
  }

  protected addLineItemData(
    lineItemMap: Map<number, LineItem>,
    configurationInfoSplit: string[],
    configurationInfoValue: string
  ): void {
    if (configurationInfoSplit.length !== 3) {
      this.logWarning('Wrong LineItem format');
      return;
    }
    const field = configurationInfoSplit[2];
    if (this.isIgnoredLineItemField(field)) {
      return;
    }
    const applyValue = LINE_ITEM_FIELD_SETTERS[field];
    if (!applyValue) {
      this.logWarning('Wrong LineItem format');
      return;
    }
    const lineItemNumber: number = Number(configurationInfoSplit[1]);
    applyValue(
      this.getOrCreateLineItem(lineItemMap, lineItemNumber),
      configurationInfoValue
    );
  }

  protected isIgnoredLineItemField(field: string): boolean {
    return (
      field === ConfigurationInfoFields.PRICE_VALUE ||
      field === ConfigurationInfoFields.PARENT
    );
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
      this.logger.warn(text);
    }
  }
}
