import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  I18nTestingModule,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
  SemanticPathService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { EMPTY, of } from 'rxjs';
import { CustomerTicketingPageMetaResolver } from './customer-ticketing-page-meta.resolver';
import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  code: '1234',
  totalItems: 5,
};

const mockTicket: TicketDetails = {
  subject: 'mock subject',
};

const testCustomerServiceUrl = '/customer-service';

const testHomeBreadcrumb: BreadcrumbMeta = { label: 'Test Home', link: '/' };

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(of(mockCart));
}

class MockBasePageMetaResolver implements Partial<BasePageMetaResolver> {
  resolveDescription = createSpy().and.returnValue(EMPTY);
  resolveRobots = createSpy().and.returnValue(EMPTY);
  resolveTitle = createSpy().and.returnValue(EMPTY);
  resolveBreadcrumbs = createSpy().and.returnValue(of([testHomeBreadcrumb]));
}

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  getTicket = () => of(mockTicket);
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(testCustomerServiceUrl);
}

describe('CustomerTicketingPageMetaResolver', () => {
  let service: CustomerTicketingPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: PageMetaResolver,
          useExisting: CustomerTicketingPageMetaResolver,
          multi: true,
        },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });

    service = TestBed.inject(CustomerTicketingPageMetaResolver);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve page title`, () => {
    let result: string | undefined;

    basePageMetaResolver.resolveTitle = createSpy().and.returnValue(
      of('Customer Ticketing')
    );

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Customer Ticketing');
  });

  it('should resolve customer ticketing details heading', () => {
    let result: string | undefined;

    service
      .resolveHeading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('mock subject');
  });

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    basePageMetaResolver.resolveDescription = createSpy().and.returnValue(
      of('Page description')
    );

    service
      .resolveDescription()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page description');
  });

  it(`should resolve robots for page data`, () => {
    let result: PageRobotsMeta[] | undefined;
    basePageMetaResolver.resolveRobots = createSpy().and.returnValue(
      of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX] as PageRobotsMeta[])
    );

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.NOFOLLOW);
    expect(result).toContain(PageRobotsMeta.NOINDEX);
  });

  it('should resolve breadcrumbs for customer ticketing details page', () => {
    const resultBreadcrumbs = [
      testHomeBreadcrumb,
      {
        label: 'customerTicketing.customerService',
        link: testCustomerServiceUrl,
      },
    ];

    service.resolveBreadcrumbs().subscribe((meta) => {
      expect(meta).toEqual(resultBreadcrumbs);
    });
  });
});
