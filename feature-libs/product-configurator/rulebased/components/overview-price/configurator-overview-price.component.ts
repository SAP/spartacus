import { Component, Input } from '@angular/core';

export enum OverviewPriceType {
  PRICE_ONLY = 'priceOnly',
  QUANTITY_ONLY = 'quantityOnly',
  PRICE_AND_QUANTITY = 'priceAndQuantity',
}

@Component({
  selector: 'cx-configurator-overview-price',
  templateUrl: './configurator-overview-price.component.html',
})
export class ConfiguratorOverviewPriceComponent {
  @Input() productPrice: number;
  @Input() quantity = 1;

  overviewPriceType = OverviewPriceType;

  /**
   * Returns price type according to the values passed to the component
   *
   * @returns {OverviewPriceType} - price type
   */
  getOverviewPriceType(): OverviewPriceType {
    if (this?.productPrice && this.quantity === 1)
      return OverviewPriceType.PRICE_ONLY;

    if (!this?.productPrice && this.quantity > 1)
      return OverviewPriceType.QUANTITY_ONLY;

    if (this?.productPrice && this.quantity > 1)
      return OverviewPriceType.PRICE_AND_QUANTITY;
  }

  /**
   * Returns total price calculated from product price and quantity
   *
   * @returns {number} - total price
   */
  calculateTotal(): number {
    if (!this?.productPrice) return;

    return this.productPrice * this.quantity;
  }
}
