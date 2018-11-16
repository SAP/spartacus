import { TestBed } from '@angular/core/testing';

import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { CartService } from '../../cart/services';
import { BehaviorSubject } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromStore from './../../cart/store';
import { RoutingService } from '@spartacus/core';

const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

const mockRoutingService = { goToPage: () => {} };
const mockCartService = {
  isCartEmpty: cart => cart === CART_EMPTY || cart === CART_NOT_CREATED,
  isCartCreated: cart => cart === CART_NOT_CREATED
};
const mockSelectors = {
  getLoaded: new BehaviorSubject(null),
  getActiveCart: new BehaviorSubject(null)
};
const mockSelect = selector => {
  switch (selector) {
    case fromStore.getLoaded:
      return () => mockSelectors.getLoaded;
    case fromStore.getActiveCart:
      return () => mockSelectors.getActiveCart;
  }
};

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartNotEmptyGuard,
        Store,
        {
          provide: RoutingService,
          useValue: mockRoutingService
        },
        {
          provide: CartService,
          useValue: mockCartService
        }
      ],
      imports: [RouterTestingModule, StoreModule.forRoot({})]
    });

    cartNotEmptyGuard = TestBed.get(CartNotEmptyGuard);
    routingService = TestBed.get(RoutingService);
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);
  });

  describe('canActivate:', () => {
    let canActivate$;

    beforeEach(() => {
      spyOn(routingService, 'goToPage');
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
          expect(routingService.goToPage).not.toHaveBeenCalled();
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
          expect(routingService.goToPage).not.toHaveBeenCalled();
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
          expect(routingService.goToPage).not.toHaveBeenCalled();
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
          expect(routingService.goToPage).toHaveBeenCalledWith('homepage');
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
          expect(routingService.goToPage).toHaveBeenCalledWith('homepage');
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
          expect(routingService.goToPage).not.toHaveBeenCalled();
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
