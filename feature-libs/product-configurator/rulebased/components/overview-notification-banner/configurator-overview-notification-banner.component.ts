/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureToggles, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-notification-banner',
  templateUrl: './configurator-overview-notification-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, RouterLink, AsyncPipe, TranslatePipe, UrlPipe],
})
export class ConfiguratorOverviewNotificationBannerComponent {
  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      filter(
        (routerData) =>
          routerData.owner.type === CommonConfigurator.OwnerType.PRODUCT ||
          routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY
      ),
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  configurationOverview$: Observable<Configurator.Overview | undefined> =
    this.configuration$.pipe(map((configuration) => configuration.overview));

  numberOfIssues$: Observable<number> = this.configuration$.pipe(
    map((configuration) => {
      //In case overview carries number of issues: We take it from there.
      //otherwise configuration's number will be accurate
      const configOv = configuration.overview;
      if (configOv?.totalNumberOfIssues) {
        return configOv.numberOfIncompleteCharacteristics !== undefined
          ? configOv.numberOfIncompleteCharacteristics
          : configOv.totalNumberOfIssues;
      } else {
        return configuration.totalNumberOfIssues
          ? configuration.totalNumberOfIssues
          : 0;
      }
    })
  );

  numberOfConflicts$: Observable<number> = this.configuration$.pipe(
    map((configuration) => {
      return configuration.overview?.numberOfConflicts ?? 0;
    })
  );

  skipConflictsOnIssueNavigation$: Observable<boolean> =
    this.configuration$.pipe(
      map((configuration) => {
        return (configuration.overview?.numberOfConflicts ?? 0) > 0;
      })
    );

  iconTypes = ICON_TYPE;

  private featureToggles = inject(FeatureToggles);
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}

  /**
   * Verifies whether the links that navigate to the configuration for resolving
   * issues or conflicts are hidden. This is the case if the overview is displayed
   * in display-only mode, as the configuration is then read without a draft.
   *
   * @param routerData - Router data
   * @returns - `true` if the links are hidden, otherwise `false`
   */
  isResolveLinkHidden(routerData: ConfiguratorRouter.Data): boolean {
    return (
      !!this.featureToggles.productConfiguratorReadOnlyCartEntryConfiguration &&
      this.configuratorStorefrontUtilsService.isDisplayOnly(routerData)
    );
  }
}
