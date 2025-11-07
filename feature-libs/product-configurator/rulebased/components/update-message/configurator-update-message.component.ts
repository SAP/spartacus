/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';

@Component({
  selector: 'cx-configurator-update-message',
  templateUrl: './configurator-update-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfiguratorUpdateMessageComponent {
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected configRouterExtractorService = inject(ConfiguratorRouterExtractorService);
  protected config = inject(ConfiguratorMessageConfig);

  hasPendingChanges$: Observable<boolean> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.hasPendingChanges(routerData.owner)
      ),
      distinctUntilChanged(), // avoid subsequent emissions of the same value from the source observable
      switchMap(
        (isLoading) =>
          isLoading
            ? of(isLoading).pipe(
                delay(
                  this.config.productConfigurator?.updateConfigurationMessage
                    ?.waitingTime || 1000
                )
              ) // delay information if it is loading
            : of(isLoading) // inform immediately if it's not loading anymore
      )
    );
}
