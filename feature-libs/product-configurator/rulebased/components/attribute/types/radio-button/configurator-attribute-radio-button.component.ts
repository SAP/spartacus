import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { Configurator } from 'feature-libs/product-configurator/rulebased/core/model/configurator.model';
import { take } from 'rxjs/operators';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new FormControl('');

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService
  ) {
    super(quantityService);
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  getAriaLabel(
    value: Configurator.Value,
    attribute: Configurator.Attribute
  ): string {
    let ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
    let ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
    if (this.isAdditionalValue) {
      return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
    } else {
      return ariaLabel;
    }
  }

  getAdditionalValueAriaLabel(): string {
    let ariaLabel = '';
    this.translation
      .translate('configurator.a11y.additionalValue')
      .pipe(take(1))
      .subscribe((text) => (ariaLabel = text));
    return ariaLabel;
  }

  getAriaLabelWithoutAdditionalValue(
    value: Configurator.Value,
    attribute: Configurator.Attribute
  ): string {
    let ariaLabel = '';
    if (value.valuePrice && value.valuePrice?.value !== 0) {
      if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
        this.translation
          .translate(
            'configurator.a11y.selectedValueOfAttributeFullWithPrice',
            {
              value: value.valueDisplay,
              attribute: attribute.label,
              price: value.valuePriceTotal.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      } else {
        this.translation
          .translate(
            'configurator.a11y.selectedValueOfAttributeFullWithPrice',
            {
              value: value.valueDisplay,
              attribute: attribute.label,
              price: value.valuePrice.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      }
    } else {
      this.translation
        .translate('configurator.a11y.selectedValueOfAttributeFull', {
          value: value.valueDisplay,
          attribute: attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (ariaLabel = text));
    }
    return ariaLabel;
  }
}
