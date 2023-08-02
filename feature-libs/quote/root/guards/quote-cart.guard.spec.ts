import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QuoteCartGuard } from './quote-cart.guard';
import { RouterState, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import { QUOTE_CODE } from '../../core/testing/quote-test-utils';
import createSpy = jasmine.createSpy;

let isQuoteCartActive: any;
let quoteId: any;
let checkoutAllowed: boolean;
let routerState: any;

const routerStateCheckout: RouterState = {
  navigationId: 0,
  state: {
    semanticRoute: 'checkout',
    url: '',
    queryParams: [],
    params: [],
    context: { id: '' },
    cmsRequired: false,
  },
};

const routerStateCart: RouterState = {
  ...routerStateCheckout,
  state: {
    ...routerStateCheckout.state,
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

describe('QuoteCartGuard', () => {
  let guard: QuoteCartGuard;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartGuard,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: QuoteCartService, useClass: MockQuoteCartService },
      ],
      imports: [RouterTestingModule],
    });

    isQuoteCartActive = false;
    checkoutAllowed = false;
    quoteId = '';
    routerState = routerStateCheckout;
    guard = TestBed.inject(QuoteCartGuard);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create guard', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if quote cart is not present', (done) => {
      guard.canActivate().subscribe((canActive) => {
        expect(canActive).toBe(true);
        done();
      });
    });

    it('should return false if quote cart is present', (done) => {
      isQuoteCartActive = true;
      guard.canActivate().subscribe((canActive) => {
        expect(canActive).toBe(false);
        done();
      });
    });

    it('should navigate to quote details if quote cart is present', (done) => {
      isQuoteCartActive = true;
      quoteId = QUOTE_CODE;
      guard.canActivate().subscribe(() => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'quoteDetails',
          params: { quoteId: QUOTE_CODE },
        });
        done();
      });
    });

    it('should allow a navigation to checkout if service allows it', (done) => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      quoteId = QUOTE_CODE;
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should not allow a navigation to cart if service allows checkout', (done) => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      routerState = routerStateCart;
      quoteId = QUOTE_CODE;
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
    });
  });
});
