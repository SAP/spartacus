/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { Observable, Subscription, of, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfiguratorAttributeInputFieldComponent
  extends ConfiguratorAttributeBaseComponent
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
   * Initially, changes to a date control are sent immediately
   * (when using the date picker. Only after any key is pressed, the
   * debounce time kicks in)
   * )
   */
  protected debounceForDateActive = false;
  /**
   * In case no config is injected, or when the debounce time is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME = 500;

  /**
   * In case no config is injected, or if the debounce time for dates is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME_DATE = 1500;

  constructor(
    protected config: ConfiguratorUISettingsConfig,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super();

    this.attribute = attributeComponentContext.attribute;
    this.group = attributeComponentContext.group.id;
    this.owner = attributeComponentContext.owner;
    this.ownerKey = attributeComponentContext.owner.key;
    this.ownerType = attributeComponentContext.owner.type;

    this.compileShowRequiredErrorMessage();
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
      .pipe(debounce(() => timer(this.calculateDebounceTime())))
      .subscribe(() => {
        this.onChange();
      });
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
    return this.isUserInput(this.attribute)
      ? (this.attribute.required ?? false)
      : false;
  }
  /**
   * Returns the type for the input field. Depending on the UI type, that is text or date.
   */
  get inputType(): string {
    return this.isDateBased(this.attribute) ? 'date' : 'text';
  }
  /**
   * Activates a waiting period until date changes are sent. We only
   * want to enable that once the user tries to enter something
   * directly (when using date picker, changes should be sent instantly)
   */
  activateDebounceDate(): void {
    this.debounceForDateActive = true;
  }

  protected isDateBased(attribute: Configurator.Attribute) {
    return (
      attribute.uiType === Configurator.UiType.SAP_DATE ||
      (this.isWithAdditionalValues(attribute) &&
        attribute.validationType === Configurator.ValidationType.SAP_DATE)
    );
  }

  protected compileShowRequiredErrorMessage(): void {
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

  protected calculateDebounceTime(): number {
    if (this.isDateBased(this.attribute)) {
      return this.debounceForDateActive
        ? (this.config.productConfigurator?.updateDebounceTime?.date ??
            this.FALLBACK_DEBOUNCE_TIME_DATE)
        : 0;
    } else {
      return (
        this.config.productConfigurator?.updateDebounceTime?.input ??
        this.FALLBACK_DEBOUNCE_TIME
      );
    }
  }
}
