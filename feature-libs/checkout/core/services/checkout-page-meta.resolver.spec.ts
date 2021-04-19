import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  BasePageMetaResolver,
  Cart,
  CmsService,
  I18nTestingModule,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutPageMetaResolver } from './checkout-page-meta.resolver';

const mockCart: Cart = {
  code: '1234',
  totalItems: 5,
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockCmsService {}

class MockBasePageMetaResolver {
  resolveRobots() {}
}

describe('CheckoutPageMetaResolver', () => {
  let service: CheckoutPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: PageMetaResolver,
          useExisting: CheckoutPageMetaResolver,
          multi: true,
        },
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(CheckoutPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve page title`, () => {
    let result: string;

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('pageMetaResolver.checkout.title count:5');
  });

  it(`should resolve robots`, () => {
    let result: string[];

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result.length).toEqual(2);
    expect(result).toContain(PageRobotsMeta.NOINDEX);
    expect(result).toContain(PageRobotsMeta.NOFOLLOW);
  });
});
