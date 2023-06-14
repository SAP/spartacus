/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';

import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeInputFieldComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit, OnDestroy
{
  attributeInputForm = new UntypedFormControl('');
  protected sub: Subscription;

  attribute: Configurator.Attribute;
  group: string;
  ownerKey: string;
  ownerType: CommonConfigurator.OwnerType;

  /**
   * In case no config is injected, or when the debounce time is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME = 500;

  constructor(
    protected config: ConfiguratorUISettingsConfig,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.group = attributeComponentContext.group.id;
    this.ownerKey = attributeComponentContext.owner.key;
    this.ownerType = attributeComponentContext.owner.type;
  }

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.userInput);
    if (
      this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
      this.attribute.required &&
      this.attribute.incomplete &&
      !this.attributeInputForm.value
    ) {
      this.attributeInputForm.markAsTouched();
    }
    this.sub = this.attributeInputForm.valueChanges
      .pipe(
        debounce(() =>
          timer(
            this.config.productConfigurator?.updateDebounceTime?.input ??
              this.FALLBACK_DEBOUNCE_TIME
          )
        )
      )
      .subscribe(() => this.onChange());
  }

  onChange(): void {
    if (!this.attributeInputForm.invalid) {
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
    const isNonDomainAttributeType =
      this.attribute.uiType === Configurator.UiType.STRING ||
      this.attribute.uiType === Configurator.UiType.NUMERIC;
    return isNonDomainAttributeType ? this.attribute.required ?? false : false;
  }
}
