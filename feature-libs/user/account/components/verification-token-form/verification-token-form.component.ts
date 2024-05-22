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
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

import { VerificationToken } from '@spartacus/user/account/root';
import { ONE_TIME_PASSWORD_LOGIN_PURPOSE } from '../user-account-constants';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';

@Component({
  selector: 'cx-verification-token-form',
  templateUrl: './verification-token-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationTokenFormComponent implements OnInit {
  constructor() {}
  protected service: VerificationTokenFormComponentService = inject(
    VerificationTokenFormComponentService
  );
  protected launchDialogService: LaunchDialogService =
    inject(LaunchDialogService);
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  waitTime: number = 60;

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  @ViewChild('noReceiveCodeLink') element: ElementRef;

  @ViewChild('resendLink') resendLink: ElementRef;

  tokenId: string;

  tokenCode: string;

  target: string;

  password: string;

  isResendDisabled: boolean = true;

  ngOnInit() {
    if (!!history.state) {
      this.tokenId = history.state['tokenId'];
      this.password = history.state['password'];
      this.target = history.state['loginId'];
      history.pushState(
        {
          tokenId: '',
          password: '',
          loginId: '',
        },
        'verifyToken'
      );
      this.startWaitTimeInterval();
      this.service.displayMessage(this.target);
    }
  }

  onSubmit(): void {
    this.service.login();
  }

  resendOTP(): void {
    this.isResendDisabled = true;
    this.resendLink.nativeElement.tabIndex = -1;
    this.resendLink.nativeElement.blur();
    this.waitTime = 60;
    this.startWaitTimeInterval();
    this.service
      .createVerificationToken(
        this.target,
        this.password,
        ONE_TIME_PASSWORD_LOGIN_PURPOSE
      )
      .subscribe({
        next: (result: VerificationToken) => (this.tokenId = result.tokenId),
        complete: () => this.service.displayMessage(this.target),
      });
  }

  startWaitTimeInterval(): void {
    const interval = setInterval(() => {
      this.waitTime--;
      this.cdr.detectChanges();
      if (this.waitTime <= 0) {
        clearInterval(interval);
        this.isResendDisabled = false;
        this.resendLink.nativeElement.tabIndex = 0;
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

  onOpenInfoDailogKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openInfoDailog();
    }
  }
}
