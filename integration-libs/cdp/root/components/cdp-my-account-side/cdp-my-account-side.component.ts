import { Component, OnInit } from '@angular/core';
import { AuthService, RoutingService, User } from '@spartacus/core';
import { LoginComponent } from '@spartacus/user/account/components';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-side',
  templateUrl: './cdp-my-account-side.component.html',
  styleUrls: ['./cdp-my-account-side.component.scss']
})
export class CdpMyAccountSideComponent extends LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  isCdpEnabled: boolean =false;

  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade,
    protected routing: RoutingService
  ) {
    super(auth,userAccount,routing);
  }

  ngOnInit(): void {
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

}
