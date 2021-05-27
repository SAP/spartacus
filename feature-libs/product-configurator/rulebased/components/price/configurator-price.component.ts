import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

export interface ConfiguratorPriceComponentOptions {
  quantity?: number;
  price?: Configurator.PriceDetails;
  priceTotal?: Configurator.PriceDetails;
  isLightedUp?: boolean;
}

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;

  /**
   * Retrieves price.
   *
   * @return {string} - value price formula
   */
  get price(): string {
    if (this.formula?.priceTotal) {
      return this.priceTotal;
    } else {
      return '+ ' + this.formula?.price?.formattedValue;
    }
  }

  /**
   * Retrieves the total price.
   *
   * @return {string} - total price formula
   */
  get priceTotal(): string {
    return '+ ' + this.formula?.priceTotal?.formattedValue;
  }

  /**
   * Verifies whether quantity with price should be displayed.
   *
   * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
   */
  displayQuantityAndPrice(): boolean {
    return this.formula?.price?.value !== 0 && this.formula?.quantity >= 1;
  }

  /**
   * Verifies whether only price should be displayed.
   *
   * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
   */
  displayPriceOnly(): boolean {
    return (
      (this.formula?.price?.value || this.formula?.priceTotal?.value) &&
      !this.displayQuantityAndPrice()
    );
  }

  /**
   * Verifies whether the price formula should be displayed.
   *
   * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
   */
  displayFormula(): boolean {
    return (
      (this.formula?.quantity && this.formula?.quantity !== 0) ||
      (this.formula?.price && this.formula?.price?.value !== 0) ||
      (this.formula?.priceTotal && this.formula?.priceTotal?.value !== 0)
    );
  }

  /**
   * Retrieves formula for quantity with price.
   *
   * @param {string} formattedQuantity- formatted quantity
   * @return {string} - price formula
   */
  quantityWithPrice(formattedQuantity: string): string {
    return formattedQuantity + 'x(' + this.formula?.price?.formattedValue + ')';
  }

  /**
   * Verifies whether the price is lighted up.
   *
   * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
   */
  isPriceLightedUp(): boolean {
    return this.formula.isLightedUp;
  }

  /**
   * Retrieves the styling for the corresponding element.
   *
   * @return {string} - corresponding style class
   */
  get styleClass(): string {
    let styleClass = 'cx-price';
    if (!this.isPriceLightedUp()) {
      styleClass += ' cx-greyed-out';
    }

    return styleClass;
  }
}
