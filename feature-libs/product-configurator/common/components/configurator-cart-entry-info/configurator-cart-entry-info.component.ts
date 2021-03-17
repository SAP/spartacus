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

  /**
   * Verifies whether the configurator type is attribute based one.
   *
   * @param {OrderEntry} item - Order entry item
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isAttributeBasedConfigurator(item: OrderEntry): boolean {
    return this.commonConfigUtilsService.isAttributeBasedConfigurator(
      item?.configurationInfos[0]?.configuratorType
    );
  }
}
