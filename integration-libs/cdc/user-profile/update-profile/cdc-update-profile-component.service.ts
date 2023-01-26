import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {
    super(userProfile, globalMessageService);
  }


  /**
   * Updates the user's details and handles the UI.
   */
  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    let formValue = this.form.value;
    this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'updateProfileForm.profileUpdateSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    this.busy$.next(false);
    this.form.reset();
  }

  protected onError(_error: any): void {
    let errorMessage = _error?.errorMessage || ' ';
    this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
    this.busy$.next(false);
  }
}
