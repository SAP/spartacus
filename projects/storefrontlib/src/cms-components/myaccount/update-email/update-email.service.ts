import { Injectable, OnDestroy } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../shared/utils';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmailService implements OnDestroy {
  protected subscriptions = new Subscription();
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

  ngOnDestroy(): void {
    this.reset();
    this.subscriptions.unsubscribe();
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const newEmail = this.form.get('confirmEmail').value;
    this.userService.updateEmail(this.form.get('password').value, newEmail);

    this.subscriptions.add(
      this.isUpdating$.subscribe((loading) => this.setFormControlState(loading))
    );

    this.subscriptions.add(
      this.userService
        .getUpdateEmailResultSuccess()
        .pipe(first((success) => Boolean(success) && Boolean(newEmail)))
        .subscribe(() => this.onSuccess(newEmail))
    );
  }

  private setFormControlState(loading: boolean): void {
    // disable/enable the form for keyboard navigation
    loading ? this.form.disable() : this.form.enable();
  }

  // Show global message then log the user out
  // and redirect to login page
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.form.reset();
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
