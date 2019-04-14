import { NavigationExtras } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  RoutingService,
  CartDataService,
  TranslateUrlOptions,
} from '@spartacus/core';

import { EmptyCartGuard } from './empty-cart.guard';

const CART_NOT_EMPTY = Object.freeze({ totalItems: 7 });
const CART_EMPTY = null;

const routingServiceStub = {
  go(
    _path: any[] | TranslateUrlOptions,
    _query?: object,
    _extras?: NavigationExtras
  ) {},
};

class cartDataServiceStub {
  cart = undefined;
  get hasCart(): boolean {
    return !!this.cart;
  }
}

describe('Empty Cart guard', () => {
  let emptyCartGuard: EmptyCartGuard;
  let routingService: RoutingService;
  let cartDataService: CartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmptyCartGuard,
        {
          provide: CartDataService,
          useClass: cartDataServiceStub,
        },
        {
          provide: RoutingService,
          useValue: routingServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    emptyCartGuard = TestBed.get(EmptyCartGuard);
    routingService = TestBed.get(RoutingService);
    cartDataService = TestBed.get(CartDataService);
  });

  describe('canActivate: ', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when cart is empty', () => {
      beforeEach(() => {
        cartDataService.cart = CART_EMPTY;
      });

      it('then Router should redirect', () => {
        emptyCartGuard.canActivate();
        expect(routingService.go).toHaveBeenCalled();
      });
    });

    describe('when cart is NOT empty', () => {
      beforeEach(() => {
        cartDataService.cart = CART_NOT_EMPTY;
      });

      it('then Router should NOT redirect', () => {
        emptyCartGuard.canActivate();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });
  });
});
