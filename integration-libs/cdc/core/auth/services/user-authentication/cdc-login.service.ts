import { Injectable } from "@angular/core";
import { LoginFormComponentService } from "feature-libs/user/account/components/login-form";
import { CdcJsService } from "integration-libs/cdc/root";
import { AuthService } from "projects/core/src/auth";
import { GlobalMessageService } from "projects/core/src/global-message";
import { WindowRef } from "projects/core/src/window";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CdcLoginComponentService extends LoginFormComponentService {
  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef,
    protected cdcJsService: CdcJsService
  ) {
    super(auth, globalMessage, winRef);
  }

  protected busy$ = new BehaviorSubject(false);

  login() {
    this.busy$.next(true);
    this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
      if (!cdcLoaded) {
        console.log(
          'CDC Gigya SDK not loaded, logging in using normal service'
        );
        super.login();
      } else {
        console.log('Logging in using CDC Gigya SDK');
        this.cdcJsService.loginUserWithoutScreenSet(
          this.form.value.userId.toLowerCase(),
          this.form.value.password,
          true
        );
      }
    });
  }
}
