import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingService, User } from '@spartacus/core';
import { LoginComponentService } from '@spartacus/user/account/components';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-my-account-side',
  templateUrl: './cdp-my-account-side.component.html',
  styleUrls: ['./cdp-my-account-side.component.css']
})
export class CdpMyAccountSideComponent implements OnInit {
  user$: Observable<User | undefined>;
  isCdpEnabled: any;
  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade,
    protected routing: RoutingService,
    protected loginComponentService: LoginComponentService
  ) {}

  ngOnInit(): void {
    this.isCdpEnabled = this.loginComponentService.myAccountForCdp();
    this.user$ = this.auth.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.userAccount.get();
        } else {
          return of(undefined);
        }
      })
    );

  }

  myAccountForCdp(): boolean{
    return true;
}

goToMyAccount(): void {
  this.routing.go({
    cxRoute: 'myAccount'
  });
}

}
