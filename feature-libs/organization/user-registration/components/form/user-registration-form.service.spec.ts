import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  GlobalMessageService,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import {
  OrganizationUserRegistration,
  UserRegistrationFacade,
} from '@spartacus/organization/user-registration/root';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { UserRegistrationFormService } from './user-registration-form.service';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockUserAddressService implements Partial<UserAddressService> {
  getDeliveryCountries = createSpy().and.returnValue(of([]));
  getRegions = createSpy().and.returnValue(of([]));
  loadDeliveryCountries(): void {
    return;
  }
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = createSpy().and.returnValue(of([]));
}

class MockTranslationService implements Partial<TranslationService> {
  translate(value: string, options: any) {
    return of(value + Object.values(options));
  }
}

class MockUserRegistrationFacade implements Partial<UserRegistrationFacade> {
  registerUser(userData: OrganizationUserRegistration) {
    return of(userData);
  }
}

describe('UserRegistrationFormService', () => {
  let service: UserRegistrationFormService;
  let userAddressService: UserAddressService;
  let userRegisterFacade: UserRegisterFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserRegisterFacade,
          useClass: MockUserRegisterFacade,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: UserRegistrationFacade,
          useClass: MockUserRegistrationFacade,
        },
      ],
    });
    service = TestBed.inject(UserRegistrationFormService);
    userAddressService = TestBed.inject(UserAddressService);
    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    routingService = TestBed.inject(RoutingService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build form structure', () => {
    const form = service.form;

    expect(form.get('titleCode')?.value).toEqual(null);
    expect(form.get('firstName')?.value).toEqual('');
    expect(form.get('lastName')?.value).toEqual('');
    expect(form.get('companyName')?.value).toEqual('');
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('country')?.value).toEqual(Object({ isocode: null }));
    expect(form.get('line1')?.value).toEqual('');
    expect(form.get('line2')?.value).toEqual('');
    expect(form.get('town')?.value).toEqual('');
    expect(form.get('region')?.value).toEqual(Object({ isocode: null }));
    expect(form.get('postalCode')?.value).toEqual('');
    expect(form.get('phoneNumber')?.value).toEqual('');
    expect(form.get('message')?.value).toEqual('');
  });

  it('should get the form', () => {
    expect(service.form).toBeInstanceOf(FormGroup);
  });

  it('should `countryControl` return country control object', () => {
    expect(service.countryControl).toBeInstanceOf(FormControl);
  });

  it('should `regionControl` return region control object', () => {
    expect(service.regionControl).toBeInstanceOf(FormControl);
  });

  it('should get titles from `userRegisterFacade`', () => {
    service.getTitles().subscribe().unsubscribe();
    expect(userRegisterFacade.getTitles).toHaveBeenCalled();
  });

  it('should get countries from `userAddressService`', () => {
    service.getCountries().subscribe().unsubscribe();
    expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
  });

  it('should build message content based on form values passed into translation', () => {
    const form = service.form;

    form.get('country')?.setValue({
      isocode: 'US',
    });
    form.get('region')?.setValue({
      isocode: 'US-AZ',
    });
    form.get('line1')?.setValue('Test St.');
    form.get('line2')?.setValue('1/2');
    form.get('postalCode')?.setValue(1234);
    form.get('message')?.setValue('Message!');
    form.get('phoneNumber')?.setValue('+00000000000');

    service['buildMessageContent'](form).subscribe((data) =>
      expect(data).toEqual(
        `userRegistrationForm.messageToApproverTemplate+00000000000,Test St.,1/2,,US-AZ,1234,US,,Message!`
      )
    );
  });

  it('should build message content with company name on form values passed into translation', () => {
    const form = service.form;

    form.get('country')?.setValue({
      isocode: 'US',
    });
    form.get('region')?.setValue({
      isocode: 'US-AZ',
    });
    form.get('companyName')?.setValue('New Company Inc.');
    form.get('line1')?.setValue('Test St.');
    form.get('line2')?.setValue('1/2');
    form.get('postalCode')?.setValue(1234);
    form.get('message')?.setValue('Message!');
    form.get('phoneNumber')?.setValue('+00000000000');

    service['buildMessageContent'](form).subscribe((data) =>
      expect(data).toEqual(
        `userRegistrationForm.messageToApproverTemplate+00000000000,Test St.,1/2,,US-AZ,1234,US,New Company Inc.,Message!`
      )
    );
  });

  it('should redirect to login page', () => {
    spyOn(routingService, 'go').and.callThrough();

    service.registerUser(service.form).subscribe().unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'login',
    });
  });
});
