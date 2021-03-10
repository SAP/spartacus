import { Component, Optional } from '@angular/core';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cx-configurator-cart-entry-bundle-info',
  templateUrl: './configurator-cart-entry-bundle-info.component.html',
})
export class ConfiguratorCartEntryBundleInfoComponent {
  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
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
   * Verifies whether the configuration infos have any entries and the first entry has a status.
   * Only in this case we want to display the configuration summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the status of configuration infos entry has status
   */
  hasStatus(item: OrderEntry): boolean {
    const configurationInfos = item?.configurationInfos;

    return configurationInfos
      ? configurationInfos.length > 0 &&
          configurationInfos[0]?.status !== 'NONE'
      : false;
  }

  getBundleItems(item: OrderEntry): number {
    return item?.configurationInfos?.length;
  }

  /**
   * Verifies whether the configurator type is bundle based one.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isBundleBasedConfigurator(item: OrderEntry): boolean {
    return this.commonConfigUtilsService.isBundleBasedConfigurator(
      item?.configurationInfos[0]?.configuratorType
    );
  }
}
