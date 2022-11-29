/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilKeyChanged, filter, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-filter-button',
  templateUrl: './configurator-overview-filter-button.component.html',
})
export class ConfiguratorOverviewFilterButtonComponent {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  @ViewChild('filterButton') filerButton: ElementRef;

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
      >
    );

  getNumFilters(overview: Configurator.Overview): number {
    return (
      (overview.attributeFilters?.length ?? 0) +
      (overview.groupFilters?.length ?? 0)
    );
  }

  openFilterModal() {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      this.filerButton,
      {}
    );
  }
}
