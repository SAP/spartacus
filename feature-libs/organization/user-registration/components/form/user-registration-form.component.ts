import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegistrationFacade } from '../../root/facade/user-registration.facade';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegistrationFormComponent implements OnInit {
  titles$: Observable<Title[]>;

  isLoading$ = new BehaviorSubject(false);

  registerForm: FormGroup = this.fb.group({
    titleCode: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
    message: [''],
  });

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected orgUserRegistrationFacade: UserRegistrationFacade,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titles$ = this.userRegisterFacade.getTitles();
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  register(): void {
    this.isLoading$.next(true);

    this.orgUserRegistrationFacade
      .registerUser(this.registerForm?.value)
      .subscribe({
        next: () => {
          return this.globalMessageService.add(
            { key: 'orgUserRegistration.form.successMessage' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        complete: () => {
          this.registerForm.reset();
          this.isLoading$.next(false);
        },
        error: () => this.isLoading$.next(false),
      });
  }
}
