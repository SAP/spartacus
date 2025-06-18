import { TestBed } from '@angular/core/testing';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  AuthConfigService,
  GlobalMessageService,
  OAuthFlow,
  RoutingService,
  TranslationService,
  GlobalMessageType,
} from '@spartacus/core';
import {
  OrganizationUserRegistration,
  UserRegistrationFacade,
} from '@spartacus/organization/user-registration/root';
import { of } from 'rxjs';
import { RegisterVerificationTokenFormComponentService } from './verification-token-form-component.service';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockOrganizationUserRegistrationFacade
  implements Partial<UserRegistrationFacade>
{
  registerUser(userData: OrganizationUserRegistration) {
    return of(userData);
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockTranslationService implements Partial<TranslationService> {
  translate(value: string, options: any) {
    return of(value + Object.values(options));
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}

describe('RegisterVerificationTokenFormComponentService', () => {
  let service: RegisterVerificationTokenFormComponentService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let userRegistrationFacade: UserRegistrationFacade;
  let translationService: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: AuthConfigService,
          useClass: MockAuthConfigService,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: UserRegistrationFacade,
          useClass: MockOrganizationUserRegistrationFacade,
        },
      ],
    });
    service = TestBed.inject(RegisterVerificationTokenFormComponentService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    userRegistrationFacade = TestBed.inject(UserRegistrationFacade);
    translationService = TestBed.inject(TranslationService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should get the form', () => {
    expect(service.form).toBeInstanceOf(UntypedFormGroup);
  });

  it('should redirect to login page', () => {
    spyOn(routingService, 'go').and.callThrough();

    service.registerUser(service.form.value).subscribe().unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'login',
    });
  });

  it('should display a success message after registration', () => {
    spyOn(globalMessageService, 'add');

    service.registerUser(service.form.value).subscribe().unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'userRegistrationForm.successFormSubmitMessage',
        params: {},
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      10000
    );
  });

  it('should call buildMessageContent and translate correctly', () => {
    spyOn(translationService, 'translate').and.callThrough();

    const formValue = {
      phoneNumber: '123456789',
      line1: 'Address Line 1',
      line2: 'Address Line 2',
      city: 'City',
      region: { isocode: 'RegionCode' },
      postalCode: '12345',
      country: { isocode: 'CountryCode' },
      companyName: 'Company',
      message: 'Message content',
    };

    const formValueAfterBind = {
      phoneNumber: '123456789',
      addressLine: 'Address Line 1',
      secondAddressLine: 'Address Line 2',
      city: 'City',
      state: 'RegionCode',
      postalCode: '12345',
      country: 'CountryCode',
      companyName: 'Company',
      message: 'Message content',
    };

    service['buildMessageContent'](formValue).subscribe((result) => {
      expect(translationService.translate).toHaveBeenCalledWith(
        'userRegistrationForm.messageToApproverTemplate',
        formValueAfterBind
      );
      expect(result).toContain('123456789');
    });
  });

  it('should call registerUser with correct data', () => {
    spyOn(userRegistrationFacade, 'registerUser').and.callThrough();

    service.form.setValue({
      tokenId: 'testTokenId',
      tokenCode: 'testTokenCode',
    });

    const formValue = {
      titleCode: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123456789',
      addressLine: 'Address Line 1',
      secondAddressLine: 'Address Line 2',
      city: 'City',
      region: { isocode: 'RegionCode' },
      postalCode: '12345',
      country: { isocode: 'CountryCode' },
      companyName: 'Company',
      message: 'Message content',
    };

    service.registerUser(formValue).subscribe();

    expect(userRegistrationFacade.registerUser).toHaveBeenCalled();
  });
});
