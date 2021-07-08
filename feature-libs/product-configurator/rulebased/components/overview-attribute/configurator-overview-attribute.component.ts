import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';

@Component({
  selector: 'cx-configurator-overview-attribute',
  templateUrl: './configurator-overview-attribute.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewAttributeComponent {
  @Input() attributeOverview: Configurator.AttributeOverview;

  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attributeOverview?.quantity,
      price: this.attributeOverview?.valuePrice,
      priceTotal: this.attributeOverview?.valuePriceTotal,
      isLightedUp: true,
    };
  }
}
