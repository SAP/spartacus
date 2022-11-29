/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, OperatorFunction } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-filter',
  templateUrl: './configurator-overview-filter.component.html',
})
export class ConfiguratorOverviewFilterComponent {
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  @Input() showFilterBar: boolean = true;

  priceFilter = new UntypedFormControl('');
  mySelectionsFilter = new UntypedFormControl('');
  groupFilters = new Array<UntypedFormControl>();

  config$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getOrCreateConfiguration(
          routerData.owner
        )
      ),
      distinctUntilKeyChanged('configId'),
      switchMap((configuration) =>
        this.configuratorCommonsService.getConfigurationWithOverview(
          configuration
        )
      ),
      // filter 'strict null check safe'
      filter(
        (configuration) => configuration.overview != null
      ) as OperatorFunction<
        Configurator.Configuration,
        Configurator.ConfigurationWithOverview
      >,
      tap((configuration: Configurator.ConfigurationWithOverview) => {
        this.extractAttrFilterState(configuration);
        this.extractGroupFilterState(configuration);
      })
    );

  onFilter(config: Configurator.ConfigurationWithOverview) {
    let inputConfig = this.createInputConfig(
      config,
      this.collectAttrFilters(),
      this.collectGroupFilters(config.overview)
    );
    this.configuratorCommonsService.updateConfigurationOverview(inputConfig);
  }

  protected extractGroupFilterState(
    configuration: Configurator.ConfigurationWithOverview
  ) {
    this.groupFilters = [];
    configuration.overview.possibleGroups?.forEach((group) => {
      let isSelected = false;
      if (configuration.overview.groupFilters) {
        isSelected = configuration.overview.groupFilters.indexOf(group.id) >= 0;
      }
      this.groupFilters.push(new UntypedFormControl(isSelected));
    });
  }

  protected extractAttrFilterState(
    configuration: Configurator.ConfigurationWithOverview
  ) {
    if (configuration.overview.attributeFilters) {
      let isSelected =
        configuration.overview.attributeFilters.indexOf(
          Configurator.OverviewFilter.PRICE_RELEVANT
        ) >= 0;
      this.priceFilter.setValue(isSelected);

      isSelected =
        configuration.overview.attributeFilters.indexOf(
          Configurator.OverviewFilter.USER_INPUT
        ) >= 0;
      this.mySelectionsFilter.setValue(isSelected);
    }
  }

  protected collectGroupFilters(overview: Configurator.Overview): string[] {
    let filters: string[] = [];
    let idx = 0;
    this.groupFilters.forEach((groupFilter) => {
      if (groupFilter.value && overview?.possibleGroups) {
        filters.push(overview.possibleGroups[idx].id);
      }
      idx++;
    });
    return filters;
  }

  protected collectAttrFilters(): Configurator.OverviewFilter[] {
    let filters: Configurator.OverviewFilter[] = [];
    if (this.priceFilter.value) {
      filters.push(Configurator.OverviewFilter.PRICE_RELEVANT);
    }
    if (this.mySelectionsFilter.value) {
      filters.push(Configurator.OverviewFilter.USER_INPUT);
    }
    return filters;
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
