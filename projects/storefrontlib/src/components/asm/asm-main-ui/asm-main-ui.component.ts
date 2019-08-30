import { Component, OnInit } from '@angular/core';
import {
  AsmService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
  UserService,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
})
export class AsmMainUiComponent implements OnInit {
  csAgentToken$: Observable<UserToken>;
  customer$: Observable<User>;

  private startingCustomerSession = false;

  constructor(
    protected auth: AuthService,
    protected userService: UserService,
    protected asmService: AsmService,
    protected globalMessageService: GlobalMessageService,
    protected routing: RoutingService
  ) {}

  ngOnInit(): void {
    this.csAgentToken$ = this.auth.getCustomerSupportAgentToken();
    this.customer$ = this.auth.getUserToken().pipe(
      switchMap(token => {
        if (token && !!token.access_token) {
          this.handleCustomerSessionStartRedirection(token);
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );
  }

  private handleCustomerSessionStartRedirection(token: UserToken): void {
    if (
      this.startingCustomerSession &&
      this.auth.isCustomerEmulationToken(token)
    ) {
      this.startingCustomerSession = false;
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.routing.go('/');
    }
  }

  loginCustomerSupportAgent({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): void {
    this.auth.authorizeCustomerSupporAgent(userId, password);
  }

  logoutCustomerSupportAgent(): void {
    this.auth.logoutCustomerSupportAgent();
  }

  startCustomerEmulationSession({ customerId }: { customerId: string }): void {
    this.auth
      .getCustomerSupportAgentToken()
      .pipe(take(1))
      .subscribe(customerSupportAgentToken =>
        this.auth.startCustomerEmulationSession(
          customerSupportAgentToken,
          customerId
        )
      )
      .unsubscribe();
    this.startingCustomerSession = true;
  }

  hideUi(): void {
    this.asmService.updateAsmUiState({ visible: false });
  }
}
