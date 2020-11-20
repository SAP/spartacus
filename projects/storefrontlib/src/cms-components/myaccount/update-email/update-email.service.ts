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

@Injectable({
  providedIn: 'root'
})

export class UpdateEmailService implements OnDestroy {
  protected subscriptions = new Subscription();
  protected newUid: string;

  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userService: UserService,
    protected authService: AuthService
  ) {
  }

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, CustomFormValidators.emailValidator]),
      confirmEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    },
    {
    validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail')
  });

  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.userService.getUpdateEmailResultLoading();
  }

  resetUpdateEmailResultState(): void {
    this.userService.resetUpdateEmailResultState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.resetUpdateEmailResultState();
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      this.newUid = this.form.get('confirmEmail').value;
      this.userService.updateEmail(this.form.get('password').value, this.newUid);

      this.subscriptions.add(
        this.getUpdateEmailResultLoading()
          .subscribe((loading) => this.setFormControlState(loading))
      );

      this.subscriptions.add(
        this.userService.getUpdateEmailResultSuccess()
          .subscribe((success) => this.onSuccess(success))
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  private setFormControlState(loading: boolean): void {
    loading ? this.form.disable() : this.form.enable();
  }

  private async onSuccess(success: boolean): Promise<void> {
    if (success) {
      this.globalMessageService.add(
        {
          key: 'updateEmailForm.emailUpdateSuccess',
          params: {newUid: this.newUid},
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      this.form.reset();
      // TODO(#9638): Use logout route when it will support passing redirect url
      await this.authService.coreLogout();
      this.routingService.go({cxRoute: 'login'}, null, {
        state: {
          newUid: this.newUid,
        },
      });
    }
  }
}
