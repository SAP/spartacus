/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
  let multiCartFacade: any;
  let userIdService: any;
  let routingService: any;
  let globalMessageService: any;
  let cartGuestUserFacade: any;
  let authService: any;
  let activeCartFacade: any;
  let singleProductCartOptions: any;
  let cartConnector: any;

  function initCart(cart: Cart = { guid: 'cart-guid' } as Cart): void {
    service['cartId'] = 'cart-guid';
    service['userId'] = 'anonymous';
    multiCartFacade.getCart.mockReturnValue(of(cart));
    multiCartFacade.isStable.mockReturnValue(of(true));
  }

  function mockReloadCart(cart: Cart = { guid: 'cart-guid' } as Cart): void {
    vi.spyOn(service as any, 'reloadCartAndWait').mockReturnValue(of(cart));
  }

  beforeEach(() => {
    multiCartFacade = {
      createCart: vi.fn(),
      addEntry: vi.fn(),
      isStable: vi.fn(),
      getCart: vi.fn(),
      reloadCart: vi.fn(),
      getCartEntity: vi.fn(),
      loadCart: vi.fn(),
    };
    userIdService = { takeUserId: vi.fn() };
    routingService = { getRouterState: vi.fn() };
    globalMessageService = { add: vi.fn() };
    cartGuestUserFacade = {
      createCartGuestUser: vi.fn(),
      updateCartGuestUser: vi.fn(),
    };
    authService = { isUserLoggedIn: vi.fn() };
    activeCartFacade = { isGuestCart: vi.fn() };
    singleProductCartOptions = { getSingleProductCartOptions: vi.fn() };
    cartConnector = {
      getSupportedDeliveryModes: vi.fn(),
      createDeliveryAddress: vi.fn(),
      setBillingAddress: vi.fn(),
      setDeliveryMode: vi.fn(),
      getSelectedDeliveryMode: vi.fn(),
    };

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
    it('should return current cart, cart id and total price', async () => {
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
      });
    });
  });

  describe('delivery type', () => {
    it('should return shipping when cart has delivery items', async () => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 2 } as Cart);

      service.getTransactionDeliveryType().subscribe((type) => {
        expect(type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
      });
    });

    it('should return pickup when cart has no delivery items', async () => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 0 } as Cart);

      service.getTransactionDeliveryType().subscribe((type) => {
        expect(type).toBe(OpfQuickBuyDeliveryType.PICKUP);
      });
    });

    it('should return delivery info from delivery type', async () => {
      initCart({ guid: 'cart-guid', deliveryItemsQuantity: 1 } as Cart);

      service.getTransactionDeliveryInfo().subscribe((info) => {
        expect(info.type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
      });
    });
  });

  describe('checkStableCart', () => {
    it('should return true when cart is stable', async () => {
      initCart();

      service.checkStableCart().subscribe((isStable) => {
        expect(isStable).toBe(true);
      });
    });
  });

  describe('connector operations', () => {
    beforeEach(() => {
      initCart();
    });

    it('should return supported delivery modes', async () => {
      const modes = [{ code: 'standard', name: 'Standard' }];
      cartConnector.getSupportedDeliveryModes.mockReturnValue(of(modes));

      service.getSupportedDeliveryModes().subscribe((result) => {
        expect(result).toEqual(modes);
        expect(cartConnector.getSupportedDeliveryModes).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
      });
    });

    it('should set delivery address and reload cart', async () => {
      const address = { firstName: 'John' };
      mockReloadCart();
      cartConnector.createDeliveryAddress.mockReturnValue(
        of({ id: 'addr-1', ...address })
      );

      service.setDeliveryAddress(address).subscribe((addressId) => {
        expect(addressId).toBe('addr-1');
        expect(service['reloadCartAndWait']).toHaveBeenCalled();
      });
    });

    it('should set billing address and reload cart', async () => {
      const address = { firstName: 'John' };
      mockReloadCart();
      cartConnector.setBillingAddress.mockReturnValue(of({}));

      service.setBillingAddress(address).subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should set delivery mode and return selected mode', async () => {
      const mode = { code: 'standard', name: 'Standard' };
      mockReloadCart();
      cartConnector.setDeliveryMode.mockReturnValue(of({}));
      cartConnector.getSelectedDeliveryMode.mockReturnValue(of(mode));

      service.setDeliveryMode('standard').subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mode);
      });
    });

    it('should return selected delivery mode', async () => {
      const mode = { code: 'standard', name: 'Standard' };
      cartConnector.getSelectedDeliveryMode.mockReturnValue(of(mode));

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mode);
      });
    });
  });

  describe('createCartGuestUser', () => {
    it('should create guest user and reload cart', async () => {
      initCart();
      cartGuestUserFacade.createCartGuestUser.mockReturnValue(of({}));

      service.createCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
        expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
        expect(multiCartFacade.reloadCart).toHaveBeenCalledWith('cart-guid');
      });
    });
  });

  describe('prepareTransactionCart', () => {
    it('should create cart, handle guest user and return current cart', async () => {
      const cart = { guid: 'new-guid' } as Cart;
      vi.spyOn(service, 'createSingleProductCart').mockReturnValue(of(cart));
      vi.spyOn(service, 'handleCartGuestUser').mockReturnValue(of(true));
      vi.spyOn(service, 'getCurrentCart').mockReturnValue(of(cart));

      service.prepareTransactionCart().subscribe((result) => {
        expect(result).toBe(cart);
        expect(service.createSingleProductCart).toHaveBeenCalled();
        expect(service.handleCartGuestUser).toHaveBeenCalled();
        expect(service.getCurrentCart).toHaveBeenCalled();
      });
    });
  });

  describe('handleCartGuestUser', () => {
    it('should return true when cart is not initialized', async () => {
      service.handleCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
      });
    });

    it('should create guest user for anonymous non-guest cart', async () => {
      service['cartId'] = 'cart-guid';
      service['userId'] = 'anonymous';
      authService.isUserLoggedIn.mockReturnValue(of(false));
      activeCartFacade.isGuestCart.mockReturnValue(of(false));
      multiCartFacade.getCart.mockReturnValue(
        of({ guid: 'cart-guid' } as Cart)
      );
      cartGuestUserFacade.createCartGuestUser.mockReturnValue(of({}));

      service.handleCartGuestUser().subscribe((result) => {
        expect(result).toBe(true);
        expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
          'anonymous',
          'cart-guid'
        );
        expect(multiCartFacade.reloadCart).toHaveBeenCalledWith('cart-guid');
      });
    });
  });

  describe('updateCartGuestUserEmail', () => {
    beforeEach(() => {
      service['cartId'] = 'cart-guid';
      service['userId'] = 'anonymous';
      multiCartFacade.getCart.mockReturnValue(
        of({ guid: 'cart-guid' } as Cart)
      );
    });

    it('should update email for guest cart', async () => {
      activeCartFacade.isGuestCart.mockReturnValue(of(true));
      cartGuestUserFacade.updateCartGuestUser.mockReturnValue(of({}));

      service
        .updateCartGuestUserEmail('guest@example.com')
        .subscribe((result) => {
          expect(result).toBe(true);
          expect(cartGuestUserFacade.updateCartGuestUser).toHaveBeenCalledWith(
            'anonymous',
            'cart-guid',
            { email: 'guest@example.com' }
          );
        });
    });

    it('should return false when cart is not a guest cart', async () => {
      activeCartFacade.isGuestCart.mockReturnValue(of(false));

      service
        .updateCartGuestUserEmail('guest@example.com')
        .subscribe((result) => {
          expect(result).toBe(false);
          expect(
            cartGuestUserFacade.updateCartGuestUser
          ).not.toHaveBeenCalled();
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
    it('should skip previously created cart and add entry to the new cart', async () => {
      service['cartId'] = 'old-guid';
      routingService.getRouterState.mockReturnValue(
        of({ state: { params: { productCode: 'p1' } } } as any)
      );
      singleProductCartOptions.getSingleProductCartOptions.mockReturnValue(
        of({ quantity: 3 })
      );
      userIdService.takeUserId.mockReturnValue(of('anonymous'));
      multiCartFacade.createCart.mockReturnValue(
        concat(
          of({ guid: 'old-guid' } as Cart),
          of({ guid: 'new-guid' } as Cart)
        )
      );
      multiCartFacade.isStable.mockReturnValue(of(true));
      multiCartFacade.getCart.mockReturnValue(
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
      });
    });
  });
});
