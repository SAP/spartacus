/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

  getTabIndexConfigTab(): number {
    let tabIndex = 0;
    this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
      if (isOvPage) {
        tabIndex = -1;
      }
    });
    return tabIndex;
  }

  getTabIndexOverviewTab(): number {
    let tabIndex = 0;
    this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
      if (!isOvPage) {
        tabIndex = -1;
      }
    });
    return tabIndex;
  }

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
