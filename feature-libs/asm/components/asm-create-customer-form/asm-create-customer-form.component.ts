import { Component, OnInit } from '@angular/core';
import {
  ICON_TYPE,
  LaunchDialogService,
  FocusConfig,
} from '@spartacus/storefront';
import {
UntypedFormBuilder,
UntypedFormGroup,
Validators,
} from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { AsmCreateCustomerFacade, CustomerRegistrationForm } from '@spartacus/asm/root';
import { CreatedCustomer } from './asm-create-customer-form.model'
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
} from '@spartacus/core';

@Component({
  selector: 'cx-asm-create-customer-form',
  templateUrl: './asm-create-customer-form.component.html',
})
export class AsmCreateCustomerFormComponent implements OnInit {

  createdCustomer: CreatedCustomer;

  iconTypes = ICON_TYPE;


  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'cx-asm-create-customer-form',
    focusOnEscape: true,
  };

  registerForm: UntypedFormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
    },
  );

  constructor( 
    protected launchDialogService: LaunchDialogService,
    protected fb: UntypedFormBuilder,
    protected asmCreateCustomerFacade: AsmCreateCustomerFacade,
    protected globalMessageService: GlobalMessageService,
    ) { 
  }

  ngOnInit(): void {    
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.setCreatedCustomer(this.registerForm.value);

    this.asmCreateCustomerFacade
      .createCustomer(this.collectDataFromRegisterForm())
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        complete: () => {},
        error: (error: HttpErrorModel) => this.onRegisterUserFail(error),
      });
  }

  setCreatedCustomer(formData: any){
    const { firstName, lastName, email } = formData;
    this.createdCustomer = {
      firstName,
      lastName,
      email,
    }
  } 
  collectDataFromRegisterForm(): CustomerRegistrationForm {
    return {
      firstName: this.createdCustomer.firstName,
      lastName: this.createdCustomer.lastName,
      emailAddress: this.createdCustomer.email.toLowerCase(),
    };
  }

  protected onRegisterUserSuccess(): void {    
    this.launchDialogService.closeDialog(this.createdCustomer);
    this.globalMessageService.add(
      { key: 'asm.createCustomerForm.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected onRegisterUserFail(error: HttpErrorModel): void {    
    this.launchDialogService.closeDialog('');
    this.globalMessageService.add(
      error.details?.[0].message ?? '',
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
  
  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
