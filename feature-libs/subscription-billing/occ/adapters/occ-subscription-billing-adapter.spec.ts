import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import {
    SubscriptionBill,
    SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { take } from 'rxjs';
import { defaultOccSubscriptionBillingConfig } from '../config/default-occ-subscription-billing-config';
import { OccSubscriptionBillingAdapter } from './occ-subscription-billing.adapter';

const mockBillData: SubscriptionBill = {
    billAt: "2026-04-11T00:00:00+0000",
    documentNumber: "5776",
    id: "019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015",
    items: [
        {
        netAmount: "USD0.00",
        productCode: "SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq",
        productName: "SAPCPQ_EDITRATIO_FORMAT_TIERS",
        subscriptionDocumentNumber: "807",
        subscriptionId: "86B01278-B670-4812-B69C-55E41439D59E",
        usageCharges: [{
            netAmount: "USD185.00",
            typeName: "Charge"
        }]
        }
    ],
    netAmount: "USD0.00",
    numberOfSubscriptions: 1,
    periodEndAt: "2026-04-09T00:00:00+0000",
    periodStartAt: "2026-01-09T00:00:00+0000",
};

const mockListData: SubscriptionBillsList = {
    pagination: {
        currentPage: 0,
        pageSize: 1,
        sort: "byBillingDateDesc",
        totalPages: 410,
        totalResults: 2047
    },
    results: [
        {
        billAt: "2026-04-11T00:00:00+0000",
        documentNumber: "5776",
        id: "019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015",
        items: [
            {
            netAmount: "USD0.00",
            productCode: "SAPCPQ_EDITRATIO_FORMAT_TIERS_cpq",
            productName: "SAPCPQ_EDITRATIO_FORMAT_TIERS",
            subscriptionDocumentNumber: "807",
            subscriptionId: "86B01278-B670-4812-B69C-55E41439D59E",
            usageCharges: [{
                netAmount: "USD185.00",
                typeName: "Charge"
            }]
            }
        ],
        netAmount: "USD0.00",
        numberOfSubscriptions: 1,
        periodEndAt: "2026-04-09T00:00:00+0000",
        periodStartAt: "2026-01-09T00:00:00+0000",
        }
    ],
    sorts: [
        {
        code: "byDocumentNumberDesc",
        name: "Bill ID (desc)",
        selected: false
        },
        {
        code: "byDocumentNumberAsc",
        name: "Bill ID (asc)",
        selected: false
        },
        {
        code: "byBillingDateDesc",
        name: "Bill Date (desc)",
        selected: true
        },
        {
        code: "byBillingDateAsc",
        name: "Bill Date (asc)",
        selected: false
        }
    ],
};

const mockCustomerId = 'current';

describe('OccSubscriptionBillingAdapter', () => {
  let service: OccSubscriptionBillingAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OccSubscriptionBillingAdapter,
        { provide: OccConfig, useValue: defaultOccSubscriptionBillingConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccSubscriptionBillingAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSubscriptionBillByCode', () => {
    it('should get subscription bill for the given bill id', (done) => {
      service
        .getSubscriptionBillByCode(mockCustomerId, mockBillData.documentNumber!)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockBillData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/subscriptionbills/${mockBillData.documentNumber}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockBillData);
    });
  });

  describe('getSubscriptionBillsList', () => {
    it('should get list of subscription bills for the given customer id', (done) => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byBillingDateDesc';

      service
        .getSubscriptionBillsList(mockCustomerId, PAGE_SIZE, currentPage, sort)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockListData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${mockCustomerId}/subscriptionbills?pageSize=${PAGE_SIZE}&currentPage=${currentPage}&sort=${sort}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockListData);
    });
  });
});
