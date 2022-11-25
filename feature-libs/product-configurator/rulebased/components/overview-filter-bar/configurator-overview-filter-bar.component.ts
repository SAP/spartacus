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

  onAttrFilterRemove(config: ConfigurationNonNullOv, filter: string) {
    let attrFilters = config.overview.attributeFilters ?? [];
    let groupFilters = config.overview.groupFilters ?? [];
    attrFilters = attrFilters.filter((attrFilter) => filter !== attrFilter);

    this.filterChange.emit({});
    this.configuratorCommonsService.updateConfigurationOverview(
      this.createInputConfig(config, attrFilters, groupFilters)
    );
  }

  onGroupFilterRemove(groupId: string) {
    console.log(groupId + '#group clicked');
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
