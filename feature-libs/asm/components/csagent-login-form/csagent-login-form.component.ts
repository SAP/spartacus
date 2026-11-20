/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnInit, inject, output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@spartacus/core';
import {
  FormErrorsComponent,
  PasswordVisibilityToggleDirective,
} from '@spartacus/storefront';
import { DotSpinnerComponent } from '../dot-spinner/dot-spinner.component';

@Component({
  selector: 'cx-csagent-login-form',
  templateUrl: './csagent-login-form.component.html',
  host: { ngSkipHydration: 'true' },
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    DotSpinnerComponent,
    TranslatePipe,
  ],
})
export class CSAgentLoginFormComponent implements OnInit {
  protected fb = inject(UntypedFormBuilder);

  csAgentLoginForm: UntypedFormGroup;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  csAgentTokenLoading = false;

  readonly submitEvent = output<{
    userId: string;
    password: string;
  }>();

  ngOnInit(): void {
    this.csAgentLoginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.csAgentLoginForm.valid) {
      this.submitEvent.emit({
        userId: this.csAgentLoginForm.get('userId')?.value,
        password: this.csAgentLoginForm.get('password')?.value,
      });
    } else {
      this.csAgentLoginForm.markAllAsTouched();
    }
  }
}
