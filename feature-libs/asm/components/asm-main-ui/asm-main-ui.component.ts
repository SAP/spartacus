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
  AsmUi,
  CsAgentAuthService,
  CustomerListColumnActionType,
} from '@spartacus/asm/root';
import {
  AuthService,
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
import { CustomerListAction } from '../customer-list/customer-list.model';
import { AsmComponentService } from '../services/asm-component.service';
import { ActivatedRoute } from '@angular/router';
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
  emulated: boolean = false;

  @HostBinding('class.hidden') disabled = false;

  protected startingCustomerSession = false;

  subscription: Subscription = new Subscription();

  @ViewChild('customerListLink') element: ElementRef;

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
    router: ActivatedRoute
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
    @Optional() protected router?: ActivatedRoute
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
        .subscribe((result: CustomerListAction) => {
          if (result.selectedUser) {
            this.startCustomerEmulationSession(result.selectedUser);
            if (
              result.actionType === CustomerListColumnActionType.ORDER_HISTORY
            ) {
              this.routingService.go({ cxRoute: 'orders' });
            }
          }
        })
    );
    if (this.router) {
      this.subscription.add(
        combineLatest([
          this.customerSupportAgentLoggedIn$,
          this.router.queryParams,
          this.authService.isUserLoggedIn(),
        ]).subscribe(([loggedIn, parameter, userLoggedin]) => {
          if (parameter.customerId) {
            this.customerIdInURL = parameter.customerId;
          }
          if (loggedIn && parameter.customerId) {
            if (userLoggedin && !this.emulated) {
              this.asmComponentService.logoutCustomer();
            } else {
              setTimeout(() => this.startSessionWithParameters());
            }
          }
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

  private startSessionWithParameters(): void {
    if (this.customerIdInURL && !this.emulated) {
      this.emulated = true;
      this.startCustomerEmulationSession({ customerId: this.customerIdInURL });
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
