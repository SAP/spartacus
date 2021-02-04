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

  displayQuantityOnly() {
    return (
      this.formula?.quantity &&
      this.formula?.quantity >= 1 &&
      this.formula.isOverview &&
      this.formula?.price?.value === 0
    );
  }

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

  displayQuantityAndPrice() {
    return this.formula?.price?.value !== 0 && this.formula?.quantity >= 1;
  }

  get quantityWihPrice(): string {
    return this.quantity + 'x(' + this.formula?.price?.formattedValue + ')';
  }

  get priceTotal(): string {
    return '+ ' + this.formula?.priceTotal?.formattedValue;
  }

  displayPrice() {
    return (
      (this.formula?.price?.value || this.formula?.priceTotal?.value) &&
      !this.displayQuantityAndPrice()
    );
  }

  isPriceLightedUp() {
    return this.formula.isLightedUp;
  }

  get styleClass() {
    let styleClass = 'cx-price';
    if (!this.isPriceLightedUp()) {
      styleClass += ' cx-greyed-out';
    }

    return styleClass;
  }

  displayFormula() {
    return (
      (this.formula?.quantity && this.formula?.quantity !== 0) ||
      (this.formula?.price && this.formula?.price?.value !== 0) ||
      (this.formula?.priceTotal && this.formula?.priceTotal?.value !== 0)
    );
  }
}
