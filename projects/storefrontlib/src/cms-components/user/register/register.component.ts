import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  FeatureConfigService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  UserService,
  UserSignUp,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]>;
  loading$: Observable<boolean>;
  private subscription = new Subscription();

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
      newsletter: [false],
      termsandconditions: [false, Validators.requiredTrue],
    },
    { validator: CustomFormValidators.matchPassword }
  );

  /**
   * @deprecated since 1.1.0
   *
   * TODO(issue:4237) Register flow
   */
  constructor(
    protected auth: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router?: RoutingService,
    protected featureConfig?: FeatureConfigService
  ) {}

  // TODO(issue:4237) Register flow
  isNewRegisterFlowEnabled: boolean =
    this.featureConfig && this.featureConfig.isLevel('1.1');

  ngOnInit() {
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
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

  private onRegisterUserSuccess(success: boolean): void {
    if (this.router && success) {
      this.router.go('login');
      this.globalMessageService.add(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
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
