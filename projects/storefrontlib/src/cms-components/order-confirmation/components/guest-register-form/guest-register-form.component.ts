import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './guest-register-form.component.html',
})
export class GuestRegisterFormComponent implements OnInit, OnDestroy {
  @Input() guid: string;
  @Input() email: string;

  subscription: Subscription;
  guestRegisterForm: FormGroup;

  constructor(
    protected userService: UserService,
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.guestRegisterForm = this.fb.group(
      {
        password: [
          '',
          [Validators.required, CustomFormValidators.passwordValidator],
        ],
        passwordconf: ['', Validators.required],
      },
      {
        validators: CustomFormValidators.passwordsMustMatch(
          'password',
          'passwordconf'
        ),
      }
    );
  }

  submit() {
    if (this.guestRegisterForm.valid) {
      this.userService.registerGuest(
        this.guid,
        this.guestRegisterForm.value.password
      );
      if (!this.subscription) {
        this.subscription = this.authService.getUserToken().subscribe(token => {
          if (token.access_token) {
            this.routingService.go({ cxRoute: 'home' });
          }
        });
      }
    } else {
      this.guestRegisterForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
