import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  FeaturesConfigModule,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FormErrorsModule } from '../../../shared/index';
import { LoginFormComponent } from './login-form.component';
import createSpy = jasmine.createSpy;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials() {
    return Promise.resolve();
  }
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockGlobalMessageService {
  remove = createSpy();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let globalMessageService: GlobalMessageService;

  let authService: AuthService;
  let windowRef: WindowRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FeaturesConfigModule,
        FormErrorsModule,
      ],
      declarations: [LoginFormComponent, MockUrlPipe],
      providers: [
        WindowRef,
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    windowRef = TestBed.inject(WindowRef);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  beforeEach(() => {
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form - empty', () => {
    expect(component.loginForm.controls['userId'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
  });

  it('should init the form - prefilled', () => {
    const email = 'test@email.com';
    windowRef.nativeWindow.history.pushState(
      {
        newUid: email,
      },
      null
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.loginForm.controls['userId'].value).toBe(email);

    // reset the state
    windowRef.nativeWindow.history.replaceState(null, null);
  });

  describe('login()', () => {
    beforeEach(() => {
      spyOn(authService, 'loginWithCredentials').and.callThrough();
    });

    it('should login and redirect to return url after auth', () => {
      const email = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      expect(authService.loginWithCredentials).toHaveBeenCalledWith(
        email,
        password
      );
    });

    it('should not login when form not valid', () => {
      const email = 'test@email.com';

      component.loginForm.controls['userId'].setValue(email);
      component.submitForm();

      expect(authService.loginWithCredentials).not.toHaveBeenCalled();
    });

    it('should handle changing email to lowercase', () => {
      const email_uppercase = 'TEST@email.com';
      const email_lowercase = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email_uppercase);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      expect(authService.loginWithCredentials).toHaveBeenCalledWith(
        email_lowercase,
        password
      );
    });

    it('should remove error messages after successful login', (done) => {
      const email_lowercase = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email_lowercase);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      setTimeout(() => {
        expect(globalMessageService.remove).toHaveBeenCalledWith(
          GlobalMessageType.MSG_TYPE_ERROR
        );
        done();
      }, 0);
    });

    it('should not remove error messages after failed login', (done) => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));

      const email_lowercase = 'test@email.com';
      const password = 'secret';

      component.loginForm.controls['userId'].setValue(email_lowercase);
      component.loginForm.controls['password'].setValue(password);
      component.submitForm();

      setTimeout(() => {
        expect(globalMessageService.remove).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });
});
