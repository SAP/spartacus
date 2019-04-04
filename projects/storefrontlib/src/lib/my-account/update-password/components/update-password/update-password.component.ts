import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  token: string;
  subscription = new Subscription();
  submited = false;

  form: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      repassword: ['', [Validators.required]],
    },
    { validator: this.matchPassword }
  );

  constructor(
    private fb: FormBuilder,
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  resetPassword() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    const password = this.form.value['password'];
    this.userService.updatePassword('', '', password);
    this.routingService.go({ route: ['home'] });
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
