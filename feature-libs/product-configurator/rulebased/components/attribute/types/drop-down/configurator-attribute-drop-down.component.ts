import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeDropDownForm = new FormControl('');
  @Input() group: string;

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService
  ) {
    super(quantityService);
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }

  getSelectedValue(): Configurator.Value | undefined {
    return this.attribute.values?.find((value) => value?.selected);
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
