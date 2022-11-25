/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigurationNonNullOv } from '../overview-filter/configurator-overview-filter.component';
import { OverviewFilterUpdateEvent } from '../overview-filter/configurator-overview-filter.event';

@Component({
  selector: 'cx-configurator-overview-filter-bar',
  templateUrl: './configurator-overview-filter-bar.component.html',
})
export class ConfiguratorOverviewFilterBarComponent {
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  @Output() filterChange = new EventEmitter<OverviewFilterUpdateEvent>();
  @Input() config: ConfigurationNonNullOv;

  iconTypes = ICON_TYPE;
  attributeFilterTypes = Configurator.OverviewFilter;

  getGroupFilterDescription(
    overview: Configurator.Overview,
    groupId: string
  ): string {
    console.log(overview);
    return (
      overview.possibleGroups?.find((group) => group.id === groupId)
        ?.groupDescription ?? ''
    );
  }

  onAttrFilterRemove(config: ConfigurationNonNullOv, attrToRemove: string) {
    let attrFilters = config.overview.attributeFilters ?? [];
    let groupFilters = config.overview.groupFilters ?? [];
    attrFilters = attrFilters.filter(
      (attrFilterName) => attrToRemove !== attrFilterName
    );

    this.filterChange.emit({});
    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  onGroupFilterRemove(config: ConfigurationNonNullOv, groupIdToRemove: string) {
    let attrFilters = config.overview.attributeFilters ?? [];
    let groupFilters = config.overview.groupFilters ?? [];
    groupFilters = groupFilters.filter(
      (groupId) => groupIdToRemove !== groupId
    );

    this.filterChange.emit({});
    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  isShowRemoveAll(overview: Configurator.Overview): boolean {
    let numFilters =
      (overview.attributeFilters?.length ?? 0) +
      (overview.groupFilters?.length ?? 0);
    return numFilters > 1;
  }

  onRemoveAll(config: ConfigurationNonNullOv) {
    this.filterChange.emit({});
    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, [], [])
    );
  }

  protected createInputConfig(
    config: ConfigurationNonNullOv,
    attrFilters: Configurator.OverviewFilter[],
    groupFilers: string[]
  ): ConfigurationNonNullOv {
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
