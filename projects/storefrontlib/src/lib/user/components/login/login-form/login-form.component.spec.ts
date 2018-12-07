import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { AuthService, RoutingService, UserToken } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { GlobalMessageService } from '../../../../global-message/facade/global-message.service';

import { LoginFormComponent } from './login-form.component';

class MockAuthService {
  authorize = createSpy();
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockRoutingService {
  go = createSpy();
  clearRedirectUrl = createSpy();
  getRedirectUrl() {
    return of('/test');
  }
}

class MockGlobalMessageService {
  remove = createSpy();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let authService: MockAuthService;
  let routingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    routingService = TestBed.get(RoutingService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['userId'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });

  it('should login', () => {
    component.form.controls['userId'].setValue('test@email.com');
    component.form.controls['password'].setValue('secret');
    component.login();

    expect(authService.authorize).toHaveBeenCalledWith(
      'test@email.com',
      'secret'
    );
  });

  it('should redirect to returnUrl saved in store if there is one', () => {
    expect(routingService.go).toHaveBeenCalledWith(['/test']);
  });

  describe('userId form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['userId'];
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    });

    it('should NOT be valid when is an invalid email', () => {
      control.setValue('with space@email.com');
      expect(control.valid).toBeFalsy();

      control.setValue('without.domain@');
      expect(control.valid).toBeFalsy();

      control.setValue('without.at.com');
      expect(control.valid).toBeFalsy();

      control.setValue('@without.username.com');
      expect(control.valid).toBeFalsy();
    });

    it('should be valid when is a valid email', () => {
      control.setValue('valid@email.com');
      expect(control.valid).toBeTruthy();

      control.setValue('valid123@example.email.com');
      expect(control.valid).toBeTruthy();
    });
  });

  describe('password form field', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = component.form.controls['password'];
    });

    it('should be valid when not empty', () => {
      control.setValue('not-empty');
      expect(control.valid).toBeTruthy();

      control.setValue('not empty');
      expect(control.valid).toBeTruthy();

      control.setValue(' ');
      expect(control.valid).toBeTruthy();
    });

    it('should NOT be valid when empty', () => {
      control.setValue('');
      expect(control.valid).toBeFalsy();

      control.setValue(null);
      expect(control.valid).toBeFalsy();
    });
  });
});
