/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, inject } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-filter-bar',
  templateUrl: './configurator-overview-filter-bar.component.html',
  standalone: false,
})
export class ConfiguratorOverviewFilterBarComponent {
  readonly PREFIX_ID = 'cx-overview-filter-applied-';
  readonly FIRST_FILTER_CHECKBOX_ID =
    'cx-configurator-overview-filter-option-price';
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  @Input() config: Configurator.ConfigurationWithOverview;

  iconTypes = ICON_TYPE;
  attributeFilterTypes = Configurator.OverviewFilter;

  /**
   * gets the description for the given group id
   *
   * @param groupId groupId
   * @param config - current configuration with overview data
   */
  getGroupFilterDescription(
    overview: Configurator.Overview,
    groupId: string
  ): string {
    return (
      overview.possibleGroups?.find((group) => group.id === groupId)
        ?.groupDescription ?? ''
    );
  }

  /**
   * removes the given attribute filter and updates the configuration overview accordingly
   *
   * @param attrToRemove attribute filter to remove
   * @param config - current configuration with overview data
   */
  onAttrFilterRemove(
    config: Configurator.ConfigurationWithOverview,
    attrToRemove: Configurator.OverviewFilter
  ) {
    let [attrFilters, groupFilters] = this.getInputFilters(config.overview);

    // Get the index of the attribute filter to remove
    const indexToRemove = attrFilters.indexOf(attrToRemove);

    // Remove the attribute filter
    attrFilters = attrFilters.filter(
      (attrFilterName) => attrToRemove !== attrFilterName
    );

    // Determine the next element to focus on
    let idToFocus = this.getNextElementIdToFocusForAttributeFilter(
      indexToRemove,
      attrFilters
    );
    if (idToFocus === null) {
      idToFocus = this.getNextElementIdToFocusForGroupFilter(
        0,
        attrFilters,
        groupFilters
      );
    }
    this.focusElementById(idToFocus);

    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  /**
   * removes the given group filter and updates the configuration overview accordingly
   *
   * @param groupIdToRemove id of the group to be removed from filtering
   * @param config - current configuration with overview data
   */
  onGroupFilterRemove(
    config: Configurator.ConfigurationWithOverview,
    groupIdToRemove: string
  ) {
    let [attrFilters, groupFilters] = this.getInputFilters(config.overview);

    // Get the index of groupIdToRemove
    const indexToRemove = groupFilters.indexOf(groupIdToRemove);

    // Remove the group filter
    groupFilters = groupFilters.filter(
      (groupId) => groupIdToRemove !== groupId
    );

    // Determine the next element to focus on
    const idToFocus = this.getNextElementIdToFocusForGroupFilter(
      indexToRemove,
      attrFilters,
      groupFilters
    );
    this.focusElementById(idToFocus);

    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  /**
   * Determines the next element to focus on after removing an attribute filter.
   * Return null if removed attribute filter was the last one in the list.
   *
   * @param indexOfRemoved - The index of the attribute filter that has been removed.
   * @param attrFilters - The list of attribute filters.
   * @returns - The next element to focus on, or null if there is none.
   */
  protected getNextElementIdToFocusForAttributeFilter(
    indexOfRemoved: number,
    attrFilters: string[]
  ): string | null {
    let nextElementIdToFocus: string | null;

    if (indexOfRemoved < attrFilters.length) {
      nextElementIdToFocus = this.PREFIX_ID + attrFilters[indexOfRemoved];
    } else {
      nextElementIdToFocus = null;
    }
    return nextElementIdToFocus;
  }

  /**
   * Determines the next element to focus on after removing a group filter.
   * Return id of remove all button if removed group filter was the last one in the list and there are more than one filters (attribute and group combined) left.
   * Return id of first filter checkbox if removed group filter was the last one in the list and only one filter (attribute and group filters conbined) is left.
   *
   * @param indexOfRemoved - The index of the attribute filter that has been removed.
   * @param attrFilters - The list of attribute filters.
   * @param groupFilters - The list of attribute filters.
   * @returns - The next element to focus on
   */
  protected getNextElementIdToFocusForGroupFilter(
    indexOfRemoved: number,
    attrFilters: string[],
    groupFilters: string[]
  ): string {
    let nextElementIdToFocus: string | null;

    if (indexOfRemoved < groupFilters.length) {
      nextElementIdToFocus = this.PREFIX_ID + groupFilters[indexOfRemoved];
    } else {
      if (attrFilters.length + groupFilters.length > 1) {
        nextElementIdToFocus = this.PREFIX_ID + 'REMOVE_ALL';
      } else {
        nextElementIdToFocus = this.FIRST_FILTER_CHECKBOX_ID;
      }
    }
    return nextElementIdToFocus;
  }

  /**
   * Focuses the HTML element with the specified ID.
   *
   * This method retrieves the HTML element using the provided ID and calls
   * the `focus` method on it if the element exists.
   *
   * @param elementId - The ID of the HTML element to focus.
   */
  protected focusElementById(elementId: string): void {
    const element = this.configuratorStorefrontUtilsService.getElement(
      '#' + elementId
    );
    if (element) {
      element.focus();
    }
  }

  /**
   * check whether the button to remove all filters should be shown
   *
   * @param overview - current configuration overview data
   * @returns - 'true' only if the button to remove all filters should be shown
   */
  isShowRemoveAll(overview: Configurator.Overview): boolean {
    const numFilters =
      (overview.attributeFilters?.length ?? 0) +
      (overview.groupFilters?.length ?? 0);
    return numFilters > 1;
  }

  /**
   * removes all filters and updates the configuration overview accordingly
   *
   * @param config - current configuration with overview data
   */
  onRemoveAll(config: Configurator.ConfigurationWithOverview) {
    this.focusElementById(this.FIRST_FILTER_CHECKBOX_ID);
    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, [], [])
    );
  }

  protected getInputFilters(
    overview: Configurator.Overview
  ): [Configurator.OverviewFilter[], string[]] {
    return [overview.attributeFilters ?? [], overview.groupFilters ?? []];
  }

  protected createInputConfig(
    config: Configurator.ConfigurationWithOverview,
    attrFilters: Configurator.OverviewFilter[],
    groupFilers: string[]
  ): Configurator.ConfigurationWithOverview {
    return {
      ...config,
      overview: {
        configId: config.configId,
        productCode: config.productCode,
        attributeFilters: attrFilters,
        groupFilters: groupFilers,
        possibleGroups: config.overview?.possibleGroups,
      },
    };
  }
}
