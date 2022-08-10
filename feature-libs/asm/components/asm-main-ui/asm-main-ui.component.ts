import { Component, HostBinding, OnInit } from '@angular/core';
import { AsmFacade, AsmUi, CsAgentAuthService } from '@spartacus/asm/root';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
} from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take,tap } from 'rxjs/operators';
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

  protected modalRef: ModalRef | undefined;

  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected asmComponentService: AsmComponentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected asmFacade: AsmFacade,
    protected userAccountFacade: UserAccountFacade,
    protected modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.customerSupportAgentLoggedIn$ = this.csAgentAuthService
       .isCustomerSupportAgentLoggedIn()
       .pipe(
         distinctUntilChanged(),
         tap((loggedIn) => {
           if (!loggedIn) {
            console.log('agent logged out')
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
    this.isCollapsed$ = this.asmFacade
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
      this.startingCustomerSession = 
        this.asmComponentService.startCustomerEmulationSession(customerId);
    } 
  }

  hideUi(): void {
    this.disabled = true;
    this.asmComponentService.unload();
  }

  closeModal(): void {
    if (this.modalService?.getActiveModal()) {
      this.modalService?.closeActiveModal();
    }
  }
}
