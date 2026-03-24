/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { AsmDialogActionEvent } from '@spartacus/asm/customer-360/root';
import {
  AsmConfig,
  AsmDeepLinkParameters,
  AsmUi,
  CLOSE_DIALOG_REASON,
  CsAgentAuthService,
  CustomerListColumnActionType,
} from '@spartacus/asm/root';
import {
  AuthService,
  FeatureDirective,
  FeatureModulesService,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  HttpResponseStatus,
  OAuthLibWrapperService,
  RoutingService,
  TranslatePipe,
  User,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
  MessageComponent,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { AsmSessionTimerComponent } from '../asm-session-timer/asm-session-timer.component';
import { AsmToggleUiComponent } from '../asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from '../csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from '../customer-emulation/customer-emulation.component';
import { CustomerListAction } from '../customer-list/customer-list.model';
import { CustomerSelectionComponent } from '../customer-selection/customer-selection.component';
import { AsmComponentService } from '../services/asm-component.service';

interface CartTypeKey {
  [key: string]: string;
}

export const CART_TYPE_KEY: CartTypeKey = {
  active: 'asm.activeCartAlertInfo',
  inactive: 'asm.saveInactiveCartAlertInfo',
};
@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
  imports: [
    IconComponent,
    NgIf,
    FeatureDirective,
    AsmToggleUiComponent,
    AsmSessionTimerComponent,
    CustomerEmulationComponent,
    MessageComponent,
    CustomerSelectionComponent,
    CSAgentLoginFormComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class AsmMainUiComponent implements OnInit, OnDestroy {
  customerSupportAgentLoggedIn$: Observable<boolean>;
  csAgentTokenLoading$: Observable<boolean>;
  customer$: Observable<User | undefined>;
  isCollapsed$: Observable<boolean> | undefined;
  iconTypes = ICON_TYPE;
  forbiddenResponseStatus = HttpResponseStatus.FORBIDDEN;

  showDeeplinkCartInfoAlert$: Observable<boolean> =
    this.asmComponentService.shouldShowDeeplinkCartInfoAlert();
  deeplinkCartAlertKey: string = '';

  showCreateCustomerSuccessfullyAlert = false;

  globalMessageType = GlobalMessageType;

  @HostBinding('class.hidden') disabled = false;

  protected startingCustomerSession = false;
  showCustomerEmulationInfoAlert = true;

  subscription: Subscription = new Subscription();

  @ViewChild('customerListLink') element: ElementRef;
  @ViewChild('addNewCustomerLink') addNewCustomerLink: ElementRef;

  isAsmCustomer360Configured: boolean | undefined = false;
  isAsmCustomer360Loaded$ = new BehaviorSubject<boolean>(false);
  protected featureModules = inject(FeatureModulesService);
  protected asmConfig = inject(AsmConfig);

  protected oAuthLibWrapperService = inject(OAuthLibWrapperService);
  isAsmSessionConfigured: boolean = false;

  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected asmComponentService: AsmComponentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected asmService: AsmService,
    protected userAccountFacade: UserAccountFacade,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.isAsmCustomer360Configured =
      this.featureModules.isConfigured('asmCustomer360');
    if (this.isAsmCustomer360Configured) {
      // trigger lazy loading of the Customer 360 feature:
      this.featureModules.resolveFeature('asmCustomer360').subscribe(() => {
        this.isAsmCustomer360Loaded$.next(true);
      });
    }
    this.isAsmSessionConfigured =
      this.asmConfig.asm?.asmSessionSupport?.enabled ?? false;
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
    this.asmService.getAsmUiState().subscribe((state) => {
      if (state.status === this.forbiddenResponseStatus) {
        this.logout();
        this.hideUi();
        this.asmService.updateAsmUiState({ status: undefined });
      }
    });
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
              this.routingService.go('/');
            }
            if (
              'actionType' in result &&
              result.actionType === CustomerListColumnActionType.ACTIVE_CART
            ) {
              this.routingService.go({ cxRoute: 'cart' });
            } else if (
              'actionType' in result &&
              result.actionType === CustomerListColumnActionType.CUSTOMER_360
            ) {
              this.customer$
                .pipe(
                  filter((curCustomer) => !!curCustomer),
                  take(1)
                )
                .subscribe((customer) => {
                  this.showC360Dialog(customer);
                });
            }
          }
          if (result === CLOSE_DIALOG_REASON.FORBIDDEN) {
            this.logout();
            this.hideUi();
          }
        })
    );

    this.subscription.add(
      combineLatest([
        this.customerSupportAgentLoggedIn$,
        this.asmComponentService.isCustomerEmulationSessionInProgress(),
      ])
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter(([agentLoggedIn]) => Boolean(agentLoggedIn))
        )
        .subscribe(() => {
          this.asmService.customerSearch({
            query: 'autoSearchToAvoidUnauthorizedLogin',
            pageSize: 1,
          });
        })
    );

    this.subscribeForDeeplink();
  }

  protected showC360Dialog(customer: User | undefined): void {
    this.isAsmCustomer360Loaded$
      .pipe(filter((isReady) => Boolean(isReady)))
      .subscribe(() => {
        const data = { customer: customer };
        this.launchDialogService.openDialogAndSubscribe(
          LAUNCH_CALLER.ASM_CUSTOMER_360,
          this.element,
          data
        );
      });

    this.subscription.add(
      this.launchDialogService.dialogClose
        .pipe(filter((closeContent) => Boolean(closeContent)))
        .subscribe((event: AsmDialogActionEvent) => {
          this.asmComponentService.handleAsmDialogAction(event);
        })
    );
  }

  /**
   * When agent is logged in and deep link has customerID,
   * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
   * call startSessionWithParameters
   */
  protected subscribeForDeeplink(): void {
    if (this.asmComponentService.isEmulateInURL()) {
      //Always route to home page to avoid 404
      this.routingService.go('/');
    }
    const parameters = this.asmComponentService.getDeepLinkUrlParams() ?? {
      customerId: this.asmComponentService.getSearchParameter('customerId'),
      orderId: this.asmComponentService.getSearchParameter('orderId'),
      ticketId: this.asmComponentService.getSearchParameter('ticketId'),
      cartId: this.asmComponentService.getSearchParameter('cartId'),
      cartType: this.asmComponentService.getSearchParameter('cartType'),
      emulated: false,
    };
    this.deeplinkCartAlertKey = CART_TYPE_KEY[parameters.cartType || ''];
    this.subscription.add(
      combineLatest([
        this.customerSupportAgentLoggedIn$,
        this.authService.isUserLoggedIn(),
        this.asmComponentService.isEmulatedByDeepLink(),
      ]).subscribe(([agentLoggedIn, userLoggedin, isEmulatedByDeepLink]) => {
        if (agentLoggedIn && parameters.customerId) {
          if (!isEmulatedByDeepLink && userLoggedin) {
            this.confirmSwitchCustomer(parameters.customerId);
          } else {
            setTimeout(() =>
              this.startSessionWithParameters({
                ...parameters,
                emulated: isEmulatedByDeepLink,
              })
            );
          }
        }
      })
    );
  }

  protected confirmSwitchCustomer(switchCustomerId: string): void {
    this.customer$
      .pipe(
        filter((curCustomer) => !!curCustomer),
        take(1)
      )
      .subscribe((curCustomer) => {
        if (curCustomer?.customerId !== switchCustomerId) {
          this.userAccountFacade.getById(switchCustomerId).subscribe({
            next: (switchCustomer) => {
              this.launchDialogService.openDialogAndSubscribe(
                LAUNCH_CALLER.ASM_SWITCH_CUSTOMER,
                this.element,
                { curCustomer: curCustomer, switchCustomer: switchCustomer }
              );
            },
            error: (error: HttpErrorModel) => {
              this.globalMessageService.add(
                error.details?.[0].message ?? '',
                GlobalMessageType.MSG_TYPE_ERROR
              );
            },
          });
        } else {
          this.asmComponentService.setEmulatedByDeepLink(true);
        }
      });
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

  loginCustomerSupportAgentWithAuthorizationCodeFlow(): void {
    this.csAgentAuthService.authorizeCustomerSupportAgentWhenUseCodeFlow();
  }

  logout(): void {
    this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
  }

  startCustomerEmulationSession(
    { customerId }: { customerId?: string },
    parameters?: AsmDeepLinkParameters
  ): void {
    if (customerId) {
      this.csAgentAuthService.startCustomerEmulationSession(customerId);
      this.startingCustomerSession = true;
      this.showCustomerEmulationInfoAlert = true;
      this.showCreateCustomerSuccessfullyAlert = false;
      if (this.isAsmSessionConfigured) {
        this.asmService.createAsmSessionEvent({ eventType: 'StartSession' });
      }
      if (parameters) {
        this.asmComponentService.handleDeepLinkNavigation({
          customerId,
          ...parameters,
        });
      }
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
    this.oAuthLibWrapperService.refreshAuthConfig();
    this.authService.updateIsUsingASMClient(false);
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

  closeDeeplinkCartInfoAlert(): void {
    this.asmComponentService.setShowDeeplinkCartInfoAlert(false);
  }

  closeCustomerEmulationInfoAlert(): void {
    this.showCustomerEmulationInfoAlert = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
