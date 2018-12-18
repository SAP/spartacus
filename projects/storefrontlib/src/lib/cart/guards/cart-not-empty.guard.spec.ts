import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Cart, CartService } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { CartNotEmptyGuard } from './cart-not-empty.guard';

const MAIN_PAGE_ROUTE = [''];
const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

const mockRouter = { navigate: () => {} };

class CartServiceStub {
  getActive(): Observable<Cart> {
    return of();
  }
  getLoaded(): Observable<boolean> {
    return of();
  }
  isCartEmpty(_cart: any): boolean {
    return false;
  }
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let router: Router;
  let cartService: CartServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartNotEmptyGuard,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: CartService,
          useClass: CartServiceStub
        }
      ],
      imports: [RouterTestingModule]
    });

    cartNotEmptyGuard = TestBed.get(CartNotEmptyGuard);
    router = TestBed.get(Router);
    cartService = TestBed.get(CartService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'navigate');
    });

    describe('when cart is NOT loaded', () => {
      beforeEach(() => {
        spyOn(cartService, 'getLoaded').and.returnValue(of(false));
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(
            of(CART_NOT_CREATED)
          );
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(of(CART_EMPTY));
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(
            of(CART_NOT_EMPTY)
          );
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });
    });

    describe('when cart is loaded', () => {
      beforeEach(() => {
        spyOn(cartService, 'getLoaded').and.returnValue(of(true));
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(
            of(CART_NOT_CREATED)
          );
        });

        it('then Router should redirect to main page', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTE);
        });

        it('then returned observable should emit false', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(of(CART_EMPTY));
        });

        it('then Router should redirect to main page', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTE);
        });

        it('then returned observable should emit false', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'getActive').and.returnValue(
            of(CART_NOT_EMPTY)
          );
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(true);
        });
      });
    });
  });
});
