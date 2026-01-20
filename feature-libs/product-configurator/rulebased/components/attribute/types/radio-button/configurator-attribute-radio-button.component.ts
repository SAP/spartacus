/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FocusDirective } from '@spartacus/storefront';
import { ConfiguratorPriceComponent } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeQuantityComponent } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeNumericInputFieldComponent } from '../numeric-input-field/configurator-attribute-numeric-input-field.component';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  imports: [
    NgIf,
    ConfiguratorAttributeQuantityComponent,
    ConfiguratorPriceComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    FocusDirective,
    ConfiguratorShowMoreComponent,
    ConfiguratorAttributeNumericInputFieldComponent,
    ConfiguratorAttributeInputFieldComponent,
    AsyncPipe,
  ],
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new UntypedFormControl('');

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }
}
