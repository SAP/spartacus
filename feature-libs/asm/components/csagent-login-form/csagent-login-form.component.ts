/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
})
export class CSAgentLoginFormComponent implements OnInit {
  csAgentLoginForm: UntypedFormGroup;

  @Input()
  csAgentTokenLoading = false;

  @Output()
  submitEvent = new EventEmitter<{ userId: string; password: string }>();

  constructor(protected fb: UntypedFormBuilder) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
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
