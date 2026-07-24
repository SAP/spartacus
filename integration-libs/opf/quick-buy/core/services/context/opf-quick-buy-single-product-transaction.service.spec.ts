/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  Cart,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UnifiedInjector,
  UserIdService,
} from '@spartacus/core';
import {
  OpfQuickBuyDeliveryType,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { concat, of } from 'rxjs';
import { OpfQuickBuyCartConnector } from '../../connectors';
import { OpfQuickBuySingleProductTransactionService } from './opf-quick-buy-single-product-transaction.service';

describe('OpfQuickBuySingleProductTransactionService', () => {
  let service: OpfQuickBuySingleProductTransactionService;
  let multiCartFacade: jasmine.SpyObj<MultiCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let cartGuestUserFacade: jasmine.SpyObj<CartGuestUserFacade>;
  let authService: jasmine.SpyObj<AuthService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let singleProductCartOptions: jasmine.SpyObj<OpfQuickBuySingleProductCartOptionsFacade>;
  let cartConnector: jasmine.SpyObj<OpfQuickBuyCartConnector>;

  function initCart(cart: Cart = { guid: 'cart-guid' } as Cart): void {
    service['cartId'] = 'cart-guid';
    service['userId'] = 'anonymous';
    multiCartFacade.getCart.and.returnValue(of(cart));
    multiCartFacade.isStable.and.returnValue(of(true));
  }

  function mockReloadCart(cart: Cart = { guid: 'cart-guid' } as Cart): void {
    spyOn(service as any, 'reloadCartAndWait').and.returnValue(of(cart));
  }

  beforeEach(() => {
    multiCartFacade = jasmine.createSpyObj('MultiCartFacade', [
      'createCart',
      'addEntry',
      'isStable',
      'getCart',
      'reloadCart',
      'getCartEntity',
      'loadCart',
    ]);
    userIdService = jasmine.createSpyObj('UserIdService', ['takeUserId']);
    routingService = jasmine.createSpyObj('RoutingService', ['getRouterState']);
    globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    cartGuestUserFacade = jasmine.createSpyObj('CartGuestUserFacade', [
      'createCartGuestUser',
      'updateCartGuestUser',
    ]);
    authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
    activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'isGuestCart',
    ]);
    singleProductCartOptions = jasmine.createSpyObj(
      'OpfQuickBuySingleProductCartOptionsFacade',
      ['getSingleProductCartOptions']
    );
    cartConnector = jasmine.createSpyObj('OpfQuickBuyCartConnector', [
      'getSupportedDeliveryModes',
      'createDeliveryAddress',
      'setBillingAddress',
      'setDeliveryMode',
      'getSelectedDeliveryMode',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuySingleProductTransactionService,
        { provide: MultiCartFacade, useValue: multiCartFacade },
        { provide: UserIdService, useValue: userIdService },
        { provide: RoutingService, useValue: routingService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: CartGuestUserFacade, useValue: cartGuestUserFacade },
        { provide: AuthService, useValue: authService },
        { provide: ActiveCartFacade, useValue: activeCartFacade },
        {
          provide: OpfQuickBuySingleProductCartOptionsFacade,
          useValue: singleProductCartOptions,
        },
        {
          provide: UnifiedInjector,
          useValue: { get: () => of(cartConnector) },
        },
      ],
    });

    service = TestBed.inject(OpfQuickBuySingleProductTransactionService);
  });

  describe('cart accessors', () => {
    it('should return current cart, cart id and total price', (done) => {
      initCart({
        guid: 'cart-guid',
        totalPrice: { value: 42 },
        deliveryAddress: { firstName: 'John' },
      } as Cart);

      service.getCurrentCart().subscribe((cart) => {
        expect(cart.guid).toBe('cart-guid');
      });

      service.getCurrentCartId().subscribe((cartId) => {
        expect(cartId).toBe('cart-guid');
      });

      service.getCurrentCartTotalPrice().subscribe((total) => {
        expect(total).toBe(42);
      });

      service.getDeliveryAddress().subscribe((address) => {
        expect(address?.firstName).toBe('John');
        done();
      });
    });
  });

  describe('delivery type', () => {
    it('should return shipping when cart has delivery items', (done) => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 2 } as Cart);

      service.getTransactionDeliveryType().subscribe((type) => {
        expect(type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
        done();
      });
    });

    it('should return pickup when cart has no delivery items', (done) => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 0 } as Cart);

      service.getTransactionDeliveryType().subscribe((type) => {
        expect(type).toBe(OpfQuickBuyDeliveryType.PICKUP);
        done();
      });
    });

    it('should return delivery info from delivery type', (done) => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 1 } as Cart);

      service.getTransactionDeliveryInfo().subscribe((info) => {
        expect(info.type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
        done();
      });
    });
  });

  describe('checkStableCart', () => {
    it('should return true when cart is stable', (done) => {
      initCart();

      service.checkStableCart().subscribe((isStable) => {
        expect(isStable).toBe(true);
        done();
      });
    });
  });

  describe('connector operations', () => {
    beforeEach(() => {
      initCart();
    });

    it('should return supported delivery modes', (done) => {
      const modes = [{ code: 'standard', name: 'Standard' }];
      cartConnector.getSupportedDeliveryModes.and.returnValue(of(modes));

      service.getSupportedDeliveryModes().subscribe((result) => {
        expect(result).toEqual(modes);
        expect(cartConnector.getSupportedDeliveryModes).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
        done();
      });
    });

    it('should set delivery address and reload cart', (done) => {
      const address = { firstName: 'John' };
      mockReloadCart();
      cartConnector.createDeliveryAddress.and.returnValue(
        of({ id: 'addr-1', ...address })
      );

      service.setDeliveryAddress(address).subscribe((addressId) => {
        expect(addressId).toBe('addr-1');
        expect(service['reloadCartAndWait']).toHaveBeenCalled();
        done();
      });
    });

    it('should set billing address and reload cart', (done) => {
      const address = { firstName: 'John' };
      mockReloadCart();
      cartConnector.setBillingAddress.and.returnValue(of({}));

      service.setBillingAddress(address).subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should set delivery mode and return selected mode', (done) => {
      const mode = { code: 'standard', name: 'Standard' };
      mockReloadCart();
      cartConnector.setDeliveryMode.and.returnValue(of({}));
      cartConnector.getSelectedDeliveryMode.and.returnValue(of(mode));

      service.setDeliveryMode('standard').subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mode);
        done();
      });
    });

    it('should return selected delivery mode', (done) => {
      const mode = { code: 'standard', name: 'Standard' };
      cartConnector.getSelectedDeliveryMode.and.returnValue(of(mode));

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mode);
        done();
      });
    });
  });

  describe('createCartGuestUser', () => {
    it('should create guest user and reload cart', (done) => {
      initCart();
      cartGuestUserFacade.createCartGuestUser.and.returnValue(of({}));

      service.createCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
        expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
        expect(multiCartFacade.reloadCart).toHaveBeenCalledWith('cart-guid');
        done();
      });
    });
  });

  describe('prepareTransactionCart', () => {
    it('should create cart, handle guest user and return current cart', (done) => {
      const cart = { guid: 'new-guid' } as Cart;
      spyOn(service, 'createSingleProductCart').and.returnValue(of(cart));
      spyOn(service, 'handleCartGuestUser').and.returnValue(of(true));
      spyOn(service, 'getCurrentCart').and.returnValue(of(cart));

      service.prepareTransactionCart().subscribe((result) => {
        expect(result).toBe(cart);
        expect(service.createSingleProductCart).toHaveBeenCalled();
        expect(service.handleCartGuestUser).toHaveBeenCalled();
        expect(service.getCurrentCart).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('handleCartGuestUser', () => {
    it('should return true when cart is not initialized', (done) => {
      service.handleCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should create guest user for anonymous non-guest cart', (done) => {
      service['cartId'] = 'cart-guid';
      service['userId'] = 'anonymous';
      authService.isUserLoggedIn.and.returnValue(of(false));
      activeCartFacade.isGuestCart.and.returnValue(of(false));
      multiCartFacade.getCart.and.returnValue(
        of({ guid: 'cart-guid' } as Cart)
      );
      cartGuestUserFacade.createCartGuestUser.and.returnValue(of({}));

      service.handleCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
        expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
        expect(multiCartFacade.reloadCart).toHaveBeenCalledWith('cart-guid');
        done();
      });
    });
  });

  describe('updateCartGuestUserEmail', () => {
    beforeEach(() => {
      service['cartId'] = 'cart-guid';
      service['userId'] = 'anonymous';
      multiCartFacade.getCart.and.returnValue(
        of({ guid: 'cart-guid' } as Cart)
      );
    });

    it('should update email for guest cart', (done) => {
      activeCartFacade.isGuestCart.and.returnValue(of(true));
      cartGuestUserFacade.updateCartGuestUser.and.returnValue(of({}));

      service
        .updateCartGuestUserEmail('guest@example.com')
        .subscribe((result) => {
          expect(result).toBe(true);
          expect(cartGuestUserFacade.updateCartGuestUser).toHaveBeenCalledWith(
            'anonymous',
            'cart-guid',
            { email: 'guest@example.com' }
          );
          done();
        });
    });

    it('should return false when cart is not a guest cart', (done) => {
      activeCartFacade.isGuestCart.and.returnValue(of(false));

      service
        .updateCartGuestUserEmail('guest@example.com')
        .subscribe((result) => {
          expect(result).toBe(false);
          expect(
            cartGuestUserFacade.updateCartGuestUser
          ).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('notifyIfQuantityReduced', () => {
    it('should show low stock message when added quantity is lower than requested', () => {
      service['notifyIfQuantityReduced'](
        {
          entries: [{ product: { code: 'p1' }, quantity: 2 }],
        } as Cart,
        'p1',
        5
      );

      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'validation.lowStock',
          params: { quantity: 2 },
        },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });

    it('should not show message when quantity matches request', () => {
      service['notifyIfQuantityReduced'](
        {
          entries: [{ product: { code: 'p1' }, quantity: 5 }],
        } as Cart,
        'p1',
        5
      );

      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('createSingleProductCart', () => {
    it('should skip previously created cart and add entry to the new cart', (done) => {
      service['cartId'] = 'old-guid';
      routingService.getRouterState.and.returnValue(
        of({ state: { params: { productCode: 'p1' } } } as any)
      );
      singleProductCartOptions.getSingleProductCartOptions.and.returnValue(
        of({ quantity: 3 })
      );
      userIdService.takeUserId.and.returnValue(of('anonymous'));
      multiCartFacade.createCart.and.returnValue(
        concat(
          of({ guid: 'old-guid' } as Cart),
          of({ guid: 'new-guid' } as Cart)
        )
      );
      multiCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.getCart.and.returnValue(
        of({
          guid: 'new-guid',
          entries: [{ product: { code: 'p1' }, quantity: 3 }],
        } as Cart)
      );

      service.createSingleProductCart().subscribe((cart) => {
        expect(multiCartFacade.addEntry).toHaveBeenCalledWith(
          'anonymous',
          'new-guid',
          'p1',
          3,
          undefined
        );
        expect(cart.guid).toBe('new-guid');
        done();
      });
    });
  });
});
