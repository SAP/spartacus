/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

/**
 * Renders a CPQ container attribute and its individually configurable
 * sub-product rows.
 */
@Component({
  selector: 'cx-configurator-attribute-container',
  templateUrl: './configurator-attribute-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    IconComponent,
    TranslatePipe,
    ConfiguratorAttributeProductCardComponent,
  ],
})
export class ConfiguratorAttributeContainerComponent extends ConfiguratorAttributeBaseComponent {
  attribute: Configurator.Attribute;

  /**
   * Whether the selected-products accordion section is expanded.
   * The section starts expanded.
   */
  selectedProductsExpanded = true;

  /**
   * Whether the available-products accordion section is expanded.
   * The section starts expanded.
   */
  availableProductsExpanded = true;

  constructor(
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
  }

  /**
   * Selected container rows shown in the "Selected Products" section.
   */
  get selectedProducts(): Configurator.ContainerRow[] {
    return this.getContainerRows().filter((row) => row.selected);
  }

  /**
   * Unselected container rows shown in the "Available Products" section.
   */
  get availableProducts(): Configurator.ContainerRow[] {
    return this.getContainerRows().filter((row) => !row.selected);
  }

  /**
   * Icon for the selected-products toggle: minus when expanded, plus when collapsed.
   */
  get selectedProductsToggleIcon(): ICON_TYPE {
    return this.selectedProductsExpanded
      ? ICON_TYPE.COLLAPSE
      : ICON_TYPE.EXPAND;
  }

  /**
   * Icon for the available-products toggle: minus when expanded, plus when collapsed.
   */
  get availableProductsToggleIcon(): ICON_TYPE {
    return this.availableProductsExpanded
      ? ICON_TYPE.COLLAPSE
      : ICON_TYPE.EXPAND;
  }

  /**
   * Opens or closes the selected-products accordion section.
   */
  toggleSelectedProducts(): void {
    this.selectedProductsExpanded = !this.selectedProductsExpanded;
  }

  /**
   * Opens or closes the available-products accordion section.
   */
  toggleAvailableProducts(): void {
    this.availableProductsExpanded = !this.availableProductsExpanded;
  }

  /**
   * Builds product card options for a container row.
   *
   * @param row - Container row to display
   * @param index - Index of the row in its section list
   * @param itemCount - Number of products in that section
   * @returns Product card options
   */
  extractProductCardParameters(
    row: Configurator.ContainerRow,
    index: number,
    itemCount: number
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      multiSelect: true,
      productBoundValue: this.mapRowToValue(row),
      attributeId: this.getAttributeCode(this.attribute),
      attributeLabel: this.attribute.label,
      attributeName: this.attribute.name,
      itemCount,
      itemIndex: index,
    };
  }

  protected getContainerRows(): Configurator.ContainerRow[] {
    return this.attribute.container?.rows ?? [];
  }

  protected mapRowToValue(row: Configurator.ContainerRow): Configurator.Value {
    return {
      valueCode: row.id,
      name: row.productName,
      valueDisplay: row.productName,
      productSystemId: row.productSystemId,
      selected: !!row.selected,
    };
  }
}
