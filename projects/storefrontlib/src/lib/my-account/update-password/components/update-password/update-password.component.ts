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
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
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
        password: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator],
        ],
        repassword: ['', [Validators.required]],
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

    this.userService.updatePassword(this.userId, '', '');
    this.routingService.go({ route: ['home'] });
  }

  private matchPassword(ac: AbstractControl) {
    if (ac.get('password').value !== ac.get('repassword').value) {
      return { NotEqual: true };
    }
  }
}
