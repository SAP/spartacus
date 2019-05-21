import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  RedirectAfterAuthService,
  AuthService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  Title,
  UserRegisterFormData,
  UserService,
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
  subscription: Subscription;
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
    { validator: this.matchPassword }
  );

  constructor(
    private auth: AuthService,
    private redirectAfterAuthService: RedirectAfterAuthService,
    private userService: UserService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );
    this.subscription = this.auth.getUserToken().subscribe(data => {
      if (data && data.access_token) {
        this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        this.redirectAfterAuthService.redirect();
      }
    });
  }

  submit(): void {
    const {
      firstName,
      lastName,
      email,
      password,
      titleCode,
    } = this.userRegistrationForm.value;
    const userRegisterFormData: UserRegisterFormData = {
      firstName,
      lastName,
      uid: email,
      password,
      titleCode,
    };
    this.userService.register(userRegisterFormData);
    // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
    this.globalMessageService
      .get()
      .pipe(filter(data => Object.keys(data).length > 0))
      .subscribe((globalMessageEntities: GlobalMessageEntities) => {
        if (
          globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR].some(
            message => message === 'This field is required.'
          )
        ) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.globalMessageService.add(
            { key: 'register.titleRequired' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private matchPassword(ac: AbstractControl): { NotEqual: boolean } {
    if (ac.get('password').value !== ac.get('passwordconf').value) {
      return { NotEqual: true };
    }
  }
}
