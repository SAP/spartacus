import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericConfigurator } from '@spartacus/core';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';

@Component({
  selector: 'cx-config-textfield-add-to-cart-button',
  templateUrl: './configurator-textfield-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTextfieldAddToCartButtonComponent {
  @Input() configuration: ConfiguratorTextfield.Configuration;
  @Input() productCode: string;

  constructor(
    protected configuratorTextfieldService: ConfiguratorTextfieldService
  ) {}

  /**
   * Adds the textfield configuration to the cart or updates it
   */
  onAddToCart(): void {
    const owner: GenericConfigurator.Owner = this.configuration.owner;
    switch (owner.type) {
      case GenericConfigurator.OwnerType.PRODUCT:
        this.configuratorTextfieldService.addToCart(
          owner.id,
          this.configuration
        );
        break;
      case GenericConfigurator.OwnerType.CART_ENTRY:
        this.configuratorTextfieldService.updateCartEntry(
          owner.id,
          this.configuration
        );
        break;
    }
  }

  /**
   * Returns button description. Button will display 'addToCart' or 'done' in case configuration indicates that owner is a cart entry
   * @returns Resource key of button description
   */
  getButtonText(): string {
    return this.configuration.owner.type ===
      GenericConfigurator.OwnerType.CART_ENTRY
      ? 'configurator.addToCart.buttonUpdateCart'
      : 'configurator.addToCart.button';
  }
}
