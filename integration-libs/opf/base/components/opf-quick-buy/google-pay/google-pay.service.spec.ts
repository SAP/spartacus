/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import { Address, PriceType } from '@spartacus/core';
import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import {
  ADDRESS_FIELD_PLACEHOLDER,
  OpfPaymentFacade,
  OpfQuickBuyLocation,
  OpfResourceLoaderService,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfQuickBuyService } from '../opf-quick-buy.service';
import { OpfGooglePayService } from './google-pay.service';

const mockGooglePayAddress = {
  countryCode: 'CA',
  locality: 'Toronto',
  postalCode: 'A1B 2C3',
  address1: '456 Elm St',
  address2: '',
  address3: '',
};

const mockConvertedAddress: Address = {
  country: { isocode: 'CA' },
  town: 'Toronto',
  district: undefined,
  postalCode: 'A1B 2C3',
  line1: '456 Elm St',
  line2: ' ',
};

describe('OpfGooglePayService', () => {
  const mockMerchantName = 'mockMerchantName';
  let service: OpfGooglePayService;
  let mockResourceLoaderService: jasmine.SpyObj<OpfResourceLoaderService>;
  let mockItemCounterService: jasmine.SpyObj<ItemCounterService>;
  let mockCurrentProductService: jasmine.SpyObj<CurrentProductService>;
  let mockCartHandlerService: jasmine.SpyObj<OpfCartHandlerService>;
  let mockPaymentFacade: jasmine.SpyObj<OpfPaymentFacade>;
  let mockQuickBuyService: jasmine.SpyObj<OpfQuickBuyService>;

  beforeEach(() => {
    mockResourceLoaderService = jasmine.createSpyObj(
      'OpfResourceLoaderService',
      ['loadProviderResources']
    );
    mockItemCounterService = jasmine.createSpyObj('ItemCounterService', [
      'getCounter',
    ]);
    mockCurrentProductService = jasmine.createSpyObj('CurrentProductService', [
      'getProduct',
    ]);
    mockCartHandlerService = jasmine.createSpyObj('OpfCartHandlerService', [
      'deleteStaleCart',
      'deleteUserAddresses',
      'addProductToCart',
      'checkStableCart',
      'getSupportedDeliveryModes',
      'setDeliveryAddress',
      'setBillingAddress',
      'getDeliveryAddress',
      'getCurrentCart',
      'getCurrentCartId',
      'getCurrentCartTotalPrice',
      'setDeliveryMode',
      'getSelectedDeliveryMode',
      'deleteUserAddresses',
      'loadOriginalCart',
      'removeProductFromOriginalCart',
      'loadCartAfterSingleProductTransaction',
      'blockMiniCartComponentUpdate',
    ]);
    mockPaymentFacade = jasmine.createSpyObj('OpfPaymentFacade', [
      'submitPayment',
    ]);
    mockQuickBuyService = jasmine.createSpyObj('OpfQuickBuyService', [
      'getQuickBuyLocationContext',
      'getQuickBuyProviderConfig',
      'getQuickBuyDeliveryInfo',
      'getMerchantName',
    ]);

    const googlePayApiMock = {
      payments: {
        api: {
          PaymentsClient: jasmine.createSpy('PaymentsClient').and.returnValue({
            loadPaymentData: jasmine
              .createSpy()
              .and.returnValue(Promise.resolve({})),
            isReadyToPay: jasmine
              .createSpy()
              .and.returnValue(Promise.resolve({ result: true })),
          }),
        },
      },
    };

    window.google = googlePayApiMock as any;

    TestBed.configureTestingModule({
      providers: [
        OpfGooglePayService,
        {
          provide: OpfResourceLoaderService,
          useValue: mockResourceLoaderService,
        },
        { provide: ItemCounterService, useValue: mockItemCounterService },
        { provide: CurrentProductService, useValue: mockCurrentProductService },
        { provide: OpfCartHandlerService, useValue: mockCartHandlerService },
        { provide: OpfPaymentFacade, useValue: mockPaymentFacade },
        { provide: OpfQuickBuyService, useValue: mockQuickBuyService },
      ],
    });

    service = TestBed.inject(OpfGooglePayService);
    service['updateGooglePaymentClient']();
  });

  describe('getClient', () => {
    it('should return the Google Payment client instance', () => {
      const activeConfiguration = {};
      service.initClient(activeConfiguration);

      const client = service['getClient']();

      expect(client).toBeDefined();
    });
  });

  describe('getShippingOptionParameters', () => {
    it('should transform delivery modes into shipping option parameters', (done) => {
      const mockDeliveryModes = [
        {
          code: 'STANDARD',
          name: 'Standard Delivery',
          description: 'Delivers in 3-5 days',
        },
      ];
      mockCartHandlerService.getSupportedDeliveryModes.and.returnValue(
        of(mockDeliveryModes)
      );

      service['getShippingOptionParameters']().subscribe((shippingOptions) => {
        expect(shippingOptions).toBeDefined();
        expect(shippingOptions?.shippingOptions.length).toBe(
          mockDeliveryModes.length
        );
        expect(shippingOptions?.defaultSelectedOptionId).toBe(
          mockDeliveryModes[0].code
        );

        mockDeliveryModes.forEach((mode, index) => {
          const shippingOption = shippingOptions?.shippingOptions[index];
          expect(shippingOption?.id).toEqual(mode.code);
          expect(shippingOption?.label).toEqual(mode.name);
          expect(shippingOption?.description).toEqual(mode.description);
        });

        done();
      });
    });

    it('should handle cases with no delivery modes available', (done) => {
      mockCartHandlerService.getSupportedDeliveryModes.and.returnValue(of([]));

      service['getShippingOptionParameters']().subscribe((shippingOptions) => {
        expect(shippingOptions).toBeDefined();
        expect(shippingOptions?.shippingOptions).toEqual([]);
        expect(shippingOptions?.defaultSelectedOptionId).toBeUndefined();
        done();
      });
    });
  });

  describe('loadProviderResources', () => {
    it('should load the Google Pay JS API', async () => {
      mockResourceLoaderService.loadProviderResources.and.returnValue(
        Promise.resolve()
      );

      await service.loadProviderResources();

      expect(
        mockResourceLoaderService.loadProviderResources
      ).toHaveBeenCalled();
    });

    it('should handle errors when loading the Google Pay JS API', async () => {
      mockResourceLoaderService.loadProviderResources.and.returnValue(
        Promise.reject(new Error('Load failed'))
      );

      await expectAsync(service.loadProviderResources()).toBeRejectedWithError(
        'Load failed'
      );
    });
  });

  describe('isReadyToPay', () => {
    it('should return info about readiness to pay from the Google Pay API', async () => {
      const activeConfiguration = {};

      service.initClient(activeConfiguration);

      await expectAsync(service.isReadyToPay()).toBeResolvedTo({
        result: true,
      });
    });

    it('should handle errors from the Google Pay API', async () => {
      spyOn(service, 'isReadyToPay').and.returnValue(
        Promise.reject(new Error('API error'))
      );

      await expectAsync(service.isReadyToPay()).toBeRejectedWithError(
        'API error'
      );
    });
  });

  describe('initClient', () => {
    it('should initialize the Google Payment client with configurations', () => {
      const activeConfiguration = {};
      service.initClient(activeConfiguration);

      const client = service['googlePaymentClient'];

      expect(client).toBeDefined();
    });
  });

  describe('updateTransactionInfo', () => {
    it('should update transaction info', () => {
      const transactionInfo = {
        totalPrice: '100.00',
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
      } as google.payments.api.TransactionInfo;

      service['updateTransactionInfo'](transactionInfo);

      const updatedTransactionInfo =
        service['googlePaymentRequest'].transactionInfo;

      expect(updatedTransactionInfo).toEqual(transactionInfo);
    });
  });

  describe('setDeliveryAddress', () => {
    it('should successfully set delivery address and return an address ID', async () => {
      const mockAddress = { countryCode: 'US' } as google.payments.api.Address;
      const mockAddressId = 'mockAddressId';
      mockCartHandlerService['setDeliveryAddress'].and.returnValue(
        of(mockAddressId)
      );

      const addressId =
        await service['setDeliveryAddress'](mockAddress).toPromise();

      expect(addressId).toEqual(mockAddressId);
    });

    it('should correctly split name into first and last names and set delivery address', (done) => {
      const mockAddress = {
        name: 'John Doe',
        countryCode: 'US',
      };

      mockCartHandlerService.setDeliveryAddress.and.returnValue(
        of('addressId')
      );

      service['setDeliveryAddress'](
        mockAddress as google.payments.api.Address
      ).subscribe((addressId) => {
        expect(addressId).toEqual('addressId');
        expect(mockCartHandlerService.setDeliveryAddress).toHaveBeenCalledWith(
          jasmine.objectContaining({
            firstName: 'John',
            lastName: ' Doe',
            country: { isocode: mockAddress.countryCode },
          })
        );
        done();
      });
    });
  });

  describe('getNewTransactionInfo', () => {
    it('should return transaction info for a given cart', () => {
      const mockCart = {
        totalPriceWithTax: { value: 100.0, currencyIso: 'USD' },
      } as Cart;

      const transactionInfo = service['getNewTransactionInfo'](mockCart);

      expect(transactionInfo).toBeDefined();
      expect(transactionInfo?.totalPrice).toBe('100');
      expect(transactionInfo?.currencyCode).toBe('USD');
      expect(transactionInfo?.totalPriceStatus).toBe('FINAL');
    });

    it('should handle cart with missing price information', () => {
      const mockCart = {} as Cart;

      const transactionInfo = service['getNewTransactionInfo'](mockCart);

      expect(transactionInfo).toBeUndefined();
    });

    it('should return undefined for cart with a total price of zero', () => {
      const mockCart = {
        totalPriceWithTax: { value: 0, currencyIso: 'USD' },
      } as Cart;

      const transactionInfo = service['getNewTransactionInfo'](mockCart);

      expect(transactionInfo).toBeUndefined();
    });
  });

  describe('setDeliveryMode', () => {
    it('should successfully set delivery mode', async () => {
      const mode = 'standard';
      mockCartHandlerService.setDeliveryMode.and.returnValue(of({}));

      const result = await service.setDeliveryMode(mode).toPromise();

      expect(result).toBeDefined();
    });
  });

  describe('setBillingAddress', () => {
    it('should call setBillingAddress from cartHandlerService', async () => {
      const address = {
        ...mockGooglePayAddress,
        ...{ name: 'John Doe' },
      };

      mockCartHandlerService.setBillingAddress.and.returnValue(of(true));

      service['setBillingAddress'](address as any).subscribe((result) => {
        expect(result).toBe(true);
        expect(mockCartHandlerService.setBillingAddress).toHaveBeenCalledWith({
          ...mockConvertedAddress,
          ...{
            firstName: 'John',
            lastName: ' Doe',
          },
        });
      });
    });
  });

  describe('convertAddress', () => {
    it('should convert the address correctly when address is partially defined', () => {
      const result = service['convertAddress'](mockGooglePayAddress as any);

      expect(result).toEqual({
        ...mockConvertedAddress,
        ...{
          firstName: ADDRESS_FIELD_PLACEHOLDER,
          lastName: ADDRESS_FIELD_PLACEHOLDER,
        },
      });
    });

    it('should convert the address correctly when address includes a name', () => {
      const address = {
        ...mockGooglePayAddress,
        ...{ name: 'John Doe' },
      };
      const result = service['convertAddress'](address as any);

      expect(result).toEqual({
        ...mockConvertedAddress,
        ...{
          firstName: 'John',
          lastName: ' Doe',
        },
      });
    });
  });

  describe('estimateTotalPrice', () => {
    it('should calculate total price based on counter and product price', () => {
      const productPrice = 100;
      const counter = 2;
      mockItemCounterService.getCounter.and.returnValue(counter);

      const totalPrice = service['estimateTotalPrice'](productPrice);

      expect(totalPrice).toBe('200');
    });

    it('should handle zero product price', () => {
      const productPrice = 0;
      const counter = 3;
      mockItemCounterService.getCounter.and.returnValue(counter);

      const totalPrice = service['estimateTotalPrice'](productPrice);

      expect(totalPrice).toBe('0');
    });

    it('should handle zero counter', () => {
      const productPrice = 50;
      const counter = 0;
      mockItemCounterService.getCounter.and.returnValue(counter);

      const totalPrice = service['estimateTotalPrice'](productPrice);

      expect(totalPrice).toBe('0');
    });
  });

  describe('verifyShippingOption', () => {
    it('should return the mode if it is not "shipping_option_unselected"', () => {
      const mode = 'standard_shipping';

      expect(service['verifyShippingOption'](mode)).toBe(mode);
    });

    it('should return undefined if the mode is "shipping_option_unselected"', () => {
      const mode = 'shipping_option_unselected';

      expect(service['verifyShippingOption'](mode)).toBeUndefined();
    });

    it('should return undefined if the mode is undefined', () => {
      expect(service['verifyShippingOption'](undefined)).toBeUndefined();
    });
  });

  describe('associateAddressId', () => {
    it('should add a new address ID if not already present', () => {
      const addressId = 'newAddressId';

      service['associateAddressId'](addressId);

      expect(service['initialTransactionDetails']['addressIds']).toContain(
        addressId
      );
    });

    it('should not add an address ID if it is already present', () => {
      const addressId = 'existingAddressId';

      service['associateAddressId'](addressId);
      service['associateAddressId'](addressId);

      expect(
        service['initialTransactionDetails']['addressIds'].filter(
          (id: any) => id === addressId
        ).length
      ).toBe(1);
    });
  });

  describe('isAddressIdAssociated', () => {
    it('should return true if address ID is already associated', () => {
      const addressId = 'existingAddressId';
      service['initialTransactionDetails']['addressIds'].push(addressId);

      const result = service['isAddressIdAssociated'](addressId);

      expect(result).toBeTruthy();
    });

    it('should return false if address ID is not associated', () => {
      const addressId = 'newAddressId';
      service['initialTransactionDetails']['addressIds'] = (
        service as any
      ).initialTransactionDetails.addressIds.filter(
        (id: any) => id !== addressId
      );

      const result = service['isAddressIdAssociated'](addressId);

      expect(result).toBeFalsy();
    });
  });

  describe('resetAssociatedAddresses', () => {
    it('should clear all associated address IDs', () => {
      service['initialTransactionDetails']['addressIds'] = [
        'address1',
        'address2',
      ];

      service['resetAssociatedAddresses']();

      expect(service['initialTransactionDetails']['addressIds']).toEqual([]);
      expect(service['initialTransactionDetails']['addressIds'].length).toBe(0);
    });
  });

  describe('deleteAssociatedAddresses', () => {
    it('should call deleteUserAddresses and reset associated addresses', () => {
      service['initialTransactionDetails']['addressIds'] = [
        'address1',
        'address2',
      ];

      service['deleteAssociatedAddresses']();

      expect(mockCartHandlerService.deleteUserAddresses).toHaveBeenCalledWith([
        'address1',
        'address2',
      ]);

      expect(service['initialTransactionDetails']['addressIds']).toEqual([]);
    });

    it('should not call deleteUserAddresses if there are no associated addresses', () => {
      (service as any).associatedShippingAddressIds = [];

      service['deleteAssociatedAddresses']();

      expect(mockCartHandlerService.deleteUserAddresses).not.toHaveBeenCalled();
    });
  });

  describe('getFirstAndLastName', () => {
    it('should correctly split first and last names', () => {
      const name = 'John Doe';
      const result = service['getFirstAndLastName'](name);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe(' Doe');
    });

    it('should handle a single name', () => {
      const name = 'John';
      const result = service['getFirstAndLastName'](name);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('John');
    });

    it('should correctly handle multiple names', () => {
      const name = 'John Michael Doe';
      const result = service['getFirstAndLastName'](name);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe(' Michael Doe');
    });
  });

  describe('initTransaction', () => {
    it('should initialize transaction for single product context', (done: DoneFn) => {
      spyOn(service, 'handleSingleProductTransaction').and.returnValue(
        of(null)
      );
      spyOn(service, 'handleActiveCartTransaction').and.returnValue(of(null));

      mockQuickBuyService.getQuickBuyLocationContext.and.returnValue(
        of(OpfQuickBuyLocation.PRODUCT)
      );

      mockQuickBuyService.getMerchantName.and.returnValue(of(mockMerchantName));

      service.initTransaction();

      expect(service['transactionDetails'].context).toBe(
        OpfQuickBuyLocation.PRODUCT
      );

      setTimeout(() => {
        expect(service.handleSingleProductTransaction).toHaveBeenCalled();
        expect(service.handleActiveCartTransaction).not.toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should initialize transaction for active cart context', (done: DoneFn) => {
      spyOn(service, 'handleSingleProductTransaction').and.returnValue(
        of(null)
      );
      spyOn(service, 'handleActiveCartTransaction').and.returnValue(of(null));

      mockQuickBuyService.getQuickBuyLocationContext.and.returnValue(
        of(OpfQuickBuyLocation.CART)
      );

      mockQuickBuyService.getMerchantName.and.returnValue(of(mockMerchantName));

      service.initTransaction();

      expect(service['transactionDetails'].context).toBe(
        OpfQuickBuyLocation.CART
      );

      setTimeout(() => {
        expect(service.handleActiveCartTransaction).toHaveBeenCalled();
        expect(service.handleSingleProductTransaction).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('renderPaymentButton', () => {
    let mockGooglePaymentClient: jasmine.SpyObj<google.payments.api.PaymentsClient>;

    beforeEach(() => {
      mockGooglePaymentClient = jasmine.createSpyObj('PaymentsClient', [
        'createButton',
      ]);
      service['googlePaymentClient'] = mockGooglePaymentClient;

      mockGooglePaymentClient.createButton.and.callFake((config: any) => {
        const button = document.createElement('button');
        button.addEventListener('click', config.onClick);

        return button;
      });
    });

    it('should append a payment button to the container', () => {
      const container = new ElementRef(document.createElement('div'));

      service.renderPaymentButton(container);

      expect(container.nativeElement.children.length).toBe(1);
      expect(container.nativeElement.children[0].tagName).toBe('BUTTON');
      expect(mockGooglePaymentClient.createButton).toHaveBeenCalled();
    });

    it('should attach the correct click handler to the button', () => {
      const container = new ElementRef(document.createElement('div'));
      spyOn(service, 'initTransaction');

      service.renderPaymentButton(container);

      const button = container.nativeElement.children[0];
      (button as any).click();

      expect(service.initTransaction).toHaveBeenCalled();
    });
  });

  describe('handlePaymentCallbacks', () => {
    const encodedMockToken = 'encodedMockToken';

    beforeEach(() => {
      spyOn(window, 'btoa').and.callFake(() => {
        return encodedMockToken;
      });
    });

    it('should return valid payment data callbacks', () => {
      const callbacks = service['handlePaymentCallbacks']();

      expect(callbacks).toBeDefined();
      expect(callbacks.onPaymentAuthorized).toBeDefined();
      expect(callbacks.onPaymentDataChanged).toBeDefined();
    });

    describe('onPaymentAuthorized', () => {
      it('should handle payment authorization', (done) => {
        const callbacks = service['handlePaymentCallbacks']();
        const mockCartId = 'cartId';
        const mockToken = 'mockToken';
        const paymentDataResponse = {
          paymentMethodData: {
            tokenizationData: {
              token: mockToken,
            },
          },
        } as google.payments.api.PaymentData;

        mockCartHandlerService.getCurrentCartId.and.returnValue(of(mockCartId));
        mockPaymentFacade.submitPayment.and.returnValue(of(true));
        mockCartHandlerService.setBillingAddress.and.returnValue(of(true));
        mockCartHandlerService.setDeliveryAddress.and.returnValue(
          of('addressId')
        );
        mockCartHandlerService.loadCartAfterSingleProductTransaction.and.returnValue(
          of(true)
        );

        if (callbacks.onPaymentAuthorized) {
          (
            callbacks.onPaymentAuthorized(paymentDataResponse) as Promise<any>
          ).then((result) => {
            const submitPaymentArgs =
              mockPaymentFacade.submitPayment.calls.mostRecent().args[0];

            expect(result).toBeDefined();
            expect(mockPaymentFacade.submitPayment).toHaveBeenCalled();
            expect(submitPaymentArgs.callbackArray.length).toBe(3);
            submitPaymentArgs.callbackArray.forEach((callback) => {
              expect(typeof callback).toBe('function');
            });
            expect(submitPaymentArgs.cartId).toBe(mockCartId);
            expect(submitPaymentArgs.cartId).toBe(mockCartId);
            expect(submitPaymentArgs.encryptedToken).toBe(encodedMockToken);
            expect(submitPaymentArgs.paymentMethod).toBe(
              PaymentMethod.GOOGLE_PAY
            );
            expect(mockCartHandlerService.getCurrentCartId).toHaveBeenCalled();
            expect(result).toEqual({ transactionState: 'SUCCESS' });
            done();
          });
        }
      });
    });

    describe('onPaymentDataChanged', () => {
      it('should handle payment data changes', (done) => {
        const callbacks = service['handlePaymentCallbacks']();
        const intermediatePaymentData =
          {} as google.payments.api.IntermediatePaymentData;

        const selectedDeliveryMode = {
          code: 'code',
          deliveryCost: {
            currencyIso: 'US',
            formattedValue: '100.00',
            maxQuantity: 2,
            minQuantity: 1,
            priceType: PriceType.BUY,
            value: 100,
          },
          description: 'description',
          name: 'STANDARD DELIVERY',
        };

        mockCartHandlerService.getCurrentCartId.and.returnValue(of('cartId'));
        mockPaymentFacade.submitPayment.and.returnValue(of());
        mockCartHandlerService.setDeliveryAddress.and.returnValue(
          of('addressId')
        );
        mockCartHandlerService.setDeliveryMode.and.returnValue(
          of({
            code: 'code',
          })
        );
        mockCartHandlerService.getCurrentCart.and.returnValue(of({}));
        mockCartHandlerService.getSelectedDeliveryMode.and.returnValue(
          of(selectedDeliveryMode)
        );
        mockCartHandlerService.getSupportedDeliveryModes.and.returnValue(
          of([
            {
              code: 'code',
              deliveryCost: {
                currencyIso: 'US',
                formattedValue: '100.00',
                maxQuantity: 2,
                minQuantity: 1,
                priceType: PriceType.BUY,
                value: 100,
              },
              description: 'description',
              name: 'STANDARD DELIVERY',
            },
          ])
        );

        if (callbacks.onPaymentDataChanged) {
          (
            callbacks.onPaymentDataChanged(
              intermediatePaymentData
            ) as Promise<any>
          ).then((paymentDataRequestUpdate) => {
            expect(
              paymentDataRequestUpdate.newShippingOptionParameters
                .defaultSelectedOptionId
            ).toEqual(selectedDeliveryMode.code);
            expect(
              paymentDataRequestUpdate.newShippingOptionParameters
                .shippingOptions[0].id
            ).toEqual(selectedDeliveryMode.code);
            expect(
              paymentDataRequestUpdate.newShippingOptionParameters
                .shippingOptions[0].description
            ).toEqual(selectedDeliveryMode.description);
            expect(
              paymentDataRequestUpdate.newShippingOptionParameters
                .shippingOptions[0].label
            ).toEqual(selectedDeliveryMode.name);
            expect(paymentDataRequestUpdate).toBeDefined();
            expect(
              mockCartHandlerService.setDeliveryAddress
            ).toHaveBeenCalled();
            expect(mockCartHandlerService.setDeliveryMode).toHaveBeenCalled();
            expect(mockCartHandlerService.getCurrentCart).toHaveBeenCalled();
            expect(
              mockCartHandlerService.getSelectedDeliveryMode
            ).toHaveBeenCalledWith();

            done();
          });
        }
      });
    });
  });

  afterEach(() => {
    delete (window as any).google;

    TestBed.resetTestingModule();
  });
});
