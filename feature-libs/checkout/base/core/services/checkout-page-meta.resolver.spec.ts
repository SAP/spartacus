import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  BasePageMetaResolver,
  I18nTestingModule,
  PageMetaResolver,
  PageMetaService,
  PageRobotsMeta,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { CheckoutPageMetaResolver } from './checkout-page-meta.resolver';

const mockCart: Cart = {
  code: '1234',
  totalItems: 5,
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = vi.fn().mockReturnValue(of(mockCart));
}

class MockBasePageMetaResolver implements Partial<BasePageMetaResolver> {
  resolveDescription = vi.fn().mockReturnValue(EMPTY);
  resolveRobots = vi.fn().mockReturnValue(EMPTY);
  resolveTitle = vi.fn().mockReturnValue(EMPTY);
}

describe('CheckoutPageMetaResolver', () => {
  let service: CheckoutPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: PageMetaResolver,
          useExisting: CheckoutPageMetaResolver,
          multi: true,
        },
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
    let result: string | undefined;

    basePageMetaResolver.resolveTitle = vi.fn().mockReturnValue(
      of('Checkout Delivery Mode')
    );

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Checkout Delivery Mode');
  });

  it('should resolve checkout heading', () => {
    let result: string | undefined;

    service
      .resolveHeading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('pageMetaResolver.checkout.title');
  });

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    basePageMetaResolver.resolveDescription = vi.fn().mockReturnValue(
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
    basePageMetaResolver.resolveRobots = vi.fn().mockReturnValue(
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
