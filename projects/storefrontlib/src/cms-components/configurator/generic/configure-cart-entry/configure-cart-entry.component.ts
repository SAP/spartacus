import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericConfigurator, OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-configure-cart-entry',
  templateUrl: './configure-cart-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;

  public getOwnerType(): GenericConfigurator.OwnerType {
    return this.readOnly
      ? GenericConfigurator.OwnerType.ORDER_ENTRY
      : GenericConfigurator.OwnerType.CART_ENTRY;
  }

  public getEntityKey(): string {
    return '' + this.cartEntry.entryNumber;
  }

  public getRoute(): string {
    const configuratorType = this.cartEntry.product.configuratorType;
    return this.readOnly
      ? 'configureOverview' + configuratorType
      : 'configure' + configuratorType;
  }

  constructor() {}
}
