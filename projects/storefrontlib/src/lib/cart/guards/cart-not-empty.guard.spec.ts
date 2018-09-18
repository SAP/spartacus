import { TestBed } from '@angular/core/testing';

import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { Store } from '@ngrx/store';
import { CartService } from '../../cart/services';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as fromStore from './../../cart/store';

const MAIN_PAGE_ROUTE = [''];
const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

const mockRouter = { navigate: () => {} };
const mockCartService = {
  isCartEmpty: cart => cart === CART_EMPTY || cart === CART_NOT_CREATED,
  isCartCreated: cart => cart === CART_NOT_CREATED
};
const mockSelectors = {
  getLoaded: new BehaviorSubject(null),
  getActiveCart: new BehaviorSubject(null)
};
const mockStore = {
  select: selector => {
    switch (selector) {
      case fromStore.getLoaded:
        return mockSelectors.getLoaded;
      case fromStore.getActiveCart:
        return mockSelectors.getActiveCart;
      default:
        return null;
    }
  }
};

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let router;

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
          useValue: mockCartService
        },
        {
          provide: Store,
          useValue: mockStore
        }
      ],
      imports: [RouterTestingModule]
    });

    cartNotEmptyGuard = TestBed.get(CartNotEmptyGuard);
    router = TestBed.get(Router);
  });

  describe('canActivate:', () => {
    let canActivate$;

    beforeEach(() => {
      spyOn(router, 'navigate');
      canActivate$ = cartNotEmptyGuard.canActivate();
    });

    describe('when cart is NOT loaded', () => {
      beforeEach(() => {
        mockSelectors.getLoaded.next(false);
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_NOT_CREATED);
        });

        it('then Router should NOT redirect', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_NOT_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should NOT emit any value', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe('nothing was emitted');
        });
      });
    });

    describe('when cart is loaded', () => {
      beforeEach(() => {
        mockSelectors.getLoaded.next(true);
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_NOT_CREATED);
        });

        it('then Router should redirect to main page', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTE);
        });

        it('then returned observable should emit false', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_EMPTY);
        });

        it('then Router should redirect to main page', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTE);
        });

        it('then returned observable should emit false', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          mockSelectors.getActiveCart.next(CART_NOT_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue: any = 'nothing was emitted';
          canActivate$
            .subscribe(result => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(true);
        });
      });
    });
  });
});
