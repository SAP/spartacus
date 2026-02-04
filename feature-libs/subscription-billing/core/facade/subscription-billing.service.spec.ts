import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  defaultSubscriptionBillingRoutingConfig,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { SubscriptionBillingConnector } from '../connector';
import { SubscriptionBillingService } from './subscription-billing.service';
import { RoutingService, UserIdService } from '@spartacus/core';
import createSpy = jasmine.createSpy;

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

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    of(defaultSubscriptionBillingRoutingConfig)
  );
}

describe('SubscriptionBillingService', () => {
  let connector: jasmine.SpyObj<SubscriptionBillingConnector>;
  let service: SubscriptionBillingService;
  let userIdService: jasmine.SpyObj<UserIdService>;

  beforeEach(() => {
    const connectorSpy = jasmine.createSpyObj('SubscriptionBillingConnector', [
      'getSubscriptionBillsList',
      'getSubscriptionBillByCode',
    ]);

    const userIdServiceSpy = jasmine.createSpyObj('UserIdService', [
      'getUserId',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingService,
        { provide: SubscriptionBillingConnector, useValue: connectorSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
        { provide: RoutingService, useValue: new MockRoutingService() },
      ],
    });
    connector = TestBed.inject(
      SubscriptionBillingConnector
    ) as jasmine.SpyObj<SubscriptionBillingConnector>;
    service = TestBed.inject(SubscriptionBillingService);
    userIdService = TestBed.inject(
      UserIdService
    ) as jasmine.SpyObj<UserIdService>;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('getSubscriptionBillsList', () => {
    it('should call connector method', () => {
      const userId = 'current';

      connector.getSubscriptionBillsList.and.returnValue(of(listWithData));
      userIdService.getUserId.and.returnValue(of('current'));

      let response: SubscriptionBillsList | undefined;
      service
        .getSubscriptionBillsList(5, 1, 'byBillingDateDesc', undefined)
        .subscribe((result) => (response = result));
      expect(connector.getSubscriptionBillsList).toHaveBeenCalledWith(
        userId,
        5,
        1,
        'byBillingDateDesc',
        undefined
      );
      expect(response).toEqual(listWithData);
    });

    it('should contain the query state', (done) => {
      const mockCurrentPage = 1;
      const mockPageSize = 5;
      const mockSort = 'byId';

      connector.getSubscriptionBillsList.and.returnValue(of(listWithData));
      userIdService.getUserId.and.returnValue(of('current'));

      service
        .getSubscriptionBillsListState(
          mockCurrentPage,
          mockPageSize,
          mockSort,
          undefined
        )
        .subscribe((state) => {
          expect(connector.getSubscriptionBillsList).toHaveBeenCalledWith(
            'current',
            mockCurrentPage,
            mockPageSize,
            mockSort,
            undefined
          );
          expect(state).toEqual({
            loading: false,
            error: false,
            data: listWithData,
          });
          done();
        });
    });
  });
});
