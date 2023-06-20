/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
  attribute: Configurator.Attribute;
  group: string;
  expMode: boolean;

  constructor(
    protected translationService: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.group = attributeComponentContext.group.id;
    this.expMode = attributeComponentContext.expMode;
  }

  protected getCurrentValueName(
    attribute: Configurator.Attribute,
    value?: Configurator.Value
  ): string {
    let name = '';
    if (attribute.selectedSingleValue && !value) {
      name = attribute.selectedSingleValue;
    } else if (attribute.userInput && !value) {
      name = attribute.userInput;
    } else if (value && value.valueDisplay) {
      name = value?.valueDisplay;
    }
    return name;
  }

  getAriaLabel(
    attribute: Configurator.Attribute,
    value?: Configurator.Value | undefined
  ): string {
    let ariaLabel = '';
    if (value) {
      const valueName = this.getCurrentValueName(attribute, value);
      if (value.valuePrice && value.valuePrice?.value !== 0) {
        if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
          ariaLabel = this.translate(
            'configurator.a11y.readOnlyValueOfAttributeFullWithPrice',
            valueName,
            attribute,
            value.valuePriceTotal?.formattedValue
          );
        } else {
          ariaLabel = this.translate(
            'configurator.a11y.readOnlyValueOfAttributeFullWithPrice',
            valueName,
            attribute,
            value.valuePrice?.formattedValue
          );
        }
      } else {
        ariaLabel = this.translate(
          'configurator.a11y.readOnlyValueOfAttributeFull',
          valueName,
          attribute
        );
      }
    } else {
      const valueName = this.getCurrentValueName(attribute);
      ariaLabel = this.translate(
        'configurator.a11y.readOnlyValueOfAttributeFull',
        valueName,
        attribute
      );
    }
    return ariaLabel;
  }

  protected translate(
    resourceKey: string,
    valueName: string,
    attribute: Configurator.Attribute,
    formattedPrice?: string
  ): string {
    let ariaLabel: string = '';

    const options = formattedPrice
      ? {
          value: valueName,
          attribute: attribute.label,
          price: formattedPrice,
        }
      : {
          value: valueName,
          attribute: attribute.label,
        };

    this.translationService
      .translate(resourceKey, options)
      .pipe(take(1))
      .subscribe((text) => (ariaLabel = text));

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
