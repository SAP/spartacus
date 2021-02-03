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
  };

  /**
   * Retrieves the price type according to the values passed to the component
   *
   * @returns {string} - price calculation formula
   */
  getPriceCalculation(): string {
    if (this.formula?.price?.value === 0) {
      if (this.formula?.quantity >= 1) {
        return this.formula?.quantity.toString();
      } else if (this.formula?.priceTotal?.value !== 0) {
        {
          return '+ ' + this.formula?.priceTotal?.formattedValue;
        }
      }
    } else if (this.formula?.price?.value !== 0) {
      if (this.formula?.quantity >= 1) {
        return (
          this.formula?.quantity.toString() +
          'x(' +
          this.formula?.price?.formattedValue +
          ')' +
          ' = ' +
          this.formula?.priceTotal?.formattedValue
        );
      } else {
        return this.formula?.price?.formattedValue;
      }
    }
  }

  isPriceLightedUp() {
    return this.formula?.isLightedUp;
  }

  isFormulaDataDefined() {
    return (
      (this.formula?.quantity && this.formula?.quantity !== 0) ||
      (this.formula?.price && this.formula?.price?.value !== 0) ||
      (this.formula?.priceTotal && this.formula?.priceTotal?.value !== 0)
    );
  }
}
