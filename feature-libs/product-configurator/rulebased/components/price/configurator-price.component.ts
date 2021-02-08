import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() formula: any = {
    quantity: 0,
    price: null,
    priceTotal: null,
    isLightedUp: false,
    isOverview: false,
  };

  /**
   * Verifies whether only quantity should be displayed.
   */
  displayQuantityOnly() {
    return (
      this.formula?.quantity &&
      this.formula?.quantity >= 1 &&
      this.formula.isOverview &&
      this.formula?.price?.value === 0
    );
  }

  /**
   * Retrieves the quantity.
   */
  get quantity(): string {
    return this.formula?.quantity?.toString();
  }

  get price(): string {
    if (this.formula?.priceTotal) {
      return this.priceTotal;
    } else {
      return '+ ' + this.formula?.price?.formattedValue;
    }
  }

  /**
   * Verifies whether quantity with price should be displayed.
   */
  displayQuantityAndPrice() {
    return this.formula?.price?.value !== 0 && this.formula?.quantity >= 1;
  }

  /**
   * Retrieves formula for quantity with price.
   */
  get quantityWihPrice(): string {
    return this.quantity + 'x(' + this.formula?.price?.formattedValue + ')';
  }

  /**
   * Retrieves the total price.
   */
  get priceTotal(): string {
    return '+ ' + this.formula?.priceTotal?.formattedValue;
  }

  /**
   * Verifies whether only price should be displayed.
   */
  displayPriceOnly() {
    return (
      (this.formula?.price?.value || this.formula?.priceTotal?.value) &&
      !this.displayQuantityAndPrice()
    );
  }

  /**
   * Verifies whether the price is lighted up.
   */
  isPriceLightedUp() {
    return this.formula.isLightedUp;
  }

  /**
   * Retrieves the styling for the corresponding element.
   */
  get styleClass() {
    let styleClass = 'cx-price';
    if (!this.isPriceLightedUp()) {
      styleClass += ' cx-greyed-out';
    }

    return styleClass;
  }

  /**
   * Verifies whether the price formula should be displayed.
   */
  displayFormula() {
    return (
      (this.formula?.quantity && this.formula?.quantity !== 0) ||
      (this.formula?.price && this.formula?.price?.value !== 0) ||
      (this.formula?.priceTotal && this.formula?.priceTotal?.value !== 0)
    );
  }
}
