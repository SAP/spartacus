/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
  AuthConfigService,
  ConsentTemplate,
  FeatureConfigService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { CustomFormValidators, sortTitles } from '@spartacus/storefront';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RegisterComponentService } from './register-component.service';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  // TODO: (CXSPA-7315) Remove feature toggle in the next major
  // TODO: (CXSPA-8550) Remove feature toggle
  private featureConfigService = inject(FeatureConfigService);

  protected passwordValidators = this.featureConfigService?.isEnabled(
    'formErrorsDescriptiveMessages'
  )
    ? this.featureConfigService.isEnabled(
        'enableConsecutiveCharactersPasswordRequirement'
      )
      ? [
          ...CustomFormValidators.passwordValidators,
          CustomFormValidators.noConsecutiveCharacters,
        ]
      : CustomFormValidators.passwordValidators
    : [
        this.featureConfigService.isEnabled(
          'enableConsecutiveCharactersPasswordRequirement'
        )
          ? CustomFormValidators.strongPasswordValidator
          : CustomFormValidators.passwordValidator,
      ];

  titles$: Observable<Title[]>;

  isLoading$ = new BehaviorSubject(false);

  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent | undefined;
    template: string;
  }>;

  registerForm: UntypedFormGroup = this.fb.group(
    {
      titleCode: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', [Validators.required, ...this.passwordValidators]],
      passwordconf: ['', Validators.required],
      newsletter: new UntypedFormControl({
        value: false,
        disabled: this.isConsentRequired(),
      }),
      additionalConsents:
        this.registerComponentService.generateAdditionalConsentsFormControl?.() ??
        this.fb.array([]),
      termsandconditions: [false, Validators.requiredTrue],
      captcha: [false, Validators.requiredTrue],
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

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

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected fb: UntypedFormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected authConfigService: AuthConfigService,
    protected registerComponentService: RegisterComponentService
  ) {
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
      this.registerForm.get('newsletter')!.valueChanges.subscribe(() => {
        this.toggleAnonymousConsent();
      })
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.isLoading$.next(true);
    this.registerComponentService
      .register(this.collectDataFromRegisterForm(this.registerForm.value))
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        complete: () => this.isLoading$.next(false),
        error: () => this.isLoading$.next(false),
      });
  }

  titleSelected(title: Title): void {
    this.registerForm['controls'].titleCode.setValue(title.code);
  }

  collectDataFromRegisterForm(formData: any): UserSignUp {
    const { firstName, lastName, email, password, titleCode } = formData;

    return {
      firstName,
      lastName,
      uid: email.toLowerCase(),
      password,
      titleCode,
    };
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

  protected onRegisterUserSuccess(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.router.go('login');
    }
    this.registerComponentService.postRegisterMessage();
  }

  toggleAnonymousConsent(): void {
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (registerConsent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (Boolean(this.registerForm.get('newsletter')!.value)) {
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
