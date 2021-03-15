import { Component, Optional } from '@angular/core';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { FormControl } from '@angular/forms';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { map } from 'rxjs/operators';

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

  numberOfLineItems$: Observable<number> = this.orderEntry$.pipe(
    map((entry) =>
      this.configCartEntryBundleInfoService.retrieveNumberOfLineItems(entry)
    )
  );

  hideItems = true;

  /**
   * Toggles the state of the items list.
   */
  toggleItems(): void {
    this.hideItems = !this.hideItems;
  }

  /**
   * Retrieves the line items for an order entry.
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {LineItem[]} - Array of line items
   */
  retrieveLineItems(entry: OrderEntry): LineItem[] {
    return this.configCartEntryBundleInfoService.retrieveLineItems(entry);
  }

  /**
   * Verifies whether the configurator type is a bundle based one.
   *
   * @param {OrderEntry} entry - Order entry
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'false'
   */
  isBundleBasedConfigurator(entry: OrderEntry): boolean {
    return this.commonConfigUtilsService.isBundleBasedConfigurator(
      entry?.configurationInfos[0]?.configuratorType
    );
  }
}
