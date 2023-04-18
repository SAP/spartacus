import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { CartNotEmptyGuard } from './cart-not-empty.guard';
import createSpy = jasmine.createSpy;

const homepagePath = '/home';
const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActive = createSpy().and.returnValue(EMPTY);
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue(homepagePath);
}

describe('CartNotEmptyGuard', () => {
  let cartNotEmptyGuard: CartNotEmptyGuard;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
      ],
      imports: [RouterTestingModule],
    });

    cartNotEmptyGuard = TestBed.inject(CartNotEmptyGuard);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  describe('canActivate()', () => {
    describe('when cart is NOT created', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = createSpy().and.returnValue(
          of(CART_NOT_CREATED)
        );
      });

      it('should return the homepage route', (done) => {
        cartNotEmptyGuard
          .canActivate()
          .subscribe((result) => {
            expect(result.toString()).toEqual(homepagePath);
            done();
          })
          .unsubscribe();
      });
    });

    describe('when cart is empty', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = createSpy().and.returnValue(
          of(CART_EMPTY)
        );
      });

      it('should return the homepage route', (done) => {
        cartNotEmptyGuard
          .canActivate()
          .subscribe((result) => {
            expect(result.toString()).toEqual(homepagePath);
            done();
          })
          .unsubscribe();
      });
    });

    describe('when cart is NOT empty', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = createSpy().and.returnValue(
          of(CART_NOT_EMPTY)
        );
      });

      it('should return true', (done) => {
        cartNotEmptyGuard
          .canActivate()
          .subscribe((result) => {
            expect(result).toBe(true);
            done();
          })
          .unsubscribe();
      });
    });
  });
});
