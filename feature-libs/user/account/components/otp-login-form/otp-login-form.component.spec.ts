import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  I18nTestingModule,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import {
  VerificationTokenCreation,
  VerificationTokenFacade,
} from '@spartacus/user/account/root';
import { of, throwError } from 'rxjs';
import { OneTimePasswordLoginFormComponent } from './otp-login-form.component';
import createSpy = jasmine.createSpy;

const verificationTokenCreation: VerificationTokenCreation = {
  purpose: 'LOGIN',
  loginId: 'test@email.com',
  password: '1234',
};

class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}

class MockRoutingService {
  go = createSpy();
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('OneTimePasswordLoginFormComponent', () => {
  let component: OneTimePasswordLoginFormComponent;
  let fixture: ComponentFixture<OneTimePasswordLoginFormComponent>;
  let el: DebugElement;
  let service: VerificationTokenFacade;
  let winRef: WindowRef;
  let mockRoutingService: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        SpinnerModule,
        OneTimePasswordLoginFormComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: WindowRef, useClass: MockWinRef },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    })
      .overrideComponent(OneTimePasswordLoginFormComponent, {
        remove: {
          imports: [UrlPipe, TranslatePipe],
        },
        add: {
          imports: [MockUrlPipe, MockTranslatePipe],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    winRef = TestBed.inject(WindowRef);
    fixture = TestBed.createComponent(OneTimePasswordLoginFormComponent);
    service = TestBed.inject(VerificationTokenFacade);
    mockRoutingService = TestBed.inject(RoutingService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should restore form values from history state', () => {
      const replaceStateSpy = jasmine.createSpy('replaceState');
      spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
        history: {
          state: { loginId: 'test@email.com', password: '1234' },
          replaceState: replaceStateSpy,
        },
      } as unknown as Window);
      component.ngOnInit();
      expect(component.form.value.userId).toEqual('test@email.com');
      expect(component.form.value.password).toEqual('1234');
      expect(replaceStateSpy).toHaveBeenCalled();
    });

    it('should not patch form when history state has no credentials', () => {
      spyOnProperty(winRef, 'nativeWindow', 'get').and.returnValue({
        history: { state: {} },
      } as unknown as Window);
      component.ngOnInit();
      expect(component.form.value.userId).toEqual('');
      expect(component.form.value.password).toEqual('');
    });
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
        spyOn(service, 'createVerificationToken').and.returnValue(
          of({
            expiresIn: '300',
            tokenId: 'mockTokenId',
          })
        );
        component.onSubmit();
        expect(service.createVerificationToken).toHaveBeenCalledWith(
          verificationTokenCreation
        );
      });

      it('should reset the form', () => {
        spyOn(service, 'createVerificationToken').and.returnValue(
          of({
            expiresIn: '300',
            tokenId: 'mockTokenId',
          })
        );
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
        spyOn(service, 'createVerificationToken').and.returnValue(
          of({
            expiresIn: '300',
            tokenId: 'mockTokenId',
          })
        );
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
      spyOn(service, 'createVerificationToken').and.returnValue(
        of({
          expiresIn: '300',
          tokenId: 'mockTokenId',
        })
      );
      component.form.setValue({
        userId: verificationTokenCreation.loginId,
        password: verificationTokenCreation.password,
      });
      component.onSubmit();
      expect(service.createVerificationToken).toHaveBeenCalled();
    });
  });

  describe('Up To Rate Limit For Login', () => {
    beforeEach(() => {
      component.form.setValue({
        userId: verificationTokenCreation.loginId,
        password: verificationTokenCreation.password,
      });
    });

    it('should redirect to next register page when create login verification token up to rate limit', () => {
      const httpErrorResponse = new HttpErrorResponse({
        status: 400,
        url: 'https://localhost:9002/occ/v2/electronics-spa/users/anonymous/verificationToken?lang=en&curr=USD',
      });
      spyOn(service, 'createVerificationToken').and.returnValue(
        throwError(() => httpErrorResponse)
      );
      component.onSubmit();
      expect(mockRoutingService.go).toHaveBeenCalled();
    });
  });
});
