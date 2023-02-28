import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AsmCreateCustomerFacade,
  CustomerRegistrationForm,
} from '@spartacus/asm/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
} from '@spartacus/core';
import {
  CustomFormValidators,
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { CreatedCustomer } from './asm-create-customer-form.model';

@Component({
  selector: 'cx-asm-create-customer-form',
  templateUrl: './asm-create-customer-form.component.html',
})
export class AsmCreateCustomerFormComponent {
  createdCustomer: CreatedCustomer;

  iconTypes = ICON_TYPE;

  isLoading$ = new BehaviorSubject(false);

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'cx-asm-create-customer-form',
    focusOnEscape: true,
  };

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
  });

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected fb: FormBuilder,
    protected asmCreateCustomerFacade: AsmCreateCustomerFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.isLoading$.next(true);
    this.setCreatedCustomer(this.registerForm.value);

    this.asmCreateCustomerFacade
      .createCustomer(this.collectDataFromRegisterForm())
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        complete: () => this.isLoading$.next(false),
        error: (error: HttpErrorModel) => this.onRegisterUserFail(error),
      });
  }

  setCreatedCustomer(formData: any) {
    const { firstName, lastName, email } = formData;
    this.createdCustomer = {
      firstName,
      lastName,
      email,
    };
  }
  collectDataFromRegisterForm(): CustomerRegistrationForm {
    return {
      firstName: this.createdCustomer.firstName,
      lastName: this.createdCustomer.lastName,
      emailAddress: this.createdCustomer.email.toLowerCase(),
    };
  }

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
  protected onRegisterUserSuccess(): void {
    this.launchDialogService.closeDialog(this.createdCustomer);
    this.globalMessageService.add(
      { key: 'asm.createCustomerForm.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected onRegisterUserFail(error: HttpErrorModel): void {
    this.isLoading$.next(false);
    this.launchDialogService.closeDialog('Error');
    this.globalMessageService.add(
      error.details?.[0].message ?? '',
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
