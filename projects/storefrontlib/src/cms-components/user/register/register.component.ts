import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ANONYMOUS_CONSENTS_FEATURE,
  AuthRedirectService,
  AuthService,
  ConsentTemplate,
  FeatureConfigService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  UserService,
  UserSignUp,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { sortTitles } from '../../../shared/utils/forms/title-utils';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]>;
  loading$: Observable<boolean>;
  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent;
    template: string;
  }>;

  // TODO(issue:4237) Register flow
  isNewRegisterFlowEnabled: boolean =
    this.featureConfig && this.featureConfig.isLevel('1.1');

  isAnonymousConsentEnabled =
    this.featureConfig &&
    this.featureConfig.isEnabled(ANONYMOUS_CONSENTS_FEATURE);

  userRegistrationForm: FormGroup = this.fb.group(
    {
      titleCode: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
      newsletter: new FormControl({
        value: false,
        disabled: this.isAnonymousConsentEnabled
          ? this.isConsentRequired()
          : false,
      }),
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: CustomFormValidators.matchPassword }
  );

  constructor(
    auth: AuthService,
    authRedirectService: AuthRedirectService,
    userService: UserService,
    globalMessageService: GlobalMessageService,
    fb: FormBuilder,
    // tslint:disable-next-line:unified-signatures
    router: RoutingService,
    featureConfig: FeatureConfigService,
    anonymousConsentsService: AnonymousConsentsService,
    anonymousConsentsConfig: AnonymousConsentsConfig
  );

  /**
   * @deprecated since 1.1.0
   *
   * Use constructor(
   * protected auth: AuthService,
   * protected authRedirectService: AuthRedirectService,
   * protected userService: UserService,
   * protected globalMessageService: GlobalMessageService,
   * protected fb: FormBuilder,
   * protected router?: RoutingService,
   * protected featureConfig?: FeatureConfigService,
   * protected anonymousConsentsService?: AnonymousConsentsService,
   * protected anonymousConsentsConfig?: AnonymousConsentsConfig) instead
   *
   * TODO(issue:4237) Register flow
   * TODO(issue:4989) Anonymous consents
   */
  constructor(
    auth: AuthService,
    authRedirectService: AuthRedirectService,
    userService: UserService,
    globalMessageService: GlobalMessageService,
    fb: FormBuilder
  );
  constructor(
    protected auth: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router?: RoutingService,
    protected featureConfig?: FeatureConfigService,
    protected anonymousConsentsService?: AnonymousConsentsService,
    protected anonymousConsentsConfig?: AnonymousConsentsConfig
  ) {}

  ngOnInit() {
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      }),
      map(titles => {
        return titles.sort(sortTitles);
      })
    );

    // TODO(issue:4237) Register flow
    if (this.isNewRegisterFlowEnabled) {
      this.loading$ = this.userService.getRegisterUserResultLoading();
      this.registerUserProcessInit();
    } else {
      if (this.auth && this.authRedirectService) {
        this.subscription.add(
          this.userService
            .getRegisterUserResultSuccess()
            .subscribe((success: boolean) => {
              if (success) {
                const { uid, password } = this.collectDataFromRegisterForm(
                  this.userRegistrationForm.value
                );
                this.auth.authorize(uid, password);
              }
            })
        );
        this.subscription.add(
          this.auth.getUserToken().subscribe(data => {
            if (data && data.access_token) {
              this.globalMessageService.remove(
                GlobalMessageType.MSG_TYPE_ERROR
              );
              this.authRedirectService.redirect();
            }
          })
        );
      }
    }

    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.subscription.add(
      this.globalMessageService
        .get()
        .pipe(filter(messages => !!Object.keys(messages).length))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          const messages =
            globalMessageEntities &&
            globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR];

          if (
            messages &&
            messages.some(message => message === 'This field is required.')
          ) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );

    if (
      this.isAnonymousConsentEnabled &&
      Boolean(this.anonymousConsentsConfig) &&
      Boolean(this.anonymousConsentsConfig.anonymousConsents) &&
      Boolean(this.anonymousConsentsConfig.anonymousConsents.registerConsent)
    ) {
      this.anonymousConsent$ = combineLatest([
        this.anonymousConsentsService.getConsent(
          this.anonymousConsentsConfig.anonymousConsents.registerConsent
        ),
        this.anonymousConsentsService.getTemplate(
          this.anonymousConsentsConfig.anonymousConsents.registerConsent
        ),
      ]).pipe(
        map(([consent, template]: [AnonymousConsent, ConsentTemplate]) => {
          return {
            consent,
            template: template ? template.description : '',
          };
        })
      );

      this.subscription.add(
        this.userRegistrationForm
          .get('newsletter')
          .valueChanges.subscribe(_ => {
            this.toggleAnonymousConsent();
          })
      );
    }
  }

  submit(): void {
    this.userService.register(
      this.collectDataFromRegisterForm(this.userRegistrationForm.value)
    );
  }

  titleSelected(title: Title): void {
    this.userRegistrationForm['controls'].titleCode.setValue(title.code);
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

  isConsentGiven(consent: AnonymousConsent): boolean {
    return this.anonymousConsentsService.isConsentGiven(consent);
  }

  private isConsentRequired(): boolean {
    if (
      Boolean(this.anonymousConsentsService) &&
      Boolean(this.anonymousConsentsConfig.anonymousConsents) &&
      Boolean(this.anonymousConsentsConfig.anonymousConsents.registerConsent) &&
      Boolean(this.anonymousConsentsConfig.anonymousConsents.requiredConsents)
    ) {
      return this.anonymousConsentsConfig.anonymousConsents.requiredConsents.includes(
        this.anonymousConsentsConfig.anonymousConsents.registerConsent
      );
    }
    return false;
  }

  private onRegisterUserSuccess(success: boolean): void {
    if (this.router && success) {
      this.router.go('login');
      this.globalMessageService.add(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  toggleAnonymousConsent(): void {
    if (Boolean(this.userRegistrationForm.get('newsletter').value)) {
      this.anonymousConsentsService.giveConsent(
        this.anonymousConsentsConfig.anonymousConsents.registerConsent
      );
    } else {
      this.anonymousConsentsService.withdrawConsent(
        this.anonymousConsentsConfig.anonymousConsents.registerConsent
      );
    }
  }

  private registerUserProcessInit(): void {
    this.userService.resetRegisterUserProcessState();
    this.subscription.add(
      this.userService.getRegisterUserResultSuccess().subscribe(success => {
        this.onRegisterUserSuccess(success);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userService.resetRegisterUserProcessState();
  }
}
