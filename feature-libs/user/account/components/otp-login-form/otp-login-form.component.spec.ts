import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService, WindowRef } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { VerificationTokenService } from '@spartacus/user/account/core';
import {
  VerificationToken,
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { OneTimePasswordLoginFormComponent } from './otp-login-form.component';
import createSpy = jasmine.createSpy;

const verificationTokenCreation: VerificationTokenCreation = {
  purpose: 'LOGIN',
  loginId: 'test@email.com',
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

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
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
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    winRef = TestBed.inject(WindowRef);
    fixture = TestBed.createComponent(OneTimePasswordLoginFormComponent);
    service = TestBed.inject(VerificationTokenFacade);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('create OTP', () => {
    it('should not patch user id', () => {
      component.isUpdating$.subscribe().unsubscribe();
      expect(component.form.value.userId).toEqual('');
    });

    it('should patch user id', () => {
      spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
        history: { state: { newUid: verificationTokenCreation.loginId } },
      } as Window);
      component.isUpdating$.subscribe().unsubscribe();
      expect(component.form.value.userId).toEqual(
        verificationTokenCreation.loginId
      );
    });

    describe('success', () => {
      beforeEach(() => {
        component.form.setValue({
          userId: verificationTokenCreation.loginId,
          password: verificationTokenCreation.password,
        });
      });

      it('should request email', () => {
        component.onSubmit();
        expect(service.createVerificationToken).toHaveBeenCalledWith(
          verificationTokenCreation
        );
      });

      it('should reset the form', () => {
        spyOn(component.form, 'reset').and.stub();
        component.onSubmit();
        expect(component.form.reset).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        component.form.setValue({
          userId: 'invalid',
          password: '123',
        });
      });

      it('should not create OTP', () => {
        component.onSubmit();
        expect(service.createVerificationToken).not.toHaveBeenCalled();
      });

      it('should not reset the form', () => {
        spyOn(component.form, 'reset').and.stub();
        component.onSubmit();
        expect(component.form.reset).not.toHaveBeenCalled();
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
      // @ts-ignore
      component.busy$.next(true);
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
      // @ts-ignore
      component.isUpdating$.next(false);
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
      component.form.setValue({
        userId: verificationTokenCreation.loginId,
        password: verificationTokenCreation.password,
      });
      component.onSubmit();
      expect(service.createVerificationToken).toHaveBeenCalled();
    });
  });
});
