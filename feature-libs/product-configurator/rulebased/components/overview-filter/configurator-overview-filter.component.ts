/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from 'feature-libs/product-configurator/common/components/service/configurator-router-extractor.service';
import { OperatorFunction } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
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

  ovGroups$: Observable<Configurator.GroupOverview[]> =
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
      map((configuration) => configuration.overview?.groups),
      // filter nullish 'strict null checks' safe
      filter((groups) => groups !== undefined) as OperatorFunction<
        Configurator.GroupOverview[] | undefined,
        Configurator.GroupOverview[]
      >
    );
}
