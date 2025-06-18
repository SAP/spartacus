/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';

import {
  VerificationToken,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { RegisterVerificationTokenFormComponentService } from './verification-token-form-component.service';
import { RoutingService } from '@spartacus/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ONE_TIME_PASSWORD_REGISTRATION_PURPOSE } from '../user-registration-constants';

@Component({
  selector: 'cx-verification-token-form',
  templateUrl: './verification-token-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RegisterVerificationTokenFormComponent implements OnInit {
  protected service: RegisterVerificationTokenFormComponentService = inject(
    RegisterVerificationTokenFormComponentService
  );
  protected launchDialogService: LaunchDialogService =
    inject(LaunchDialogService);
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected routingService: RoutingService = inject(RoutingService);
  protected verificationTokenFacade = inject(VerificationTokenFacade);
  form: UntypedFormGroup = this.service.form;
  isUpdating$: Subject<boolean> = new Subject<boolean>();
  waitTime: number = 60;
  protected subscriptions = new Subscription();

  @HostBinding('class.user-form') style = true;

  @ViewChild('noReceiveCodeLink') element: ElementRef;

  @ViewChild('resendLink') resendLink: ElementRef;

  tokenId: string;

  registerData: UntypedFormGroup;

  target: string;

  isResendDisabled: boolean = true;

  errorStatus: number;

  upToRateLimit: boolean;

  waitTimeForRateLimit: number = 300;

  ngOnInit() {
    if (!!history.state) {
      this.registerData = history.state['registrationDataForm'];
      this.tokenId = history.state['tokenId'];
      this.target = history.state['loginId'];
      this.errorStatus = history.state['errorStatus'];
      history.pushState(
        {
          tokenId: '',
          loginId: '',
          errorStatus: '',
        },
        'verifyToken'
      );
      if (this.errorStatus === 400) {
        this.upToRateLimit = true;
        this.tokenId = 'invalidTokenId';
        this.startRateLimitWaitTimeInterval();

        this.isUpdating$.next(false);
      } else if (!this.target || !this.tokenId) {
        this.service.displayMessage(
          'verificationTokenForm.needInputCredentials',
          {}
        );
        this.routingService.go(['/login/register']);
      } else {
        this.startWaitTimeInterval();
        this.service.displayMessage(
          'verificationTokenForm.createVerificationToken',
          { target: this.target }
        );
      }
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isUpdating$.next(true);
    this.subscriptions.add(
      this.service.registerUser(this.registerData).subscribe({
        complete: () => this.isUpdating$.next(false),
        error: () => {
          this.isUpdating$.next(false);
          this.form
            .get('tokenCode')
            ?.setErrors({ invalidTokenCodeError: true });
        },
      })
    );
  }

  resendOTP(): void {
    this.isResendDisabled = true;
    this.waitTime = 60;
    this.resendLink.nativeElement.tabIndex = -1;
    this.resendLink.nativeElement.blur();
    this.startWaitTimeInterval();
    this.verificationTokenFacade
      .createVerificationToken({
        loginId: this.target,
        purpose: ONE_TIME_PASSWORD_REGISTRATION_PURPOSE,
      })
      .subscribe({
        next: (result: VerificationToken) => (this.tokenId = result.tokenId),
        complete: () =>
          this.service.displayMessage(
            'verificationTokenForm.createVerificationToken',
            { target: this.target }
          ),
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

  startRateLimitWaitTimeInterval(): void {
    const interval = setInterval(() => {
      this.waitTimeForRateLimit--;
      this.cdr.detectChanges();
      if (this.waitTimeForRateLimit <= 0) {
        clearInterval(interval);
        this.upToRateLimit = false;
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

  onOpenInfoDailogKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openInfoDailog();
    }
  }
}
