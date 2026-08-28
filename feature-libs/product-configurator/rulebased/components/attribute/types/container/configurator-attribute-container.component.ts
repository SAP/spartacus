/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { ConfiguratorUtilsService } from '../../../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeSelectionBaseComponent } from '../base/configurator-attribute-selection-base.component';

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
    NgTemplateOutlet,
    IconComponent,
    TranslatePipe,
    ConfiguratorAttributeProductCardComponent,
  ],
})
export class ConfiguratorAttributeContainerComponent extends ConfiguratorAttributeSelectionBaseComponent {
  protected configuratorGroupsService = inject(ConfiguratorGroupsService);
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);

  attribute: Configurator.Attribute;
  ownerKey: string;

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

  /**
   * Whether the available-products drop-down panel is open.
   */
  isAvailableProductsDropdownOpen = false;

  /**
   * Search term used to filter available products in the drop-down panel.
   */
  availableProductsSearchTerm = '';

  @ViewChild('availableProductsSearchInput')
  protected availableProductsSearchInput?: ElementRef<HTMLInputElement>;

  constructor() {
    super();
    this.attribute = this.attributeComponentContext.attribute;
    this.ownerKey = this.attributeComponentContext.owner.key;
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
   * Whether available products are shown as a searchable drop-down instead of
   * a list of product cards. This is the case when the number of available
   * products is larger than `cpqContainerDropDownListThreshold`.
   */
  get showAvailableProductsAsDropdown(): boolean {
    return this.availableProducts.length > this.availableProductsListThreshold;
  }

  /**
   * Available products filtered by the current search term. The term is matched
   * (case-insensitively) against the row id, product name and product system id.
   * Search is only applied while the drop-down is open.
   */
  get filteredAvailableProducts(): Configurator.ContainerRow[] {
    const products = this.availableProducts;
    if (!this.isAvailableProductsDropdownOpen) {
      return products;
    }
    const term = this.availableProductsSearchTerm.trim().toLowerCase();
    if (!term) {
      return products;
    }
    return products.filter((row) =>
      [row.id, row.productName, row.productSystemId]
        .filter((field): field is string => !!field)
        .some((field) => field.toLowerCase().includes(term))
    );
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
   * Caret icon for the available-products drop-down trigger.
   */
  get availableProductsDropdownIcon(): ICON_TYPE {
    return this.isAvailableProductsDropdownOpen
      ? ICON_TYPE.CARET_UP
      : ICON_TYPE.CARET_DOWN;
  }

  /**
   * Returns the original index of a row within the available products, so the
   * product card receives a stable index even when the list is filtered.
   *
   * @param row - Available container row
   * @returns Original index of the row
   */
  getAvailableProductIndex(row: Configurator.ContainerRow): number {
    return this.availableProducts.findIndex(
      (candidate) => candidate.id === row.id
    );
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
    if (!this.availableProductsExpanded) {
      this.closeAvailableProductsDropdown();
    }
  }

  /**
   * Opens the available-products drop-down panel and focuses the search input.
   *
   * @param event - User event that opened the drop-down
   */
  openAvailableProductsDropdown(event: Event): void {
    event.stopPropagation();
    this.isAvailableProductsDropdownOpen = true;
    this.focusAvailableProductsSearchInput();
  }

  /**
   * Opens or closes the available-products drop-down panel.
   *
   * @param event - User event that toggled the drop-down
   */
  toggleAvailableProductsDropdown(event: Event): void {
    event.stopPropagation();
    this.isAvailableProductsDropdownOpen =
      !this.isAvailableProductsDropdownOpen;
    if (this.isAvailableProductsDropdownOpen) {
      this.focusAvailableProductsSearchInput();
    } else {
      this.clearAvailableProductsSearch();
    }
  }

  /**
   * Closes the available-products drop-down panel and clears the search term.
   */
  closeAvailableProductsDropdown(): void {
    this.isAvailableProductsDropdownOpen = false;
    this.clearAvailableProductsSearch();
  }

  /**
   * Closes the available-products drop-down when clicking outside of it.
   */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeAvailableProductsDropdown();
  }

  /**
   * Adds the given available product as a new container row.
   *
   * @param row - Available container row to add
   */
  onAdd(row: Configurator.ContainerRow): void {
    if (!row.productSystemId) {
      return;
    }
    this.loading$.next(true);
    this.configuratorCommonsService.addContainerRow(
      this.ownerKey,
      this.getAttributeCode(this.attribute),
      row.productSystemId,
      this.attribute.containerRowId
    );
  }

  /**
   * Removes the given selected product from the container.
   *
   * @param row - Selected container row to remove
   */
  onRemove(row: Configurator.ContainerRow): void {
    this.loading$.next(true);
    this.configuratorCommonsService.removeContainerRow(this.ownerKey, row.id);
  }

  /**
   * Copies the given selected product in the container.
   *
   * @param row - Selected container row to copy
   */
  onCopy(row: Configurator.ContainerRow): void {
    this.loading$.next(true);
    this.configuratorCommonsService.copyContainerRow(this.ownerKey, row.id);
  }

  /**
   * Navigates to the first tab of the nested configuration of the given
   * selected container row.
   *
   * @param row - Selected container row to edit
   */
  onEdit(row: Configurator.ContainerRow): void {
    const rowGroupId = row.groupId;
    if (!rowGroupId) {
      return;
    }
    this.configuratorCommonsService
      .getConfiguration(this.attributeComponentContext.owner)
      .pipe(take(1))
      .subscribe((configuration) => {
        const firstTabId = this.configuratorUtilsService.getOptionalGroupById(
          configuration.groups,
          rowGroupId
        )?.subGroups[0]?.id;
        if (firstTabId) {
          this.configuratorGroupsService.navigateToGroup(
            configuration,
            firstTabId
          );
        }
      });
  }

  /**
   * Handles an action selected from a product card overflow menu.
   *
   * @param row - Container row the action applies to
   * @param action - Selected container row action
   */
  onRowAction(
    row: Configurator.ContainerRow,
    action: Configurator.ContainerRowAction
  ): void {
    switch (action) {
      case Configurator.ContainerRowAction.DELETE:
        this.onRemove(row);
        break;
      case Configurator.ContainerRowAction.ADD:
        this.onAdd(row);
        break;
      case Configurator.ContainerRowAction.EDIT:
        this.onEdit(row);
        break;
      case Configurator.ContainerRowAction.COPY:
        this.onCopy(row);
        break;
      default:
        break;
    }
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
      attribute: this.attribute,
      attributeId: this.getAttributeCode(this.attribute),
      attributeLabel: this.attribute.label,
      attributeName: this.attribute.name,
      itemCount,
      itemIndex: index,
      loading$: this.loading$,
      containerRow: row,
      groupId: this.attributeComponentContext.group.id,
    };
  }

  protected get availableProductsListThreshold(): number {
    return (
      this.configuratorUISettingsConfig.productConfigurator
        ?.cpqContainerDropDownListThreshold ?? 10
    );
  }

  protected clearAvailableProductsSearch(): void {
    this.availableProductsSearchTerm = '';
  }

  /**
   * Focuses the search input on the next tick so Angular can first remove the
   * `readonly` attribute applied while the drop-down is closed.
   */
  protected focusAvailableProductsSearchInput(): void {
    setTimeout(() => {
      const searchInput = this.availableProductsSearchInput?.nativeElement;
      searchInput?.focus();
    });
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
