/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeatureDirective, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    FeatureDirective,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class LoginFormComponent implements AfterViewInit {
  @ViewChild('loginForm') loginForm: ElementRef<HTMLElementTagNameMap['form']>;
  @HostBinding('class.user-form') style = true;
  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  csrf = this.service.csrf;
  action = this.service.action;
  method = this.service.method;
  showResetPassword = this.service.showResetPassword;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);
  private pendingSsrValues: { userId?: string; password?: string } | null =
    null;

  constructor(protected service: LoginFormComponentService) {
    this.service.handleCustomLoginError();
    console.log('[LoginForm][constructor] host innerHTML:', this.elementRef.nativeElement.innerHTML);
    this.captureSsrFormValues();
  }

  ngAfterViewInit(): void {
    console.log('[LoginForm][ngAfterViewInit] pendingSsrValues:', this.pendingSsrValues);
    console.log('[LoginForm][ngAfterViewInit] host innerHTML:', this.elementRef.nativeElement.innerHTML);
    if (this.pendingSsrValues) {
      this.form.patchValue(this.pendingSsrValues);
      console.log('[LoginForm][ngAfterViewInit] patched form with:', this.pendingSsrValues);
      this.pendingSsrValues = null;
    } else {
      console.log('[LoginForm][ngAfterViewInit] no SSR values to restore');
    }
  }

  /**
   * Reads any values the user typed into the SSR-rendered form inputs before
   * Angular's CSR bootstrap destroyed and recreated the DOM. Called in the
   * constructor while the host element still has its server-rendered children.
   * The captured values are restored in ngAfterViewInit once Angular has
   * rendered the reactive form template.
   */
  protected captureSsrFormValues(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host: HTMLElement = this.elementRef.nativeElement;
    const usernameEl = host.querySelector<HTMLInputElement>('[name="username"]');
    const passwordEl = host.querySelector<HTMLInputElement>('[name="password"]');
    console.log('[LoginForm][captureSsrFormValues] username input found:', !!usernameEl, '| value:', JSON.stringify(usernameEl?.value));
    console.log('[LoginForm][captureSsrFormValues] password input found:', !!passwordEl, '| value:', JSON.stringify(passwordEl?.value));
    const userId = usernameEl?.value;
    const password = passwordEl?.value;
    if (userId || password) {
      this.pendingSsrValues = {
        ...(userId ? { userId } : {}),
        ...(password ? { password } : {}),
      };
      console.log('[LoginForm][captureSsrFormValues] captured:', this.pendingSsrValues);
    } else {
      console.log('[LoginForm][captureSsrFormValues] nothing to capture — inputs empty or absent');
    }
  }

  onSubmit(): void {
    this.service.login(this.loginForm?.nativeElement);
  }
}
