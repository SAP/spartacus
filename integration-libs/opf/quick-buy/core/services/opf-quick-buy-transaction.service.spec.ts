/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { flush, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { StoreModule } from '@ngrx/store';
import {
  ActiveCartFacade,
  Cart,
  CartGuestUserFacade,
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  AuthService,
  BaseSiteService,
  EventService,
  RouterState,
  RoutingService,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { OpfGlobalMessageService } from '@spartacus/opf/base/root';
import {
  OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyLocation,
} from '@spartacus/opf/quick-buy/root';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { OpfQuickBuyActiveCartTransactionService } from './context/opf-quick-buy-active-cart-transaction.service';
import { OpfQuickBuySingleProductTransactionService } from './context/opf-quick-buy-single-product-transaction.service';
import { OpfQuickBuyTransactionService } from './opf-quick-buy-transaction.service';

describe('OpfQuickBuyTransactionService', () => {
  let service: OpfQuickBuyTransactionService;
  let singleProductTransactionService: any;
  let activeCartFacade: any;
  let checkoutDeliveryModesFacade: any;
  let checkoutDeliveryAddressFacade: any;
  let userAddressService: any;
  let multiCartFacade: any;
  let userIdService: any;
  let eventService: any;
  let checkoutBillingAddressFacade: any;
  let baseSiteService: any;
  let routingService: any;
  let opfGlobalMessageService: any;
  let authService: any;
  let cartGuestUserFacade: any;

  beforeEach(() => {
    activeCartFacade = {
      addEntry: vi.fn(),
      isStable: vi.fn(),
      takeActive: vi.fn(),
      getActive: vi.fn(),
      deleteCart: vi.fn(),
      takeActiveCartId: vi.fn(),
      getActiveCartId: vi.fn(),
      isGuestCart: vi.fn(),
    };
    checkoutDeliveryModesFacade = {
      getSupportedDeliveryModes: vi.fn(),
      setDeliveryMode: vi.fn(),
      getSelectedDeliveryModeState: vi.fn(),
    };
    checkoutDeliveryAddressFacade = {
      createAndSetAddress: vi.fn(),
      getDeliveryAddressState: vi.fn(),
    };
    userAddressService = { deleteUserAddress: vi.fn() };
    multiCartFacade = {
      deleteCart: vi.fn(),
      getCartIdByType: vi.fn(),
      createCart: vi.fn(),
      addEntry: vi.fn(),
      isStable: vi.fn(),
      loadCart: vi.fn(),
      getEntry: vi.fn(),
      removeEntry: vi.fn(),
      updateEntry: vi.fn(),
      reloadCart: vi.fn(),
    };
    userIdService = { getUserId: vi.fn(), takeUserId: vi.fn() };
    eventService = { get: vi.fn() };
    checkoutBillingAddressFacade = { setBillingAddress: vi.fn() };
    baseSiteService = { get: vi.fn() };
    routingService = { getRouterState: vi.fn() };
    opfGlobalMessageService = { disableGlobalMessage: vi.fn() };
    authService = { isUserLoggedIn: vi.fn() };
    cartGuestUserFacade = {
      createCartGuestUser: vi.fn(),
      updateCartGuestUser: vi.fn(),
    };
    singleProductTransactionService = {
      prepareTransactionCart: vi.fn(),
      getTransactionDeliveryType: vi.fn(),
      getTransactionDeliveryInfo: vi.fn(),
      checkStableCart: vi.fn(),
      getSupportedDeliveryModes: vi.fn(),
      setDeliveryAddress: vi.fn(),
      setBillingAddress: vi.fn(),
      getDeliveryAddress: vi.fn(),
      getCurrentCart: vi.fn(),
      getCurrentCartId: vi.fn(),
      getCurrentCartTotalPrice: vi.fn(),
      setDeliveryMode: vi.fn(),
      getSelectedDeliveryMode: vi.fn(),
      createCartGuestUser: vi.fn(),
      updateCartGuestUserEmail: vi.fn(),
      handleCartGuestUser: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        OpfQuickBuyTransactionService,
        OpfQuickBuyActiveCartTransactionService,
        {
          provide: OpfQuickBuySingleProductTransactionService,
          useValue: singleProductTransactionService,
        },
        { provide: ActiveCartFacade, useValue: activeCartFacade },
        {
          provide: CheckoutDeliveryModesFacade,
          useValue: checkoutDeliveryModesFacade,
        },
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: checkoutDeliveryAddressFacade,
        },
        { provide: UserAddressService, useValue: userAddressService },
        { provide: MultiCartFacade, useValue: multiCartFacade },
        { provide: UserIdService, useValue: userIdService },
        { provide: EventService, useValue: eventService },
        {
          provide: CheckoutBillingAddressFacade,
          useValue: checkoutBillingAddressFacade,
        },
        { provide: BaseSiteService, useValue: baseSiteService },
        { provide: RoutingService, useValue: routingService },
        { provide: OpfGlobalMessageService, useValue: opfGlobalMessageService },
        { provide: AuthService, useValue: authService },
        { provide: CartGuestUserFacade, useValue: cartGuestUserFacade },
      ],
    });

    service = TestBed.inject(OpfQuickBuyTransactionService);
    routingService.getRouterState.mockReturnValue(
      of({ state: { semanticRoute: 'cart' } } as RouterState)
    );
  });

  describe('checkStableCart', () => {
    it('should return true if the cart is stable', async () => {
      activeCartFacade.isStable.mockReturnValue(of(true));
      multiCartFacade.isStable.mockReturnValue(of(true));

      service.checkStableCart().subscribe((isStable) => {
        expect(isStable).toBeTruthy();
      });
    });
  });

  describe('getSupportedDeliveryModes', () => {
    it('should return an observable of delivery modes', async () => {
      const mockDeliveryModes: DeliveryMode[] = [
        { code: 'standard', name: 'Standard Delivery' },
        { code: 'express', name: 'Express Delivery' },
      ];

      checkoutDeliveryModesFacade.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );

      service.getSupportedDeliveryModes().subscribe((deliveryModes) => {
        expect(deliveryModes).toEqual(mockDeliveryModes);
      });
    });
  });

  describe('setDeliveryAddress', () => {
    it('should set the delivery address and return its ID', async () => {
      const mockAddress: Address = {};
      const mockAddressId = 'addressId';

      activeCartFacade.isStable.mockReturnValue(of(true));
      checkoutDeliveryAddressFacade.createAndSetAddress.mockReturnValue(
        of(null)
      );
      checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: { id: mockAddressId },
        })
      );

      service.setDeliveryAddress(mockAddress).subscribe((addressId) => {
        expect(addressId).toEqual(mockAddressId);
        expect(
          checkoutDeliveryAddressFacade.createAndSetAddress
        ).toHaveBeenCalledWith(mockAddress);
      });
    });

    it('should handle an undefined address', async () => {
      const mockAddress: Address = {};

      checkoutDeliveryAddressFacade.createAndSetAddress.mockReturnValue(
        of(null)
      );
      activeCartFacade.isStable.mockReturnValue(of(true));
      checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service.setDeliveryAddress(mockAddress).subscribe((result) => {
        expect(result).toEqual('');
      });
    });

    it('should handle an address without an id', async () => {
      const mockAddress: Address = {
        firstName: 'John',
        lastName: 'Doe',
      };

      checkoutDeliveryAddressFacade.createAndSetAddress.mockReturnValue(
        of(null)
      );
      activeCartFacade.isStable.mockReturnValue(of(true));
      checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockAddress,
        })
      );

      service.setDeliveryAddress(mockAddress).subscribe((result) => {
        expect(result).toEqual('');
      });
    });
  });

  describe('setBillingAddress', () => {
    it('should set the billing address and check if the cart is stable', async () => {
      const mockAddress: Address = {};
      checkoutBillingAddressFacade.setBillingAddress.mockReturnValue(of(true));

      activeCartFacade.isStable.mockReturnValue(of(true));

      service.setBillingAddress(mockAddress).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(
          checkoutBillingAddressFacade.setBillingAddress
        ).toHaveBeenCalledWith(mockAddress);
      });
    });

    it('should return false if setting the billing address fails', async () => {
      const mockAddress: Address = {};

      checkoutBillingAddressFacade.setBillingAddress.mockReturnValue(
        throwError(() => new Error('Setting address failed'))
      );

      service.setBillingAddress(mockAddress).subscribe(
        (result) => {
          expect(result).toBeFalsy();
          expect(
            checkoutBillingAddressFacade.setBillingAddress
          ).toHaveBeenCalledWith(mockAddress);
        },
        (error) => {
          expect(error).toBeDefined();
        }
      );
    });
  });

  describe('getCurrentCart', () => {
    it('should return an observable of the current cart', async () => {
      const mockCart: Cart = { guid: 'testId' };

      activeCartFacade.takeActive.mockReturnValue(of(mockCart));

      service.getCurrentCart().subscribe((cart) => {
        expect(cart.guid).toEqual(mockCart.guid);
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
      });
    });
  });

  describe('getCurrentCartId', () => {
    it('should return an observable of the current cart ID', async () => {
      const mockCartId = '12345';
      activeCartFacade.takeActiveCartId.mockReturnValue(of(mockCartId));

      service.getCurrentCartId().subscribe((cartId) => {
        expect(cartId).toEqual(mockCartId);
        expect(activeCartFacade.takeActiveCartId).toHaveBeenCalled();
      });
    });
  });

  describe('getCurrentCartTotalPrice', () => {
    it('should return an observable of the current cart total price', async () => {
      const mockTotalPrice = 100.5;
      const mockCart = { totalPrice: { value: mockTotalPrice } };

      activeCartFacade.takeActive.mockReturnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toEqual(mockTotalPrice);
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
      });
    });

    it('should return undefined if the cart does not have a total price', async () => {
      const mockCart = { totalPrice: undefined };

      activeCartFacade.takeActive.mockReturnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toBeUndefined();
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
      });
    });
  });

  describe('setDeliveryMode', () => {
    it('should set the delivery mode and return the selected mode', async () => {
      const mockMode = 'standard';
      const mockDeliveryMode: DeliveryMode = {
        code: mockMode,
        name: 'Standard Delivery',
      };

      checkoutDeliveryModesFacade.setDeliveryMode.mockReturnValue(
        of(mockDeliveryMode)
      );

      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockDeliveryMode,
        })
      );

      service.setDeliveryMode(mockMode).subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mockDeliveryMode);
        expect(
          checkoutDeliveryModesFacade.setDeliveryMode
        ).toHaveBeenCalledWith(mockMode);
      });
    });

    it('should return undefined if setting the delivery mode fails', async () => {
      const mockMode = 'express';

      checkoutDeliveryModesFacade.setDeliveryMode.mockReturnValue(
        throwError(new Error('Failed to set mode'))
      );

      service.setDeliveryMode(mockMode).subscribe(
        (selectedMode) => {
          expect(selectedMode).toBeUndefined();
          expect(
            checkoutDeliveryModesFacade.setDeliveryMode
          ).toHaveBeenCalledWith(mockMode);
        },
        (error) => {
          expect(error).toBeDefined();
        }
      );
    });
  });

  describe('getSelectedDeliveryMode', () => {
    it('should return an observable of the selected delivery mode', async () => {
      const mockDeliveryMode: DeliveryMode = {
        code: 'standard',
        name: 'Standard Delivery',
      };

      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockDeliveryMode,
        })
      );

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mockDeliveryMode);
      });
    });

    it('should return undefined if no delivery mode is selected', async () => {
      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.mockReturnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toBeUndefined();
      });
    });
  });

  describe('deleteUserAddresses', () => {
    it('should call `deleteUserAddress` for each address ID for logged in users', () => {
      const addrIds = ['addr1', 'addr2', 'addr3'];

      authService.isUserLoggedIn.mockReturnValue(of(true));

      service.deleteUserAddresses(addrIds);

      addrIds.forEach((addrId) => {
        expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith(
          addrId
        );
      });
    });

    it('should not call `deleteUserAddress` for unauthenticated users', () => {
      const addrIds = ['addr1', 'addr2', 'addr3'];

      authService.isUserLoggedIn.mockReturnValue(of(false));

      service.deleteUserAddresses(addrIds);

      expect(userAddressService.deleteUserAddress).toHaveBeenCalledTimes(0);
    });

    it('should disable global messages for address deletion success', () => {
      const addrIds = ['addr1', 'addr2'];

      authService.isUserLoggedIn.mockReturnValue(of(true));

      service.deleteUserAddresses(addrIds);

      expect(opfGlobalMessageService.disableGlobalMessage).toHaveBeenCalledWith(
        ['addressForm.userAddressDeleteSuccess']
      );
    });
  });

  describe('getMerchantName', () => {
    it('should return baseSite name', async () => {
      const mockName = 'Store';
      baseSiteService.get.mockReturnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(mockName);
      });
    });
    it('should return default MerchantName name when empty', async () => {
      const mockName = undefined;
      baseSiteService.get.mockReturnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME);
      });
    });
  });

  describe('resolveContext', () => {
    it('should re-read route on each call without caching stale values', async () => {
      routingService.getRouterState.mockReturnValue(
        of({ state: { semanticRoute: 'product' } } as RouterState)
      );

      service['resolveContext']().subscribe((first) => {
        expect(first).toBe(OpfQuickBuyLocation.PRODUCT);

        routingService.getRouterState.mockReturnValue(
          of({ state: { semanticRoute: 'cart' } } as RouterState)
        );

        service['resolveContext']().subscribe((second) => {
          expect(second).toBe(OpfQuickBuyLocation.CART);
        });
      });
    });
  });

  describe('getTransactionLocationContext', () => {
    it('should return OpfQuickBuyLocation', () => {
      const routerState = new BehaviorSubject<RouterState>({
        state: { semanticRoute: 'cart' },
      } as RouterState);
      routingService.getRouterState.mockReturnValue(routerState);

      service.getTransactionLocationContext().subscribe((context) => {
        expect(context).toBe(OpfQuickBuyLocation.CART);
      });
    });
  });

  describe('createCartGuestUser', () => {
    it('should call `createCartGuestUser` from `CartGuestUserFacade` with params', () => {
      userIdService.takeUserId.mockReturnValue(of('userId'));
      activeCartFacade.takeActiveCartId.mockReturnValue(of('cartId'));
      multiCartFacade.reloadCart.mockReturnValue();
      cartGuestUserFacade.createCartGuestUser.mockReturnValue(of({}));

      service
        .createCartGuestUser()
        .subscribe((result) => {
          expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
            'userId',
            'cartId'
          );
          expect(result).toBe(true);
          expect(multiCartFacade.reloadCart).toHaveBeenCalled();
        })
        .unsubscribe();
    });
  });

  describe('updateCartGuestUserEmail', () => {
    it('should call `updateCartGuestUser` from `CartGuestUserFacade` with params', () => {
      userIdService.takeUserId.mockReturnValue(of('userId'));
      activeCartFacade.takeActiveCartId.mockReturnValue(of('cartId'));
      multiCartFacade.reloadCart.mockReturnValue();
      cartGuestUserFacade.updateCartGuestUser.mockReturnValue(of({}));
      activeCartFacade.isGuestCart.mockReturnValue(of(true));
      const mockEmailAddr = 'mockemail@mockemail.com';
      service
        .updateCartGuestUserEmail(mockEmailAddr)
        .subscribe((result) => {
          expect(cartGuestUserFacade.updateCartGuestUser).toHaveBeenCalledWith(
            'userId',
            'cartId',
            { email: mockEmailAddr }
          );
          expect(result).toBe(true);
          expect(multiCartFacade.reloadCart).toHaveBeenCalled();
        })
        .unsubscribe();
    });

    it('should return false when no email', () => {
      userIdService.takeUserId.mockReturnValue(of('userId'));
      activeCartFacade.takeActiveCartId.mockReturnValue(of('cartId'));
      multiCartFacade.reloadCart.mockReturnValue();
      cartGuestUserFacade.updateCartGuestUser.mockReturnValue(of({}));
      activeCartFacade.isGuestCart.mockReturnValue(of(true));
      const mockEmailAddr = '';
      service
        .updateCartGuestUserEmail(mockEmailAddr)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          expect(
            cartGuestUserFacade.updateCartGuestUser
          ).not.toHaveBeenCalled();
        })
        .unsubscribe();
    });
  });

  describe('handleCartGuestUser', () => {
    it('should call `createCartGuestUser` if cart belongs to an anonymous user', () => {
      authService.isUserLoggedIn.mockReturnValue(of(false));
      activeCartFacade.isGuestCart.mockReturnValue(of(false));
      userIdService.takeUserId.mockReturnValue(of('userId'));
      activeCartFacade.takeActiveCartId.mockReturnValue(of('cartId'));
      multiCartFacade.reloadCart.mockReturnValue();
      cartGuestUserFacade.createCartGuestUser.mockReturnValue(of({}));

      service
        .handleCartGuestUser()
        .subscribe((result) => {
          expect(cartGuestUserFacade.createCartGuestUser).toHaveBeenCalledWith(
            'userId',
            'cartId'
          );
          expect(result).toBe(true);
          expect(multiCartFacade.reloadCart).toHaveBeenCalled();
        })
        .unsubscribe();
    });
  });

  describe('single product context delegation', () => {
    const mockCart = { guid: 'product-cart' } as Cart;
    const mockAddress: Address = { firstName: 'John' };
    const mockDeliveryMode: DeliveryMode = {
      code: 'standard',
      name: 'Standard',
    };

    beforeEach(() => {
      routingService.getRouterState.mockReturnValue(
        of({ state: { semanticRoute: 'product' } } as RouterState)
      );
      singleProductTransactionService.prepareTransactionCart.mockReturnValue(
        of(mockCart)
      );
      singleProductTransactionService.checkStableCart.mockReturnValue(of(true));
      singleProductTransactionService.getSupportedDeliveryModes.mockReturnValue(
        of([mockDeliveryMode])
      );
      singleProductTransactionService.setDeliveryAddress.mockReturnValue(
        of('address-id')
      );
      singleProductTransactionService.setBillingAddress.mockReturnValue(
        of(true)
      );
      singleProductTransactionService.getDeliveryAddress.mockReturnValue(
        of(mockAddress)
      );
      singleProductTransactionService.getCurrentCart.mockReturnValue(
        of(mockCart)
      );
      singleProductTransactionService.getCurrentCartId.mockReturnValue(
        of('product-cart')
      );
      singleProductTransactionService.getCurrentCartTotalPrice.mockReturnValue(
        of(99)
      );
      singleProductTransactionService.setDeliveryMode.mockReturnValue(
        of(mockDeliveryMode)
      );
      singleProductTransactionService.getSelectedDeliveryMode.mockReturnValue(
        of(mockDeliveryMode)
      );
      singleProductTransactionService.createCartGuestUser.mockReturnValue(
        of(true)
      );
      singleProductTransactionService.updateCartGuestUserEmail.mockReturnValue(
        of(true)
      );
      singleProductTransactionService.handleCartGuestUser.mockReturnValue(
        of(true)
      );
      singleProductTransactionService.getTransactionDeliveryType.mockReturnValue(
        of(OpfQuickBuyDeliveryType.SHIPPING)
      );
      singleProductTransactionService.getTransactionDeliveryInfo.mockReturnValue(
        of({ type: OpfQuickBuyDeliveryType.SHIPPING })
      );
    });

    it('should delegate all cart operations to single product transaction service', async () => {
      service.prepareTransactionCart().subscribe((cart) => {
        expect(cart).toBe(mockCart);
        expect(
          singleProductTransactionService.prepareTransactionCart
        ).toHaveBeenCalled();
      });

      service.checkStableCart().subscribe((isStable) => {
        expect(isStable).toBe(true);
        expect(
          singleProductTransactionService.checkStableCart
        ).toHaveBeenCalled();
      });

      service.getSupportedDeliveryModes().subscribe((modes) => {
        expect(modes).toEqual([mockDeliveryMode]);
      });

      service.setDeliveryAddress(mockAddress).subscribe((addressId) => {
        expect(addressId).toBe('address-id');
        expect(
          singleProductTransactionService.setDeliveryAddress
        ).toHaveBeenCalledWith(mockAddress);
      });

      service.setBillingAddress(mockAddress).subscribe((result) => {
        expect(result).toBe(true);
      });

      service.getDeliveryAddress().subscribe((address) => {
        expect(address).toBe(mockAddress);
      });

      service.getCurrentCart().subscribe((cart) => {
        expect(cart).toBe(mockCart);
      });

      service.getCurrentCartId().subscribe((cartId) => {
        expect(cartId).toBe('product-cart');
      });

      service.getCurrentCartTotalPrice().subscribe((total) => {
        expect(total).toBe(99);
      });

      service.setDeliveryMode('standard').subscribe((mode) => {
        expect(mode).toBe(mockDeliveryMode);
      });

      service.getSelectedDeliveryMode().subscribe((mode) => {
        expect(mode).toBe(mockDeliveryMode);
      });

      service.getTransactionDeliveryType().subscribe((type) => {
        expect(type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
      });

      service.getTransactionDeliveryInfo().subscribe((info) => {
        expect(info.type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
      });

      service.createCartGuestUser().subscribe();
      service.updateCartGuestUserEmail('guest@test.com').subscribe();
      service.handleCartGuestUser().subscribe();
    });
  });
});
