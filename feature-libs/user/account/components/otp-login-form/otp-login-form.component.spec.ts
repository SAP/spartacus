import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { VerificationTokenService } from '@spartacus/user/account/core';
import {
  LoginForm,
  VerificationToken,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { BehaviorSubject, of } from 'rxjs';
import { OneTimePasswordLoginFormComponent } from './otp-login-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);

const formGroup: UntypedFormGroup = new UntypedFormGroup({
  userId: new UntypedFormControl(),
  password: new UntypedFormControl(),
});
const isUpdating$ = isBusySubject;

const form: LoginForm = {
  purpose: 'LOGIN',
  loginId: 'mockEmail',
  password: '1234',
};

const verificationToken: VerificationToken = {
  expiresIn: '300',
  tokenId: 'mockTokenId',
};

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}

class MockVerificationTokenService
  implements Partial<VerificationTokenService>
{
  createVerificationToken = createSpy().and.callFake(() =>
    of(verificationToken)
  );
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('OneTimePasswordLoginFormComponent', () => {
  let component: OneTimePasswordLoginFormComponent;
  let fixture: ComponentFixture<OneTimePasswordLoginFormComponent>;
  let el: DebugElement;
  let service: VerificationTokenFacade;
  let winRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
          SpinnerModule,
        ],
        declarations: [OneTimePasswordLoginFormComponent, MockUrlPipe],
        providers: [
          {
            provide: VerificationTokenFacade,
            useClass: MockVerificationTokenService,
          },
          { provide: WindowRef, useClass: MockWinRef },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    winRef = TestBed.inject(WindowRef);
    fixture = TestBed.createComponent(OneTimePasswordLoginFormComponent);
    service = TestBed.inject(VerificationTokenService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    const userId = 'test@email.com';
    const password = 'secret';

    it('should not patch user id', () => {
      isUpdating$.subscribe().unsubscribe();
      expect(form.value.userId).toEqual('');
    });

    it('should patch user id', () => {
      spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
        history: { state: { newUid: 'test.user@shop.com' } },
      } as Window);
      isUpdating$.subscribe().unsubscribe();
      expect(formGroup.value.userId).toEqual('test.user@shop.com');
    });

    describe('success', () => {
      it('should request email', () => {
        component.onSubmit();
        expect(service.createVerificationToken).toHaveBeenCalledWith(
          userId,
          password
        );
      });

      it('should reset the form', () => {
        spyOn(formGroup, 'reset').and.stub();
        service.createVerificationToken(form);
        expect(formGroup.reset).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        formGroup.setValue({
          userId: 'invalid',
          password: '123',
        });
      });

      it('should not login', () => {
        component.onSubmit();
        expect(service.createVerificationToken).not.toHaveBeenCalled();
      });

      it('should not reset the form', () => {
        spyOn(formGroup, 'reset').and.stub();
        component.onSubmit();
        expect(formGroup.reset).not.toHaveBeenCalled();
      });
    });
  });

  describe('busy', () => {
    it('should disable the submit button when form is disabled', () => {
      component.form.disable();
      fixture.detectChanges();
      const submitBtn: HTMLButtonElement = el.query(
        By.css('button')
      ).nativeElement;
      expect(submitBtn.disabled).toBeTruthy();
    });

    it('should show the spinner', () => {
      isBusySubject.next(true);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    });
  });

  describe('idle', () => {
    it('should enable the submit button', () => {
      component.form.enable();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should not show the spinner', () => {
      isBusySubject.next(false);
      fixture.detectChanges();
      expect(el.query(By.css('cx-spinner'))).toBeNull();
    });
  });

  describe('Form Interactions', () => {
    it('should call onSubmit() method on submit', () => {
      const request = spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should call the service method on submit', () => {
      component.onSubmit();
      expect(service.createVerificationToken).toHaveBeenCalled();
    });
  });
});
