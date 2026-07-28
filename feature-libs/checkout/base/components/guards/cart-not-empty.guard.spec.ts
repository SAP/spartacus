import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { EMPTY, firstValueFrom, of } from 'rxjs';
import { CartNotEmptyGuard } from './cart-not-empty.guard';

const homepagePath = '/home';
const CART_EMPTY = Object.freeze({ totalItems: 0 });
const CART_NOT_EMPTY = Object.freeze({ totalItems: 1 });
const CART_NOT_CREATED = Object.freeze({});

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActive = vi.fn().mockReturnValue(EMPTY);
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = vi.fn().mockReturnValue(homepagePath);
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
    });

    cartNotEmptyGuard = TestBed.inject(CartNotEmptyGuard);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  describe('canActivate()', () => {
    describe('when cart is NOT created', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = vi.fn().mockReturnValue(
          of(CART_NOT_CREATED)
        );
      });

      it('should return the homepage route', async () => {
        const result = await firstValueFrom(cartNotEmptyGuard.canActivate());
        expect(result.toString()).toEqual(homepagePath);
      });
    });

    describe('when cart is empty', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = vi.fn().mockReturnValue(
          of(CART_EMPTY)
        );
      });

      it('should return the homepage route', async () => {
        const result = await firstValueFrom(cartNotEmptyGuard.canActivate());
        expect(result.toString()).toEqual(homepagePath);
      });
    });

    describe('when cart is NOT empty', () => {
      beforeEach(() => {
        activeCartFacade.takeActive = vi.fn().mockReturnValue(
          of(CART_NOT_EMPTY)
        );
      });

      it('should return true', async () => {
        const result = await firstValueFrom(cartNotEmptyGuard.canActivate());
        expect(result).toBe(true);
      });
    });
  });
});
