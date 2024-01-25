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
  Optional,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Observable, of, Subscription, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

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
  owner: CommonConfigurator.Owner;
  ownerKey: string;
  ownerType: CommonConfigurator.OwnerType;

  showRequiredErrorMessage$: Observable<boolean> = of(false);

  /**
   * In case no config is injected, or when the debounce time is not configured at all,
   * this value will be used as fallback.
   */
  protected readonly FALLBACK_DEBOUNCE_TIME = 500;

  // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
  constructor(
    config: ConfiguratorUISettingsConfig,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService
  );

  /**
   * @deprecated since 6.2
   */
  constructor(
    config: ConfiguratorUISettingsConfig,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService
  );

  // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
  constructor(
    protected config: ConfiguratorUISettingsConfig,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    @Optional()
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService
  ) {
    super();

    this.attribute = attributeComponentContext.attribute;
    this.group = attributeComponentContext.group.id;
    this.owner = attributeComponentContext.owner;
    this.ownerKey = attributeComponentContext.owner.key;
    this.ownerType = attributeComponentContext.owner.type;

    if (this.configuratorStorefrontUtilsService) {
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
    return this.isUserInput(this.attribute)
      ? this.attribute.required ?? false
      : false;
  }
}
