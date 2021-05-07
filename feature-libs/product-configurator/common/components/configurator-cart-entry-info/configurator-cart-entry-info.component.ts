import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
 
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; 
 
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configurator-cart-entry-info',
  templateUrl: './configurator-cart-entry-info.component.html',
})
export class ConfiguratorCartEntryInfoComponent {
  // TODO(#11681): make commonConfigUtilsService a required dependency and remove deprecated constructor
  /**
   * Default constructor
   *
   * @param {CartItemContext} cartItemContext
   * @param {CommonConfiguratorUtilsService} commonConfigUtilsService
   */
  constructor(
    cartItemContext: CartItemContext,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    commonConfigUtilsService: CommonConfiguratorUtilsService
  );
  /**
   * @deprecated since 3.3
   */
  constructor(cartItemContext: CartItemContext);

  constructor(
    // TODO(#10946): make CartItemContext a required dependency and drop fallbacks to `?? EMPTY`.
    @Optional() protected cartItemContext?: CartItemContext,
    @Optional()
    protected commonConfigUtilsService?: CommonConfiguratorUtilsService
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> = this
    .commonConfigUtilsService
    ? this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext)
    : of(true);

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
    const configurationInfos = item.configurationInfos;

    const attributeBased = configurationInfos
      ? this.commonConfigUtilsService?.isAttributeBasedConfigurator(
          configurationInfos[0]?.configuratorType
        )
      : false;
    return attributeBased ? attributeBased : false;
  }
}
