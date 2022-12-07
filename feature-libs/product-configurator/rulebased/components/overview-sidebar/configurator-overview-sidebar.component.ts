/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-sidebar',
  templateUrl: './configurator-overview-sidebar.component.html',
})
export class ConfiguratorOverviewSidebarComponent {
  @HostBinding('class.ghost') ghostStyle = true;
  showFilter: boolean = false;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

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
      tap((data) => {
        if (data) {
          this.ghostStyle = false;
        }
      })
    );

  /**
   * Triggers display of the filter view in the overview sidebar
   */
  onFilter() {
    this.showFilter = true;
  }

  /**
   * Triggers display of the menu view in the overview sidebar
   */
  onMenu() {
    this.showFilter = false;
  }
}
