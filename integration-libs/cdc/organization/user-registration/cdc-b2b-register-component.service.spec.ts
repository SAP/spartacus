import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { UserRegistrationConnector } from '@spartacus/organization/user-registration/core';
import {
  OrganizationUserRegistration,
  UserRegistrationFacade,
} from '@spartacus/organization/user-registration/root';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { of, throwError } from 'rxjs';
import { CDCB2BRegisterComponentService } from './cdc-b2b-register-component.service';
import createSpy = jasmine.createSpy;

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

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

class MockUserRegistrationConnector
  implements Partial<UserRegistrationConnector>
{
  registerUser = createSpy().and.callFake((user: any) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.callFake(() => of(false)); //no failures
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.callFake(() => of(true));
  registerOrganisationWithoutScreenSet = createSpy().and.callFake(() =>
    of({ status: 'OK' })
  );
  onLoginEventHandler = createSpy();
}

describe('CdcRegisterComponentService', () => {
  let cdcOrgRegisterService: CDCB2BRegisterComponentService;
  let connector: UserRegistrationConnector;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  let eventService: EventService;
  let userAddressService: UserAddressService;
  let userRegisterFacade: UserRegisterFacade;
  let routingService: RoutingService;
  let orgRegistrationFormData: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
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
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserRegistrationConnector,
          useClass: MockUserRegistrationConnector,
        },
        { provide: CdcJsService, useClass: MockCDCJsService },
        { provide: EventService, useClass: MockEventService },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
        CDCB2BRegisterComponentService,
      ],
    });

    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcOrgRegisterService = TestBed.inject(CDCB2BRegisterComponentService);
    connector = TestBed.inject(UserRegistrationConnector);
    cdcJsService = TestBed.inject(CdcJsService);
    eventService = TestBed.inject(EventService);
    userAddressService = TestBed.inject(UserAddressService);
    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    routingService = TestBed.inject(RoutingService);
    orgRegistrationFormData = cdcOrgRegisterService.form;

    orgRegistrationFormData.get('firstName')?.setValue('firstName');
    orgRegistrationFormData.get('lastName')?.setValue('lastName');
    orgRegistrationFormData
      .get('email')
      ?.setValue('firstName.lastName@test.com');
    orgRegistrationFormData.get('companyName')?.setValue('New Company Inc.');
    orgRegistrationFormData.get('line1')?.setValue('Test St.');
    orgRegistrationFormData.get('line2')?.setValue('1/2');
    orgRegistrationFormData.get('postalCode')?.setValue('1234');
    orgRegistrationFormData.get('town')?.setValue('Town');
    orgRegistrationFormData
      .get('message')
      ?.setValue('Department: CX; Position: QE');
    orgRegistrationFormData.get('phoneNumber')?.setValue('9876543210');
    orgRegistrationFormData.get('country')?.setValue({
      isocode: 'US',
    });
    orgRegistrationFormData.get('region')?.setValue({
      isocode: 'US-AZ',
    });

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(cdcOrgRegisterService).toBeTruthy();
  });

  it('should get countries from `userAddressService`', () => {
    cdcOrgRegisterService.getCountries().subscribe().unsubscribe();
    expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
  });

  it('should get titles from `userRegisterFacade`', () => {
    cdcOrgRegisterService.getTitles().subscribe().unsubscribe();
    expect(userRegisterFacade.getTitles).toHaveBeenCalled();
  });

  describe('Register', () => {
    it('should be able to register organization through CDC', (done) => {
      cdcOrgRegisterService
        .registerUser(orgRegistrationFormData)
        .subscribe(() => {
          expect(connector.registerUser).not.toHaveBeenCalled();
          expect(
            cdcJsService.registerOrganisationWithoutScreenSet
          ).toHaveBeenCalledWith({
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'firstName.lastName@test.com',
            message: 'Department: CX; Position: QE',
            addressLine1: 'Test St.',
            addressLine2: '1/2',
            postalCode: '1234',
            town: 'Town',
            region: 'US-AZ',
            country: 'US',
            phoneNumber: '9876543210',
            companyName: 'New Company Inc.',
          });
        });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should NOT happen without CDC, should show error', (done) => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      cdcJsService.didLoad = createSpy().and.callFake(() => of(false));
      cdcOrgRegisterService.registerUser(orgRegistrationFormData).subscribe({
        error: () => {
          expect(
            cdcJsService.registerOrganisationWithoutScreenSet
          ).not.toHaveBeenCalled();
          expect(connector.registerUser).not.toHaveBeenCalled();
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          expect(
            cdcJsService.registerOrganisationWithoutScreenSet
          ).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should not do anything when CDC registration fails', (done) => {
      cdcJsService.registerOrganisationWithoutScreenSet =
        createSpy().and.returnValue(throwError('ERROR'));

      cdcOrgRegisterService.registerUser(orgRegistrationFormData).subscribe({
        error: () => {
          expect(connector.registerUser).not.toHaveBeenCalled();
          expect(
            cdcJsService.registerOrganisationWithoutScreenSet
          ).toHaveBeenCalledWith({
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'firstName.lastName@test.com',
            message: 'Department: CX; Position: QE',
            addressLine1: 'Test St.',
            addressLine2: '1/2',
            postalCode: '1234',
            town: 'Town',
            region: 'US-AZ',
            country: 'US',
            phoneNumber: '9876543210',
            companyName: 'New Company Inc.',
          });
        },
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should throw error when CDC user token fails', (done) => {
      eventService.get = createSpy().and.returnValue(of(true));

      cdcOrgRegisterService.registerUser(orgRegistrationFormData).subscribe({
        error: () => {
          expect(connector.registerUser).not.toHaveBeenCalled();
          expect(
            cdcJsService.registerOrganisationWithoutScreenSet
          ).toHaveBeenCalledWith({
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'firstName.lastName@test.com',
            message: 'Department: CX; Position: QE',
            addressLine1: 'Test St.',
            addressLine2: '1/2',
            postalCode: '1234',
            town: 'Town',
            region: 'US-AZ',
            country: 'US',
            phoneNumber: '9876543210',
            companyName: 'New Company Inc.',
          });
          done();
        },
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should redirect to login page', () => {
      spyOn(routingService, 'go').and.callThrough();
      cdcOrgRegisterService
        .registerUser(orgRegistrationFormData)
        .subscribe()
        .unsubscribe();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'login',
      });
    });
  });
});
