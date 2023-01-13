import { TestBed } from '@angular/core/testing';
import { CustomerListsPage } from '@spartacus/asm/root';
import { QueryService, QueryState } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmCustomerListService } from './asm-customer-list.service';

const mockCustomerListsPage: CustomerListsPage = {
  currentPage: 0,
  numberOfPages: 1,
  pageSize: 5,
  totalNumber: 1,
  userGroups: [{ uid: 'mock-usergroup-uid', name: 'User Group 1' }],
};

class MockAsmConnector implements Partial<AsmConnector> {
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

    service = TestBed.inject(AsmCustomerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomerLists()', () => {
    it('should emit response data from connector', () => {
      let actual: CustomerListsPage | undefined;
      const expected = mockCustomerListsPage;

      service.getCustomerLists().subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });

    it('should request customer lists only once for multiple subscribers', () => {
      service.getCustomerLists().subscribe();
      service.getCustomerLists().subscribe();

      expect(asmConnector.customerLists).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCustomerListsState()', () => {
    it('should emit a query state with the response data from connector', () => {
      let actual: QueryState<CustomerListsPage> | undefined;
      const expected: QueryState<CustomerListsPage> = {
        loading: false,
        data: mockCustomerListsPage,
        error: false,
      };
      service
        .getCustomerListsState()
        .subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });
  });
});
