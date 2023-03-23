import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { UserRegistrationConnector } from '../connectors';
import { UserRegistrationService } from './user-registration.service';

import createSpy = jasmine.createSpy;

const mockOrganizationUser: OrganizationUserRegistration = {
  titleCode: 'Mr.',
  firstName: 'John',
  lastName: 'Smith',
  email: 'email@example.com',
  message: 'Please register my account',
};

class MockUserRegistrationConnector
  implements Partial<UserRegistrationConnector>
{
  registerUser = createSpy().and.callFake(
    (mockOrganizationUser: OrganizationUserRegistration) =>
      of(mockOrganizationUser)
  );
}

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let connector: UserRegistrationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserRegistrationConnector,
          useClass: MockUserRegistrationConnector,
        },
        UserRegistrationService,
      ],
    });

    service = TestBed.inject(UserRegistrationService);
    connector = TestBed.inject(UserRegistrationConnector);
  });

  it('should inject UserRegistrationService', inject(
    [UserRegistrationService],
    (userRegistrationService: UserRegistrationService) => {
      expect(userRegistrationService).toBeTruthy();
    }
  ));

  it('should be able to register user', () => {
    service.registerUser(mockOrganizationUser);
    expect(connector.registerUser).toHaveBeenCalledWith(mockOrganizationUser);
  });
});
