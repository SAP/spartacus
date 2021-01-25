import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum ConfiguratorPriceType {
  PRICE_ONLY = 'priceOnly',
  QUANTITY_ONLY = 'quantityOnly',
  PRICE_AND_QUANTITY = 'priceAndQuantity',
}

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() productPrice: number;
  @Input() quantity = 1;
  @Input() totalPrice: number;

  configuratorPriceType = ConfiguratorPriceType;

  /**
   * Returns price type according to the values passed to the component
   *
   * @returns {ConfiguratorPriceType} - price type
   */
  getPriceType(): ConfiguratorPriceType {
    if (this?.productPrice && this.quantity === 1)
      return ConfiguratorPriceType.PRICE_ONLY;

    if (!this?.productPrice && this.quantity > 1)
      return ConfiguratorPriceType.QUANTITY_ONLY;

    if (this?.productPrice && this.quantity > 1)
      return ConfiguratorPriceType.PRICE_AND_QUANTITY;
  }

  /**
   * Returns total price calculated from product price and quantity
   *
   * @returns {number} - total price
   */
  calculateTotal(): number {
    if (!this?.productPrice) return;

    return this.totalPrice
      ? this.totalPrice
      : this.productPrice * this.quantity;
  }
}
