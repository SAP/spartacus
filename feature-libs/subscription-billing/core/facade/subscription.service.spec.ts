import { inject, TestBed } from '@angular/core/testing';
import { SubscriptionService } from './subscription.service';
import {
  UserIdService,
  RoutingService,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { SubscriptionConnector } from '../connector';
import { firstValueFrom, of, take } from 'rxjs';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { vi } from 'vitest';
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
  getUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = vi.fn().mockReturnValue(of(mockRouteState));
}
class MockSubscriptionConnector implements Partial<SubscriptionConnector> {
  getSubscriptionByCode = vi.fn().mockReturnValue(of(mockDetail));
  getSubscriptionList = vi.fn().mockReturnValue(of(mockList));
}
describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let connector: SubscriptionConnector;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: SubscriptionConnector,
          useClass: MockSubscriptionConnector,
        },
      ],
    });
    service = TestBed.inject(SubscriptionService);
    connector = TestBed.inject(SubscriptionConnector);
  });
  it('should inject SubscriptionService', inject(
    [SubscriptionService],
    (service: SubscriptionService) => {
      expect(service).toBeTruthy();
    }
  ));
  describe('getSubscriptionList', () => {
    const mockCurrentPage = 1;
    const mockPageSize = 5;
    const mockSort = 'byId';

    it('should call connector.getSubscriptionList', async () => {
      const data = await firstValueFrom(
        service.getSubscriptionList(mockCurrentPage, mockPageSize, mockSort)
      );
      expect(connector.getSubscriptionList).toHaveBeenCalledWith(
        mockUserId,
        mockCurrentPage,
        mockPageSize,
        mockSort
      );
      expect(data).toEqual(mockList);
    });

    it('should contain the query state', async () => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byId';

      const state = await firstValueFrom(
        service.getSubscriptionListState(
          mockCurrentPage,
          mockPageSize,
          mockSort
        )
      );
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
    });
  });
  describe('getSubscriptionByCode', () => {
    it('should call connector.getSubscriptionByCode', async () => {
      const data = await firstValueFrom(service.getSubscriptionByCode());
      expect(connector.getSubscriptionByCode).toHaveBeenCalledWith(
        mockUserId,
        '01'
      );
      expect(data).toEqual(mockDetail);
    });

    it('should contain the query state', async () => {
      const state = await firstValueFrom(service.getSubscriptionByCodeState());
      expect(connector.getSubscriptionByCode).toHaveBeenCalledWith(
        mockUserId,
        '01'
      );
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockDetail,
      });
    });
  });
});
