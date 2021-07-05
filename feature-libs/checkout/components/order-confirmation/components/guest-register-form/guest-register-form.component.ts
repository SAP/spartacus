import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RoutingService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';

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
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected fb: FormBuilder
  ) {}

  submit() {
    if (this.guestRegisterForm.valid) {
      this.userRegisterFacade.registerGuest(
        this.guid,
        this.guestRegisterForm.value.password
      );
      if (!this.subscription) {
        this.subscription = this.authService
          .isUserLoggedIn()
          .subscribe((isLoggedIn) => {
            if (isLoggedIn) {
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
