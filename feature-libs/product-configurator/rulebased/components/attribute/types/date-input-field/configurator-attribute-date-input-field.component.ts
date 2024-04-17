/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable, Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';

@Component({
  selector: 'cx-configurator-attribute-date-input-field',
  templateUrl: './configurator-attribute-date-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDateInputFieldComponent
  extends ConfiguratorAttributeInputFieldComponent
  implements OnInit, OnDestroy
{
  attributeInputForm = new UntypedFormControl('');
  protected sub: Subscription;

  attribute: Configurator.Attribute;
  group: string;
  owner: CommonConfigurator.Owner;
  ownerKey: string;
  ownerType: CommonConfigurator.OwnerType;

  showRequiredErrorMessage$: Observable<boolean> = of(false);

  /**
   * In case no config is injected, or when the debounce time is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME = 500;

  constructor(
    protected config: ConfiguratorUISettingsConfig,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super(
      config,
      attributeComponentContext,
      configuratorCommonsService,
      configuratorStorefrontUtilsService
    );

    this.showRequiredErrorMessage$ = this.configuratorStorefrontUtilsService
      .isCartEntryOrGroupVisited(this.owner, this.group)
      .pipe(
        map((result) =>
          result
            ? this.isRequiredErrorMsg(this.attribute) &&
              this.isUserInput(this.attribute)
            : false
        )
      );
  }

  onChange(): void {    
    if (!this.attributeInputForm.invalid) {
      console.log("CHHI onChange is valid", this.attributeInputForm.value, );
      this.configuratorCommonsService.updateConfiguration(
        this.ownerKey,
        {
          ...this.attribute,
          userInput: this.attributeInputForm.value,
          selectedSingleValue: this.attributeInputForm.value,
        },
        Configurator.UpdateType.ATTRIBUTE
      );
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  /**
   * Verifies if the user input has a non-blank value.
   * @returns {boolean} - 'True' if the user input is undefined, empty or contains only blanks, otherwise 'false'.
   */
  get isUserInputEmpty(): boolean {
    return (
      !this.attribute.userInput || this.attribute.userInput.trim().length === 0
    );
  }

  /**
   * Checks if the component needs to be marked as required.
   * This is never the case if it is used as sub component for an attribute type which allows an additional value
   * @returns Required?
   */
  get isRequired(): boolean {
    return this.isUserInput(this.attribute)
      ? this.attribute.required ?? false
      : false;
  }
}
