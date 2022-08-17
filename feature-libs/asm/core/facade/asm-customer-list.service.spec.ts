import { TestBed } from '@angular/core/testing';
import { CustomerListsPage } from '@spartacus/asm/root';
import { QueryService, QueryState, User } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { CustomerSearchPage } from '../models/asm.models';
import { AsmCustomerListService } from './asm-customer-list.service';

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'user@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
};

const mockCustomerListsPage: CustomerListsPage = {
  currentPage: 0,
  numberOfPages: 1,
  pageSize: 5,
  totalNumber: 1,
  userGroups: [{ uid: 'mock-usergroup-uid', name: 'User Group 1' }],
};

class MockAsmConnector implements Partial<AsmConnector> {
  customerSearch(): Observable<CustomerSearchPage> {
    return of(mockCustomerSearchPage);
  }

  customerLists(): Observable<CustomerListsPage> {
    return of(mockCustomerListsPage);
  }
}

describe('AsmCustomerListService', () => {
  let service: AsmCustomerListService;
  let asmConnector: AsmConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsmCustomerListService,
        QueryService,
        { provide: AsmConnector, useClass: MockAsmConnector },
      ],
    });

    asmConnector = TestBed.inject(AsmConnector);
    spyOn(asmConnector, 'customerLists').and.callThrough();
    spyOn(asmConnector, 'customerSearch').and.callThrough();

    service = TestBed.inject(AsmCustomerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomerLists()', () => {
    it('should emit response data from connector', () => {
      let actual: QueryState<CustomerListsPage> | undefined;
      const expected: QueryState<CustomerListsPage> = {
        loading: false,
        data: mockCustomerListsPage,
        error: false,
      };
      service.getCustomerLists().subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });

    it('should request customer lists only once for multiple subscribers', () => {
      service.getCustomerLists().subscribe();
      service.getCustomerLists().subscribe();

      expect(asmConnector.customerLists).toHaveBeenCalledTimes(1);
    });
  });
});
