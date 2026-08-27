import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';

import {
  ActivatedRouterStateSnapshot,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { QuoteCartService } from '../../core/services/quote-cart.service';
import { QUOTE_CODE } from '../../core/testing/quote-test-utils';
import { QuoteCartGuard } from './quote-cart.guard';

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
  go = vi.fn();
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
    it('should return true if quote cart is not present', async () => {
      const canActive = await firstValueFrom(classUnderTest.canActivate());
      expect(canActive).toBe(true);
    });

    it('should redirect if quote cart is present', async () => {
      isQuoteCartActive = true;
      quoteId = QUOTE_CODE;
      const canActive = await firstValueFrom(classUnderTest.canActivate());
      expect(canActive.toString()).toContain(QUOTE_CODE);
    });

    it('should allow a navigation to checkout if service allows it', async () => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      quoteId = QUOTE_CODE;
      const result = await firstValueFrom(classUnderTest.canActivate());
      expect(result).toBe(true);
    });

    it('should allow a navigation to checkout if service allows it, current state is checkout and nextState is undefined', async () => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      routerState = routerStateCheckoutWoNextState;
      quoteId = QUOTE_CODE;
      const result = await firstValueFrom(classUnderTest.canActivate());
      expect(result).toBe(true);
    });

    it('should not allow a navigation to cart if service allows checkout', async () => {
      isQuoteCartActive = true;
      checkoutAllowed = true;
      routerState = routerStateCart;
      quoteId = QUOTE_CODE;
      const result = await firstValueFrom(classUnderTest.canActivate());
      expect(result.toString()).toContain(QUOTE_CODE);
    });
  });
});
