import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  GlobalMessageService,
  I18nTestingModule,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import createSpy = jasmine.createSpy;

class MockAuthService implements Partial<AuthService> {
  otpLoginWithCredentials = createSpy().and.returnValue(of({}));
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}

describe('VerificationTokenFormComponentService', () => {
  let service: VerificationTokenFormComponentService;
  let authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [],
        providers: [
          VerificationTokenFormComponentService,
          { provide: AuthService, useClass: MockAuthService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.inject(VerificationTokenFormComponentService);
    authService = TestBed.inject(AuthService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const tokenId = '<LGN[OZ8Ijx92S7pf3KcqtuUxOvM0l2XmZQX+4TUEzXcJyjI=]>';
    const tokenCode = 'XG5tyu';

    it('should not patch token id', () => {
      service.isUpdating$.subscribe().unsubscribe();
      expect(service.form.value.tokenId).toEqual('');
    });

    describe('success', () => {
      beforeEach(() => {
        service.form.setValue({
          tokenId,
          tokenCode,
        });
      });

      it('should request email', () => {
        service.login();
        expect(authService.otpLoginWithCredentials).toHaveBeenCalledWith(
          tokenId,
          tokenCode
        );
      });

      it('should reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.login();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        service.form.setValue({
          tokenCode: '',
          tokenId: '<LGN[OZ8Ijx92S7pf3KcqtuUxOvM0l2XmZQX+4TUEzXcJyjI=]>',
        });
      });

      it('should not login', () => {
        service.login();
        expect(authService.otpLoginWithCredentials).not.toHaveBeenCalled();
      });

      it('should not reset the form', () => {
        spyOn(service.form, 'reset').and.stub();
        service.login();
        expect(service.form.reset).not.toHaveBeenCalled();
      });
    });
  });
});
