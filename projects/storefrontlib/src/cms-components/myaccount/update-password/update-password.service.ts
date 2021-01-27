import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomFormValidators } from '../../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  isUpdating$: Observable<
    boolean
  > = this.userService.getUpdatePasswordResultLoading();
  constructor(
    private routingService: RoutingService,
    private userService: UserService,
    private globalMessageService: GlobalMessageService
  ) {}

  form: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ]),
      newPasswordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'newPassword',
        'newPasswordConfirm'
      ),
    }
  );

  reset(): void {
    this.userService.resetUpdatePasswordProcessState();
    this.form.reset();
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.userService.updatePassword(
      this.form.get('oldPassword').value,
      this.form.get('newPassword').value
    );
    this.form.disable();

    this.userService
      .getUpdatePasswordResultSuccess()
      .pipe(first((success) => Boolean(success)))
      .subscribe(() => this.onSuccess());

    this.userService
      .getUpdatePasswordResultError()
      .pipe(first((fail) => Boolean(fail)))
      .subscribe(() => {
        this.form.enable();
      });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({ cxRoute: 'home' });
    this.form.reset();
    this.form.enable();
  }
}
