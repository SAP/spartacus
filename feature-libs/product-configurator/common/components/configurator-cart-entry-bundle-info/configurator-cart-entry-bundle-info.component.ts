import { Component, Optional } from '@angular/core';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { FormControl } from '@angular/forms';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';

@Component({
  selector: 'cx-configurator-cart-entry-bundle-info',
  templateUrl: './configurator-cart-entry-bundle-info.component.html',
})
export class ConfiguratorCartEntryBundleInfoComponent {
  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
    // TODO(#10946): make CartItemContext a required dependency and drop fallbacks to `?? EMPTY`.
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  hideItems = true;

  toggleItems(): void {
    this.hideItems = !this.hideItems;
  }

  /**
   * Retrieves the number of cart items.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {number} - Returns a number of cart items
   */
  retrieveNumberOfLineItems(item: OrderEntry): number {
    return this.configCartEntryBundleInfoService.retrieveNumberOfLineItems(
      item
    );
  }

  /**
   * Retrieves the line items for an order entry.
   *
   * @param {OrderEntry} entry order entry
   * @returns {LineItem[]} - array of line items
   */
  retrieveLineItems(entry: OrderEntry): LineItem[] {
    return this.configCartEntryBundleInfoService.retrieveLineItems(entry);
  }

  /**
   * Verifies whether the configurator type is bundle based one.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'false'
   */
  isBundleBasedConfigurator(item: OrderEntry): boolean {
    return this.commonConfigUtilsService.isBundleBasedConfigurator(
      item?.configurationInfos[0]?.configuratorType
    );
  }

  /**
   * Retrieves a translation key for the bundle item.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {string} - bundle item translation key
   */
  getBundleItemsKey(item: OrderEntry): string {
    if (this.retrieveNumberOfLineItems(item) > 1) {
      return 'configurator.header.bundleItems';
    }
    return 'configurator.header.bundleItem';
  }

  /**
   * Retrieves a translation key for the hide / unhide item.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {string} - bundle item translation key
   */
  geToggleItemsKey(item: OrderEntry): string {
    if (this.retrieveNumberOfLineItems(item) > 1) {
      return 'configurator.header.hideItems';
    }
    return 'configurator.header.hideItem';
  }
}
