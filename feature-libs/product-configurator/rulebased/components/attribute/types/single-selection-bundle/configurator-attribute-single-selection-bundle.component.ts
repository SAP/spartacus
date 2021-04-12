import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding product card parameters
   *
   * @param {Configurator.Value} value - Value
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: this.attribute.required,
      fallbackFocusId: this.getFocusIdOfNearestValue(value),
      productBoundValue: value,
      loading$: this.loading$,
      attributeId: this.attribute.attrCode,
    };
  }

  protected getFocusIdOfNearestValue(currentValue: Configurator.Value): string {
    if (!this.attribute.values) {
      return 'n/a';
    }
    let prevIdx = this.attribute.values.findIndex(
      (value) => value.valueCode === currentValue.valueCode
    );
    prevIdx--;
    if (prevIdx < 0) {
      prevIdx = this.attribute.values.length > 1 ? 1 : 0;
    }
    return this.createFocusId(
      this.attribute.attrCode?.toString(),
      this.attribute.values[prevIdx].valueCode
    );
  }

  protected getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute.values?.find((value) => value?.selected)?.valuePrice;
  }
}
