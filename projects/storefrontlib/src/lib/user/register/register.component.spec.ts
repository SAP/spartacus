import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  UserService,
  UserToken
} from '@spartacus/core';

import { Observable, of } from 'rxjs';

import { Pipe, PipeTransform } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import createSpy = jasmine.createSpy;

const mockTitlesList: Title[] = [
  {
    code: 'mr',
    name: 'Mr.'
  },
  {
    code: 'mrs',
    name: 'Mrs.'
  }
];

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockRoutingService {
  goByUrl = createSpy();
  back = createSpy();
  clearRedirectUrl = createSpy();

  getRedirectUrl() {
    return of();
  }
}

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of([]);
  }

  loadTitles(): void {}

  register(
    _titleCode: string,
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string
  ): void {}
}

class MockGlobalMessageService {
  remove() {}
  get() {
    return of();
  }
}

describe('RegisterComponent', () => {
  let controls;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let routingService: MockRoutingService;
  let userService: MockUserService;
  let globalMessageService: MockGlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [RegisterComponent, MockTranslateUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    routingService = TestBed.get(RoutingService);
    userService = TestBed.get(UserService);
    globalMessageService = TestBed.get(GlobalMessageService);
    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.userRegistrationForm.controls;
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

    it('should remove error messages', () => {
      spyOn(globalMessageService, 'remove').and.callThrough();
      component.ngOnInit();
      expect(globalMessageService.remove).toHaveBeenCalledWith(
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should go to redirect url after registration', () => {
      spyOn(routingService, 'getRedirectUrl').and.returnValue(of('testUrl'));
      component.ngOnInit();

      expect(routingService.goByUrl).toHaveBeenCalledWith('testUrl');
      expect(routingService.clearRedirectUrl).toHaveBeenCalled();
    });

    it('should go back after registration', () => {
      spyOn(routingService, 'getRedirectUrl').and.returnValue(of(undefined));
      component.ngOnInit();

      expect(routingService.back).toHaveBeenCalled();
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
      component.ngOnInit();

      controls['password'].setValue('test');
      controls['passwordconf'].setValue('test');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeFalsy();
    });

    it('form valid when filled', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('Mr');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('Doe');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(true);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeTruthy();
    });

    it('form invalid when not all required fields filled', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('Mr');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(true);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('form invalid when not terms not checked', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('Mr');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('Doe');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(false);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });
  });

  describe('submit', () => {
    it('should submit form', () => {
      spyOn(userService, 'register').and.stub();
      component.submit();
      expect(userService.register).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        uid: '',
        password: '',
        titleCode: ''
      });
    });
  });
});
