/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-multi-selection-image',
  templateUrl: './configurator-attribute-multi-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  standalone: false,
})
export class ConfiguratorAttributeMultiSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attribute: Configurator.Attribute;
  ownerKey: string;
  expMode: boolean;

  iconTypes = ICON_TYPE;
  protected config = inject(Config);

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super();

    this.attribute = attributeComponentContext.attribute;
    this.ownerKey = attributeComponentContext.owner.key;
    this.expMode = attributeComponentContext.expMode;
    this.initPriceChangedEvent(
      attributeComponentContext.isPricingAsync,
      attributeComponentContext.attribute.key
    );

    useFeatureStyles('productConfiguratorAttributeTypesV2');
    useFeatureStyles('a11yDifferentiateFocusedAndSelected');
  }

  attributeCheckBoxForms = new Array<UntypedFormControl>();

  ngOnInit() {
    const values = this.attribute.values;
    if (values) {
      for (const value of values) {
        let attributeCheckBoxForm: UntypedFormControl;
        if (value.selected) {
          attributeCheckBoxForm = new UntypedFormControl(true);
        } else {
          attributeCheckBoxForm = new UntypedFormControl(false);
        }
        this.attributeCheckBoxForms.push(attributeCheckBoxForm);
      }
    }
  }

  /**
   * Fired when a value has been selected
   * @param index Index of selected value
   */
  onSelect(index: number): void {
    this.attributeCheckBoxForms[index].setValue(
      !this.attributeCheckBoxForms[index].value
    );

    const selectedValues =
      this.configUtilsService.assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      );
    if (this.listenForPriceChanges) {
      this.configUtilsService.setLastSelected(
        this.attribute.name,
        selectedValues[index].valueCode
      );
    }
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        values: selectedValues,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }
}
