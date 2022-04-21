import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessageService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Title, UserRegisterFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cx-registration-form',
  templateUrl: './registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
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
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titles$ = this.userRegisterFacade.getTitles();
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      alert('valid');
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
