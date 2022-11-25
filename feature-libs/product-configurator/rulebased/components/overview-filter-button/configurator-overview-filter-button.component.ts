/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ConfiguratorRouterExtractorService } from 'feature-libs/product-configurator/common/components/service/configurator-router-extractor.service';
import { Observable, OperatorFunction } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigurationNonNullOv } from '../overview-filter/configurator-overview-filter.component';

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
      ) as OperatorFunction<Configurator.Configuration, ConfigurationNonNullOv>
    );

  openFilterModal() {
    const dialogData = {
      testData: 'test',
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      undefined,
      undefined,
      dialogData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
