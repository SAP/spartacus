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
      .pipe(map((uiState) => uiState.collapsed));
  }

  private handleCustomerSessionStartRedirection(): void {
    let isCustomerEmulated;
    this.asmAuthService
      .isCustomerEmulated()
      .pipe(take(1))
      .subscribe((isEmulated) => (isCustomerEmulated = isEmulated));
    if (this.startingCustomerSession && isCustomerEmulated) {
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
    this.asmAuthService.startCustomerEmulationSession(customerId);
    this.startingCustomerSession = true;
  }

  hideUi(): void {
    this.disabled = true;
    this.asmComponentService.unload();
  }
}
