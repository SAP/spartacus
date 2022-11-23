/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorRouterExtractorService } from 'feature-libs/product-configurator/common/components/service/configurator-router-extractor.service';
import { Observable } from 'rxjs/internal/Observable';
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
      // filter nullish 'strict null checks' safe
      filter((configuration) => configuration.overview != null),
      tap((configuration) => {
        this.groupFilters = [];
        configuration.overview?.groups?.forEach(() => {
          this.groupFilters.push(new UntypedFormControl(''));
        });
      })
    );

  onFilter(config: Configurator.Configuration) {
    let inputConfig = this.createInputConfig(
      config,
      this.collectAttrFilters(),
      this.collectGroupFilters()
    );
    this.configuratorCommonsService.updateConfigurationOverview(inputConfig);
  }

  protected collectGroupFilters(): string[] {
    let filters: string[] = [];
    this.groupFilters.forEach((groupFilter) => {
      if (groupFilter.value) {
        //filters.push(groupFilter.)
      }
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
    config: Configurator.Configuration,
    attrFilters: Configurator.OverviewFilter[],
    groupFilers: string[]
  ): Configurator.Configuration {
    return {
      ...config,
      overview: {
        configId: config.configId,
        productCode: config.productCode,
        attributeFilters: attrFilters,
        groupFilters: groupFilers,
      },
    };
  }
}


