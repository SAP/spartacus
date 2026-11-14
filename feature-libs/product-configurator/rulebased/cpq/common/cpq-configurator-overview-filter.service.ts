/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorOverviewFilterService {
  /**
   * Applies attribute and group filters to the unfiltered overview groups.
   * Group filtering matches top-level group IDs only; subgroup IDs are not
   * traversed and are silently ignored.
   */
  filter(
    possibleGroups: Configurator.GroupOverview[],
    attributeFilters: Configurator.OverviewFilter[] | undefined,
    groupFilters: string[] | undefined
  ): Configurator.GroupOverview[] {
    const priceFilterActive =
      attributeFilters?.includes(Configurator.OverviewFilter.PRICE_RELEVANT) ??
      false;

    let groups = this.filterByGroups(possibleGroups, groupFilters);

    if (priceFilterActive) {
      groups = groups
        .map((group) => this.filterByPrice(group))
        .filter((group) => this.hasOverviewContent(group));
    }

    return groups;
  }

  protected filterByGroups(
    groups: Configurator.GroupOverview[],
    groupFilters: string[] | undefined
  ): Configurator.GroupOverview[] {
    if (!groupFilters?.length) {
      return groups;
    }
    return groups.filter((group) => groupFilters.includes(group.id));
  }

  /**
   * Filters attributes keeping only ones that have a non-zero price, preserving
   * nested groups (e.g. container rows) as headers for the priced attributes
   * they contain.
   */
  protected filterByPrice(
    group: Configurator.GroupOverview
  ): Configurator.GroupOverview {
    const filteredGroup: Configurator.GroupOverview = {
      id: group.id,
      groupDescription: group.groupDescription,
      attributes: (group.attributes ?? []).filter((attr) =>
        this.isPriceRelevant(attr)
      ),
    };
    const subGroups = (group.subGroups ?? [])
      .map((subGroup) => this.filterByPrice(subGroup))
      .filter((subGroup) => this.hasOverviewContent(subGroup));
    if (subGroups.length) {
      filteredGroup.subGroups = subGroups;
    }
    return filteredGroup;
  }

  protected isPriceRelevant(attr: Configurator.AttributeOverview): boolean {
    const valuePrice = attr.valuePrice?.value ?? 0;
    const valuePriceTotal = attr.valuePriceTotal?.value ?? 0;
    return (
      (valuePrice !== 0 && Number.isFinite(valuePrice)) ||
      (valuePriceTotal !== 0 && Number.isFinite(valuePriceTotal))
    );
  }

  protected hasOverviewContent(group: Configurator.GroupOverview): boolean {
    return !!group.attributes?.length || !!group.subGroups?.length;
  }
}
