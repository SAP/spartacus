/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OTPLoginFormComponentService } from './otp-login-form-component.service';

@Component({
  selector: 'cx-otp-login-form',
  templateUrl: './otp-login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OTPLoginFormComponent {
  constructor(
    protected service: OTPLoginFormComponentService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  tokenId: string;

  tokenCode: string;

  target: string;

  password: string;

  waitTime: int = 60;

  isResendDisabled: boolean = true;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tokenId = '<LGN[W307fQyxtGUH4RKYON9Mx7fDYpdr+3Og8N6WH+cwexs=]>';
      this.password = params['password'];
      this.target = params['targetEmail'];
    });
    this.tokenId = '<LGN[W307fQyxtGUH4RKYON9Mx7fDYpdr+3Og8N6WH+cwexs=]>';
    this.setWaitTime();
    this.service.displayMessage(this.target);
  }

  onSubmit(): void {
    debugger;
    this.service.login();
  }

  resendOTP(): void {
    this.isResendDisabled = true;
    this.waitTime = 60;
    this.service.displayMessage(this.target);
    this.setWaitTime();
  }

  setWaitTime(): void {
    let interval = setInterval(() => {
      this.waitTime--;
      this.cdr.detectChanges();
      if (this.waitTime <= 0) {
        clearInterval(interval);
        this.isResendDisabled = false;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  openInfoDailog(): void {
    throw new Error('Method not implemented.');
  }
}
