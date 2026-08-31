import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import { Observable, firstValueFrom, of } from 'rxjs';
import { UserIdService, RoutingService } from '@spartacus/core';
import { CartUtilsService } from './cart-utils.service';

const newCart: Cart = {};

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  createCart(): Observable<Cart> {
    return of(newCart);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of();
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = vi.fn();
}

describe('CartUtilsService', () => {
  let classUnderTest: CartUtilsService;
  let userIdService: UserIdService;
  let routingService: RoutingService;
  let multiCartFacade: MultiCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    classUnderTest = TestBed.inject(CartUtilsService);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    vi.spyOn(userIdService, 'takeUserId').mockReturnValue(of('current'));
    vi.spyOn(multiCartFacade, 'createCart');
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('createNewCart', () => {
    it('should create a new cart ', async () => {
      const cart = await firstValueFrom(classUnderTest['createNewCart']());
      expect(cart).toBe(newCart);
      expect(userIdService.takeUserId).toHaveBeenCalled();
    });
  });

  describe('goToNewCart', () => {
    it('should redirect to the cart page', () => {
      classUnderTest.goToNewCart();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });

  describe('handleCartAndGoToQuoteList', () => {
    it('should create a new cart and redirect to the quote list page', () => {
      classUnderTest.handleCartAndGoToQuoteList(true);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(multiCartFacade.createCart).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quotes' });
    });

    it('should redirect to the quote list page', () => {
      classUnderTest.handleCartAndGoToQuoteList(false);
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'quotes' });
    });
  });
});
