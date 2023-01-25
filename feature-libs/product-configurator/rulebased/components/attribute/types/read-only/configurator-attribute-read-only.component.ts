/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: String;
  @Input() expMode: boolean;

  constructor(protected translation: TranslationService) {
    super();
  }

  getAriaLabel(
    value: Configurator.Value,
    attribute: Configurator.Attribute,
    currentValue: String
  ): string {
    let ariaLabel = '';
    if (value.valuePrice && value.valuePrice?.value !== 0) {
      if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
        this.translation
          .translate(
            'configurator.a11y.readOnlyValueOfAttributeFullWithPrice',
            {
              value: currentValue,
              attribute: attribute.label,
              price: value.valuePriceTotal.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      } else {
        this.translation
          .translate(
            'configurator.a11y.readOnlyValueOfAttributeFullWithPrice',
            {
              value: currentValue,
              attribute: attribute.label,
              price: value.valuePrice.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      }
    } else {
      this.translation
        .translate('configurator.a11y.readOnlyValueOfAttributeFull', {
          value: currentValue,
          attribute: attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (ariaLabel = text));
    }
    return ariaLabel;
  }

  /**
   * Extract corresponding value price formula parameters.
   * For the read-only attribute types the complete price formula should be displayed at the value level.
   *
   * @param {Configurator.Value} value - Configurator value
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractValuePriceFormulaParameters(
    value: Configurator.Value
  ): ConfiguratorPriceComponentOptions {
    return {
      quantity: value.quantity,
      price: value.valuePrice,
      priceTotal: value.valuePriceTotal,
      isLightedUp: value.selected,
    };
  }
}
