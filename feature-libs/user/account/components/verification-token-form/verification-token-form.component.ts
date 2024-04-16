/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';

@Component({
  selector: 'cx-verification-token-form',
  templateUrl: './verification-token-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationTokenFormComponent {
  constructor(
    protected service: VerificationTokenFormComponentService,
    protected launchDialogService: LaunchDialogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  @ViewChild('noReceiveCodeLink') element: ElementRef;

  tokenId: string;

  tokenCode: string;

  target: string;

  password: string;

  purpose: string;

  waitTime: int = 60;

  isResendDisabled: boolean = true;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tokenId = 'test';
      this.password = params['password'];
      this.target = params['loginId'];
      this.purpose = params['purpose'];
      this.service.displayMessage(this.target);
    });
    this.startWaitTimeInterval();
  }

  onSubmit(): void {
    this.service.login();
  }

  resendOTP(): void {
    this.isResendDisabled = true;
    this.waitTime = 60;
    this.startWaitTimeInterval();
    this.service.sentOTP(this.target, this.password, this.purpose);
    this.service.displayMessage(this.target);
  }

  startWaitTimeInterval(): void {
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
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.ACCOUNT_VERIFICATION_TOKEN,
      this.element
    );
  }
}
