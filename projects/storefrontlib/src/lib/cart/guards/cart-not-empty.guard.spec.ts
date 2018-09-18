import { TestBed } from '@angular/core/testing';

import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { Store } from '@ngrx/store';
import { CartService } from '../../cart/services';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as fromStore from './../../cart/store';

const mockRouter = { navigate: () => {} };
const mockCartService = {
  isCartCreated: () => {},
  isCartEmpty: () => {}
};
const MAIN_PAGE_ROUTE = [''];

const mockedSelectors = Object.freeze({
  getLoaded: new BehaviorSubject(null),
  getActiveCart: new BehaviorSubject(null)
});
const mockStore = {
  select: selector => {
    switch (selector) {
      case fromStore.getLoaded:
        return mockedSelectors.getLoaded;
      case fromStore.getActiveCart:
        return mockedSelectors.getActiveCart;
      default:
        return null;
    }
  }
};

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let cartService: CartService;
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

    cartService = TestBed.get(CartService);
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
        mockedSelectors.getLoaded.next(false);
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(true);
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
          spyOn(cartService, 'isCartEmpty').and.returnValue(false);
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
        mockedSelectors.getLoaded.next(true);
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(true);
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
          spyOn(cartService, 'isCartEmpty').and.returnValue(false);
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
