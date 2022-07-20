import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
  AuthConfigService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators, sortTitles } from '@spartacus/storefront';
import {
  Title,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]>;

  isLoading$ = new BehaviorSubject(false);

  showPasswordError = false;

  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent | undefined;
    template: string;
  }>;

  registerForm: FormGroup = this.fb.group(
    {
      titleCode: [null],
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
    protected userRegister: UserRegisterFacade,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected authConfigService: AuthConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.titles$ = this.userRegister.getTitles().pipe(
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

    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent ?? '';

    this.anonymousConsent$ = combineLatest([
      this.anonymousConsentsService.getConsent(registerConsent),
      this.anonymousConsentsService.getTemplate(registerConsent),
    ]).pipe(
      map(
        ([consent, template]: [
          AnonymousConsent | undefined,
          ConsentTemplate | undefined
        ]) => {
          return {
            consent,
            template: template?.description ? template.description : '',
          };
        }
      )
    );

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
    this.userRegister
      .register(this.collectDataFromRegisterForm(this.registerForm.value))
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        error: (_err) => {
          this.isLoading$.next(false);
          this.onRegisterUserError();
        },
        complete: () => this.isLoading$.next(false),
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

  private onRegisterUserSuccess(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.router.go('login');
    }
    this.globalMessageService.add(
      { key: 'register.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  private onRegisterUserError(): void {
    this.document.body.scrollTo(0, 0);
    this.showPasswordError = true;
    this.renderer.addClass(this.document.body, 'body-with-modal');
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

  closeModal(): void {
    this.document.body.scrollTo(0, 0);
    this.showPasswordError = false;
    this.renderer.removeClass(this.document.body, 'body-with-modal');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
