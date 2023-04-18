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
import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  code: '1234',
  totalItems: 5,
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(of(mockCart));
}

class MockBasePageMetaResolver implements Partial<BasePageMetaResolver> {
  resolveDescription = createSpy().and.returnValue(EMPTY);
  resolveRobots = createSpy().and.returnValue(EMPTY);
  resolveTitle = createSpy().and.returnValue(EMPTY);
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

    basePageMetaResolver.resolveTitle = createSpy().and.returnValue(
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
});
