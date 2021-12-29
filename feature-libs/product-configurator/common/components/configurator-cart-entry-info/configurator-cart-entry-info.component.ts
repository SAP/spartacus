import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configurator-cart-entry-info',
  templateUrl: './configurator-cart-entry-info.component.html',
})
export class ConfiguratorCartEntryInfoComponent {
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);

  /**
   * Verifies whether the configuration infos have any entries and the first entry has a status.
   * Only in this case we want to display the configuration summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the status of configuration infos entry has status
   */
  hasStatus(item: OrderEntry): boolean {
    const configurationInfos = item.configurationInfos;

    return configurationInfos
      ? configurationInfos.length > 0 &&
          configurationInfos[0]?.status !== 'NONE'
      : false;
  }

  /**
   * Verifies whether the configurator type is attribute based one.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isAttributeBasedConfigurator(item: OrderEntry): boolean {
    const configurationInfos = item.configurationInfos;

    const attributeBased = configurationInfos
      ? this.commonConfigUtilsService.isAttributeBasedConfigurator(
          configurationInfos[0]?.configuratorType
        )
      : false;
    return attributeBased ? attributeBased : false;
  }

  getHiddenConfigurationInfoId(index: number): string {
    return 'cx-configuration-hidden-info-' + index.toString();
  }
}
