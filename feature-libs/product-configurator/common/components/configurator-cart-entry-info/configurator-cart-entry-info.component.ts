import { Component, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-cart-entry-info',
  templateUrl: './configurator-cart-entry-info.component.html',
})
export class ConfiguratorCartEntryInfoComponent {
  constructor(
    // TODO(#10946): make CartItemContext a required dependency and drop fallbacks to `?? EMPTY`.
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly disabled$: Observable<boolean> = (
    this.cartItemContext?.quantityControl$ ?? EMPTY
  ).pipe(map((formControl) => formControl.disabled));

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
    return (
      item?.configurationInfos?.length > 0 &&
      item?.configurationInfos[0]?.status !== 'NONE'
    );
  }
}
