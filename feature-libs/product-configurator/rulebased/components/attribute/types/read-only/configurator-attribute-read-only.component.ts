/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
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
    this.initPriceChangedEvent(
      attributeComponentContext.isPricingAsync,
      attributeComponentContext.attribute.key
    );
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
}
