import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartService, Cart, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartNotEmptyGuard } from './cart-not-empty.guard';

const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

const mockRoutingService = { go: () => {} };

class ActiveCartServiceStub {
  getActive(): Observable<Cart> {
    return of();
  }
  isStable(): Observable<boolean> {
    return of();
  }
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let routingService: RoutingService;
  let activeCartService: ActiveCartServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: ActiveCartService,
          useClass: ActiveCartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    cartNotEmptyGuard = TestBed.inject(CartNotEmptyGuard);
    routingService = TestBed.inject(RoutingService);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when cart is loaded', () => {
      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          spyOn(activeCartService, 'getActive').and.returnValue(
            of(CART_NOT_CREATED)
          );
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
        });

        it('then Router should redirect to main page', () => {
          cartNotEmptyGuard.canActivate().subscribe().unsubscribe();
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'home',
          });
        });

        it('then returned observable should emit false', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          spyOn(activeCartService, 'getActive').and.returnValue(of(CART_EMPTY));
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
        });

        it('then Router should redirect to main page', () => {
          cartNotEmptyGuard.canActivate().subscribe().unsubscribe();
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'home',
          });
        });

        it('then returned observable should emit false', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(false);
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          spyOn(activeCartService, 'getActive').and.returnValue(
            of(CART_NOT_EMPTY)
          );
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
        });

        it('then Router should NOT redirect', () => {
          cartNotEmptyGuard.canActivate().subscribe().unsubscribe();
          expect(routingService.go).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue).toBe(true);
        });
      });
    });

    describe('when cart is not loaded', () => {
      beforeEach(() => {
        spyOn(activeCartService, 'getActive').and.returnValue(
          of(CART_NOT_CREATED)
        );
        spyOn(activeCartService, 'isStable').and.returnValue(of(false));
      });

      it('then Router should not redirect to main page', () => {
        cartNotEmptyGuard.canActivate().subscribe().unsubscribe();
        expect(routingService.go).not.toHaveBeenCalled();
      });

      it('then returned observable should not emit', () => {
        let emittedValue: any = 'nothing was emitted';
        cartNotEmptyGuard
          .canActivate()
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();
        expect(emittedValue).toBe('nothing was emitted');
      });
    });
  });
});
