import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';

@Component({
  selector: 'cx-cart-item-outlet-configurator',
  templateUrl: './cart-item-outlet-configurator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemOutletConfiguratorComponent {
  constructor(@Optional() public cartItem?: CartItemContext) {}

  /**
   * Verifies whether the configuration infos has any entries and the entry has any status.
   *
   * @returns {boolean} - whether the status of configuration infos entry has status
   */
  hasStatus(item: OrderEntry): boolean {
    // SPIKE TODO REMOVE CONSOLE:
    // console.warn('change detection', window.performance.measure('spike'));
    return (
      item?.configurationInfos?.length > 0 &&
      item?.configurationInfos[0]?.status !== 'NONE'
    );
  }
}
