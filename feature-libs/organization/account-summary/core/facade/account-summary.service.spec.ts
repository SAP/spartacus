import { inject, TestBed } from '@angular/core/testing';
import {
  OCC_USER_ID_CURRENT,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountSummaryConnector } from '../connectors';
import { AccountSummaryService } from './account-summary.service';
import createSpy = jasmine.createSpy;

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'orgAccountSummary',
    params: { orgUnit: 'Custom Retail' },
  },
} as unknown as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    routerStateSubject.asObservable()
  );
}

class MockUserIdService implements Partial<UserIdService> {
  public takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const accountSummaryResult: AccountSummaryDetails = {
  accountManagerEmail: '',
  accountManagerName: '',
  amountBalance: {},
  orgUnit: {
    uid: '1234',
    name: 'Custom Retail',
  },
  billingAddress: {
    country: {
      isocode: 'US',
      name: 'United States',
    },
    id: '8796098986007',
    lastName: 'Torres',
  },
};

const accountSummaryDocumentsResult: AccountSummaryList = {
  orgDocumentTypes: [
    {
      code: 'Purchase Order',
      displayInAllList: true,
      includeInOpenBalance: true,
      name: 'Purchase Order',
    },
  ],
  orgDocuments: [
    {
      amount: 7851558,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      createdAtDate: '2014-06-10',
      id: 'POCR-0000001',
      orgDocumentType: { code: 'Purchase Order', name: 'Purchase Order' },
      openAmount: 7851558,
      status: DocumentStatus.OPEN,
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 10,
    sort: 'byDocumentDateAsc',
    totalPages: 6,
    totalResults: 55,
  },
  sorts: [
    {
      code: 'byCreatedAtDateAsc',
      selected: true,
    },
  ],
};

const accountSummaryDocumentBlob = new Blob([], { type: 'application/pdf' });

class MockAccountSummaryConnector implements Partial<AccountSummaryConnector> {
  getAccountSummary = createSpy(
    'MockAccountSummaryConnector.getAccountSummary Spy'
  ).and.returnValue(of(accountSummaryResult));

  getDocumentList = createSpy(
    'MockAccountSummaryConnector.getDocumentList Spy'
  ).and.returnValue(of(accountSummaryDocumentsResult));

  getDocumentAttachment = createSpy(
    'MockAccountSummaryConnector.getDocumentAttachment Spy'
  ).and.returnValue(of(new Blob([], { type: 'application/pdf' })));
}

describe('AccountSummaryService', () => {
  let service: AccountSummaryService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: AccountSummaryConnector,
          useClass: MockAccountSummaryConnector,
        },
      ],
    });
    service = TestBed.inject(AccountSummaryService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should AccountSummaryService is injected', inject(
    [AccountSummaryService],
    (accountSummaryService: AccountSummaryService) => {
      expect(accountSummaryService).toBeTruthy();
    }
  ));

  it('should be able to load account summary details', () => {
    service.getAccountSummary().subscribe((res) => {
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(res).toEqual(accountSummaryResult);
    });
  });

  it('should be able to load account summary document list', () => {
    let queryParams: DocumentQueryParams = {
      status: DocumentStatus.ALL,
      filterByKey: FilterByOptions.DOCUMENT_NUMBER,
      page: 0,
      pageSize: 10,
      sort: 'byDocumentDateAsc',
    };

    service.getDocumentList(queryParams).subscribe((res) => {
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(res).toEqual(accountSummaryDocumentsResult);
    });
  });

  it('should be able to get account summary document file', () => {
    const documentId = 'testDocId';
    const attachmentId = 'testAttachmentId';

    service.getDocumentAttachment(documentId, attachmentId).subscribe((res) => {
      expect(res).toEqual(accountSummaryDocumentBlob);
    });
  });
});
