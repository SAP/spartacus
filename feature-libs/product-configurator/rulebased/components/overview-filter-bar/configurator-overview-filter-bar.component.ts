/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-filter-bar',
  templateUrl: './configurator-overview-filter-bar.component.html',
})
export class ConfiguratorOverviewFilterBarComponent {
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  @Input() config: Configurator.ConfigurationWithOverview;

  iconTypes = ICON_TYPE;
  attributeFilterTypes = Configurator.OverviewFilter;

  /**
   * gets the description for the given group id
   *
   * @param {string} groupId groupId
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
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
   * @param {Configurator.OverviewFilter} attrToRemove attribute filter to remove
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
   */
  onAttrFilterRemove(
    config: Configurator.ConfigurationWithOverview,
    attrToRemove: Configurator.OverviewFilter
  ) {
    let [attrFilters, groupFilters] = this.getInputFilters(config.overview);
    attrFilters = attrFilters.filter(
      (attrFilterName) => attrToRemove !== attrFilterName
    );

    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  /**
   * removes the given group filter and updates the configuration overview accordingly
   *
   * @param {string} groupIdToRemove id of the group to be removed from filtering
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
   */
  onGroupFilterRemove(
    config: Configurator.ConfigurationWithOverview,
    groupIdToRemove: string
  ) {
    let [attrFilters, groupFilters] = this.getInputFilters(config.overview);
    groupFilters = groupFilters.filter(
      (groupId) => groupIdToRemove !== groupId
    );

    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  /**
   * check whether the button to remove all filters should be shown
   *
   * @param {Configurator.Overview} overview - current configuration overview data
   * @returns {boolean} - 'true' only if the button to remove all filters should be shown
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
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
   */
  onRemoveAll(config: Configurator.ConfigurationWithOverview) {
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
