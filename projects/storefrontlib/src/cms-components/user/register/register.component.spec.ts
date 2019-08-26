import { Component, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthRedirectService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  Title,
  UserService,
  UserToken,
  AuthService,
  FeatureConfigService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RegisterComponent } from './register.component';

import createSpy = jasmine.createSpy;

const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  email_lowercase: 'johndoe@thebest.john.intheworld.com',
  termsandconditions: true,
  password: 'strongPass$!123',
};

const mockTitlesList: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}

const isLevelBool: BehaviorSubject<boolean> = new BehaviorSubject(false);

class MockFeatureConfigService {
  isLevel(_level: string): boolean {
    return isLevelBool.value;
  }
}

const registerUserIsLoading: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);
const registerUserIsSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);

class MockUserService {
  loadTitles(): void {}
  resetRegisterUserProcessState(): void {}

  getTitles(): Observable<Title[]> {
    return of([]);
  }

  register(
    _titleCode: string,
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string
  ): void {}

  getRegisterUserResultLoading(): Observable<boolean> {
    return registerUserIsLoading.asObservable();
  }
  getRegisterUserResultSuccess(): Observable<boolean> {
    return registerUserIsSuccess.asObservable();
  }
}

class MockGlobalMessageService {
  add = createSpy();
  remove() {}
  get() {
    return of();
  }
}

class MockRoutingService {
  go = createSpy();
}

describe('RegisterComponent', () => {
  let controls;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userService: MockUserService;
  let globalMessageService: MockGlobalMessageService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [RegisterComponent, MockUrlPipe, MockSpinnerComponent],
      // TODO(issue:4237) Register flow
      providers: [
        {
          provide: AuthRedirectService,
          useClass: MockRedirectAfterAuthService,
        },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    userService = TestBed.get(UserService as Type<UserService>);
    globalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);

    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.userRegistrationForm.controls;

    // TODO(issue:4237) Register flow
    component.isNewRegisterFlowEnabled = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      spyOn(userService, 'getTitles').and.returnValue(of(mockTitlesList));

      component.ngOnInit();

      let titleList: Title[];
      component.titles$
        .subscribe(data => {
          titleList = data;
        })
        .unsubscribe();
      expect(titleList).toEqual(mockTitlesList);
    });

    it('should fetch titles if the state is empty', done => {
      spyOn(userService, 'loadTitles').and.stub();
      spyOn(userService, 'getTitles').and.returnValue(of([]));

      component.ngOnInit();

      component.titles$
        .subscribe(() => {
          expect(userService.loadTitles).toHaveBeenCalled();
          done();
        })
        .unsubscribe();
    });

    it('should fetch registerUser process loading state', done => {
      let loadingState: boolean;
      component.ngOnInit();

      // when false
      registerUserIsLoading.next(false);
      component.loading$.subscribe(loading => {
        loadingState = loading;
        done();
      });

      expect(loadingState).toEqual(false);

      // when true
      registerUserIsLoading.next(true);
      component.loading$.subscribe(loading => {
        loadingState = loading;
        done();
      });

      expect(loadingState).toEqual(true);
    });
  });

  describe('form validate', () => {
    it('form invalid when empty', () => {
      spyOn(userService, 'getTitles').and.returnValue(of(mockTitlesList));

      component.ngOnInit();

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('should contains error if repassword is different than password', () => {
      component.ngOnInit();

      controls['password'].setValue('test');
      controls['passwordconf'].setValue('test1');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeTruthy();
    });

    it('should not contain error if repassword is the same as password', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeFalsy();
    });

    it('form valid when filled', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(form.lastName);
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(form.termsandconditions);
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeTruthy();
    });

    it('form invalid when not all required fields filled', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(''); // this field is intentionally empty
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(form.termsandconditions);
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('form invalid when not terms not checked', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(form.lastName);
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(false); // we are checking this field
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });
  });

  describe('collectDataFromRegisterForm()', () => {
    it('should return correct register data', () => {
      const form = mockRegisterFormData;

      expect(component.collectDataFromRegisterForm(form)).toEqual({
        firstName: form.firstName,
        lastName: form.lastName,
        uid: form.email_lowercase,
        password: form.password,
        titleCode: form.titleCode,
      });
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      spyOn(userService, 'register').and.stub();
      component.ngOnInit();
      component.submit();
    });

    it('should submit form', () => {
      expect(userService.register).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        uid: '',
        password: '',
        titleCode: '',
      });
    });

    it('should redirect to login page and show message', () => {
      registerUserIsSuccess.next(true);

      expect(mockRoutingService.go).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalled();
    });
  });
});
