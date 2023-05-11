/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { getAsmDialogActionEvent } from '@spartacus/asm/customer-360/core';
import {
  AsmDialogActionEvent,
  AsmDialogActionType,
  Customer360Data,
  Customer360Response,
  Customer360TabConfig,
  Customer360Config,
  Customer360Facade,
  Customer360Type,
  Customer360Overview,
  CustomerOverview,
} from '@spartacus/asm/customer-360/root';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { Image, UrlCommand, User } from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-customer-360',
  templateUrl: './customer-360.component.html',
})
export class Customer360Component implements OnDestroy, OnInit, AfterViewInit {
  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.aria-modal') modal = true;
  @HostBinding('attr.aria-labelledby') labelledby = 'asm-customer-360-title';
  @HostBinding('attr.aria-describedby') describedby = 'asm-customer-360-desc';
  @ViewChildren('tabHeaderItem') tabHeaderItems: QueryList<
    ElementRef<HTMLElement>
  >;
  readonly cartIcon = ICON_TYPE.CART;
  readonly closeIcon = ICON_TYPE.CLOSE;
  readonly orderIcon = ICON_TYPE.ORDER;
  readonly ticketIcon = ICON_TYPE.FILE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: '.cx-tab-header.active',
    focusOnEscape: true,
  };

  tabs: Array<Customer360TabConfig>;

  activeTab = 0;

  currentTab: Customer360TabConfig;

  customer: User;

  customer360Tabs$: Observable<Array<Customer360Data | undefined>>;

  customerOverview$: Observable<CustomerOverview | undefined>;

  avatarImage: Image | undefined;

  avatarText = '';

  protected subscription = new Subscription();

  constructor(
    protected customer360Config: Customer360Config,
    protected customer360Facade: Customer360Facade,
    protected launchDialogService: LaunchDialogService,
    protected csAgentAuthService: CsAgentAuthService,
    protected directionService: DirectionService
  ) {
    this.customerOverview$ = this.customer360Facade
      .get360Data([
        {
          requestData: { type: Customer360Type.OVERVIEW },
        },
      ])
      .pipe(
        map((response) => {
          const overviewItem = response?.value?.find(
            (item) => item.type === Customer360Type.OVERVIEW
          ) as Customer360Overview | undefined;
          this.avatarImage = this.getAvatarImage(overviewItem?.overview);
          return overviewItem?.overview || undefined;
        })
      );
    this.tabs = customer360Config?.customer360?.tabs ?? [];
    this.currentTab = this.tabs[0];
  }

  ngOnInit(): void {
    this.subscription.add(
      this.csAgentAuthService
        .isCustomerSupportAgentLoggedIn()
        .pipe(distinctUntilChanged())
        .subscribe((loggedIn) => {
          if (!loggedIn) {
            this.launchDialogService.closeDialog('logout');
          }
        })
    );

    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.customer = data.customer;
        this.avatarText = this.getAvatarText(this.customer);
      })
    );

    this.setTabData();
  }

  ngAfterViewInit(): void {
    this.updateTabIndex(this.activeTab);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * Triggered when a tab is selected.
   * @param {number} selectedTab selected tab index
   */
  selectTab(selectedTab: number): void {
    this.activeTab = selectedTab;
    this.currentTab = this.tabs[selectedTab];
    this.updateTabIndex(selectedTab);
    this.setTabData();
  }
  /**
   *  Update tab focus when key is pressed
   * @param {KeyboardEvent} event
   * @param {number} selectedIndex current tab index
   */
  switchTab(event: KeyboardEvent, selectedIndex: number): void {
    const maxTab = this.tabs.length - 1;
    let flag = true;
    if (this.isBackNavigation(event)) {
      selectedIndex--;
      if (selectedIndex < 0) {
        selectedIndex = maxTab;
      }
    } else if (this.isForwardsNavigation(event)) {
      selectedIndex++;
      if (selectedIndex > maxTab) {
        selectedIndex = 0;
      }
    } else if (event.code === 'Home') {
      selectedIndex = 0;
    } else if (event.code === 'End') {
      selectedIndex = maxTab;
    } else {
      flag = false;
    }
    if (flag) {
      this.updateTabIndex(selectedIndex);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * If there is a link within the modal, use this method to redirect the user and close the modal.
   */
  navigateTo(route: UrlCommand): void {
    const event: AsmDialogActionEvent = getAsmDialogActionEvent(
      this.customer,
      AsmDialogActionType.NAVIGATE,
      route
    );
    this.closeModal(event);
  }

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  /**
   * Update tabIndex for each tab: select tab becomes 0 and other tabs will be -1
   * this is for prevent tabbing within tabs
   * @param {number} selectedIndex - selected tab index
   */
  protected updateTabIndex(selectedIndex: number): void {
    this.tabHeaderItems.toArray().forEach((tabHeaderItem, index) => {
      if (index === selectedIndex) {
        tabHeaderItem.nativeElement.tabIndex = 0;
        tabHeaderItem.nativeElement.focus();
      } else {
        tabHeaderItem.nativeElement.tabIndex = -1;
      }
    });
  }

  protected setTabData(): void {
    const get360Data = this.customer360Facade.get360Data(
      this.currentTab.components
    );

    this.customer360Tabs$ = get360Data.pipe(
      filter((response) => Boolean(response)),
      map((response) => {
        return this.currentTab.components.map((component) => {
          const requestData = component.requestData;

          if (requestData) {
            return (response as Customer360Response).value.find(
              (data) => data.type === requestData.type
            );
          } else {
            return undefined;
          }
        });
      })
    );
  }
  protected getAvatarText(customer?: User): string {
    customer = customer ?? {};
    const { firstName = '', lastName = '' } = customer;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  protected getAvatarImage(overview?: CustomerOverview): Image | undefined {
    return overview?.userAvatar?.url
      ? {
          altText: overview.name,
          url: overview.userAvatar.url,
          format: overview.userAvatar.format,
        }
      : undefined;
  }
  /**
   * Verifies whether the user navigates into a subgroup of the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
   * @protected
   */
  protected isForwardsNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowRight' && this.isLTRDirection()) ||
      (event.code === 'ArrowLeft' && this.isRTLDirection())
    );
  }

  /**
   * Verifies whether the user navigates from a subgroup back to the main group menu.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
   * @protected
   */
  protected isBackNavigation(event: KeyboardEvent): boolean {
    return (
      (event.code === 'ArrowLeft' && this.isLTRDirection()) ||
      (event.code === 'ArrowRight' && this.isRTLDirection())
    );
  }
  protected isLTRDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.LTR;
  }

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }
}
