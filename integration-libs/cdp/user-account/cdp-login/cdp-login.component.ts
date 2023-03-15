import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingService, User } from '@spartacus/core';
import { LoginComponent } from '@spartacus/user/account/components';
import { LoginComponentService } from '@spartacus/user/account/components';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-login',
  templateUrl: './cdp-login.component.html',
  styleUrls: ['./cdp-login.component.css']
})
export class CdpLoginComponent extends LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade,
    protected routing: RoutingService,
    protected loginComponentService: LoginComponentService
  ) {super(auth,userAccount);console.log(this); }

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
