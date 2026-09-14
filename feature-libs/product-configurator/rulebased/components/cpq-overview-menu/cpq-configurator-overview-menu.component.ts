/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { TranslatePipe } from '@spartacus/core';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';

@Component({
  selector: 'cx-cpq-configurator-overview-menu',
  templateUrl: './cpq-configurator-overview-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    TranslatePipe,
    ConfiguratorOverviewMenuComponent,
  ],
})
export class CpqConfiguratorOverviewMenuComponent {
  @HostBinding('class.ghost') ghostStyle = true;

  protected readonly navigationSlotSelector =
    'cx-page-slot.CpqConfigOverviewMenu';
  protected readonly overviewHeaderSelector = '.CpqConfigHeader';

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  configurationWithOv$: Observable<Configurator.ConfigurationWithOverview> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
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
}
