import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig, OccEndpoints } from '@spartacus/core';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { firstValueFrom, take } from 'rxjs';
import { OccSubscriptionAdapter } from './occ-subscription.adapter';
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
  ],
};
const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        subscriptionList: 'users/${userId}/subscriptions',
        subscriptionByCode: 'users/${userId}/subscriptions/${subscriptionCode}',
      } as OccEndpoints,
    },
  },
};

const mockCustomerId = 'current';
const mockSubscriptionId = '1';

describe('OccSubscriptionAdapter', () => {
  let service: OccSubscriptionAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccSubscriptionAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccSubscriptionAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSubscriptionByCode', () => {
    it('should get subscription details for the given subscription id', async () => {
      const resultPromise = firstValueFrom(
        service.getSubscriptionByCode(mockCustomerId, mockSubscriptionId)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/subscriptions/${mockSubscriptionId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDetail);

      const result = await resultPromise;
      expect(result).toEqual(mockDetail);
    });
  });

  describe('getSubscriptionList', () => {
    it('should get list of subscriptions for the given customer id', async () => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byId';

      const resultPromise = firstValueFrom(
        service.getSubscriptionList(
          mockCustomerId,
          PAGE_SIZE,
          currentPage,
          sort
        )
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/subscriptions?pageSize=${PAGE_SIZE}&currentPage=${currentPage}&sort=${sort}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockList);

      const result = await resultPromise;
      expect(result).toEqual(mockList);
    });
  });
});
