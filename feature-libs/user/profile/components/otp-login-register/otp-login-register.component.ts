/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ClientAuthenticationTokenService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { CustomFormValidators, sortTitles } from '@spartacus/storefront';
import { Title } from '@spartacus/user/profile/root';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
} from 'rxjs';

import { ONE_TIME_PASSWORD_REGISTRATION_PURPOSE } from '../user-account-constants';
import { RegisterComponentService } from '../register';
import {
  VerificationToken,
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cx-otp-register-form',
  templateUrl: './otp-login-register.component.html',
  standalone: false,
})
export class OneTimePasswordRegisterComponent implements OnInit, OnDestroy {
  protected globalMessageService = inject(GlobalMessageService);
  protected fb = inject(UntypedFormBuilder);
  protected router = inject(RoutingService);
  protected anonymousConsentsService = inject(AnonymousConsentsService);
  protected anonymousConsentsConfig = inject(AnonymousConsentsConfig);
  protected clientAuthenticationTokenService = inject(
    ClientAuthenticationTokenService
  );
  protected registerComponentService = inject(RegisterComponentService);
  protected routingService = inject(RoutingService);
  protected registrationVerificationTokenFacade = inject(
    VerificationTokenFacade
  );

  titles$: Observable<Title[]>;

  isLoading$ = new BehaviorSubject(false);

  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent | undefined;
    template: string;
  }>;

  registerForm: UntypedFormGroup = this.fb.group({
    titleCode: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
    newsletter: new UntypedFormControl({
      value: false,
      disabled: this.isConsentRequired(),
    }),
    additionalConsents:
      this.registerComponentService.generateAdditionalConsentsFormControl?.() ??
      this.fb.array([]),
    termsandconditions: [false, Validators.requiredTrue],
    captcha: [false, Validators.requiredTrue],
  });

  additionalRegistrationConsents: {
    template: ConsentTemplate;
    required: boolean;
  }[];

  get additionalConsents(): UntypedFormArray {
    return this.registerForm?.get('additionalConsents') as UntypedFormArray;
  }

  updateAdditionalConsents(event: MouseEvent, index: number) {
    const { checked } = event.target as HTMLInputElement;
    this.registerForm.value.additionalConsents[index] = checked;
  }

  constructor() {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  ngOnInit() {
    this.titles$ = this.registerComponentService.getTitles().pipe(
      map((titles: Title[]) => {
        return titles.sort(sortTitles);
      })
    );

    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.subscription.add(
      this.globalMessageService
        .get()
        .pipe(filter((messages) => !!Object.keys(messages).length))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          const messages =
            globalMessageEntities &&
            globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR];

          if (
            messages &&
            messages.some(
              (message) => message.raw === 'This field is required.'
            )
          ) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );

    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent ?? '';

    this.anonymousConsent$ = combineLatest([
      this.anonymousConsentsService.getConsent(registerConsent),
      this.anonymousConsentsService.getTemplate(registerConsent),
    ]).pipe(
      map(
        ([consent, template]: [
          AnonymousConsent | undefined,
          ConsentTemplate | undefined,
        ]) => {
          return {
            consent,
            template: template?.description ? template.description : '',
          };
        }
      )
    );

    this.additionalRegistrationConsents =
      this.registerComponentService?.getAdditionalConsents() || [];

    this.subscription.add(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.registerForm.get('newsletter')?.valueChanges.subscribe(() => {
        this.toggleAnonymousConsent();
      })
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.sendRegistrationVerificationToken();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  sendRegistrationVerificationToken(): void {
    this.isLoading$.next(true);
    this.clientAuthenticationTokenService.loadClientAuthenticationToken();
    const registrationVerificationTokenCreation =
      this.collectDataFromRegisterForm();
    this.registrationVerificationTokenFacade
      .createVerificationToken(registrationVerificationTokenCreation)
      .subscribe({
        next: (result: VerificationToken) =>
          this.goToVerificationTokenForm(result),
        error: (error: HttpErrorResponse) => {
          this.routingService.go(
            {
              cxRoute: 'verifyTokenForRegistration',
            },
            {
              state: {
                errorStatus: error.status,
                titleCode: this.registerForm.value.titleCode,
                firstName: this.registerForm.value.firstName,
                lastName: this.registerForm.value.lastName,
                loginId: this.registerForm.value.email.toLowerCase(),
              },
            }
          );
          this.isLoading$.next(false);
        },
        complete: () => this.onCreateRegistrationVerificationTokenComplete(),
      });
  }

  protected onCreateRegistrationVerificationTokenComplete(): void {
    this.isLoading$.next(false);
  }

  collectDataFromRegisterForm(): VerificationTokenCreation {
    return {
      loginId: this.registerForm.value.email.toLowerCase(),
      purpose: ONE_TIME_PASSWORD_REGISTRATION_PURPOSE,
    };
  }

  protected goToVerificationTokenForm(
    registrationVerificationToken: VerificationToken
  ): void {
    this.routingService.go(
      {
        cxRoute: 'verifyTokenForRegistration',
      },
      {
        state: {
          loginId: this.registerForm.value.email.toLowerCase(),
          tokenId: registrationVerificationToken.tokenId,
          expiresIn: registrationVerificationToken.expiresIn,
          titleCode: this.registerForm.value.titleCode,
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
        },
      }
    );
  }

  isConsentGiven(consent: AnonymousConsent | undefined): boolean {
    return this.anonymousConsentsService.isConsentGiven(consent);
  }

  private isConsentRequired(): boolean {
    const requiredConsents =
      this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents;
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }

    return false;
  }

  toggleAnonymousConsent(): void {
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (registerConsent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (Boolean(this.registerForm.get('newsletter')?.value)) {
        this.anonymousConsentsService.giveConsent(registerConsent);
      } else {
        this.anonymousConsentsService.withdrawConsent(registerConsent);
      }
    }
  }

  /**
   * Triggered via CaptchaComponent when a user confirms captcha
   */
  captchaConfirmed() {
    this.registerForm.get('captcha')?.setValue(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
