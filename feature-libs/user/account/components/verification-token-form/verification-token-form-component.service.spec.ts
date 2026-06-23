import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthConfigService,
  AuthService,
  FeatureToggles,
  GlobalMessageService,
  I18nTestingModule,
  provideMockFeatureToggles,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { VerificationTokenFacade } from '../../root/facade';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import createSpy = jasmine.createSpy;

class MockAuthService implements Partial<AuthService> {
  otpLoginWithCredentials = createSpy().and.returnValue(of({}));
  isUserLoggedIn = createSpy().and.returnValue(of(true));
  getCsrfToken = createSpy().and.returnValue(
    of({
      headerName: 'CSFR',
      parameterName: '_csfr',
      token: 'token',
    })
  );
}

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: false,
};

class MockAuthConfigService implements Partial<AuthConfigService> {
  getCustomLoginFormEndpoint() {
    return 'https://localhost:9002/authorizationserver/login';
  }
}

function createForm(username: string, password: string, csrf: string) {
  const form = document.createElement('form');
  form.action = 'https://localhost:9002/authorizationserver/login';
  form.method = 'POST';

  const csrfInput = document.createElement('input');
  csrfInput.setAttribute('type', 'hidden');
  csrfInput.setAttribute('name', '_csrf');
  csrfInput.setAttribute('value', csrf);
  form.appendChild(csrfInput);

  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('name', 'username');
  usernameInput.setAttribute('value', username);
  form.appendChild(usernameInput);

  const pwInput = document.createElement('input');
  pwInput.setAttribute('type', 'password');
  pwInput.setAttribute('name', 'password');
  pwInput.setAttribute('value', password);
  form.appendChild(pwInput);

  return form;
}

class MockVerificationTokenFacade implements Partial<VerificationTokenFacade> {
  createVerificationToken = createSpy().and.returnValue(
    of({ tokenId: 'testTokenId', expiresIn: '300' })
  );
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
  remove = createSpy().and.stub();
}

describe('VerificationTokenFormComponentService', () => {
  let service: VerificationTokenFormComponentService;
  let authService: AuthService;
  let facade: VerificationTokenFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        VerificationTokenFormComponentService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: VerificationTokenFacade,
          useClass: MockVerificationTokenFacade,
        },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(VerificationTokenFormComponentService);
    authService = TestBed.inject(AuthService);
    facade = TestBed.inject(VerificationTokenFacade);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should sent otp', () => {
    const loginId = 'example@example.com';
    const password = 'pw4all';
    const purpose = 'LOGIN';

    service.createVerificationToken(loginId, password, purpose);
    expect(facade.createVerificationToken).toHaveBeenCalledWith({
      loginId,
      password,
      purpose,
    });
  });

  describe('legacy login', () => {
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

    describe('legacy error', () => {
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
  describe('new flow', () => {
    // Reset test module to reconfigure FeatureToggles
    beforeEach(waitForAsync(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          VerificationTokenFormComponentService,
          { provide: AuthService, useClass: MockAuthService },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          { provide: AuthConfigService, useClass: MockAuthConfigService },
          {
            provide: FeatureToggles,
            useValue: {
              authorizationCodeFlowByDefault: true,
            } as FeatureToggles,
          },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      service = TestBed.inject(VerificationTokenFormComponentService);
    });

    describe('login', () => {
      const tokenId = '<LGN[OZ8Ijx92S7pf3KcqtuUxOvM0l2XmZQX+4TUEzXcJyjI=]>';
      const tokenCode = 'XG5tyu';
      const csrf = 'token';

      it('should not patch token id', () => {
        service.isUpdating$.subscribe().unsubscribe();
        expect(service.form.value.tokenId).toEqual('');
      });

      describe('success', () => {
        beforeEach(() => {
          service.form.setValue({
            tokenId,
            tokenCode,
            csrf,
          });
        });

        it('should request email', () => {
          const form = createForm(tokenId, tokenCode, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).toHaveBeenCalledWith();
        });
      });

      describe('error', () => {
        beforeEach(() => {
          service.form.setValue({
            tokenCode: '',
            tokenId,
            csrf,
          });
        });

        it('should not login', () => {
          const form = createForm(tokenId, tokenCode, csrf);
          const submitSpy = spyOn(form, 'submit');
          service.login(form);
          expect(submitSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
