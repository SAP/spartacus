import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
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
import { ICON_TYPE, ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { AsmComponentService } from '../services/asm-component.service';
@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
})
export class AsmMainUiComponent implements OnInit, OnDestroy {
  customerSupportAgentLoggedIn$: Observable<boolean>;
  csAgentTokenLoading$: Observable<boolean>;
  customer$: Observable<User | undefined>;
  isCollapsed$: Observable<boolean>;
  iconTypes = ICON_TYPE;

  @HostBinding('class.hidden') disabled = false;

  protected startingCustomerSession = false;

  protected modalRef: ModalRef;

  protected subscription = new Subscription();

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
    this.customerSupportAgentLoggedIn$ = this.csAgentAuthService
      .isCustomerSupportAgentLoggedIn()
      .pipe(
        tap((loggedIn) => {
          if (!loggedIn && this.modalRef) {
            this.closeModal();
          }
        })
      );
    // .pipe(
    //   filter((loggedIn) => loggedIn === false),
    //   tap(() => {
    //     this.closeModal();
    //   })
    // );

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
    // this.subscription.add(
    //   this.customerSupportAgentLoggedIn$
    //     .pipe(filter((loggedIn) => loggedIn === false))
    //     .subscribe(() => this.closeModal())
    // );
    //setTimeout(() => this.closeModal(), 10000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
      windowClass: 'fiori-like',
    });

    this.modalRef.result
      .then((selectedUser: User) => {
        if (selectedUser) {
          this.startCustomerEmulationSession(selectedUser);
        }
      })
      .catch(() => {
        // this  callback is called when modal is closed with Esc key or clicking backdrop
      });
  }
  closeModal(): void {
    if (this.modalService.getActiveModal() === this.modalRef) {
      this.modalService.closeActiveModal();
    }
  }
}
