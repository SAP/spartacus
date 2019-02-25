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
  selector: 'cx-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  token: string;
  subscription = new Subscription();
  submited = false;

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
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => (this.token = state.state.queryParams['token']))
    );

    this.subscription.add(
      this.userService.isPasswordReset().subscribe(reset => {
        if (reset) {
          this.routingService.go({ route: ['login'] });
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetPassword() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    const password = this.form.value['password'];
    this.userService.resetPassword(this.token, password);
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
