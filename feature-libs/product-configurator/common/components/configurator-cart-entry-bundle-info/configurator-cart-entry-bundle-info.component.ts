import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CartItemContext,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';

@Component({
  selector: 'cx-configurator-cart-entry-bundle-info',
  templateUrl: './configurator-cart-entry-bundle-info.component.html',
})
export class ConfiguratorCartEntryBundleInfoComponent {
  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
    protected breakpointService?: BreakpointService,
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
    const configInfos = entry.configurationInfos;
    return configInfos
      ? this.commonConfigUtilsService.isBundleBasedConfigurator(
          configInfos[0]?.configuratorType
        )
      : false;
  }

  /**
   * Verifies whether the current screen size is smaller than breakpoint `BREAKPOINT.sm`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint is `BREAKPOINT.sm`, the method returns `true` when the
   * window innerWidth is smaller than the configured size of `BREAKPOINT.sm`.
   */
  isMobile(): Observable<boolean> {
    return this.breakpointService?.isDown(BREAKPOINT.sm);
  }
}
