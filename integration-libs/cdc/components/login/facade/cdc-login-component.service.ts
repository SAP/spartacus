import { Injectable } from "@angular/core";
import { LoginFormComponentService } from "@spartacus/user/account/components";
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
        // CDC Gigya SDK not loaded, logging in using normal service
        super.login();
      } else {
        // Logging in using CDC Gigya SDK
        this.cdcJsService.loginUserWithoutScreenSet(
          this.form.value.userId.toLowerCase(),
          this.form.value.password,
          true
        );
      }
    });
  }
}
