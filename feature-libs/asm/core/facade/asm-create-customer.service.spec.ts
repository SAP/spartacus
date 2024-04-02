import { TestBed } from '@angular/core/testing';
import { CustomerRegistrationForm } from '@spartacus/asm/root';
import { CommandService, User } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmCreateCustomerService } from './asm-create-customer.service';

const customerRegistrationForm: CustomerRegistrationForm = {
  firstName: 'John',
  lastName: 'Smith',
  emailAddress: 'john.smith@test.com',
};

const user: User = {
  firstName: 'John',
  lastName: 'Smith',
  uid: 'john.smith@test.com',
};

class MockAsmConnector implements Partial<AsmConnector> {
  createCustomer(_user: CustomerRegistrationForm): Observable<User> {
    return of(user);
  }
}

describe('AsmCreateCustomerService', () => {
  let service: AsmCreateCustomerService;
  let asmConnector: AsmConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsmCreateCustomerService,
        CommandService,
        { provide: AsmConnector, useClass: MockAsmConnector },
      ],
    });

    asmConnector = TestBed.inject(AsmConnector);

    spyOn(asmConnector, 'createCustomer').and.callThrough();

    service = TestBed.inject(AsmCreateCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createCustomer()', () => {
    it('should emit a query state with the response data from connector', () => {
      let actual: User | undefined;
      const expected: User = {
        firstName: 'John',
        lastName: 'Smith',
        uid: 'john.smith@test.com',
      };
      service
        .createCustomer(customerRegistrationForm)
        .subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });
  });
});
