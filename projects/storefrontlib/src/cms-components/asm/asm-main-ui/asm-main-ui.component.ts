import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AsmAuthService,
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
import { map, switchMap, take } from 'rxjs/operators';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-asm-main-ui',
  templateUrl: './asm-main-ui.component.html',
  styleUrls: ['./asm-main-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AsmMainUiComponent implements OnInit {
  csAgentToken$: Observable<UserToken>;
  csAgentTokenLoading$: Observable<boolean>;
  customer$: Observable<User>;
  isCollapsed$: Observable<boolean>;

  @HostBinding('class.hidden') disabled = false;

  private startingCustomerSession = false;

  constructor(
    protected authService: AuthService,
    protected asmAuthService: AsmAuthService,
    protected userService: UserService,
    protected asmComponentService: AsmComponentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected asmService: AsmService
  ) {}

  ngOnInit(): void {
    this.csAgentToken$ = this.asmAuthService.getCustomerSupportAgentToken();
    this.csAgentTokenLoading$ = this.asmAuthService.getCustomerSupportAgentTokenLoading();
    this.customer$ = this.authService.getUserToken().pipe(
      switchMap((token) => {
        if (token && !!token.access_token) {
          this.handleCustomerSessionStartRedirection(token);
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );
    this.isCollapsed$ = this.asmService
      .getAsmUiState()
      .pipe(map((uiState) => uiState.collapsed));
  }

  private handleCustomerSessionStartRedirection(token: UserToken): void {
    if (
      this.startingCustomerSession &&
      this.asmAuthService.isCustomerEmulationToken(token)
    ) {
      this.startingCustomerSession = false;
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.routingService.go('/');
    }
  }

  loginCustomerSupportAgent({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): void {
    this.asmAuthService.authorizeCustomerSupportAgent(userId, password);
  }

  logout(): void {
    this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
  }

  startCustomerEmulationSession({ customerId }: { customerId: string }): void {
    this.asmAuthService
      .getCustomerSupportAgentToken()
      .pipe(take(1))
      .subscribe((customerSupportAgentToken) =>
        this.asmAuthService.startCustomerEmulationSession(
          customerSupportAgentToken,
          customerId
        )
      )
      .unsubscribe();
    this.startingCustomerSession = true;
  }

  hideUi(): void {
    this.disabled = true;
    this.asmComponentService.unload();
  }
}
