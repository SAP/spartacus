import { TestBed } from '@angular/core/testing';

import { QuoteCartService } from './quote-cart.service';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

const cartId = '8762';
const quoteAttachedToCart = '6524';

const cart: Cart = {
  code: cartId,
};

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  reloadActiveCart = createSpy().and.stub();
  takeActiveCartId = createSpy().and.returnValue(of(cartId));
  requireLoadedCart = createSpy().and.returnValue(of(cart));
  getActive = createSpy().and.returnValue(of(cart));
}

describe('QuoteCartService', () => {
  let quoteCartService: QuoteCartService;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartService,
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    });

    quoteCartService = TestBed.inject(QuoteCartService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should create service', () => {
    expect(quoteCartService).toBeDefined();
  });

  describe('setCheckoutActive', () => {
    it('should trigger emission of new state', () => {
      quoteCartService.setCheckoutAllowed(true);
      quoteCartService.isCheckoutAllowed().subscribe((isAllowed) => {
        expect(isAllowed).toBe(true);
      });
    });
  });
  describe('getQuoteId', () => {
    it('should request activeCartFacade to find quote id', () => {
      cart.quoteCode = quoteAttachedToCart;
      quoteCartService.getQuoteId().subscribe((quoteId) => {
        expect(activeCartFacade.getActive).toHaveBeenCalled();
        expect(quoteId).toEqual(quoteAttachedToCart);
      });
    });
  });

  describe('isQuoteCartActive', () => {
    it('should request activeCartFacade to find quote id and determine if a link exists', () => {
      cart.quoteCode = quoteAttachedToCart;
      quoteCartService.isQuoteCartActive().subscribe((isActive) => {
        expect(activeCartFacade.getActive).toHaveBeenCalled();
        expect(isActive).toBe(true);
      });
    });
    it('should return false in case cart is not linked to any quote', () => {
      cart.quoteCode = undefined;
      quoteCartService.isQuoteCartActive().subscribe((isActive) => {
        expect(isActive).toBe(false);
      });
    });
  });
});
