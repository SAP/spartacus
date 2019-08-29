import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AsmService,
  AsmUi,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
  UserService,
  UserToken,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm.component.html',
})
export class AsmComponent implements OnInit, OnDestroy {
  csAgentToken$: Observable<UserToken>;
  customer$: Observable<User>;
  asmUi$: Observable<AsmUi>;

  private startingCustomerSession = false;
  private subscription = new Subscription();

  constructor(
    protected auth: AuthService,
    protected userService: UserService,
    protected asmService: AsmService,
    protected globalMessageService: GlobalMessageService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        if (queryParams.get('asm') === 'true') {
          this.showUi();
        }
      })
    );

    this.asmUi$ = this.asmService.getAsmUiState();
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

  showUi(): void {
    this.asmService.updateAsmUiState({ visible: true });
  }

  hideUi(): void {
    this.asmService.updateAsmUiState({ visible: false });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
