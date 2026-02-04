import { inject, TestBed } from '@angular/core/testing';
import { SubscriptionBillingService } from './subscription-billing.service';
import {
  UserIdService,
  RoutingService,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { SubscriptionBillingConnector } from '../connector';
import createSpy = jasmine.createSpy;
import { of, take } from 'rxjs';
import {
  SubscriptionBill,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
const mockUserId = OCC_USER_ID_CURRENT;
const mockRouteState = {
  state: {
    url: 'powertools-spa/en/USD/my-account/subscription-bill/01',
    queryParams: {},
    params: {},
    context: {
      id: '/my-account/subscription-bill/01',
      type: 'ContentPage',
    },
    cmsRequired: true,
  },
  navigationId: 6,
};
const mockDetail: SubscriptionBill = {
  billAt: '2026-04-11T00:00:00+0000',
  documentNumber: '5776',
  id: '01',
  items: [
    {
      netAmount: 'USD0.00',
      productCode: 'SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq',
      productName: 'SAPCPQ_EDITRATIO_FORMAT_TIERS',
      subscriptionDocumentNumber: '807',
      subscriptionId: '86B01278-B670-4812-B69C-55E41439D59E',
      usageCharges: [
        {
          netAmount: 'USD185.00',
          typeName: 'Charge',
        },
      ],
    },
  ],
  netAmount: 'USD0.00',
  numberOfSubscriptions: 1,
  periodEndAt: '2026-04-09T00:00:00+0000',
  periodStartAt: '2026-01-09T00:00:00+0000',
};
const mockList: SubscriptionBillsList = {
  pagination: {
    currentPage: 0,
    pageSize: 1,
    sort: 'byBillingDateDesc',
    totalPages: 410,
    totalResults: 2047,
  },
  results: [
    mockDetail
  ],
  sorts: [
    {
      code: 'byDocumentNumberDesc',
      name: 'Bill ID (desc)',
      selected: false,
    },
    {
      code: 'byDocumentNumberAsc',
      name: 'Bill ID (asc)',
      selected: false,
    },
    {
      code: 'byBillingDateDesc',
      name: 'Bill Date (desc)',
      selected: true,
    },
    {
      code: 'byBillingDateAsc',
      name: 'Bill Date (asc)',
      selected: false,
    },
  ],
};
class MockUserIdService implements Partial<UserIdService> {
  getUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(of(mockRouteState));
}
class MockSubscriptionConnector implements Partial<SubscriptionBillingConnector> {
  getSubscriptionBillByCode = createSpy().and.returnValue(of(mockDetail));
  getSubscriptionBillsList = createSpy().and.returnValue(of(mockList));
}
describe('SubscriptionBillingService', () => {
  let service: SubscriptionBillingService;
  let connector: SubscriptionBillingConnector;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: SubscriptionBillingConnector,
          useClass: MockSubscriptionConnector,
        },
      ],
    });
    service = TestBed.inject(SubscriptionBillingService);
    connector = TestBed.inject(SubscriptionBillingConnector);
  });
  it('should inject SubscriptionBillingService', inject(
    [SubscriptionBillingService],
    (service: SubscriptionBillingService) => {
      expect(service).toBeTruthy();
    }
  ));
  describe('getSubscriptionBillsList', () => {
    const mockCurrentPage = 1;
    const mockPageSize = 5;
    const mockSort = 'byBillingDateDesc';

    it('should call connector.getSubscriptionBillsList', (done) => {
      service
        .getSubscriptionBillsList(mockPageSize, mockCurrentPage, mockSort)
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getSubscriptionBillsList).toHaveBeenCalledWith(
            mockUserId,
            mockPageSize,
            mockCurrentPage,
            mockSort,
			undefined
          );
          expect(data).toEqual(mockList);
          done();
        });
    });

    it('should contain the query state', (done) => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byBillingDateDesc';

      service
        .getSubscriptionBillsListState(
		  mockCurrentPage,
          mockPageSize,
          mockSort,
          undefined
		  )
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getSubscriptionBillsList).toHaveBeenCalledWith(
            mockUserId,
            mockCurrentPage,
            mockPageSize,
            mockSort,
            undefined
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockList,
          });
          done();
        });
    });
  });
  describe('getSubscriptionBillByCode', () => {
    it('should call connector.getSubscriptionBillByCode', (done) => {
      service
        .getSubscriptionBillByCode()
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getSubscriptionBillByCode).toHaveBeenCalledWith(
            mockUserId,
            '01'
          );
          expect(data).toEqual(mockDetail);
          done();
        });
    });

    it('should contain the query state', (done) => {
      service
        .getSubscriptionBillByCodeState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getSubscriptionBillByCode).toHaveBeenCalledWith(
            mockUserId,
            '01'
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockDetail,
          });
          done();
        });
    });
  });
});
