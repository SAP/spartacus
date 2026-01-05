/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input, OnChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-filter',
  templateUrl: './configurator-overview-filter.component.html',
  standalone: false,
})
export class ConfiguratorOverviewFilterComponent implements OnChanges {
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  @Input() showFilterBar: boolean = true;
  @Input() config: Configurator.ConfigurationWithOverview;

  priceFilter = new UntypedFormControl('');
  mySelectionsFilter = new UntypedFormControl('');
  groupFilters = new Array<UntypedFormControl>();

  ngOnChanges() {
    this.extractAttrFilterState(this.config);
    this.extractGroupFilterState(this.config);
  }

  /**
   * Updates the overview based on the filters currently selected in the UI
   *
   * @param config - current configuration with overview data
   */
  onFilter(config: Configurator.ConfigurationWithOverview) {
    const inputConfig = this.createInputConfig(
      config,
      this.collectAttrFilters(),
      this.collectGroupFilters(config.overview)
    );
    this.configuratorCommonsService.updateConfigurationOverview(inputConfig);
  }

  /**
   * Verifies whether a product is a variant product in the display only view.
   *
   * @returns - if `baseProduct` property of the current product is defined
   * and provides the product code of the base product,
   * and the current product is in the display only view
   * then returns `true`, otherwise `false`.
   */
  isDisplayOnlyVariant(): Observable<boolean> {
    return this.configuratorStorefrontUtilsService.isDisplayOnlyVariant();
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
      const isPriceFilterSelected =
        configuration.overview.attributeFilters.indexOf(
          Configurator.OverviewFilter.PRICE_RELEVANT
        ) >= 0;
      this.priceFilter.setValue(isPriceFilterSelected);

      const isMySelectionsFilterSelected =
        configuration.overview.attributeFilters.indexOf(
          Configurator.OverviewFilter.USER_INPUT
        ) >= 0;
      this.mySelectionsFilter.setValue(isMySelectionsFilterSelected);
    }
  }

  protected collectGroupFilters(overview: Configurator.Overview): string[] {
    const filters: string[] = [];
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
    const filters: Configurator.OverviewFilter[] = [];
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
