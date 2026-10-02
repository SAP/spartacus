/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FeatureToggles,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import {
  CommonConfiguratorUtilsService,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorOverviewFilterComponent } from '../overview-filter/configurator-overview-filter.component';
import { ConfiguratorOverviewFormComponent } from '../overview-form/configurator-overview-form.component';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

export interface ConfiguratorOverviewSidebarContext {
  configuration: Configurator.ConfigurationWithOverview;
  showFilterTab: boolean;
}

@Component({
  selector: 'cx-configurator-overview-sidebar',
  templateUrl: './configurator-overview-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ConfiguratorOverviewFilterComponent,
    ConfiguratorOverviewMenuComponent,
    NgFor,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorOverviewSidebarComponent {
  /**
   * Stable selector hook for tests and customizations (CPQ and VC overview menu).
   */
  @HostBinding('attr.data-cx-configurator-overview-menu-container')
  readonly overviewMenuContainerDataAttr = '';

  @HostBinding('class.ghost') ghostStyle = true;
  @ViewChild('menuTab') menuTab: ElementRef<HTMLElement>;
  @ViewChild('filterTab') filterTab: ElementRef<HTMLElement>;
  showFilter: boolean = false;

  private featureToggles = inject(FeatureToggles);

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    useFeatureStyles('productConfiguratorCPQContainer');
  }

  overviewContext$: Observable<ConfiguratorOverviewSidebarContext> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner).pipe(
          filter(
            (configuration) => configuration.overview != null
          ) as OperatorFunction<
            Configurator.Configuration,
            Configurator.ConfigurationWithOverview
          >,
          map((configuration) => ({
            configuration,
            showFilterTab:
              this.commonConfiguratorUtilsService.isOverviewMenuFilterTabVisible(
                routerData.owner.configuratorType
              ),
          }))
        )
      ),
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

  /**
   * Whether the skip link to the overview content is rendered.
   *
   * @returns {boolean} - `true` if `productConfiguratorCPQContainer` is enabled
   */
  get isSkipLinkEnabled(): boolean {
    return !!this.featureToggles.productConfiguratorCPQContainer;
  }

  /**
   * Scrolls to and focuses the overview content, skipping the overview sidebar.
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

  /**
   * Returns the tabindex for the menu tab.
   *
   * The menu tab is excluded from the tab chain if currently the filter tab content is displayed.
   * @returns tabindex of the menu tab
   */
  getTabIndexForMenuTab(): number {
    return this.showFilter ? -1 : 0;
  }

  /**
   * Returns the tabindex for the filter tab.
   * The filter tab is excluded from the tab chain if currently the menu tab content is displayed.
   * @returns tabindex of the fitler tab
   */
  getTabIndexForFilterTab(): number {
    return this.showFilter ? 0 : -1;
  }

  /**
   * Switches the focus of the tabs on pressing left or right arrow key.
   * @param {KeyboardEvent} event - Keyboard event
   * @param {string} currentTab - Current tab
   * @param {boolean} showFilterTab - Whether the filter tab is displayed
   */
  switchTabOnArrowPress(
    event: KeyboardEvent,
    currentTab: string,
    showFilterTab: boolean
  ): void {
    if (!showFilterTab) {
      return;
    }
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      event.preventDefault();
      if (currentTab === '#menuTab') {
        this.filterTab.nativeElement?.focus();
      } else {
        this.menuTab.nativeElement?.focus();
      }
    }
  }
}
