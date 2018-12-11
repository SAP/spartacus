import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { CartService } from '../../cart/facade';
import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { Cart } from '@spartacus/core';

const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

const mockRoutingService = { go: () => {} };

class CartServiceStub {
  activeCart$: Observable<Cart>;
  loaded$: Observable<boolean>;
  isCartEmpty(_cart: any): boolean {
    return false;
  }
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let routingService: RoutingService;
  let cartService: CartServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartNotEmptyGuard,
        {
          provide: RoutingService,
          useValue: mockRoutingService
        },
        {
          provide: CartService,
          useClass: CartServiceStub
        }
      ],
      imports: [RouterTestingModule]
    });

    cartNotEmptyGuard = TestBed.get(CartNotEmptyGuard);
    routingService = TestBed.get(RoutingService);
    cartService = TestBed.get(CartService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when cart is NOT loaded', () => {
      beforeEach(() => {
        cartService.loaded$ = of(false);
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          cartService.activeCart$ = of(CART_NOT_CREATED);
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).not.toHaveBeenCalled();
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
          cartService.activeCart$ = of(CART_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).not.toHaveBeenCalled();
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
          cartService.activeCart$ = of(CART_NOT_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).not.toHaveBeenCalled();
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
        cartService.loaded$ = of(true);
      });

      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          cartService.activeCart$ = of(CART_NOT_CREATED);
        });

        it('then Router should redirect to main page', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).toHaveBeenCalledWith({
            route: ['home']
          });
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
          cartService.activeCart$ = of(CART_EMPTY);
        });

        it('then Router should redirect to main page', () => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(of(true));
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).toHaveBeenCalledWith({
            route: ['home']
          });
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
          cartService.activeCart$ = of(CART_NOT_EMPTY);
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard
            .canActivate()
            .subscribe()
            .unsubscribe();
          expect(routingService.go).not.toHaveBeenCalled();
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
