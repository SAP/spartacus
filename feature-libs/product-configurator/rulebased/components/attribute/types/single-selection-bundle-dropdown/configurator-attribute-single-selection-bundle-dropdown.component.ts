/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  readonly RETRACT_VALUE_CODE = Configurator.RetractValueCode;
  attributeDropDownForm = new UntypedFormControl('');
  selectionValue?: Configurator.Value;
  group: string;

  // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
  constructor(
    quantityService: ConfiguratorAttributeQuantityService,
    translation: TranslationService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  );

  /**
   * @deprecated since 6.2
   */
  constructor(
    quantityService: ConfiguratorAttributeQuantityService,
    translation: TranslationService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService
  );

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    @Optional()
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService
  ) {
    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );

    this.group = attributeComponentContext.group.id;
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    const values = this.attribute.values;
    if (values && values.length > 0) {
      const selectedValue = values.find((value) => value.selected);
      if (selectedValue) {
        this.selectionValue = selectedValue;
      }
    }
  }
  /**
   * Returns selected value. We assume that when this method is called,
   * a selection has been made before. In case this assumption is false,
   * an error is thrown
   * @returns selected value
   */
  get selectedValue(): Configurator.Value {
    let selectedValue: Configurator.Value;
    if (this.selectionValue) {
      selectedValue = this.selectionValue;
    } else {
      throw new Error('selectedValue called without a defined selectionValue');
    }
    return selectedValue;
  }

  /**
   * Extract corresponding product card parameters
   *
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: true,
      productBoundValue: this.selectedValue,
      singleDropdown: true,
      withQuantity: false,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
      attributeName: this.attribute.name,
      itemCount: 0,
      itemIndex: 0,
    };
  }

  /**
   * Verifies whether a selection value is defined and its value code is not a retract one.
   *
   * @returns {boolean} - 'True' if a selection value is defined and its value code is not a retract one, otherwise 'false'.
   */
  isNotRetractValue(): boolean {
    return (
      (this.selectionValue &&
        this.selectionValue?.valueCode !== Configurator.RetractValueCode) ??
      false
    );
  }

  /**
   * Verifies whether a value code is a retract one.
   *
   * @param {string} valueCode - Value code
   * @returns {boolean} - 'True' if a value code is a retract one, otherwise 'false'.
   */
  isRetractValue(valueCode: string): boolean {
    return valueCode === Configurator.RetractValueCode;
  }
}
