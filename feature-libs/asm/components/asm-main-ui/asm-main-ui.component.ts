/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import {
  AsmEnablerService,
  AsmUi,
  CsAgentAuthService,
  CustomerListColumnActionType,
} from '@spartacus/asm/root';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import {
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import {
  ICON_TYPE,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CustomerListAction } from '../customer-list/customer-list.model';
import { AsmComponentService } from '../services/asm-component.service';

const ROUTES_FROM_PARAMS = {
  ticketId: '/',
  orderId: 'orders',
  activeCartId: 'activeCart',
  savedCartId: 'savedCart',
};

@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
})
export class AsmMainUiComponent implements OnInit, OnDestroy {
  customerSupportAgentLoggedIn$: Observable<boolean>;
  csAgentTokenLoading$: Observable<boolean>;
  customer$: Observable<User | undefined>;
  isCollapsed$: Observable<boolean> | undefined;
  iconTypes = ICON_TYPE;
  showCreateCustomerSuccessfullyAlert = false;
  globalMessageType = GlobalMessageType;

  @HostBinding('class.hidden') disabled = false;

  protected startingCustomerSession = false;

  subscription: Subscription = new Subscription();

  @ViewChild('customerListLink') element: ElementRef;
  @ViewChild('addNewCustomerLink') addNewCustomerLink: ElementRef;

  constructor(
    authService: AuthService,
    csAgentAuthService: CsAgentAuthService,
    asmComponentService: AsmComponentService,
    globalMessageService: GlobalMessageService,
    routingService: RoutingService,
    asmService: AsmService,
    userAccountFacade: UserAccountFacade,
    launchDialogService: LaunchDialogService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfig: FeatureConfigService,
    asmEnableService: AsmEnablerService
  );
  /**
   * @deprecated since 7.0
   */
  constructor(
    authService: AuthService,
    csAgentAuthService: CsAgentAuthService,
    asmComponentService: AsmComponentService,
    globalMessageService: GlobalMessageService,
    routingService: RoutingService,
    asmService: AsmService,
    userAccountFacade: UserAccountFacade,
    launchDialogService: LaunchDialogService
  );
  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected asmComponentService: AsmComponentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected asmService: AsmService,
    protected userAccountFacade: UserAccountFacade,
    protected launchDialogService: LaunchDialogService,
    @Optional() protected featureConfig?: FeatureConfigService,
    @Optional() protected asmEnableService?: AsmEnablerService,
    @Optional() protected multiCartFacade?: MultiCartFacade
  ) {}

  ngOnInit(): void {
    this.customerSupportAgentLoggedIn$ = this.csAgentAuthService
      .isCustomerSupportAgentLoggedIn()
      .pipe(
        distinctUntilChanged(),
        tap((loggedIn) => {
          if (!loggedIn) {
            this.closeModal();
          }
        })
      );

    this.csAgentTokenLoading$ =
      this.csAgentAuthService.getCustomerSupportAgentTokenLoading();
    this.customer$ = this.authService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          this.handleCustomerSessionStartRedirection();
          return this.userAccountFacade.get();
        } else {
          return of(undefined);
        }
      })
    );
    this.isCollapsed$ = this.asmService
      .getAsmUiState()
      .pipe(
        map((uiState: AsmUi) =>
          uiState.collapsed === undefined ? false : uiState.collapsed
        )
      );
    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(filter((result) => Boolean(result)))
        .subscribe((result: CustomerListAction | User | string) => {
          if (typeof result !== 'string') {
            if ('selectedUser' in result) {
              this.startCustomerEmulationSession(result.selectedUser);
              if (
                result.actionType === CustomerListColumnActionType.ORDER_HISTORY
              ) {
                this.routingService.go({ cxRoute: 'orders' });
              }
            } else if ('customerId' in result) {
              this.startCustomerEmulationSession({
                customerId: result.customerId,
              });
              this.showCreateCustomerSuccessfullyAlert = true;
            }
            if (
              'actionType' in result &&
              result.actionType === CustomerListColumnActionType.ACTIVE_CART
            ) {
              this.routingService.go({ cxRoute: 'cart' });
            }
          }
        })
    );
    this.subscribeForDeeplink();
  }

  /**
   * When agent is logged in and deep link has customerID,
   * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
   * call startSessionWithParameters
   */
  protected subscribeForDeeplink(): void {
    if (this.featureConfig?.isLevel('6.2')) {
      if (this.asmEnableService?.isEmulateInURL()) {
        //Always route to home page to avoid 404
        this.routingService.go('/');
      }
      const parameters = {
        customerId: this.asmComponentService.getSearchParameter('customerId'),
        orderId: this.asmComponentService.getSearchParameter('orderId'),
        ticketId: this.asmComponentService.getSearchParameter('ticketId'),
        activeCartId:
          this.asmComponentService.getSearchParameter('activeCartId'),
        savedCartId: this.asmComponentService.getSearchParameter('savedCartId'),
        emulated: false,
      };
      this.subscription.add(
        combineLatest([
          this.customerSupportAgentLoggedIn$,
          this.authService.isUserLoggedIn(),
          this.asmComponentService.isEmulatedByDeepLink(),
        ]).subscribe(([agentLoggedIn, userLoggedin, isEmulatedByDeepLink]) => {
          if (agentLoggedIn && parameters.customerId) {
            if (!isEmulatedByDeepLink && userLoggedin) {
              this.asmComponentService.logoutCustomer();
            } else {
              parameters.emulated = isEmulatedByDeepLink;
              setTimeout(() => this.startSessionWithParameters(parameters));
            }
          }
        })
      );
    }
  }

  /**
   * If url contains customerId and we haven't emulatedFromURL, we'll change the isEmulatedByDeepLink flag and
   * start emulate customer in URL.
   */
  protected startSessionWithParameters(parameters: any): void {
    if (!parameters.emulated) {
      this.asmComponentService.setEmulatedByDeepLink(true);
      this.startCustomerEmulationSession(
        {
          customerId: parameters.customerId,
        },
        parameters
      );
    }
  }

  protected handleCustomerSessionStartRedirection(): void {
    this.asmComponentService
      .isCustomerEmulationSessionInProgress()
      .pipe(take(1))
      .subscribe((isCustomerEmulated) => {
        if (this.startingCustomerSession && isCustomerEmulated) {
          this.startingCustomerSession = false;
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.routingService.go('/');
        }
      });
  }

  loginCustomerSupportAgent({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): void {
    this.csAgentAuthService.authorizeCustomerSupportAgent(userId, password);
  }

  logout(): void {
    this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
  }

  startCustomerEmulationSession(
    { customerId }: { customerId?: string },
    options?: any
  ): void {
    if (customerId) {
      this.csAgentAuthService.startCustomerEmulationSession(customerId);
      this.startingCustomerSession = true;
      if (options) {
        this.andThen(options);
      }
    } else {
      this.globalMessageService.add(
        { key: 'asm.error.noCustomerId' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  andThen(_options: any) {
    //navigate to other pages
    //this.routingService.go({ cxRoute: ROUTES_FROM_PARAMS['orderId'] });
    ROUTES_FROM_PARAMS;
    console.log('start navigating...');
    console.log(_options);
    if (_options.orderId) {
      this.routingService.go({
        cxRoute: 'orderDetails',
        params: { code: _options.orderId },
      });
    } else if (_options.ticketId) {
      this.routingService.go({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: _options.ticketId },
      });
    } else if (_options.activeCartId) {
      this.routingService.go('cart');
      this.multiCartFacade.getCarts().subscribe((carts) => console.log(carts));

      this.multiCartFacade.loadCart({
        cartId: _options.activeCartId,
        userId: _options.customerId,
      });
    } else if (_options.savedCartId) {
      this.routingService.go('my-account/saved-cart/' + _options.savedCartId);
    }
  }

  hideUi(): void {
    this.disabled = true;
    this.asmComponentService.unload();
  }

  showCustomList(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CUSTOMER_LIST,
      this.element
    );
  }

  closeModal(): void {
    this.launchDialogService.closeDialog('logout');
  }

  createCustomer(): void {
    this.launchDialogService?.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      this.addNewCustomerLink
    );
  }
  closeDialogConfirmationAlert(): void {
    this.showCreateCustomerSuccessfullyAlert = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
