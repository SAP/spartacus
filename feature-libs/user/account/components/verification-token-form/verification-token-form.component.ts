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
import { UntypedFormGroup } from '@angular/forms';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoutingService } from '@spartacus/core';
import { VerificationToken } from '@spartacus/user/account/root';
import { ONE_TIME_PASSWORD_LOGIN_PURPOSE } from '../user-account-constants';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';

@Component({
  selector: 'cx-verification-token-form',
  templateUrl: './verification-token-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VerificationTokenFormComponent implements OnInit {
  constructor() {}
  protected service: VerificationTokenFormComponentService = inject(
    VerificationTokenFormComponentService
  );
  protected launchDialogService: LaunchDialogService =
    inject(LaunchDialogService);
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected routingService: RoutingService = inject(RoutingService);
  protected http: HttpClient = inject(HttpClient);

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

  errorStatus: number;

  upToRateLimit: boolean;

  waitTimeForRateLimit: number = 300;

  csrfToken: string;
  csrfParameterName: string;

  ngOnInit() {
    this.fetchCSRFToken();
    if (!!history.state) {
      this.tokenId = history.state['tokenId'];
      this.password = history.state['password'];
      this.target = history.state['loginId'];
      this.errorStatus = history.state['errorStatus'];
      history.pushState(
        {
          tokenId: '',
          password: '',
          loginId: '',
          errorStatus: '',
        },
        'verifyToken'
      );
      if (this.errorStatus === 400) {
        this.upToRateLimit = true;
        this.tokenId = 'invalidTokenId';
        this.startRateLimitWaitTimeInterval();
      } else if (!this.target || !this.password || !this.tokenId) {
        this.service.displayMessage(
          'verificationTokenForm.needInputCredentials',
          {}
        );
        this.routingService.go(['/login']);
      } else {
        this.startWaitTimeInterval();
        this.service.displayMessage(
          'verificationTokenForm.createVerificationToken',
          { target: this.target }
        );
      }
    }
  }

  fetchCSRFToken(): void {
    this.http
      .get<any>('https://localhost:9002/authserver/csrf', {
        withCredentials: true,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.csrfToken = data.token;
          this.csrfParameterName = data.parameterName;
        },
        (error) => {
          console.error('Error fetching CSRF token:', error);
        }
      );
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValues = this.form.value;
    const body = new HttpParams()
      .set('username', formValues.tokenId)
      .set('password', formValues.tokenCode)
      .set(this.csrfParameterName, this.csrfToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // 发起 POST 请求
    this.http
      .post('https://localhost:9002/authserver/login', body.toString(), {
        headers: headers,
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
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
}
