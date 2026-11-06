/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { filter, Observable, OperatorFunction, tap } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorOverviewFilterBarComponent } from '../overview-filter-bar/configurator-overview-filter-bar.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-overview-filter-button',
  templateUrl: './configurator-overview-filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ConfiguratorOverviewFilterBarComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorOverviewFilterButtonComponent {
  protected configuratorStorefrontUtilsService = inject(
    ConfiguratorStorefrontUtilsService
  );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  @ViewChild('filterButton') filterButton: ElementRef;

  /**
   * @deprecated since 221121.23 - Prefer the `#ghostFilterButton` template
   * (`.cx-ghost-filter-button.ghost`) for loading UI. Host `class.ghost` via
   * `@HostBinding` was removed because CMS slots do not refresh host bindings
   * when filter data resolves. This flag is still cleared when data arrives for
   * compatibility; it no longer affects the host. Will be removed in the next
   * major.
   */
  ghostStyle = true;

  configurationWithOv$: Observable<Configurator.ConfigurationWithOverview> =
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
   * Retrieves the number of filters currently applied to the overview page
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
   * Opens the filter modal
   *
   * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
   */
  openFilterModal(config: Configurator.ConfigurationWithOverview) {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      this.filterButton,
      config
    );
  }

  /**
   * Verifies whether a product is a variant product in the display only view.
   *
   * @returns - if `baseProduct` property of the current product is defined
   * and provides the product code of the base product,
   * and the current product is in the display only view
   * then returns `true`, otherwise `false`.
   */
  isDisplayOnlyVariant(): Observable<boolean> {
    return this.configuratorStorefrontUtilsService.isDisplayOnlyVariant();
  }
}
