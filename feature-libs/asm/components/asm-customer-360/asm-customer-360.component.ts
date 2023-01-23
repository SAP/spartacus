/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsmConfig, getAsmDialogActionEvent } from '@spartacus/asm/core';
import {
  Asm360Facade,
  AsmCustomer360Data,
  AsmCustomer360Response,
  AsmCustomer360TabConfig,
  AsmDialogActionEvent,
  AsmDialogActionType,
} from '@spartacus/asm/root';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryFacade, OrderHistoryList } from '@spartacus/order/root';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360',
  templateUrl: './asm-customer-360.component.html',
})
export class AsmCustomer360Component implements OnDestroy, OnInit {
  readonly cartIcon = ICON_TYPE.CART;
  readonly closeIcon = ICON_TYPE.CLOSE;
  readonly orderIcon = ICON_TYPE.ORDER;

  tabs: Array<AsmCustomer360TabConfig>;
  activeTab = 0;
  currentTab: AsmCustomer360TabConfig;

  customer: User;

  customer360Tabs$: Observable<Array<AsmCustomer360Data | undefined>>;

  activeCart$: Observable<Cart>;
  savedCarts$: Observable<Array<Cart>>;
  orderHistory$: Observable<OrderHistoryList>;

  protected readonly ORDER_LIMIT = 100;
  protected subscription = new Subscription();

  constructor(
    protected asmConfig: AsmConfig,
    protected asm360Facade: Asm360Facade,
    protected injector: Injector,
    protected launchDialogService: LaunchDialogService,
    protected activeCartFacade: ActiveCartFacade,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected savedCartFacade: SavedCartFacade
  ) {
    this.tabs = asmConfig.asm?.customer360?.tabs ?? [];
    this.currentTab = this.tabs[0];

    this.activeCart$ = this.activeCartFacade
      .getActive()
      .pipe(map((cart) => (cart.totalItems ? cart : undefined)));
    this.orderHistory$ = this.orderHistoryFacade
      .getOrderHistoryList(this.ORDER_LIMIT)
      .pipe(map((orderHistory) => orderHistory ?? {}));
    this.savedCarts$ = this.savedCartFacade.getList().pipe(shareReplay(1));
  }

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        const customer: User = data.customer;

        this.customer = customer;
      })
    );

    this.setTabData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectTab(selectedTab: number): void {
    this.activeTab = selectedTab;
    this.currentTab = this.tabs[selectedTab];

    this.setTabData();
  }

  getAvatar(): string {
    const customer = this.customer ?? {};
    const { firstName = '', lastName = '' } = customer;

    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
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

  protected setTabData(): void {
    const get360Data =
      this.asm360Facade.get360Data(this.activeTab) ?? of(undefined);

    this.customer360Tabs$ = get360Data.pipe(
      filter((response) => Boolean(response)),
      map((response) => {
        return this.currentTab.components.map((component) => {
          const requestData = component.requestData;

          if (requestData) {
            return (response as AsmCustomer360Response).value.find(
              (data) => data.type === requestData.type
            );
          } else {
            return undefined;
          }
        });
      })
    );
  }
}
