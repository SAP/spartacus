/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { useFeatureStyles } from '@spartacus/core';

@Component({
  selector: 'cx-csagent-login-form',
  templateUrl: './csagent-login-form.component.html',
  standalone: false,
  host: { ngSkipHydration: 'true' },
})
export class CSAgentLoginFormComponent implements OnInit {
  protected fb = inject(UntypedFormBuilder);

  csAgentLoginForm: UntypedFormGroup;

  @Input()
  csAgentTokenLoading = false;

  @Output()
  submitEvent = new EventEmitter<{ userId: string; password: string }>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    useFeatureStyles('a11yTextSpacingAdjustments');
  }

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
