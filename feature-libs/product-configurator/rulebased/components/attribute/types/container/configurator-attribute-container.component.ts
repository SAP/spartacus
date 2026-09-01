/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { ConfiguratorUtilsService } from '../../../../core/facade/utils/configurator-utils.service';
import {
  ConfiguratorMessageService,
  ConfiguratorMessageGroup,
  ConfiguratorMessagesView,
} from '../../../service/configurator-message.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
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
export class ConfiguratorAttributeContainerComponent
  extends ConfiguratorAttributeSelectionBaseComponent
  implements OnInit
{
  protected configuratorGroupsService = inject(ConfiguratorGroupsService);
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);
  protected configuratorMessageService = inject(ConfiguratorMessageService);
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );
  protected changeDetectorRef = inject(ChangeDetectorRef);

  /** Cached mapping from container row id to pre-built message groups. */
  protected messagesMap: Record<string, ConfiguratorMessageGroup[]> = {};

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

  ngOnInit(): void {
    const owner = this.attributeComponentContext.owner;
    const groupId = this.attributeComponentContext.group.id;
    this.subscription.add(
      combineLatest([
        this.configuratorCommonsService.getConfiguration(owner),
        this.getShowRequiredMessage$(groupId),
      ]).subscribe(([configuration, showRequiredMessage]) => {
        this.messagesMap = this.buildMessagesMap(
          configuration,
          showRequiredMessage
        );
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  /**
   * Builds the mapping from container row id to pre-built message groups for
   * the given configuration. The expensive nested-group lookup and message
   * enrichment is performed once per configuration update instead of once per
   * rendered product card.
   *
   * @param configuration - Current configuration
   * @param showRequiredMessage - Whether the container required message should
   * be shown (parent group visited and attribute required and incomplete)
   * @returns Mapping from row id to message groups
   */
  protected buildMessagesMap(
    configuration: Configurator.Configuration,
    showRequiredMessage: boolean
  ): Record<string, ConfiguratorMessageGroup[]> {
    const messagesMap: Record<string, ConfiguratorMessageGroup[]> = {};
    const rows = this.getContainerRows();
    rows.forEach((row) => {
      const view = this.getRowMessages(
        configuration,
        row,
        rows,
        showRequiredMessage
      );
      messagesMap[row.id] = this.getRowMessageGroups(view, !!row.selected);
    });
    return messagesMap;
  }

  /**
   * Determines the messages to display for the given container row. When the
   * row is not selected, the row min/max info and (when applicable) the
   * required error are included before the row-level engine messages.
   *
   * @param configuration - Current configuration
   * @param row - Container row the messages belong to
   * @param rows - All container rows, used to compute the required count
   * @param showRequiredMessage - Whether the required message should be shown
   * @returns Messages of the nested configuration of the given container row
   */
  protected getRowMessages(
    configuration: Configurator.Configuration,
    row: Configurator.ContainerRow,
    rows: Configurator.ContainerRow[],
    showRequiredMessage: boolean
  ): ConfiguratorMessagesView {
    const group = row.groupId
      ? this.configuratorUtilsService.getOptionalGroupById(
          configuration.groups,
          row.groupId
        )
      : undefined;
    const engineMessages =
      this.configuratorMessageService.splitMessagesBySeverity(group?.messages);

    if (row.selected) {
      return engineMessages;
    }

    return this.configuratorMessageService.enrichMessagesWithContainerContext(
      engineMessages,
      {
        minRows: row.minRows,
        maxRows: row.maxRows,
        rows: rows,
        includeContainerInfo: true,
        includeRequiredError: showRequiredMessage,
        getContainerRowInfoKey: (minRows, maxRows) =>
          this.getContainerRowInfoKey(minRows, maxRows),
        getContainerRequiredMessageKey: (minRows, containerRows) =>
          this.getContainerRequiredMessageKey(minRows, containerRows),
      }
    );
  }

  /**
   * Filters the given messages by the product selection state and builds the
   * info, warning, error, container info and required message groups of the
   * bound container row.
   *
   * @param view - Messages of the bound container row
   * @param selected - Whether the row (product) is selected
   * @returns Message groups
   */
  protected getRowMessageGroups(
    view: ConfiguratorMessagesView,
    selected: boolean
  ): ConfiguratorMessageGroup[] {
    const messagesView =
      this.configuratorMessageService.filterMessagesByProductSelection(
        view,
        selected
      );

    return this.configuratorMessageService.prependContainerContextMessageGroups(
      messagesView,
      {
        containerInfoMessageClass: 'cx-container-info-msg',
        requiredErrorMessageClass: 'cx-container-error-msg',
        iconTypeError: ICON_TYPE.ERROR,
        containerInfoUiKeyPrefix: 'row-container-info-msg',
        requiredErrorUiKeyPrefix: 'row-required-msg',
      }
    );
  }

  /**
   * Whether the container required message should be considered.
   *
   * @returns `true` when the parent attribute is required and incomplete
   */
  protected shouldShowContainerRequiredMessage(): boolean {
    return !!this.attribute.required && !!this.attribute.incomplete;
  }

  /**
   * Resolves whether the required message can be shown for the parent group.
   * The message is only shown once the group (or cart entry) has been visited
   * and the attribute is required and incomplete.
   *
   * @param groupId - Parent group id
   * @returns Observable that emits whether the required message is shown
   */
  protected getShowRequiredMessage$(groupId?: string): Observable<boolean> {
    if (!groupId) {
      return of(false);
    }
    return this.configuratorStorefrontUtilsService
      .isCartEntryOrGroupVisited(this.attributeComponentContext.owner, groupId)
      .pipe(
        map((visited) => visited && this.shouldShowContainerRequiredMessage())
      );
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
      messages: this.messagesMap[row.id] ?? [],
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
