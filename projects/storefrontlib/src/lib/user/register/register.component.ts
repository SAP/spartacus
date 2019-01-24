import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AuthService,
  RoutingService,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
  UserRegisterFormData
} from '@spartacus/core';

import { Subscription, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { CustomFormValidators } from '../../ui/validators/custom-form-validators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userRegistrationForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator]
      ],
      passwordconf: ['', Validators.required],
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue]
    },
    { validator: this.matchPassword }
  );

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private userService: UserService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.auth
      .getUserToken()
      .pipe(
        switchMap(data => {
          if (data && data.access_token) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            return this.routing.getRedirectUrl().pipe(take(1));
          }
          return of();
        })
      )
      .subscribe(url => {
        if (url) {
          // If forced to login due to AuthGuard, then redirect to intended destination
          this.routing.go([url]);
          this.routing.clearRedirectUrl();
        } else {
          // User manual login
          this.routing.back();
        }
      });
  }

  submit(): void {
    const submitFormData: UserRegisterFormData = {
      firstName: this.userRegistrationForm.value.firstName,
      lastName: this.userRegistrationForm.value.lastName,
      uid: this.userRegistrationForm.value.email,
      password: this.userRegistrationForm.value.password
    };
    this.userService.register(submitFormData);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
