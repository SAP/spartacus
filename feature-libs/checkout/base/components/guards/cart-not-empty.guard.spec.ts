import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { of } from 'rxjs';
import { CartNotEmptyGuard } from './cart-not-empty.guard';
import createSpy = jasmine.createSpy;

const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

class ActiveCartServiceStub implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(of());
  isStable = createSpy().and.returnValue(of());
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue('/home');
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: ActiveCartFacade,
          useClass: ActiveCartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    cartNotEmptyGuard = TestBed.inject(CartNotEmptyGuard);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  describe('canActivate:', () => {
    describe('when cart is loaded', () => {
      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          activeCartFacade.getActive = createSpy().and.returnValue(
            of(CART_NOT_CREATED)
          );
          activeCartFacade.isStable = createSpy().and.returnValue(of(true));
        });

        it('then router should return main page url', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue.toString()).toEqual('/home');
        });
      });

      describe(', and when cart is empty', () => {
        beforeEach(() => {
          activeCartFacade.getActive = createSpy().and.returnValue(
            of(CART_EMPTY)
          );
          activeCartFacade.isStable = createSpy().and.returnValue(of(true));
        });

        it('then router should return main page url', () => {
          let emittedValue: any = 'nothing was emitted';
          cartNotEmptyGuard
            .canActivate()
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();
          expect(emittedValue.toString()).toEqual('/home');
        });
      });

      describe(', and when cart is NOT empty', () => {
        beforeEach(() => {
          activeCartFacade.getActive = createSpy().and.returnValue(
            of(CART_NOT_EMPTY)
          );
          activeCartFacade.isStable = createSpy().and.returnValue(of(true));
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
        activeCartFacade.getActive = createSpy().and.returnValue(
          of(CART_NOT_CREATED)
        );
        activeCartFacade.isStable = createSpy().and.returnValue(of(false));
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
