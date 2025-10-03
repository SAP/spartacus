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
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
const mockUserId = OCC_USER_ID_CURRENT;
const mockRouteState = {
  state: {
    url: 'powertools-spa/en/USD/my-account/subscription/01',
    queryParams: {},
    params: {},
    context: {
      id: '/my-account/subscription/01',
      type: 'ContentPage',
    },
    cmsRequired: true,
  },
  navigationId: 6,
};
const mockDetail: SubscriptionDetail = {
  id: '01',
  documentNumber: '2081',
  name: 'Mobile 2020 Plan',
  orderCode: '0005210258',
  productCode: 'Mobile_2020_Plan_cpq',
  status: 'Active',
};
const mockList: SubscriptionList = {
  pagination: {
    currentPage: 0,
    pageSize: 2,
    sort: 'byDocumentNumberDesc',
    totalPages: 233,
    totalResults: 1162,
  },
  results: [
    {
      documentNumber: '2081',
      id: '019985A4-8221-4596-82AF-7C4A9728119E',
      name: 'Mobile 2020 Plan',
      orderCode: '0005210258',
      productCode: 'Mobile_2020_Plan_cpq',
      status: 'Active',
    },
    {
      documentNumber: '2080',
      id: '0199806E-395A-4B04-8B9C-27C5B5E2FB8E',
      name: 'Mobile 2020 Plan',
      orderCode: '0005212095',
      productCode: 'Mobile_2020_Plan_cpq',
      status: 'Active',
    },
  ],
  sorts: [
    {
      code: 'byDocumentNumberDesc',
      name: 'Document Number (desc)',
      selected: true,
    },
    {
      code: 'byDocumentNumberAsc',
      name: 'Document Number (asc)',
      selected: false,
    },
    { code: 'byDateDesc', name: 'Date (desc)', selected: false },
    { code: 'byDateAsc', name: 'Date (asc)', selected: false },
  ],
};
class MockUserIdService implements Partial<UserIdService> {
  getUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(of(mockRouteState));
}
class MockSubscriptionBillingConnector
  implements Partial<SubscriptionBillingConnector>
{
  getSubscriptionByCode = createSpy().and.returnValue(of(mockDetail));
  getSubscriptionList = createSpy().and.returnValue(of(mockList));
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
          useClass: MockSubscriptionBillingConnector,
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
  describe('getSubscriptionList', () => {
    const mockCurrentPage = 1;
    const mockPageSize = 5;
    const mockSort = 'byId';

    it('should call connector.getSubscriptionList', (done) => {
      service
        .getSubscriptionList(mockCurrentPage, mockPageSize, mockSort)
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getSubscriptionList).toHaveBeenCalledWith(
            mockUserId,
            mockCurrentPage,
            mockPageSize,
            mockSort
          );
          expect(data).toEqual(mockList);
          done();
        });
    });

    it('should contain the query state', (done) => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byId';

      service
        .getSubscriptionListState(mockCurrentPage, mockPageSize, mockSort)
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getSubscriptionList).toHaveBeenCalledWith(
            mockUserId,
            mockCurrentPage,
            mockPageSize,
            mockSort
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
  describe('getSubscriptionByCode', () => {
    it('should call connector.getSubscriptionByCode', (done) => {
      service
        .getSubscriptionByCode()
        .pipe(take(1))
        .subscribe((data) => {
          expect(connector.getSubscriptionByCode).toHaveBeenCalledWith(
            mockUserId,
            '01'
          );
          expect(data).toEqual(mockDetail);
          done();
        });
    });

    it('should contain the query state', (done) => {
      service
        .getSubscriptionByCodeState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getSubscriptionByCode).toHaveBeenCalledWith(
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
