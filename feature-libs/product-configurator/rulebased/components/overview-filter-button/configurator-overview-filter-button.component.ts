/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
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

  @ViewChild('filterButton') filterButton: ElementRef;
  @HostBinding('class.ghost') ghostStyle = true;

  config$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
      // filter 'strict null check safe'
      filter(
        (configuration) => configuration.overview != null
      ) as OperatorFunction<
        Configurator.Configuration,
        Configurator.ConfigurationWithOverview
      >,
      tap(() => {
        this.ghostStyle = false;
      })
    );

  /**
   * get the number of filters currently applied to the overview page
   *
   * @param {Configurator.Overview} overview - current configuration overview data
   * @returns {number} - number of applied filters
   */
  getNumFilters(overview: Configurator.Overview): number {
    return (
      (overview.attributeFilters?.length ?? 0) +
      (overview.groupFilters?.length ?? 0)
    );
  }

  /**
   * opens the filter modal
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
   */
  openFilterModal(config: Configurator.ConfigurationWithOverview) {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      this.filterButton,
      config
    );
  }
}
