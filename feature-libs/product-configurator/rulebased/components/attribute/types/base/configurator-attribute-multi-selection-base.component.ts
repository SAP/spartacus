/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';

import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  attribute: Configurator.Attribute;
  ownerKey: string;
  expMode: boolean;

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.ownerKey = attributeComponentContext.owner.key;
    this.expMode = attributeComponentContext.expMode;
  }

  /**
   * Checks if we are supposed to render a quantity control on attribute level, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker on attribute level?
   */
  get withQuantityOnAttributeLevel(): boolean {
    return this.quantityService.withQuantityOnAttributeLevel(this.attribute);
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
    return this.quantityService.disableQuantityActionsMultiSelection(
      this.attribute
    );
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {number} initialQuantity - Initial quantity
   * @param {boolean} allowZero - Allow zero
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    initialQuantity?: number,
    allowZero?: boolean
  ): ConfiguratorAttributeQuantityComponentOptions {
    const disableQuantityActions$ = this.loading$.pipe(
      map((loading) => {
        return loading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: allowZero ?? !this.attribute.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: disableQuantityActions$,
    };
  }

  protected onHandleAttributeQuantity(quantity: number): void {
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

  /**
   * Extract corresponding price formula parameters.
   * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: 0,
      price: {
        value: 0,
        currencyIso: '',
      },
      priceTotal: this.attribute.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding value price formula parameters.
   * For the multi-selection attribute types the complete price formula should be displayed at the value level.
   *
   * @param {Configurator.Value} value - Configurator value
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractValuePriceFormulaParameters(
    value: Configurator.Value
  ): ConfiguratorPriceComponentOptions {
    return {
      quantity: value.quantity,
      price: value.valuePrice,
      priceTotal: value.valuePriceTotal,
      isLightedUp: value.selected,
    };
  }
}
