import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartService, Cart, SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartNotEmptyGuard } from './cart-not-empty.guard';

const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  getActive(): Observable<Cart> {
    return of();
  }
  isStable(): Observable<boolean> {
    return of();
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let activeCartService: ActiveCartServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: ActiveCartService,
          useClass: ActiveCartServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    cartNotEmptyGuard = TestBed.inject(CartNotEmptyGuard);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  describe('canActivate:', () => {
    describe('when cart is loaded', () => {
      describe(', and when cart is NOT created', () => {
        beforeEach(() => {
          spyOn(activeCartService, 'getActive').and.returnValue(
            of(CART_NOT_CREATED)
          );
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
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
          spyOn(activeCartService, 'getActive').and.returnValue(of(CART_EMPTY));
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
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
          spyOn(activeCartService, 'getActive').and.returnValue(
            of(CART_NOT_EMPTY)
          );
          spyOn(activeCartService, 'isStable').and.returnValue(of(true));
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
