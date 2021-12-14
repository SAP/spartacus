import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
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
   * Extract corresponding product card parameters
   *
   * @param {Configurator.Value} value - Value
   * @param {number} index - index of current value in list of values of attribute
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    value: Configurator.Value,
    index: number
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: this.attribute.required,
      fallbackFocusId: this.getFocusIdOfNearestValue(value),
      productBoundValue: value,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
      attributeLabel: this.attribute.label,
      attributeName: this.attribute.name,
      itemCount: this.attribute.values?.length
        ? this.attribute.values?.length
        : 0,
      itemIndex: index,
    };
  }

  protected getFocusIdOfNearestValue(currentValue: Configurator.Value): string {
    if (!this.attribute.values) {
      return 'n/a';
    }
    let prevIdx = this.attribute.values.findIndex(
      (value) => value?.valueCode === currentValue?.valueCode
    );
    prevIdx--;
    if (prevIdx < 0) {
      prevIdx = this.attribute.values?.length > 1 ? 1 : 0;
    }
    return this.createFocusId(
      this.getAttributeCode(this.attribute).toString(),
      this.attribute.values[prevIdx]?.valueCode
    );
  }
}
