import { TestBed } from '@angular/core/testing';

import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { of } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import createSpy = jasmine.createSpy;

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
  let classUnderTest: QuoteCartService;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartService,
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    });

    classUnderTest = TestBed.inject(QuoteCartService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should create service', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('setCheckoutActive', () => {
    it('should trigger emission of new state', () => {
      classUnderTest.setCheckoutAllowed(true);
      classUnderTest.isCheckoutAllowed().subscribe((isAllowed) => {
        expect(isAllowed).toBe(true);
      });
    });
  });
  describe('getQuoteId', () => {
    it('should request activeCartFacade to find quote id', () => {
      cart.quoteCode = quoteAttachedToCart;
      classUnderTest.getQuoteId().subscribe((quoteId) => {
        expect(activeCartFacade.getActive).toHaveBeenCalled();
        expect(quoteId).toEqual(quoteAttachedToCart);
      });
    });
  });

  describe('isQuoteCartActive', () => {
    it('should request activeCartFacade to find quote id and determine if a link exists', () => {
      cart.quoteCode = quoteAttachedToCart;
      classUnderTest.isQuoteCartActive().subscribe((isActive) => {
        expect(activeCartFacade.getActive).toHaveBeenCalled();
        expect(isActive).toBe(true);
      });
    });
    it('should return false in case cart is not linked to any quote', () => {
      cart.quoteCode = undefined;
      classUnderTest.isQuoteCartActive().subscribe((isActive) => {
        expect(isActive).toBe(false);
      });
    });
  });
});
