import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cx-configurator-price',
  templateUrl: './configurator-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceComponent {
  @Input() formula: any = {
    quantity: 0,
    valuePrice: null,
    valuePriceTotal: null,
    isLightedUp: false,
  };

  /**
   * Retrieves the price type according to the values passed to the component
   *
   * @returns {string} - price calculation formula
   */
  getPriceCalculation(): string {
    if (this.formula?.valuePrice?.value === 0) {
      if (this.formula?.quantity >= 1) {
        return this.formula?.quantity.toString();
      } else if (this.formula?.valuePriceTotal?.value !== 0) {
        {
          return this.formula?.valuePriceTotal?.formattedValue;
        }
      }
    } else if (this.formula?.valuePrice?.value !== 0) {
      if (this.formula?.quantity >= 1) {
        return (
          this.formula?.quantity.toString() +
          ' x ' +
          this.formula?.valuePrice?.formattedValue +
          ' = ' +
          this.formula?.valuePriceTotal?.formattedValue
        );
      } else {
        return this.formula?.valuePrice?.formattedValue;
      }
    }
  }

  isPriceLightedUp() {
    return this.formula?.isLightedUp;
  }

  isFormulaDataDefined() {
    const isDefined =
      (this.formula?.quantity && this.formula?.quantity !== 0) ||
      (this.formula?.valuePrice && this.formula?.valuePrice?.value !== 0) ||
      (this.formula?.valuePriceTotal &&
        this.formula?.valuePriceTotal?.value !== 0);
    return isDefined;
  }
}
