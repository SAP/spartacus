import { TestBed } from '@angular/core/testing';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { of } from 'rxjs';
import { UserRegistrationAdapter } from './user-registration.adapter';
import { UserRegistrationConnector } from './user-registration.connector';

import createSpy = jasmine.createSpy;

const userData: OrganizationUserRegistration = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Smith',
  email: 'email@domain.com',
  message: 'Please register my account',
};

class MockUserRegistrationAdapter implements UserRegistrationAdapter {
  registerUser = createSpy(
    'UserRegistrationAdapter.registerUser'
  ).and.returnValue(of(userData));
}

describe('UserRegistrationConnector', () => {
  let service: UserRegistrationConnector;
  let adapter: UserRegistrationAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRegistrationConnector,
        {
          provide: UserRegistrationAdapter,
          useClass: MockUserRegistrationAdapter,
        },
      ],
    });

    service = TestBed.inject(UserRegistrationConnector);
    adapter = TestBed.inject(UserRegistrationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register organization user', () => {
    service.registerUser(userData);
    expect(adapter.registerUser).toHaveBeenCalledWith(userData);
  });
});
