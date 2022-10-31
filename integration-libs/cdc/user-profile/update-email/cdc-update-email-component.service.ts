import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService, GlobalMessageType, RoutingService
} from '@spartacus/core';
import { UpdateEmailComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
  constructor(
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected cdcJsService: CdcJsService
  ) {
    super(userEmail, routingService, globalMessageService, authService, authRedirectService);
  }

  

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;
    
    this.cdcJsService.updateUserEmailWithoutScreenSet(password, newEmail).subscribe({
      next: () => this.onSuccess(newEmail),
      error: (error: Error) => this.onError(error),
    });
  }

  // /**
  //  * Handles successful updating of the user email.
  //  */
  //  protected onSuccess(newUid: string): void {
  //   this.globalMessageService.add(
  //     {
  //       key: 'updateEmailForm.emailUpdateSuccess',
  //       params: { newUid },
  //     },
  //     GlobalMessageType.MSG_TYPE_CONFIRMATION
  //   );
  //   this.busy$.next(false);
  //   this.form.reset();
  //   // sets the redirect url after login
  //   this.authRedirectService.setRedirectUrl(
  //     this.routingService.getUrl({ cxRoute: 'home' })
  //   );
  //   //Invoke the logout endpoint to trigger CDC Logout Guard.
  //   this.authService.logout();
  // }

  protected onError(_error: Error): void {
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
    this.globalMessageService.add({ key: 'httpHandlers.validationErrors.invalid.password'}, GlobalMessageType.MSG_TYPE_ERROR);
    this.busy$.next(false);
  }
}
