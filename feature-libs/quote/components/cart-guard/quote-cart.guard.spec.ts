import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ActivatedRouterStateSnapshot,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { QuoteCartService } from '../../core/services/quote-cart.service';
import { QUOTE_CODE } from '../../core/testing/quote-test-utils';
import { QuoteCartGuard } from './quote-cart.guard';
import createSpy = jasmine.createSpy;

const URL_PARTS = ['/', 'my-account', 'quote', QUOTE_CODE];

let isQuoteCartActive: any;
let quoteId: any;
let checkoutAllowed: boolean;
let routerState: any;

const checkoutState: ActivatedRouterStateSnapshot = {
  semanticRoute: 'checkout',
  url: '',
  queryParams: [],
  params: [],
  context: { id: '' },
  cmsRequired: false,
};

const routerStateCheckout: RouterState = {
  navigationId: 0,
  nextState: checkoutState,
  state: {
    semanticRoute: 'quote',
    url: '',
    queryParams: [],
    params: [],
    context: { id: '' },
    cmsRequired: false,
  },
};

const routerStateCheckoutWoNextState: RouterState = {
  ...routerStateCheckout,
  nextState: undefined,
  state: checkoutState,
};

const routerStateCart: RouterState = {
  ...routerStateCheckout,
  nextState: {
    ...checkoutState,
    semanticRoute: 'cart',
  },
};

class MockRoutingService {
  go = createSpy();
  getRouterState() {
    return of(routerState);
  }
}

class MockQuoteCartService {
  isQuoteCartActive() {
    return of(isQuoteCartActive);
  }
  getQuoteId() {
    return of(quoteId);
  }
  isCheckoutAllowed() {
    return of(checkoutAllowed);
  }
}

class MockSemanticPathService {
  transform() {
    return URL_PARTS;
  }
}

describe('QuoteCartGuard', () => {
  let classUnderTest: QuoteCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartGuard,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: QuoteCartService, useClass: MockQuoteCartService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
      imports: [RouterTestingModule],
    });

    isQuoteCartActive = false;
    checkoutAllowed = false;
    quoteId = '';
    routerState = routerStateCheckout;
    classUnderTest = TestBed.inject(QuoteCartGuard);
  });

  it('should create guard', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if quote cart is not present', (done) => {
      classUnderTest.canActivate().subscribe((canActive) => {
        expect(canActive).toBe(true);
        done();
      });
    });

    it('should redirect if quote cart is present', (done) => {
      isQuoteCartActive = true;
      quoteId = QUOTE_CODE;
      classUnderTest.canActivate().subscribe((canActive) => {
        expect(canActive.toString()).toContain(QUOTE_CODE);
        done();
      });
    });

    it('should allow a navigation to checkout if service allows it', (done) => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      quoteId = QUOTE_CODE;
      classUnderTest.canActivate().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should allow a navigation to checkout if service allows it, current state is checkout and nextState is undefined', (done) => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      routerState = routerStateCheckoutWoNextState;
      quoteId = QUOTE_CODE;
      classUnderTest.canActivate().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should not allow a navigation to cart if service allows checkout', (done) => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      routerState = routerStateCart;
      quoteId = QUOTE_CODE;
      classUnderTest.canActivate().subscribe((result) => {
        expect(result.toString()).toContain(QUOTE_CODE);
        done();
      });
    });
  });
});
