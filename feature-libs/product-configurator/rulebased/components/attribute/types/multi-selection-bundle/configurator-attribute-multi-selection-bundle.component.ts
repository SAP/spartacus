/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FeatureDirective, Product, ProductService } from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { ConfiguratorProductScope } from '@spartacus/product-configurator/common';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';

interface SelectionValue {
  name?: string;
  quantity?: number;
  selected?: boolean;
  valueCode: string;
}

@Component({
  selector: 'cx-configurator-attribute-multi-selection-bundle',
  templateUrl: './configurator-attribute-multi-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    NgTemplateOutlet,
    AsyncPipe,
    FormsModule,
    FeatureDirective,
    IconComponent,
    ConfiguratorAttributeProductCardComponent,
  ],
})
export class ConfiguratorAttributeMultiSelectionBundleComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit
{
  iconTypes = ICON_TYPE;

  preventAction$ = new BehaviorSubject<boolean>(false);
  multipleSelectionValues: SelectionValue[] = [];

  /** Controls the open/closed state of the custom dropdown panel. */
  isDropdownOpen = false;

  /** Current search term used to filter the options in the dropdown panel. */
  searchTerm = '';

  /**
   * Caches the product-name observable per value code so the selected-item
   * template does not create a new subscription (and a new backend request) on
   * every change detection cycle.
   */
  protected productNameCache = new Map<string, Observable<string>>();

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected productService: ProductService
  ) {
    super(
      quantityService,
      attributeComponentContext,
      configuratorCommonsService
    );
  }

  ngOnInit() {
    this.initialize();
  }

  /**
   * Returns the display name of the product bound to the given value. The
   * product is fetched via the {@link ProductService} using the same scope as
   * the product card, falling back to the value display text (and finally the
   * value code) when no product is available.
   *
   * @param value - Configurator value to resolve the product name for
   * @return Observable emitting the resolved product name
   */
  getProductName(value: Configurator.Value): Observable<string> {
    const valueCode = value.valueCode;
    let name$ = this.productNameCache.get(valueCode);
    if (!name$) {
      const productSystemId = value.productSystemId ?? '';
      name$ = this.productService
        .get(
          productSystemId,
          ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD
        )
        .pipe(
          map(
            (product: Product | undefined) =>
              product?.name ?? value.valueDisplay ?? valueCode
          )
        );
      this.productNameCache.set(valueCode, name$);
    }
    return name$;
  }

  /**
   * Returns the currently selected values, used to render the selected-item
   * template in the dropdown button.
   */
  get selectedValues(): Configurator.Value[] {
    return (this.attribute.values ?? []).filter((value) => value.selected);
  }

  /**
   * Returns the attribute values filtered by the current search term. The term
   * is matched (case-insensitively) against the value code, name and display
   * text so the user can quickly find a product when the list is long.
   */
  get filteredValues(): Configurator.Value[] {
    const values = this.attribute.values ?? [];
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return values;
    }
    return values.filter((value) =>
      [value.valueCode, value.name, value.valueDisplay]
        .filter((field): field is string => !!field)
        .some((field) => field.toLowerCase().includes(term))
    );
  }

  /**
   * Returns the original index of a value within the attribute values, so the
   * product card receives a stable index even when the list is filtered.
   */
  getValueIndex(value: Configurator.Value): number {
    return (this.attribute.values ?? []).findIndex(
      (candidate) => candidate.valueCode === value.valueCode
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.clearSearch();
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.clearSearch();
  }

  /**
   * Closes the dropdown when clicking outside of the component.
   */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeDropdown();
  }

  /**
   * Initializes selection values and peventAction observable
   */
  protected initialize(): void {
    if (this.attribute.values && this.attribute.values.length > 0) {
      this.multipleSelectionValues = this.attribute.values.map(
        ({ name, quantity, selected, valueCode }) => ({
          name,
          quantity,
          selected,
          valueCode,
        })
      );
    }

    if (
      this.attribute.required &&
      this.multipleSelectionValues.filter((value) => value.selected).length < 2
    ) {
      this.preventAction$.next(true);
    }
  }

  /**
   * Updates the value dependent on the provided state
   *
   * @param  {any} valueCode - value code to be updated
   * @param  {any} state - selected state
   *
   * @return {ConfigFormUpdateEvent} - form update event
   */
  protected updateMultipleSelectionValues(
    valueCode: any,
    state: any
  ): ConfigFormUpdateEvent {
    // Create a new array (and a new value object for the changed value) instead
    // of mutating in place. The previous array is handed over by reference into
    // the dispatched action and gets deep-frozen by the NgRx runtime checks. On
    // a round trip that does not re-create the attribute component (e.g. CPQ API
    // V2 returning no changes) the same frozen array would be reused, so an
    // in-place mutation would throw a "read-only" error.
    this.multipleSelectionValues = this.multipleSelectionValues.map((value) =>
      value.valueCode === valueCode ? { ...value, selected: state } : value
    );

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: this.multipleSelectionValues,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    return event;
  }

  /**
   * Updates the quantity of the given value
   *
   * @param  eventValue - event value
   *
   * @return {ConfigFormUpdateEvent} - form update event
   */
  protected updateMultipleSelectionValuesQuantity(eventValue: {
    valueCode: string;
    quantity: number;
  }): ConfigFormUpdateEvent | undefined {
    const value: Configurator.Value | undefined =
      this.multipleSelectionValues.find(
        (selectionValue) => selectionValue.valueCode === eventValue.valueCode
      );

    if (!value) {
      return;
    }

    // Create a new value object instead of mutating in place, since the value
    // might be part of a deep-frozen array handed over into the store on a
    // previous round trip (see updateMultipleSelectionValues).
    const updatedValue: SelectionValue = {
      ...value,
      quantity: eventValue.quantity,
    };
    this.multipleSelectionValues = this.multipleSelectionValues.map(
      (selectionValue) =>
        selectionValue.valueCode === eventValue.valueCode
          ? updatedValue
          : selectionValue
    );

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [updatedValue],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.VALUE_QUANTITY,
    };

    return event;
  }

  onSelect(eventValue: any): void {
    this.loading$.next(true);
    const changes = this.updateMultipleSelectionValues(eventValue, true);

    this.configuratorCommonsService.updateConfiguration(
      changes.ownerKey,
      changes.changedAttribute,
      changes.updateType
    );
  }

  onDeselect(eventValue: any): void {
    this.loading$.next(true);
    const changes = this.updateMultipleSelectionValues(eventValue, false);
    this.configuratorCommonsService.updateConfiguration(
      changes.ownerKey,
      changes.changedAttribute,
      changes.updateType
    );
  }

  onDeselectAll(): void {
    this.loading$.next(true);
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        values: [],
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  onChangeValueQuantity(eventValue: any): void {
    this.loading$.next(true);
    const changes = this.updateMultipleSelectionValuesQuantity(eventValue);

    if (changes) {
      this.configuratorCommonsService.updateConfiguration(
        changes.ownerKey,
        changes.changedAttribute,
        changes.updateType
      );
    }
  }

  onChangeAttributeQuantity(eventObject: any): void {
    this.loading$.next(true);

    if (!eventObject) {
      this.onDeselectAll();
    } else {
      this.onHandleAttributeQuantity(eventObject);
    }
  }

  /**
   * Extract corresponding price formula parameters
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
   * Extract corresponding product card parameters
   * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
   * @param {Configurator.Value} value - Value
   * @param {number} index - index of current value in list of values of attribute
   * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading. Only relevant while
   *   the `productConfiguratorConsolidatedButtonDisabling` feature toggle is off.
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    hideRemoveButton: boolean | null,
    value: Configurator.Value,
    index: number,
    disableAllButtons: boolean | null = false
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      disableAllButtons: disableAllButtons ?? false,
      hideRemoveButton: hideRemoveButton ?? false,
      productBoundValue: value,
      multiSelect: true,
      withQuantity: this.withQuantity,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
      attributeLabel: this.attribute.label,
      attributeName: this.attribute.name,
      itemCount: this.attribute.values?.length
        ? this.attribute.values.length
        : 0,
      itemIndex: index,
    };
  }
}
