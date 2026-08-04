import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { SubscriptionBillingAdapter } from './subscription-billing.adapter';
import { SubscriptionBillingConnector } from './subscription-billing.connector';
import {
  SubscriptionBill,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { vi } from 'vitest';

const mockBillData: SubscriptionBill = {
  billAt: '2026-04-11T00:00:00+0000',
  documentNumber: '5776',
  id: '019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015',
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

const listWithData: SubscriptionBillsList = {
  pagination: {
    currentPage: 0,
    pageSize: 1,
    sort: 'byBillingDateDesc',
    totalPages: 410,
    totalResults: 2047,
  },
  results: [
    {
      billAt: '2026-04-11T00:00:00+0000',
      documentNumber: '5776',
      id: '019B9D0C-D5AC-70ED-A3FC-A7B88D1B2015',
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
    },
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

describe('SubscriptionBillingConnector', () => {
  let connector: SubscriptionBillingConnector;
  let adapter: any;

  beforeEach(() => {
    const adapterSpy = {
      getSubscriptionBillsList: vi.fn(),
      getSubscriptionBillByCode: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingConnector,
        { provide: SubscriptionBillingAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(SubscriptionBillingConnector);
    adapter = TestBed.inject(SubscriptionBillingAdapter) as any;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('getSubscriptionBillsList', () => {
    it('should delegate to adapter', () => {
      const userId = 'current';
      const expectedResponse = of(listWithData);

      adapter.getSubscriptionBillsList.mockReturnValue(expectedResponse);

      const result = connector.getSubscriptionBillsList(userId, 5, 1);
      expect(adapter.getSubscriptionBillsList).toHaveBeenCalledWith(
        userId,
        5,
        1,
        undefined,
        undefined
      );
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors', async () => {
      const userId = 'current';
      const error = new Error('Cancel error');

      adapter.getSubscriptionBillsList.mockReturnValue(throwError(() => error));

      await expect(
        firstValueFrom(connector.getSubscriptionBillsList(userId, 5, 1))
      ).rejects.toBe(error);
    });
  });

  describe('getSubscriptionBillByCode', () => {
    it('should delegate to adapter', () => {
      const userId = 'current';
      const expectedResponse = of(mockBillData);

      adapter.getSubscriptionBillByCode.mockReturnValue(expectedResponse);

      const result = connector.getSubscriptionBillByCode(
        userId,
        mockBillData.documentNumber ?? ''
      );
      expect(adapter.getSubscriptionBillByCode).toHaveBeenCalledWith(
        userId,
        mockBillData.documentNumber ?? ''
      );
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors', async () => {
      const userId = 'current';
      const error = new Error('Cancel error');

      adapter.getSubscriptionBillByCode.mockReturnValue(
        throwError(() => error)
      );

      await expect(
        firstValueFrom(
          connector.getSubscriptionBillByCode(userId, mockBillData.documentNumber ?? '')
        )
      ).rejects.toBe(error);
    });
  });
});
