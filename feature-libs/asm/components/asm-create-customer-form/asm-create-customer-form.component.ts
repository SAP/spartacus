/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AsmCreateCustomerFacade,
  CustomerRegistrationForm,
} from '@spartacus/asm/root';
import { GlobalMessageType, HttpErrorModel } from '@spartacus/core';
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

  showDialogInfoAlert = true;

  showDialogErrorAlert = false;

  showDialogBackendErrorAlert = false;

  globalMessageType = GlobalMessageType;

  backendErrorMessage: string;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'cx-asm-create-customer-form',
    focusOnEscape: true,
  };

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
  });

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected fb: FormBuilder,
    protected asmCreateCustomerFacade: AsmCreateCustomerFacade
  ) {}

  submitForm(): void {
    if (this.registerForm.valid) {
      this.showDialogErrorAlert = false;
      this.registerUser();
    } else {
      this.showDialogErrorAlert = true;
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.isLoading$.next(true);
    const { firstName, lastName, email } = this.registerForm.value;
    this.createdCustomer = {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      email: email ?? '',
    };
    this.asmCreateCustomerFacade
      .createCustomer(this.collectDataFromRegisterForm())
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        complete: () => this.isLoading$.next(false),
        error: (error: HttpErrorModel) => this.onRegisterUserFail(error),
      });
  }

  collectDataFromRegisterForm(): CustomerRegistrationForm {
    return {
      firstName: this.createdCustomer.firstName,
      lastName: this.createdCustomer.lastName,
      emailAddress: this.createdCustomer.email.toLowerCase(),
    };
  }

  closeModal(reason?: unknown): void {
    this.launchDialogService.closeDialog(reason);
  }

  closeDialogInfoAlert(): void {
    this.showDialogInfoAlert = false;
  }

  closeDialogErrorAlert(): void {
    this.showDialogErrorAlert = false;
  }

  closeDialogBackendErroAlert(): void {
    this.showDialogBackendErrorAlert = false;
  }

  protected onRegisterUserSuccess(): void {
    this.launchDialogService.closeDialog(this.createdCustomer);
  }

  protected onRegisterUserFail(error: HttpErrorModel): void {
    this.isLoading$.next(false);
    this.backendErrorMessage = error.details?.[0].message ?? '';
    this.showDialogBackendErrorAlert = true;
  }
}
