import { Component, OnInit } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { LoginComponent } from '@spartacus/user/account/components';
import { LoginComponentService } from '@spartacus/user/account/components';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Component({
  selector: 'cx-cdp-login',
  templateUrl: './cdp-login.component.html',
  styleUrls: ['./cdp-login.component.css']
})
export class CdpLoginComponent extends LoginComponent implements OnInit {

  constructor(
    protected auth: AuthService,
    protected userAccount: UserAccountFacade,
    protected loginComponentService: LoginComponentService
  ) {super(auth,userAccount); }

  ngOnInit(): void {
    this.isCdpEnabled = this.loginComponentService.myAccountForCdp();

  }

}
