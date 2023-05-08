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
  LaunchDialogService,
  LAUNCH_CALLER,
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
import { CreatedCustomer } from '../asm-create-customer-form/asm-create-customer-form.model';
import { CustomerListAction } from '../customer-list/customer-list.model';
import { AsmComponentService } from '../services/asm-component.service';
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
  customerIdInURL: string;

  showInactiveCartInfoAlert = false;
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
    @Optional() protected asmEnableService?: AsmEnablerService
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
        .subscribe((result: CustomerListAction | CreatedCustomer | string) => {
          if (typeof result !== 'string') {
            if ('selectedUser' in result) {
              this.startCustomerEmulationSession(result.selectedUser);
              if (
                result.actionType === CustomerListColumnActionType.ORDER_HISTORY
              ) {
                this.routingService.go({ cxRoute: 'orders' });
              }
            } else if ('email' in result) {
              this.startCustomerEmulationSession({ customerId: result.email });
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
    this.checkIsEmulateFromDeepLinkAndNavigate();
    this.subscribeForDeeplink();
    this.subscribeForShowInactiveCartInfo();
  }

  /**
   * If emulate customer, navigate to home page
   * */
  protected checkIsEmulateFromDeepLinkAndNavigate(): void {
    if (
      this.featureConfig?.isLevel('6.1') &&
      this.asmEnableService?.isEmulatedByDeepLink()
    ) {
      this.routingService.go('/');
    }
  }

  /**
   * When agent is logged in and deep link has customerID,
   * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
   * call startSessionWithParameters
   */
  protected subscribeForDeeplink(): void {
    if (this.featureConfig?.isLevel('6.1')) {
      const customerIdInURL =
        this.asmComponentService.getSearchParameter('customerId');
      this.subscription.add(
        combineLatest([
          this.customerSupportAgentLoggedIn$,
          this.authService.isUserLoggedIn(),
          this.asmComponentService.isEmulatedByDeepLink(),
        ]).subscribe(([agentLoggedIn, userLoggedin, isEmulatedByDeepLink]) => {
          if (agentLoggedIn && customerIdInURL) {
            if (!isEmulatedByDeepLink && userLoggedin) {
              this.asmComponentService.logoutCustomer();
            } else {
              setTimeout(() => this.startSessionWithParameters());
            }
          }
        })
      );
    }
  }

  protected subscribeForShowInactiveCartInfo(): void {
    if (this.featureConfig?.isLevel('6.2')) {
      this.subscription.add(
        this.asmComponentService
          .showInactiveCartInfoAlert()
          .subscribe((value) => {
            this.showInactiveCartInfoAlert = value;
          })
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
  /**
   * If url contains customerId and we haven't emulatedFromURL, we'll change the isEmulatedByDeepLink flag and
   * start emulate customer in URL.
   */
  protected startSessionWithParameters(): void {
    const customerIdInURL =
      this.asmComponentService.getSearchParameter('customerId');
    if (customerIdInURL) {
      this.asmComponentService.isEmulatedByDeepLink().subscribe((emulated) => {
        if (!emulated) {
          this.asmComponentService.setEmulatedByDeepLink(true);
          this.startCustomerEmulationSession({
            customerId: customerIdInURL,
          });
        }
      });
    }
  }

  logout(): void {
    this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
  }

  startCustomerEmulationSession({ customerId }: { customerId?: string }): void {
    if (customerId) {
      this.csAgentAuthService.startCustomerEmulationSession(customerId);
      this.startingCustomerSession = true;
    } else {
      this.globalMessageService.add(
        { key: 'asm.error.noCustomerId' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
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

  closeInactiveCartInfoAlert(): void {
    this.showInactiveCartInfoAlert = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
