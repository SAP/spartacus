import { TestBed } from '@angular/core/testing';
import { SubscriptionBillingAdapter } from './subscription-billing.adapter';
import { SubscriptionBillingConnector } from './subscription-billing.connector';
import createSpy = jasmine.createSpy;
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { of, take } from 'rxjs';
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
class MockSubscriptionBillingAdapter
  implements Partial<SubscriptionBillingAdapter>
{
  getSubscriptionByCode = createSpy().and.returnValue(of(mockDetail));
  getSubscriptionList = createSpy().and.returnValue(of(mockList));
}
describe('SubscriptionBillingConnector', () => {
  let service: SubscriptionBillingConnector;
  let adapter: SubscriptionBillingAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingConnector,
        {
          provide: SubscriptionBillingAdapter,
          useClass: MockSubscriptionBillingAdapter,
        },
      ],
    });
    adapter = TestBed.inject(SubscriptionBillingAdapter);
    service = TestBed.inject(SubscriptionBillingConnector);
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should call getSubscriptionByCode adapter', () => {
    service.getSubscriptionByCode('current', '1').pipe(take(1)).subscribe();
    expect(adapter.getSubscriptionByCode).toHaveBeenCalledWith('current', '1');
  });
  it('should call getSubscriptionList adapter', () => {
    service
      .getSubscriptionList('current', 0, 0, 'id')
      .pipe(take(1))
      .subscribe();
    expect(adapter.getSubscriptionList).toHaveBeenCalledWith(
      'current',
      0,
      0,
      'id'
    );
  });
});
