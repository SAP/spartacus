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

import {
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Config, TranslationService } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { NgIf, NgClass, NgFor, AsyncPipe } from '@angular/common';
import { FocusDirective } from '../../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import { ConfiguratorPriceComponent } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponent } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeNumericInputFieldComponent } from '../numeric-input-field/configurator-attribute-numeric-input-field.component';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    ReactiveFormsModule,
    FocusDirective,
    NgFor,
    ConfiguratorShowMoreComponent,
    ConfiguratorPriceComponent,
    ConfiguratorAttributeQuantityComponent,
    ConfiguratorAttributeNumericInputFieldComponent,
    ConfiguratorAttributeInputFieldComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeDropDownForm = new UntypedFormControl('');
  group: string;

  protected config = inject(Config);

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

    this.group = attributeComponentContext.group.id;
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }

  getSelectedValue(): Configurator.Value | undefined {
    return this.attribute.values?.find((value) => value?.selected);
  }

  /**
   * Retrieves a selected value description.
   *
   * @returns - if a selected value description is defined then it will be returned, otherwise an empty string
   */
  getSelectedValueDescription(): string {
    return this.getSelectedValue()?.description ?? '';
  }
}
