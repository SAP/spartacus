import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdatePasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  form: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ]),
      newPasswordConfirm: new FormControl('', Validators.required),
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'newPassword',
        'newPasswordConfirm'
      ),
    }
  );

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

    this.userPasswordService.update(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();
    this.routingService.go({ cxRoute: 'home' });
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
    this.form.reset();
  }
}
