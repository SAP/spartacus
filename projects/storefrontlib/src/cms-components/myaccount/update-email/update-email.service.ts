import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomFormValidators } from '../../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmailService {
  isUpdating$: Observable<
    boolean
  > = this.userService.getUpdateEmailResultLoading();

  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userService: UserService,
    protected authService: AuthService
  ) {}

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ]),
      confirmEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    {
      validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
    }
  );

  reset(): void {
    this.userService.resetUpdateEmailResultState();
    this.form.reset();
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const newEmail = this.form.get('confirmEmail').value;
    this.userService.updateEmail(this.form.get('password').value, newEmail);
    this.form.disable();

    this.userService
      .getUpdateEmailResultSuccess()
      .pipe(first((success) => Boolean(success) && Boolean(newEmail)))
      .subscribe(() => this.onSuccess(newEmail));

    this.userService
      .getUpdateEmailResultError()
      .pipe(first((fail) => Boolean(fail)))
      .subscribe(() => {
        this.form.enable();
      });
  }

  /**
   * Show global message then log the user out
   * and redirect to login page
   *
   * @param newUid
   * @protected
   */
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.form.reset();
    this.form.enable();
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().then(() => {
      this.routingService.go({ cxRoute: 'login' }, null, {
        state: {
          newUid,
        },
      });
    });
  }
}
