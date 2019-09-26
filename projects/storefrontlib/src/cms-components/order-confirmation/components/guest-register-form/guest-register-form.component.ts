import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RoutingService, UserService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './guest-register-form.component.html',
})
export class GuestRegisterFormComponent implements OnDestroy {
  @Input() guid: string;
  @Input() email: string;

  subscription: Subscription;

  guestRegisterForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
    },
    { validator: CustomFormValidators.matchPassword }
  );

  constructor(
    protected userService: UserService,
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {}

  submit() {
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
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
