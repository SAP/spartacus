/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-tab-bar',
  templateUrl: './configurator-tab-bar.component.html',
  //here we cannot go with OnPush, as we otherwise do not take the change to host binding into account
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class ConfiguratorTabBarComponent implements OnInit, OnDestroy {
  @HostBinding('class.ghost') ghostStyle = true;
  @ViewChild('configTab') configTab: ElementRef<HTMLElement>;
  @ViewChild('overviewTab') overviewTab: ElementRef<HTMLElement>;

  private static readonly TAB_BAR_QUERY_SELECTOR = 'cx-configurator-tab-bar';
  protected routingService = inject(RoutingService);
  protected configUtils = inject(ConfiguratorStorefrontUtilsService);
  protected focusService = inject(KeyboardFocusService);

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

  /**
   * Retrieves current page type.
   *
   * @returns - page type
   */
  pageType$: Observable<ConfiguratorRouter.PageType> = this.routerData$.pipe(
    map((routerData) => this.determinePageFromRouterData(routerData))
  );

  protected determinePageFromRouterData(
    routerData: ConfiguratorRouter.Data
  ): ConfiguratorRouter.PageType {
    return routerData.pageType ?? ConfiguratorRouter.PageType.CONFIGURATION;
  }

  /**
   * Checks whether the current page is the overview page.
   *
   * @param pageType - Page type
   * @returns Page is overview page?
   */
  isOverviewPage(pageType: ConfiguratorRouter.PageType): boolean {
    return pageType === ConfiguratorRouter.PageType.OVERVIEW;
  }

  /**
   * Navigates to the overview page and sets the focus on the overview element in the tab-bar.
   *
   * @param routerData - Router data
   */
  navigateToOverview(routerData: ConfiguratorRouter.Data) {
    this.routingService
      .go(
        {
          cxRoute: 'configureOverview' + routerData.owner.configuratorType,
          params: {
            entityKey: routerData.owner.id,
            ownerType: routerData.owner.type,
          },
        },
        { queryParams: { productCode: routerData.productCode } }
      )
      .then(() => {
        this.focusOverviewInTabBar();
      });
  }

  /**
   * Navigates to the configuration page and sets the focus on the configuration element in the tab-bar.
   *
   * @param routerData - Router data
   * @param replaceNavigationUrlInHistory - If true, the navigation will replace the current URL in the browser history.
   */
  navigateToConfiguration(
    routerData: ConfiguratorRouter.Data,
    replaceNavigationUrlInHistory = false
  ) {
    this.routingService
      .go(
        {
          cxRoute: 'configure' + routerData.owner.configuratorType,
          params: {
            entityKey: routerData.owner.id,
            ownerType: routerData.owner.type,
          },
        },
        {
          queryParams: { productCode: routerData.productCode },
          replaceUrl: replaceNavigationUrlInHistory,
        }
      )
      .then(() => {
        this.focusConfigurationInTabBar();
      });
  }

  protected focusOverviewInTabBar(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        ),
        filter((configuration) => configuration.overview != null),
        take(1),
        delay(0) //we need to consider the re-rendering of the page
      )
      .subscribe(() => {
        this.focusService.clear();
        this.configUtils.focusFirstActiveElement(
          ConfiguratorTabBarComponent.TAB_BAR_QUERY_SELECTOR
        );
      });
  }

  protected focusConfigurationInTabBar(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        filter(
          (routerData) =>
            routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
        ),
        switchMap((routerData) => {
          return this.configuratorCommonsService.getConfiguration(
            routerData.owner
          );
        }),
        take(1),
        delay(0) //we need to consider the re-rendering of the page
      )
      .subscribe(() => {
        this.focusService.clear();
        this.configUtils.focusFirstActiveElement(
          ConfiguratorTabBarComponent.TAB_BAR_QUERY_SELECTOR
        );
      });
  }

  /**
   * Returns the tabindex for the configuration tab.
   *
   * The configuration tab is excluded from the tab chain if currently the overview page is displayed.
   * @param pageType - Page type
   * @returns tabindex of the configuration tab
   */
  getTabIndexForConfigTab(pageType: ConfiguratorRouter.PageType): number {
    return this.isOverviewPage(pageType) ? -1 : 0;
  }

  /**
   * Returns the tabindex for the overview tab.
   * The overview tab is excluded from the tab chain if currently the configuration page is displayed.
   * @param pageType
   * @returns tabindex of the overview tab
   */
  getTabIndexForOverviewTab(pageType: ConfiguratorRouter.PageType): number {
    return this.isOverviewPage(pageType) ? 0 : -1;
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

  private isHandlingBackNavigation = false;
  private routerEventsSub: Subscription;

  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.configuration$.pipe(take(1)).subscribe();

    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        event.navigationTrigger === 'popstate'
      ) {
        if (
          event.url.includes('/configure/') &&
          this.router.url.includes('/configure-overview')
        ) {
          if (!this.isHandlingBackNavigation) {
            this.isHandlingBackNavigation = true;
            this.configRouterExtractorService
              .extractRouterData()
              .pipe(take(1))
              .subscribe((routerData) => {
                console.log('Router data extracted:', routerData);
                const targetPath =
                  '/configure' +
                  routerData.owner.configuratorType +
                  '/' +
                  routerData.owner.id;
                if (!this.router.url.startsWith(targetPath)) {
                  this.navigateToConfiguration(routerData, true);
                } else {
                  this.isHandlingBackNavigation = false;
                }
              });
          }
        }
      } else if (
        event.constructor.name === 'NavigationEnd' &&
        this.isHandlingBackNavigation
      ) {
        this.isHandlingBackNavigation = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }
}
