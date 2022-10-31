import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageService, RoutingService
} from '@spartacus/core';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {
    super(userPasswordService, routingService, globalMessageService);
  }


  /**
   * Updates the password for the user.
   */
  updatePassword(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    this.cdcJsService.updateUserPasswordWithoutScreenSet(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

}
