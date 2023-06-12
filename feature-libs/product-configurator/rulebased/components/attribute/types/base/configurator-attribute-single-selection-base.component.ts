/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Optional } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { map, take } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  attribute: Configurator.Attribute;
  ownerKey: string;
  ownerType: string;
  language: string;
  expMode: boolean;

  showRequiredErrorMessage$: Observable<boolean> = of(false);

  // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
  constructor(
    quantityService: ConfiguratorAttributeQuantityService,
    translation: TranslationService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    configuratorCommonsService: ConfiguratorCommonsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService
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
    super();

    this.attribute = attributeComponentContext.attribute;
    this.ownerKey = attributeComponentContext.owner.key;
    this.ownerType = attributeComponentContext.owner.type;
    this.language = attributeComponentContext.language;
    this.expMode = attributeComponentContext.expMode;

    if (this.configuratorStorefrontUtilsService) {
      this.showRequiredErrorMessage$ = this.configuratorStorefrontUtilsService
        .isCartEntryOrGroupVisited(
          attributeComponentContext.owner,
          attributeComponentContext.group.id
        )
        .pipe(
          map(
            (result) =>
              (result &&
                this.isRequiredErrorMsg(this.attribute) &&
                this.isDropDown(this.attribute) &&
                this.isNoValueSelected(this.attribute)) ||
              false
          )
        );
    }
  }

  /**
   * Checks if we are supposed to render a quantity control, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker?
   */
  get withQuantity(): boolean {
    return this.quantityService.withQuantity(
      this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
      this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
    );
  }

  /**
   * Checks if quantity control should be disabled
   *
   * @return {boolean} - Disable quantity picker?
   */
  get disableQuantityActions(): boolean {
    return this.quantityService.disableQuantityActions(
      this.attribute.selectedSingleValue
    );
  }

  onSelect(value: string): void {
    this.loading$.next(true);
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        selectedSingleValue: value,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  onSelectAdditionalValue(event: ConfigFormUpdateEvent): void {
    const userInput = event.changedAttribute.userInput;

    if (userInput) {
      this.loading$.next(true);
      event.changedAttribute.selectedSingleValue = userInput;
      this.configuratorCommonsService.updateConfiguration(
        event.ownerKey,
        event.changedAttribute,
        Configurator.UpdateType.ATTRIBUTE
      );
    }
  }

  onHandleQuantity(quantity: number): void {
    this.loading$.next(true);

    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        quantity,
      },
      Configurator.UpdateType.ATTRIBUTE_QUANTITY
    );
  }

  onChangeQuantity(eventObject: any, form?: UntypedFormControl): void {
    if (!eventObject) {
      if (form) {
        form.setValue('0');
      }
      this.onSelect('');
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  protected getInitialQuantity(form?: UntypedFormControl): number {
    const quantity: number = this.attribute.quantity ?? 0;
    if (form) {
      return form.value !== '0' ? quantity : 0;
    } else {
      return this.attribute.selectedSingleValue ? quantity : 0;
    }
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {FormControl} form - Form control
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    form?: UntypedFormControl
  ): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity = this.getInitialQuantity(form);
    const disableQuantityActions$ = this.loading$.pipe(
      map((loading) => {
        return loading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: !this.attribute.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: disableQuantityActions$,
    };
  }

  /**
   * Extract corresponding price formula parameters.
   * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding value price formula parameters.
   * For the single-selection attribute types only value price should be displayed at the value level.
   *
   * @param {Configurator.Value} value - Configurator value
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractValuePriceFormulaParameters(
    value?: Configurator.Value
  ): ConfiguratorPriceComponentOptions {
    return {
      price: value?.valuePrice,
      isLightedUp: value ? value.selected : false,
    };
  }

  protected getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute.values?.find((value) => value.selected)?.valuePrice;
  }

  get isAdditionalValueNumeric(): boolean {
    return (
      this.isWithAdditionalValues(this.attribute) &&
      this.attribute.validationType === Configurator.ValidationType.NUMERIC
    );
  }

  get isAdditionalValueAlphaNumeric(): boolean {
    return (
      this.isWithAdditionalValues(this.attribute) &&
      this.attribute.validationType === Configurator.ValidationType.NONE
    );
  }

  getAriaLabel(
    value: Configurator.Value,
    attribute: Configurator.Attribute
  ): string {
    const ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
    if (this.isWithAdditionalValues(this.attribute)) {
      const ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
      return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
    } else {
      return ariaLabel;
    }
  }

  getAdditionalValueAriaLabel(): string {
    let ariaLabel = '';
    this.translation
      .translate('configurator.a11y.additionalValue')
      .pipe(take(1))
      .subscribe((text) => (ariaLabel = text));
    return ariaLabel;
  }

  getAriaLabelWithoutAdditionalValue(
    value: Configurator.Value,
    attribute: Configurator.Attribute
  ): string {
    let ariaLabel = '';
    if (value.valuePrice && value.valuePrice?.value !== 0) {
      if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
        this.translation
          .translate(
            'configurator.a11y.selectedValueOfAttributeFullWithPrice',
            {
              value: value.valueDisplay,
              attribute: attribute.label,
              price: value.valuePriceTotal.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      } else {
        this.translation
          .translate(
            'configurator.a11y.selectedValueOfAttributeFullWithPrice',
            {
              value: value.valueDisplay,
              attribute: attribute.label,
              price: value.valuePrice.formattedValue,
            }
          )
          .pipe(take(1))
          .subscribe((text) => (ariaLabel = text));
      }
    } else {
      this.translation
        .translate('configurator.a11y.selectedValueOfAttributeFull', {
          value: value.valueDisplay,
          attribute: attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (ariaLabel = text));
    }
    return ariaLabel;
  }
}
