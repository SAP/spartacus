import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';

import { CustomFormValidators } from '../../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-reset-new-password-form',
  templateUrl: './reset-new-password-form.component.html',
  styleUrls: ['./reset-new-password-form.component.scss']
})
export class ResetNewPasswordFormComponent implements OnInit, OnDestroy {
  token: string;
  subscription: Subscription;

  form: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator]
      ],
      repassword: ['', [Validators.required]]
    },
    { validator: this.matchPassword }
  );

  constructor(
    private fb: FormBuilder,
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.routingService
      .getRouterState()
      .subscribe(state => (this.token = state.state.queryParams['token']));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetPassword() {
    const password = this.form.value['password'];
    this.userService.resetPassword(this.token, password);
    this.routingService.go({ route: ['login'] });
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
