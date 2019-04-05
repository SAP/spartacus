import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomFormValidators } from '../../../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css'],
})
export class UpdatePasswordFormComponent implements OnInit, OnDestroy {
  token: string;
  subscription = new Subscription();
  submited = false;
  userId: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routingService: RoutingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .get()
      .pipe(take(1))
      .subscribe(user => {
        this.userId = user.uid;
      });

    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator],
        ],
        newPasswordConfirm: ['', [Validators.required]],
      },
      { validator: this.matchPassword }
    );
  }

  ngOnDestroy() {}

  updatePassword() {
    console.log('UpdatePassword()', this.userId, this.form.value);
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.userService.updatePassword(
      this.userId,
      this.form.value.oldPassword,
      this.form.value.newPassword
    );
    this.routingService.go({ route: ['home'] });
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('newPassword').value !== ac.get('newPasswordConfirm').value) {
      return { NotEqual: true };
    }
  }
}
