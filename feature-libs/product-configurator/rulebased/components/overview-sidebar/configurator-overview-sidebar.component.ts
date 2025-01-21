/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('menuTab') menuTab: ElementRef<HTMLElement>;
  @ViewChild('filterTab') filterTab: ElementRef<HTMLElement>;
  showFilter: boolean = false;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

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
   */
  switchTabOnArrowPress(event: KeyboardEvent, currentTab: string): void {
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
