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
export class UpdatePasswordService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected busy = new BehaviorSubject(false);

  isUpdating$ = this.busy.pipe(
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

  update(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();
    this.busy.next(true);

    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    this.userPasswordService.update(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.resetForm(),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({ cxRoute: 'home' });
  }

  protected resetForm(): void {
    this.busy.next(false);
    this.form.reset();
  }
}
