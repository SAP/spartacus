/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  FeatureToggles,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorOverviewFormComponent } from '../overview-form/configurator-overview-form.component';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-menu-standalone',
  templateUrl: './configurator-overview-menu-standalone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    TranslatePipe,
    ConfiguratorOverviewMenuComponent,
  ],
})
export class ConfiguratorOverviewMenuStandaloneComponent {
  @HostBinding('class.ghost') ghostStyle = true;

  private featureToggles = inject(FeatureToggles);
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {
    useFeatureStyles('productConfiguratorCPQContainer');
  }

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

  /**
   * Whether the skip link to the overview content is rendered.
   *
   * @returns {boolean} - `true` if `productConfiguratorCPQContainer` is enabled
   */
  get isSkipLinkEnabled(): boolean {
    return !!this.featureToggles.productConfiguratorCPQContainer;
  }

  /**
   * Scrolls to and focuses the overview content, skipping the overview menu.
   */
  skipToOverviewContent(): void {
    const selector = this.configuratorStorefrontUtilsService.idSelector(
      ConfiguratorOverviewFormComponent.OVERVIEW_CONTENT_ID
    );
    this.configuratorStorefrontUtilsService.scrollToConfigurationElement(
      selector
    );
    this.configuratorStorefrontUtilsService.focusConfigurationElement(selector);
  }
}
