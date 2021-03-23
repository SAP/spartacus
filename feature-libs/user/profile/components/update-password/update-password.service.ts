import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  isUpdating$ = new BehaviorSubject(false);

  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userPasswordService: UserPasswordFacade,
    protected authService: AuthService
  ) {}

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
    this.isUpdating$.next(true);

    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    this.userPasswordService.update(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.isUpdating$.next(false),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({ cxRoute: 'home' });
    this.reset();
  }

  reset(): void {
    this.form.reset();
    this.form.enable();
  }
}
