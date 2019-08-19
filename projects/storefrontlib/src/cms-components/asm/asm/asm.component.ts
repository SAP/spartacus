import { Component, OnInit } from '@angular/core';
import { AuthService, User, UserService, UserToken } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm.component.html',
})
export class AsmComponent implements OnInit {
  csAgentToken$: Observable<UserToken>;
  customer$: Observable<User>;

  constructor(
    protected auth: AuthService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.csAgentToken$ = this.auth.getCustomerSupportAgentToken();
    this.customer$ = this.auth.getUserToken().pipe(
      switchMap(token => {
        if (token && !!token.access_token) {
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );
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
  }

  stopCustomerEmulationSession(): void {
    this.auth.logout();
  }
}
