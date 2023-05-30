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
import {
  GlobalMessageType,
  HttpErrorModel,
  TranslationService,
  User,
} from '@spartacus/core';
import {
  CustomFormValidators,
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
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

  globalMessageType = GlobalMessageType;

  showDialogBackendErrorAlerts: boolean[];

  backendErrorMessages: string[];

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
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
    protected asmCreateCustomerFacade: AsmCreateCustomerFacade,
    protected translationService: TranslationService
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
    const { firstName, lastName, email } = this.registerForm.value;
    this.createdCustomer = {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      email: email ?? '',
    };

    const obs$ = this.asmCreateCustomerFacade.createCustomer(
      this.collectDataFromRegisterForm()
    );

    obs$.subscribe({
      next: (result: User) => this.onRegisterUserSuccess(result),
      error: (error: HttpErrorModel) => this.onRegisterUserFail(error),
    });

    obs$.subscribe({
      complete: () => this.isLoading$.next(false),
    });
  }

  collectDataFromRegisterForm(): CustomerRegistrationForm {
    return {
      firstName: this.createdCustomer.firstName,
      lastName: this.createdCustomer.lastName,
      emailAddress: this.createdCustomer.email,
    };
  }

  closeModal(reason?: unknown): void {
    this.launchDialogService.closeDialog(reason);
  }

  closeDialogInfoAlert(): void {
    this.showDialogInfoAlert = false;
  }

  closeDialogBackendErroAlert(index: number): void {
    this.showDialogBackendErrorAlerts[index] = false;
  }

  protected onRegisterUserSuccess(user: User): void {
    this.launchDialogService.closeDialog(user);
  }

  protected onRegisterUserFail(error: HttpErrorModel): void {
    this.isLoading$.next(false);
    this.backendErrorMessages = [];
    this.showDialogBackendErrorAlerts = [];

    const unknownError = 'httpHandlers.unknownError';
    const errorDetails = error.details ?? [];

    if (errorDetails.length === 0) {
      this.addErrorMessage(unknownError);
    }
    errorDetails.forEach((errorDetail) => {
      switch (errorDetail.type || '') {
        case 'ValidationError':
          this.addErrorMessage(
            `asm.createCustomerForm.validationErrors.${errorDetail.subject}`
          );
          break;
        case 'AssistedServiceError':
          if (errorDetail.message === 'Duplicate User id') {
            this.addErrorMessage(
              'asm.createCustomerForm.badRequestDuplicatedEmail',
              {
                emailAddress: this.createdCustomer.email,
              }
            );
          } else {
            this.addErrorMessage(unknownError);
          }
          break;
        default:
          this.addErrorMessage(unknownError);
      }
    });
  }

  protected addErrorMessage(key: string, options?: unknown): void {
    this.translationService
      .translate(key, options)
      .pipe(first())
      .subscribe((text) => {
        this.backendErrorMessages.push(text);
        this.showDialogBackendErrorAlerts.push(true);
      });
  }
}
