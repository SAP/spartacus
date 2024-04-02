/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  Cart,
  DeleteCartSuccessEvent,
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
  EventService,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import {
  CartHandlerState,
  OpfQuickBuyLocation,
  QuickBuyTransactionDetails,
} from '@spartacus/opf/base/root';
import { of, throwError } from 'rxjs';
import {
  OpfGlobalMessageService,
  OpfMiniCartComponentService,
} from '../../root/services';
import { OpfCartHandlerService } from './opf-cart-handler.service';

describe('OpfCartHandlerService', () => {
  let service: OpfCartHandlerService;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let checkoutDeliveryModesFacade: jasmine.SpyObj<CheckoutDeliveryModesFacade>;
  let checkoutDeliveryAddressFacade: jasmine.SpyObj<CheckoutDeliveryAddressFacade>;
  let userAddressService: jasmine.SpyObj<UserAddressService>;
  let multiCartFacade: jasmine.SpyObj<MultiCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let eventService: jasmine.SpyObj<EventService>;
  let checkoutBillingAddressFacade: jasmine.SpyObj<CheckoutBillingAddressFacade>;
  let opfGlobalMessageService: jasmine.SpyObj<OpfGlobalMessageService>;
  let opfMiniCartComponentService: jasmine.SpyObj<OpfMiniCartComponentService>;

  beforeEach(() => {
    activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'addEntry',
      'isStable',
      'takeActive',
      'getActive',
      'deleteCart',
      'takeActiveCartId',
      'getActiveCartId',
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
    opfGlobalMessageService = jasmine.createSpyObj('OpfGlobalMessageService', [
      'disableGlobalMessage',
    ]);
    opfMiniCartComponentService = jasmine.createSpyObj(
      'OpfMiniCartComponentService',
      ['blockUpdate']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfCartHandlerService,
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
        { provide: OpfGlobalMessageService, useValue: opfGlobalMessageService },
        {
          provide: OpfMiniCartComponentService,
          useValue: opfMiniCartComponentService,
        },
      ],
    });

    service = TestBed.inject(OpfCartHandlerService);
  });

  describe('addProductToCart', () => {
    it('should create, addEntry & load new cart when initial cart exists', (done) => {
      const productCode = 'testProduct';
      const quantity = 1;
      const pickupStore = 'testStore';
      const mockCartId = 'mockCartId';
      const mockUserId = 'mockUserId';
      const mockCart: Cart = { guid: 'testId', code: mockCartId };
      const mockCreateCartInput = {
        userId: mockUserId,
        extraData: { active: false },
      };
      const mockLoadCartInput = {
        cartId: mockCartId,
        userId: mockUserId,
        extraData: { active: true },
      };

      opfMiniCartComponentService.blockUpdate.and.callThrough();
      multiCartFacade.addEntry.and.callThrough();
      multiCartFacade.loadCart.and.callThrough();
      activeCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.getCartIdByType.and.returnValue(of(mockCartId));
      multiCartFacade.createCart.and.returnValue(of(mockCart));
      userIdService.takeUserId.and.returnValue(of(mockUserId));

      service
        .addProductToCart(productCode, quantity, pickupStore)
        .subscribe((result) => {
          expect(multiCartFacade.addEntry).toHaveBeenCalledWith(
            mockUserId,
            mockCartId,
            productCode,
            quantity,
            pickupStore
          );
          expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
            true
          );
          expect(multiCartFacade.createCart).toHaveBeenCalledWith(
            mockCreateCartInput
          );
          expect(activeCartFacade.addEntry).not.toHaveBeenCalled();
          expect(multiCartFacade.addEntry).toHaveBeenCalledWith(
            mockUserId,
            mockCartId,
            productCode,
            quantity,
            pickupStore
          );
          expect(multiCartFacade.createCart).toHaveBeenCalledWith(
            mockCreateCartInput
          );
          expect(multiCartFacade.loadCart).toHaveBeenCalledWith(
            mockLoadCartInput
          );
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should call addEntry and check if the cart is stable when no initial cart', (done) => {
      const productCode = 'testProduct';
      const quantity = 1;
      const pickupStore = 'testStore';
      const mockInitialCartId = '';
      const mockCartId = 'mockCartId';
      const mockUserId = 'mockUserId';
      const mockCart: Cart = { guid: 'testId', code: mockCartId };

      opfMiniCartComponentService.blockUpdate.and.callThrough();
      multiCartFacade.addEntry.and.callThrough();
      multiCartFacade.loadCart.and.callThrough();
      activeCartFacade.isStable.and.returnValue(of(true));
      activeCartFacade.takeActiveCartId.and.returnValue(of(mockCartId));
      multiCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.getCartIdByType.and.returnValue(of(mockInitialCartId));
      multiCartFacade.createCart.and.returnValue(of(mockCart));
      userIdService.takeUserId.and.returnValue(of(mockUserId));

      service
        .addProductToCart(productCode, quantity, pickupStore)
        .subscribe((result) => {
          expect(activeCartFacade.isStable).toHaveBeenCalled();
          expect(activeCartFacade.addEntry).toHaveBeenCalled();
          expect(activeCartFacade.takeActiveCartId).toHaveBeenCalled();
          expect(multiCartFacade.addEntry).not.toHaveBeenCalled();
          expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
            true
          );

          expect(result).toBeTruthy();
          done();
        });
    });
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

      activeCartFacade.getActive.and.returnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toEqual(mockTotalPrice);
        expect(activeCartFacade.getActive).toHaveBeenCalled();
        done();
      });
    });

    it('should return undefined if the cart does not have a total price', (done) => {
      const mockCart = { totalPrice: undefined };

      activeCartFacade.getActive.and.returnValue(of(mockCart));

      service.getCurrentCartTotalPrice().subscribe((totalPrice) => {
        expect(totalPrice).toBeUndefined();
        expect(activeCartFacade.getActive).toHaveBeenCalled();
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
    it('should call deleteUserAddress for each address ID', () => {
      const addrIds = ['addr1', 'addr2', 'addr3'];

      service.deleteUserAddresses(addrIds);

      addrIds.forEach((addrId) => {
        expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith(
          addrId
        );
      });
    });

    it('should disable global messages for address deletion success', () => {
      const addrIds = ['addr1', 'addr2'];

      service.deleteUserAddresses(addrIds);

      expect(opfGlobalMessageService.disableGlobalMessage).toHaveBeenCalledWith(
        ['addressForm.userAddressDeleteSuccess']
      );
    });
  });

  describe('deleteStaleCart', () => {
    it('should delete the current cart and return true on success', (done) => {
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '';
      const mockEvent = new DeleteCartSuccessEvent();

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.deleteCart.and.callThrough();
      eventService.get.and.returnValue(of(mockEvent));

      service.deleteStaleCart().subscribe((result) => {
        expect(result).toBeTruthy();
        expect(multiCartFacade.deleteCart).toHaveBeenCalledWith(
          mockCartId,
          mockUserId
        );
        done();
      });
    });
  });

  describe('allowMiniCartUpdate', () => {
    it('should call opfMiniCartComponentService blockUpdate with false value', () => {
      opfMiniCartComponentService.blockUpdate.and.callThrough();
      service.blockMiniCartComponentUpdate(false);
      expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
        false
      );
    });
  });

  describe('loadOriginalCart', () => {
    it('should call multiCartFacade loadCart and truthy when previousCartId exist', (done) => {
      const mockPreviousCartId = 'mockPreviousCartId';
      const mockCartId = 'mockCartId';
      const mockUserId = 'user123';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.loadCart.and.callThrough();
      activeCartFacade.isStable.and.returnValue(of(true));
      activeCartFacade.getActiveCartId.and.returnValue(of(mockPreviousCartId));
      multiCartFacade.isStable.and.returnValue(of(true));

      service.loadOriginalCart().subscribe((result) => {
        expect(result).toBeTruthy();
        expect(multiCartFacade.isStable).toHaveBeenCalled();
        expect(multiCartFacade.loadCart).toHaveBeenCalled();
        expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
          false
        );
        done();
      });
    });

    it('should be falsy when previousCartId dose not exist', (done) => {
      const mockPreviousCartId = '';
      const mockCartId = 'mockCartId';
      const mockUserId = 'user123';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.loadCart.and.callThrough();
      activeCartFacade.isStable.and.returnValue(of(true));

      service.loadOriginalCart().subscribe((result) => {
        expect(result).toBeFalsy();
        expect(activeCartFacade.isStable).not.toHaveBeenCalled();
        expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
        expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
          false
        );
        done();
      });
    });
    // });
  });

  describe('removeProductFromOriginalCart', () => {
    it('should be falsy when no previousCart value exists', (done) => {
      const productCode = 'testProduct';
      const quantity = 1;
      const mockEntry = {};
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.getEntry.and.returnValue(of(mockEntry));

      service
        .removeProductFromOriginalCart(productCode, quantity)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });
    it('should be falsy when pdp product does not exists in active cart', (done) => {
      const productCode = 'testProduct';
      const quantity = 1;
      const mockEntry = {};
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '5678';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.getEntry.and.returnValue(of(mockEntry));

      service
        .removeProductFromOriginalCart(productCode, quantity)
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });
    it('should removeEntry if pdp product exists in active cart with same quantity', (done) => {
      const productCode = 'testProduct';
      const quantity = 2;
      const mockEntry = { quantity, entryNumber: 0 };
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '5678';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.getEntry.and.returnValue(of(mockEntry));

      service
        .removeProductFromOriginalCart(productCode, quantity)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(multiCartFacade.removeEntry).toHaveBeenCalledWith(
            mockUserId,
            mockPreviousCartId,
            mockEntry.entryNumber
          );
          done();
        });
    });
    it('should updateEntry if pdp product exists in active cart with lower quantity', (done) => {
      const productCode = 'testProduct';
      const quantity = 2;
      const entryQuantity = 5;
      const mockEntry = { quantity: entryQuantity, entryNumber: 0 };
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '5678';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.getEntry.and.returnValue(of(mockEntry));

      service
        .removeProductFromOriginalCart(productCode, quantity)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(multiCartFacade.updateEntry).toHaveBeenCalledWith(
            mockUserId,
            mockPreviousCartId,
            mockEntry.entryNumber,
            entryQuantity - quantity
          );
          done();
        });
    });
  });

  describe('blockMiniCartComponentUpdate', () => {
    it('should call opfMiniCartComponentService blockUpdate with same value', () => {
      const decision = true;
      service.blockMiniCartComponentUpdate(decision);
      expect(opfMiniCartComponentService.blockUpdate).toHaveBeenCalledWith(
        decision
      );
    });
  });

  describe('loadCartAfterSingleProductTransaction', () => {
    it('should call deleteStaleCart when order fails', (done) => {
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = 'previousCartId';
      const mockEvent = new DeleteCartSuccessEvent();
      const initialTransactionDetails: QuickBuyTransactionDetails = {
        context: OpfQuickBuyLocation.PRODUCT,
        product: {},
        cart: undefined,
        quantity: 0,
        addressIds: [],
        total: {
          label: '',
          amount: '',
          currency: '',
        },
      };
      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      multiCartFacade.deleteCart.and.callThrough();
      eventService.get.and.returnValue(of(mockEvent));
      activeCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.isStable.and.returnValue(of(true));
      activeCartFacade.getActiveCartId.and.returnValue(of(mockPreviousCartId));
      multiCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.deleteCart.and.callThrough();

      service
        .loadCartAfterSingleProductTransaction(initialTransactionDetails, true)
        .subscribe(() => {
          expect(multiCartFacade.deleteCart).toHaveBeenCalled();
          done();
        });
    });

    it('should removeProductFromOriginalCart when order is successfull', (done) => {
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = 'previousCartId';
      const mockEvent = new DeleteCartSuccessEvent();
      const mockEntry = { quantity: 1, entryNumber: 0 };
      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };
      const initialTransactionDetails: QuickBuyTransactionDetails = {
        context: OpfQuickBuyLocation.PRODUCT,
        product: { code: '123' },
        cart: undefined,
        quantity: 1,
        addressIds: [],
        total: {
          label: '',
          amount: '',
          currency: '',
        },
      };

      multiCartFacade.deleteCart.and.callThrough();
      eventService.get.and.returnValue(of(mockEvent));
      activeCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.isStable.and.returnValue(of(true));
      multiCartFacade.getEntry.and.returnValue(of(mockEntry));
      activeCartFacade.getActiveCartId.and.returnValue(of(mockPreviousCartId));
      multiCartFacade.isStable.and.returnValue(of(true));

      service
        .loadCartAfterSingleProductTransaction(initialTransactionDetails, true)
        .subscribe(() => {
          expect(multiCartFacade.getEntry).toHaveBeenCalled();
          expect(multiCartFacade.deleteCart).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not deleteStaleCart when order is successfull and initial cart empty', () => {
      const mockCartId = '12345';
      const mockUserId = 'user123';
      const mockPreviousCartId = '';

      ((service as any).cartHandlerState as CartHandlerState) = {
        cartId: mockCartId,
        userId: mockUserId,
        previousCartId: mockPreviousCartId,
      };

      const initialTransactionDetails: QuickBuyTransactionDetails = {
        context: OpfQuickBuyLocation.PRODUCT,
        product: { code: '123' },
        cart: undefined,
        quantity: 1,
        addressIds: [],
        total: {
          label: '',
          amount: '',
          currency: '',
        },
      };

      service.loadCartAfterSingleProductTransaction(
        initialTransactionDetails,
        true
      );
      expect(multiCartFacade.getEntry).not.toHaveBeenCalled();
      expect(multiCartFacade.deleteCart).not.toHaveBeenCalled();
    });
  });
});
