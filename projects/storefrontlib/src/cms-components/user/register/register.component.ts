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
  ConsentTemplate,
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
import { CustomFormValidators, sortTitles } from '../../../shared/index';

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

  registerForm: FormGroup = this.fb.group(
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
        disabled: this.isConsentRequired(),
      }),
      termsandconditions: [false, Validators.requiredTrue],
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

  constructor(
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig
  ) {}

  ngOnInit() {
    this.titles$ = this.userService.getTitles().pipe(
      tap((titles) => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      }),
      map((titles) => {
        return titles.sort(sortTitles);
      })
    );

    this.loading$ = this.userService.getRegisterUserResultLoading();
    this.registerUserProcessInit();

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
            messages.some((message) => message === 'This field is required.')
          ) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );

    const { registerConsent } = this.anonymousConsentsConfig?.anonymousConsents;

    this.anonymousConsent$ = combineLatest([
      this.anonymousConsentsService.getConsent(registerConsent),
      this.anonymousConsentsService.getTemplate(registerConsent),
    ]).pipe(
      map(([consent, template]: [AnonymousConsent, ConsentTemplate]) => {
        return {
          consent,
          template: template ? template.description : '',
        };
      })
    );

    this.subscription.add(
      this.registerForm.get('newsletter').valueChanges.subscribe(() => {
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
    this.userService.register(
      this.collectDataFromRegisterForm(this.registerForm.value)
    );
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

  isConsentGiven(consent: AnonymousConsent): boolean {
    return this.anonymousConsentsService.isConsentGiven(consent);
  }

  private isConsentRequired(): boolean {
    const {
      requiredConsents,
      registerConsent,
    } = this.anonymousConsentsConfig?.anonymousConsents;

    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }

    return false;
  }

  private onRegisterUserSuccess(success: boolean): void {
    if (success) {
      // TODO: Should we do something different here in case of implicit/code flow
      this.router.go('login');
      this.globalMessageService.add(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  toggleAnonymousConsent(): void {
    const { registerConsent } = this.anonymousConsentsConfig.anonymousConsents;

    if (Boolean(this.registerForm.get('newsletter').value)) {
      this.anonymousConsentsService.giveConsent(registerConsent);
    } else {
      this.anonymousConsentsService.withdrawConsent(registerConsent);
    }
  }

  private registerUserProcessInit(): void {
    this.userService.resetRegisterUserProcessState();
    this.subscription.add(
      this.userService.getRegisterUserResultSuccess().subscribe((success) => {
        this.onRegisterUserSuccess(success);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userService.resetRegisterUserProcessState();
  }
}
