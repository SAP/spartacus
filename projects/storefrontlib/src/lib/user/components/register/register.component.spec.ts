import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

import { RegisterComponent } from './register.component';
import { UserService, RoutingService } from '@spartacus/core';
import { AuthService } from '../../../auth/facade/auth.service';

const mockTitlesList = [
  {
    code: 'mr',
    name: 'Mr.'
  },
  {
    code: 'mrs',
    name: 'Mrs.'
  }
];

describe('RegisterComponent', () => {
  let controls;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockAuthService: any;
  let mockRoutingService: any;
  let mockUserService: any;

  beforeEach(async(() => {
    mockRoutingService = {
      redirectUrl$: new BehaviorSubject(null),
      go: createSpy(),
      back: createSpy(),
      clearRedirectUrl: createSpy()
    };
    mockAuthService = {
      userToken$: of({ access_token: 'test' })
    };
    mockUserService = {
      titles$: new BehaviorSubject([]),
      loadTitles: createSpy(),
      registerUser: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.userRegistrationForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      mockUserService.titles$.next(mockTitlesList);
      component.ngOnInit();

      let titleList;
      component.titles$.subscribe(data => {
        titleList = data;
      });
      expect(titleList).toEqual(mockTitlesList);
    });

    it('should fetch titles if the state is empty', done => {
      mockUserService.titles$.next([]);
      component.ngOnInit();

      component.titles$.subscribe(() => {
        expect(mockUserService.loadTitles).toHaveBeenCalled();
        done();
      });
    });

    it('should go to redirect url after registration', () => {
      mockRoutingService.redirectUrl$.next('testUrl');
      component.ngOnInit();

      expect(mockRoutingService.go).toHaveBeenCalledWith(['testUrl']);
      expect(mockRoutingService.clearRedirectUrl).toHaveBeenCalled();
    });

    it('should go back after registration', () => {
      mockRoutingService.redirectUrl$.next(undefined);
      component.ngOnInit();

      expect(mockRoutingService.back).toHaveBeenCalled();
    });
  });

  describe('form validate', () => {
    it('form invalid when empty', () => {
      mockUserService.titles$.next(mockTitlesList);
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

      controls['titleCode'].setValue('');
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
      component.submit();
      expect(mockUserService.registerUser).toHaveBeenCalledWith(
        '',
        '',
        '',
        '',
        ''
      );
    });
  });
});
