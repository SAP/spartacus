/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeAsync, flush, TestBed } from '@angular/core/testing';
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
  OpfQuickBuyLocation,
} from '@spartacus/opf/quick-buy/root';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { OpfQuickBuyTransactionService } from './opf-quick-buy-transaction.service';

describe('OpfQuickBuyTransactionService', () => {
  let service: OpfQuickBuyTransactionService;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let checkoutDeliveryModesFacade: jasmine.SpyObj<CheckoutDeliveryModesFacade>;
  let checkoutDeliveryAddressFacade: jasmine.SpyObj<CheckoutDeliveryAddressFacade>;
  let userAddressService: jasmine.SpyObj<UserAddressService>;
  let multiCartFacade: jasmine.SpyObj<MultiCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let eventService: jasmine.SpyObj<EventService>;
  let checkoutBillingAddressFacade: jasmine.SpyObj<CheckoutBillingAddressFacade>;
  let baseSiteService: jasmine.SpyObj<BaseSiteService>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let opfGlobalMessageService: jasmine.SpyObj<OpfGlobalMessageService>;
  let authService: jasmine.SpyObj<AuthService>;
  let cartGuestUserFacade: jasmine.SpyObj<CartGuestUserFacade>;

  beforeEach(() => {
    activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'addEntry',
      'isStable',
      'takeActive',
      'getActive',
      'deleteCart',
      'takeActiveCartId',
      'getActiveCartId',
      'isGuestCart',
    ]);
    checkoutDeliveryModesFacade = jasmine.createSpyObj(
      'CheckoutDeliveryModesFacade',
      [
        'getSupportedDeliveryModes',
        'setDeliveryMode',
        'getSelectedDeliveryModeState',
      ]
    );
    checkoutDeliveryAddressFacade = jasmine.createSpyObj(
      'CheckoutDeliveryAddressFacade',
      ['createAndSetAddress', 'getDeliveryAddressState']
    );
    userAddressService = jasmine.createSpyObj('UserAddressService', [
      'deleteUserAddress',
    ]);
    multiCartFacade = jasmine.createSpyObj('MultiCartFacade', [
      'deleteCart',
      'getCartIdByType',
      'createCart',
      'addEntry',
      'isStable',
      'loadCart',
      'getEntry',
      'removeEntry',
      'updateEntry',
      'reloadCart',
    ]);
    userIdService = jasmine.createSpyObj('UserIdService', [
      'getUserId',
      'takeUserId',
    ]);
    eventService = jasmine.createSpyObj('EventService', ['get']);
    checkoutBillingAddressFacade = jasmine.createSpyObj(
      'CheckoutBillingAddressFacade',
      ['setBillingAddress']
    );
    baseSiteService = jasmine.createSpyObj('BaseSiteService', ['get']);
    routingService = jasmine.createSpyObj('RoutingService', ['getRouterState']);
    opfGlobalMessageService = jasmine.createSpyObj('OpfGlobalMessageService', [
      'disableGlobalMessage',
    ]);
    authService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
    cartGuestUserFacade = jasmine.createSpyObj('CartGuestUserFacade', [
      'createCartGuestUser',
      'updateCartGuestUser',
    ]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        OpfQuickBuyTransactionService,
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
  });

  describe('checkStableCart', () => {
    it('should return true if the cart is stable', fakeAsync(() => {
      activeCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.isStable.and.returnValue(of(true));

      service.checkStableCart().subscribe((isStable) => {
        expect(isStable).toBeTruthy();
        flush();
      });
    }));
  });

  describe('getSupportedDeliveryModes', () => {
    it('should return an observable of delivery modes', (done) => {
      const mockDeliveryModes: DeliveryMode[] = [
        { code: 'standard', name: 'Standard Delivery' },
        { code: 'express', name: 'Express Delivery' },
      ];

      checkoutDeliveryModesFacade.getSupportedDeliveryModes.and.returnValue(
        of(mockDeliveryModes)
      );

      service.getSupportedDeliveryModes().subscribe((deliveryModes) => {
        expect(deliveryModes).toEqual(mockDeliveryModes);
        done();
      });
    });
  });

  describe('setDeliveryAddress', () => {
    it('should set the delivery address and return its ID', (done) => {
      const mockAddress: Address = {};
      const mockAddressId = 'addressId';

      activeCartFacade.isStable.and.returnValue(of(true));
      checkoutDeliveryAddressFacade.createAndSetAddress.and.returnValue(
        of(null)
      );
      checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
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
        done();
      });
    });

    it('should handle an undefined address', (done) => {
      const mockAddress: Address = {};

      checkoutDeliveryAddressFacade.createAndSetAddress.and.returnValue(
        of(null)
      );
      activeCartFacade.isStable.and.returnValue(of(true));
      checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service.setDeliveryAddress(mockAddress).subscribe((result) => {
        expect(result).toEqual('');
        done();
      });
    });

    it('should handle an address without an id', (done) => {
      const mockAddress: Address = {
        firstName: 'John',
        lastName: 'Doe',
      };

      checkoutDeliveryAddressFacade.createAndSetAddress.and.returnValue(
        of(null)
      );
      activeCartFacade.isStable.and.returnValue(of(true));
      checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
        of({
          loading: false,
          error: false,
          data: mockAddress,
        })
      );

      service.setDeliveryAddress(mockAddress).subscribe((result) => {
        expect(result).toEqual('');
        done();
      });
    });
  });

  describe('setBillingAddress', () => {
    it('should set the billing address and check if the cart is stable', (done) => {
      const mockAddress: Address = {};
      checkoutBillingAddressFacade.setBillingAddress.and.returnValue(of(true));

      activeCartFacade.isStable.and.returnValue(of(true));

      service.setBillingAddress(mockAddress).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(
          checkoutBillingAddressFacade.setBillingAddress
        ).toHaveBeenCalledWith(mockAddress);
        done();
      });
    });

    it('should return false if setting the billing address fails', (done) => {
      const mockAddress: Address = {};

      checkoutBillingAddressFacade.setBillingAddress.and.returnValue(
        throwError(() => new Error('Setting address failed'))
      );

      service.setBillingAddress(mockAddress).subscribe(
        (result) => {
          expect(result).toBeFalsy();
          expect(
            checkoutBillingAddressFacade.setBillingAddress
          ).toHaveBeenCalledWith(mockAddress);
          done();
        },
        (error) => {
          expect(error).toBeDefined();
          done();
        }
      );
    });
  });

  describe('getCurrentCart', () => {
    it('should return an observable of the current cart', (done) => {
      const mockCart: Cart = { guid: 'testId' };

      activeCartFacade.takeActive.and.returnValue(of(mockCart));

      service.getCurrentCart().subscribe((cart) => {
        expect(cart.guid).toEqual(mockCart.guid);
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getCurrentCartId', () => {
    it('should return an observable of the current cart ID', (done) => {
      const mockCartId = '12345';
      activeCartFacade.takeActiveCartId.and.returnValue(of(mockCartId));

      service.getCurrentCartId().subscribe((cartId) => {
        expect(cartId).toEqual(mockCartId);
        expect(activeCartFacade.takeActiveCartId).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getCurrentCartTotalPrice', () => {
    it('should return an observable of the current cart total price', (done) => {
      const mockTotalPrice = 100.5;
      const mockCart = { totalPrice: { value: mockTotalPrice } };

      activeCartFacade.takeActive.and.returnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toEqual(mockTotalPrice);
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
        done();
      });
    });

    it('should return undefined if the cart does not have a total price', (done) => {
      const mockCart = { totalPrice: undefined };

      activeCartFacade.takeActive.and.returnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toBeUndefined();
        expect(activeCartFacade.takeActive).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('setDeliveryMode', () => {
    it('should set the delivery mode and return the selected mode', (done) => {
      const mockMode = 'standard';
      const mockDeliveryMode: DeliveryMode = {
        code: mockMode,
        name: 'Standard Delivery',
      };

      checkoutDeliveryModesFacade.setDeliveryMode.and.returnValue(
        of(mockDeliveryMode)
      );

      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.and.returnValue(
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
        done();
      });
    });

    it('should return undefined if setting the delivery mode fails', (done) => {
      const mockMode = 'express';

      checkoutDeliveryModesFacade.setDeliveryMode.and.returnValue(
        throwError(new Error('Failed to set mode'))
      );

      service.setDeliveryMode(mockMode).subscribe(
        (selectedMode) => {
          expect(selectedMode).toBeUndefined();
          expect(
            checkoutDeliveryModesFacade.setDeliveryMode
          ).toHaveBeenCalledWith(mockMode);
          done();
        },
        (error) => {
          expect(error).toBeDefined();
          done();
        }
      );
    });
  });

  describe('getSelectedDeliveryMode', () => {
    it('should return an observable of the selected delivery mode', (done) => {
      const mockDeliveryMode: DeliveryMode = {
        code: 'standard',
        name: 'Standard Delivery',
      };

      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.and.returnValue(
        of({
          loading: false,
          error: false,
          data: mockDeliveryMode,
        })
      );

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toEqual(mockDeliveryMode);
        done();
      });
    });

    it('should return undefined if no delivery mode is selected', (done) => {
      checkoutDeliveryModesFacade.getSelectedDeliveryModeState.and.returnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service.getSelectedDeliveryMode().subscribe((selectedMode) => {
        expect(selectedMode).toBeUndefined();
        done();
      });
    });
  });

  describe('deleteUserAddresses', () => {
    it('should call `deleteUserAddress` for each address ID for logged in users', () => {
      const addrIds = ['addr1', 'addr2', 'addr3'];

      authService.isUserLoggedIn.and.returnValue(of(true));

      service.deleteUserAddresses(addrIds);

      addrIds.forEach((addrId) => {
        expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith(
          addrId
        );
      });
    });

    it('should not call `deleteUserAddress` for unauthenticated users', () => {
      const addrIds = ['addr1', 'addr2', 'addr3'];

      authService.isUserLoggedIn.and.returnValue(of(false));

      service.deleteUserAddresses(addrIds);

      expect(userAddressService.deleteUserAddress).toHaveBeenCalledTimes(0);
    });

    it('should disable global messages for address deletion success', () => {
      const addrIds = ['addr1', 'addr2'];

      authService.isUserLoggedIn.and.returnValue(of(true));

      service.deleteUserAddresses(addrIds);

      expect(opfGlobalMessageService.disableGlobalMessage).toHaveBeenCalledWith(
        ['addressForm.userAddressDeleteSuccess']
      );
    });
  });

  describe('getMerchantName', () => {
    it('should return baseSite name', (done) => {
      const mockName = 'Store';
      baseSiteService.get.and.returnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(mockName);
        done();
      });
    });
    it('should return default MerchantName name when empty', (done) => {
      const mockName = undefined;
      baseSiteService.get.and.returnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME);
        done();
      });
    });
  });

  describe('getTransactionLocationContext', () => {
    it('should return OpfQuickBuyLocation', () => {
      const routerState = new BehaviorSubject<RouterState>({
        state: { semanticRoute: 'cart' },
      } as RouterState);
      routingService.getRouterState.and.returnValue(routerState);

      service.getTransactionLocationContext().subscribe((context) => {
        expect(context).toBe(OpfQuickBuyLocation.CART);
      });
    });
  });

  describe('createCartGuestUser', () => {
    it('should call `createCartGuestUser` from `CartGuestUserFacade` with params', () => {
      userIdService.takeUserId.and.returnValue(of('userId'));
      activeCartFacade.takeActiveCartId.and.returnValue(of('cartId'));
      multiCartFacade.reloadCart.and.returnValue();
      cartGuestUserFacade.createCartGuestUser.and.returnValue(of({}));

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
      userIdService.takeUserId.and.returnValue(of('userId'));
      activeCartFacade.takeActiveCartId.and.returnValue(of('cartId'));
      multiCartFacade.reloadCart.and.returnValue();
      cartGuestUserFacade.updateCartGuestUser.and.returnValue(of({}));
      activeCartFacade.isGuestCart.and.returnValue(of(true));
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
      userIdService.takeUserId.and.returnValue(of('userId'));
      activeCartFacade.takeActiveCartId.and.returnValue(of('cartId'));
      multiCartFacade.reloadCart.and.returnValue();
      cartGuestUserFacade.updateCartGuestUser.and.returnValue(of({}));
      activeCartFacade.isGuestCart.and.returnValue(of(true));
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
      authService.isUserLoggedIn.and.returnValue(of(false));
      activeCartFacade.isGuestCart.and.returnValue(of(false));
      userIdService.takeUserId.and.returnValue(of('userId'));
      activeCartFacade.takeActiveCartId.and.returnValue(of('cartId'));
      multiCartFacade.reloadCart.and.returnValue();
      cartGuestUserFacade.createCartGuestUser.and.returnValue(of({}));

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
});
