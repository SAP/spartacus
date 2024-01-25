/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-tab-bar',
  templateUrl: './configurator-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTabBarComponent {
  @HostBinding('class.ghost') ghostStyle = true;
  @ViewChild('configTab') configTab: ElementRef<HTMLElement>;
  @ViewChild('overviewTab') overviewTab: ElementRef<HTMLElement>;

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner).pipe(
          tap(() => {
            this.ghostStyle = false;
          })
        )
      )
    );

  isOverviewPage$: Observable<boolean> = this.routerData$.pipe(
    map(
      (routerData) =>
        routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW
    )
  );

  /**
   * Returns the tabindex for the configuration tab.
   * The configuration tab is excluded from the tab chain if currently the overview page is displayed.
   * @returns tabindex of the configuration tab
   */
  getTabIndexConfigTab(): number {
    let tabIndex = 0;
    this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
      if (isOvPage) {
        tabIndex = -1;
      }
    });
    return tabIndex;
  }

  /**
   * Returns the tabindex for the overview tab.
   * The overview tab is excluded from the tab chain if currently the configuration page is displayed.
   * @returns tabindex of the overview tab
   */
  getTabIndexOverviewTab(): number {
    let tabIndex = 0;
    this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
      if (!isOvPage) {
        tabIndex = -1;
      }
    });
    return tabIndex;
  }

  /**
   * Switches the focus of the tabs on pressing left or right arrow key.
   * @param {KeyboardEvent} event - Keyboard event
   * @param {string} currentTab - Current tab
   */
  switchTabOnArrowPress(event: KeyboardEvent, currentTab: string): void {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      event.preventDefault();
      if (currentTab === '#configTab') {
        this.overviewTab.nativeElement?.focus();
      } else {
        this.configTab.nativeElement?.focus();
      }
    }
  }

  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}
}
