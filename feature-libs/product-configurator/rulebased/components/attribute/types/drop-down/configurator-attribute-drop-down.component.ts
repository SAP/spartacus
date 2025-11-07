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
import { Config, TranslationService } from '@spartacus/core';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  standalone: false,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  protected quantityService: ConfiguratorAttributeQuantityService;
  protected translation: TranslationService;
  protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
  protected configuratorCommonsService: ConfiguratorCommonsService;
  protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

  attributeDropDownForm = new UntypedFormControl('');
  group: string;

  protected config = inject(Config);

  constructor() {
    const quantityService = inject(ConfiguratorAttributeQuantityService);
    const translation = inject(TranslationService);
    const attributeComponentContext = inject(ConfiguratorAttributeCompositionContext);
    const configuratorCommonsService = inject(ConfiguratorCommonsService);
    const configuratorStorefrontUtilsService = inject(ConfiguratorStorefrontUtilsService);

    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );
    this.quantityService = quantityService;
    this.translation = translation;
    this.attributeComponentContext = attributeComponentContext;
    this.configuratorCommonsService = configuratorCommonsService;
    this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;


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
