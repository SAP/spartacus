/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Config, useFeatureStyles } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorDeltaRenderingService } from '../../delta-rendering/configurator-delta-rendering.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-single-selection-image',
  templateUrl: './configurator-attribute-single-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorDeltaRenderingService],
})
export class ConfiguratorAttributeSingleSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new UntypedFormControl('');
  isDeltaRendering: boolean;

  attribute: Configurator.Attribute;
  ownerKey: string;
  expMode: boolean;

  iconTypes = ICON_TYPE;
  protected config = inject(Config);

  constructor(
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.ownerKey = attributeComponentContext.owner.key;
    this.expMode = attributeComponentContext.expMode;
    useFeatureStyles('productConfiguratorAttributeTypesV2');
    this.initDeltaRendering(
      attributeComponentContext.isDeltaRendering,
      attributeComponentContext.attribute.key
    );
    this.isDeltaRendering = attributeComponentContext.isDeltaRendering ?? false;
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Submits a value.
   *
   * @param {string} value - Selected value
   */
  onClick(value: string): void {
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        selectedSingleValue: value,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  extractValuePriceFormulaParameters(
    value?: Configurator.Value
  ): ConfiguratorPriceComponentOptions {
    if (value && this.configuratorDeltaRenderingService) {
      value = this.configuratorDeltaRenderingService.mergePriceIntoValue(value);
    }
    return {
      price: value?.valuePrice,
      isLightedUp: value ? value.selected : false,
    };
  }
}
