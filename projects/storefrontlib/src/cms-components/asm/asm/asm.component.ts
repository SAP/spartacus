import { Component, OnInit } from '@angular/core';
import { AuthService, User, UserToken } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm.component.html',
})
export class AsmComponent implements OnInit {
  csAgentToken$: Observable<UserToken>;
  customer$: Observable<User>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.csAgentToken$ = this.auth.getCustomerSupportAgentToken();
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

  startCustomerSession({ customerId }: { customerId: string }): void {
    console.log('startCustomerSession:', customerId);
  }
}
