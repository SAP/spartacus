import { Component, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { ComponentContextData } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';

@Component({
  selector: 'cx-configurator-cart-entry-info',
  templateUrl: './configurator-cart-entry-info.component.html',
})
export class ConfiguratorCartEntryInfoComponent {
  constructor(
    @Optional() protected contextData: ComponentContextData,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.contextData?.context$.pipe(map((c) => c.item)) ?? EMPTY;

  readonly quantityControl$: Observable<FormControl> =
    this.contextData?.context$.pipe(map((c) => c.quantityControl)) ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.contextData?.context$.pipe(map((c) => c.readonly)) ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    //this.commonConfigUtilsService.isActiveCartContext(this.contextData);
    of(true);

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
      ? configurationInfos.length > 0 && configurationInfos[0].status !== 'NONE'
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

    return configurationInfos
      ? this.commonConfigUtilsService.isAttributeBasedConfigurator(
          configurationInfos[0]?.configuratorType
        )
      : false;
  }

  getHiddenConfigurationInfoId(index: number): string {
    return 'cx-configuration-hidden-info-' + index.toString();
  }
}
