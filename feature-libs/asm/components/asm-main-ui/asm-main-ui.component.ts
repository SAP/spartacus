import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AsmService, AsmUi } from '@spartacus/asm/core';
import { CsAgentAuthService } from '@spartacus/asm/root';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerSelectionComponent } from '../customer-selection/customer-selection.component';
import { AsmComponentService } from '../services/asm-component.service';
@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
})
export class AsmMainUiComponent implements OnInit {
  customerSupportAgentLoggedIn$: Observable<boolean>;
  csAgentTokenLoading$: Observable<boolean>;
  customer$: Observable<User | undefined>;
  isCollapsed$: Observable<boolean>;

  @HostBinding('class.hidden') disabled = false;

  protected startingCustomerSession = false;

  protected modalRef: ModalRef;

  @ViewChild(CustomerSelectionComponent)
  customerSelectionComponent: CustomerSelectionComponent;

  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected userService: UserService,
    protected asmComponentService: AsmComponentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected asmService: AsmService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.customerSupportAgentLoggedIn$ =
      this.csAgentAuthService.isCustomerSupportAgentLoggedIn();
    this.csAgentTokenLoading$ =
      this.csAgentAuthService.getCustomerSupportAgentTokenLoading();
    this.customer$ = this.authService.isUserLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          this.handleCustomerSessionStartRedirection();
          return this.userService.get();
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
    this.modalRef = this.modalService.open(CustomerListComponent, {
      centered: true,
      size: 'mf',
      // windowClass: 'classTestHak',
    });

    this.modalRef.result
      .then((selectedUser) => {
        if (selectedUser) {
          this.customerSelectionComponent.selectCustomerFromList(selectedUser);
        }
      })
      .catch(() => {
        // this  callback is called when modal is closed with Esc key or clicking backdrop
      });
  }
}
