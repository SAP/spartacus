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
  resolveDescription(): Observable<string> {
    return of();
  }
  resolveRobots() {
    return of();
  }
}

describe('CheckoutPageMetaResolver', () => {
  let service: CheckoutPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

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
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
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

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    spyOn(basePageMetaResolver, 'resolveDescription').and.returnValue(
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

    spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
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
});
