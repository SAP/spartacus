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
import {
  Config,
  FeatureConfigService,
  useFeatureStyles,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import {
  ConfiguratorPriceComponentOptions,
  ConfiguratorPriceComponent,
} from '../../../price/configurator-price.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { FocusDirective } from '../../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { PopoverDirective } from '../../../../../../../projects/storefrontlib/shared/components/popover/popover.directive';
import { IconComponent } from '../../../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-attribute-single-selection-image',
  templateUrl: './configurator-attribute-single-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    FocusDirective,
    NgClass,
    PopoverDirective,
    IconComponent,
    ConfiguratorPriceComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class ConfiguratorAttributeSingleSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new UntypedFormControl('');

  attribute: Configurator.Attribute;
  ownerKey: string;
  expMode: boolean;

  iconTypes = ICON_TYPE;
  protected config = inject(Config);
  protected featureConfigService = inject(FeatureConfigService);

  constructor(
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    useFeatureStyles('a11yDifferentiateFocusedAndSelected');

    super();
    this.attribute = attributeComponentContext.attribute;
    this.ownerKey = attributeComponentContext.owner.key;
    this.expMode = attributeComponentContext.expMode;
    this.initPriceChangedEvent(
      attributeComponentContext.isPricingAsync,
      attributeComponentContext.attribute.key
    );
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
    return {
      price: value?.valuePrice,
      isLightedUp: value ? value.selected : false,
    };
  }

  getValueDescriptionStyleClasses(): string {
    return 'cx-value-description santorini-updated';
  }
}
