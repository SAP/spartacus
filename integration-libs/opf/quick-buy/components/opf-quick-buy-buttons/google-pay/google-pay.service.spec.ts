/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/googlepay" />
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Cart } from '@spartacus/cart/base/root';
import { Address, PriceType, TranslationService } from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import {
  defaultOpfQuickBuyConfig,
  OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
  OpfQuickBuyConfig,
  OpfQuickBuyLocation,
  OpfQuickBuyProviderType,
} from '@spartacus/opf/quick-buy/root';
import { CurrentProductService } from '@spartacus/storefront';
import { firstValueFrom, of } from 'rxjs';
import { OpfQuickBuyButtonsService } from '../opf-quick-buy-buttons.service';
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
  let mockResourceLoaderService: any;
  let mockCurrentProductService: any;
  let mockQuickBuyTransactionService: any;
  let mockPaymentFacade: any;
  let mockQuickBuyButtonsService: any;
  let mockTranslationService: any;

  beforeEach(() => {
    mockResourceLoaderService = { loadResources: vi.fn() };
    mockCurrentProductService = { getProduct: vi.fn() };
    mockQuickBuyTransactionService = {
      deleteUserAddresses: vi.fn(),
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
      deleteUserAddresses: vi.fn(),
      getTransactionDeliveryInfo: vi.fn(),
      getTransactionLocationContext: vi.fn(),
      getMerchantName: vi.fn(),
      updateCartGuestUserEmail: vi.fn(),
    };
    mockPaymentFacade = { submitPayment: vi.fn() };
    mockQuickBuyButtonsService = {
      getQuickBuyProviderConfig: vi.fn(),
      getActiveConfigurationForProvider: vi.fn(),
    };
    mockTranslationService = { translate: vi.fn() };
    mockTranslationService.translate.mockImplementation((key: string) =>
      of(key)
    );

    const mockPaymentsClientInstance = {
      loadPaymentData: vi.fn().mockReturnValue(Promise.resolve({})),
      isReadyToPay: vi.fn().mockReturnValue(Promise.resolve({ result: true })),
    };
    const googlePayApiMock = {
      payments: {
        api: {
          PaymentsClient: vi.fn().mockImplementation(
            class {
              loadPaymentData = mockPaymentsClientInstance.loadPaymentData;
              isReadyToPay = mockPaymentsClientInstance.isReadyToPay;
            }
          ),
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

        { provide: CurrentProductService, useValue: mockCurrentProductService },
        {
          provide: OpfQuickBuyTransactionService,
          useValue: mockQuickBuyTransactionService,
        },
        { provide: OpfPaymentFacade, useValue: mockPaymentFacade },
        {
          provide: OpfQuickBuyButtonsService,
          useValue: mockQuickBuyButtonsService,
        },
        {
          provide: OpfQuickBuyConfig,
          useValue: defaultOpfQuickBuyConfig,
        },
        {
          provide: TranslationService,
          useValue: mockTranslationService,
        },
      ],
    });

    service = TestBed.inject(OpfGooglePayService);
    service['updateGooglePaymentClient']();
  });

  describe('getClient', () => {
    it('should return the Google Payment client instance', () => {
      const activeConfiguration: OpfActiveConfiguration[] = [];
      service.initClient(activeConfiguration);

      const client = service['getClient']();

      expect(client).toBeDefined();
    });
  });

  describe('getShippingOptionParameters', () => {
    it('should transform delivery modes into shipping option parameters', async () => {
      const mockDeliveryModes = [
        {
          code: 'STANDARD',
          name: 'Standard Delivery',
          description: 'Delivers in 3-5 days',
        },
      ];
      mockQuickBuyTransactionService.getSupportedDeliveryModes.mockReturnValue(
        of(mockDeliveryModes)
      );

      const shippingOptions = await firstValueFrom(
        service['getShippingOptionParameters']()
      );
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
    });

    it('should handle cases with no delivery modes available', async () => {
      mockQuickBuyTransactionService.getSupportedDeliveryModes.mockReturnValue(
        of([])
      );

      const shippingOptions = await firstValueFrom(
        service['getShippingOptionParameters']()
      );
      expect(shippingOptions).toBeDefined();
      expect(shippingOptions?.shippingOptions).toEqual([]);
      expect(shippingOptions?.defaultSelectedOptionId).toBeUndefined();
    });
  });

  describe('loadResources', () => {
    it('should load the Google Pay JS API', async () => {
      mockResourceLoaderService.loadResources.mockReturnValue(
        Promise.resolve()
      );

      await service.loadResources();

      expect(mockResourceLoaderService.loadResources).toHaveBeenCalled();
    });

    it('should handle errors when loading the Google Pay JS API', async () => {
      mockResourceLoaderService.loadResources.mockReturnValue(
        Promise.reject(new Error('Load failed'))
      );

      await expect(service.loadResources()).rejects.toThrow('Load failed');
    });
  });

  describe('isReadyToPay', () => {
    it('should return info about readiness to pay from the Google Pay API', async () => {
      const activeConfiguration: OpfActiveConfiguration[] = [];

      service.initClient(activeConfiguration);

      await expect(service.isReadyToPay()).resolves.toEqual({
        result: true,
      });
    });

    it('should handle errors from the Google Pay API', async () => {
      vi.spyOn(service, 'isReadyToPay').mockReturnValue(
        Promise.reject(new Error('API error'))
      );

      await expect(service.isReadyToPay()).rejects.toThrow('API error');
    });
  });

  describe('initClient', () => {
    it('should initialize the Google Payment client with configurations (array)', () => {
      const activeConfiguration: any[] = [];
      service.initClient(activeConfiguration);

      const client = service['googlePaymentClient'];

      expect(client).toBeDefined();
    });

    it('should initialize the Google Payment client with single configuration', () => {
      const activeConfiguration: OpfActiveConfiguration = {
        merchantId: 'test-merchant',
        providerType: 'PAYMENT_GATEWAY',
      } as any;
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
      mockQuickBuyTransactionService['setDeliveryAddress'].mockReturnValue(
        of(mockAddressId)
      );

      const addressId =
        await service['setDeliveryAddress'](mockAddress).toPromise();

      expect(addressId).toEqual(mockAddressId);
    });

    it('should correctly split name into first and last names and set delivery address', async () => {
      const mockAddress = {
        name: 'John Doe',
        countryCode: 'US',
      };

      mockQuickBuyTransactionService.setDeliveryAddress.mockReturnValue(
        of('addressId')
      );

      const addressId = await firstValueFrom(
        service['setDeliveryAddress'](
          mockAddress as google.payments.api.Address
        )
      );
      expect(addressId).toEqual('addressId');
      expect(
        mockQuickBuyTransactionService.setDeliveryAddress
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: ' Doe',
          country: { isocode: mockAddress.countryCode },
        })
      );
    });
  });

  describe('getNewTransactionInfo', () => {
    it('should return transaction info for a given cart', async () => {
      const mockCart = {
        totalPriceWithTax: { value: 100.0, currencyIso: 'USD' },
        subTotal: { value: 80 },
      } as Cart;

      const transactionInfo = await firstValueFrom(
        service['getNewTransactionInfo'](mockCart)
      );
      expect(transactionInfo).toBeDefined();
      expect(transactionInfo?.totalPrice).toBe('100');
      expect(transactionInfo?.currencyCode).toBe('USD');
      expect(transactionInfo?.totalPriceStatus).toBe('FINAL');
      expect(transactionInfo?.displayItems?.length).toBe(1);
      expect(transactionInfo?.totalPriceLabel).toBe('orderCost.total');
    });

    it('should handle cart with missing price information', async () => {
      const mockCart = {} as Cart;

      const transactionInfo = await firstValueFrom(
        service['getNewTransactionInfo'](mockCart)
      );
      expect(transactionInfo).toBeUndefined();
    });

    it('should return undefined for cart with a total price of zero', async () => {
      const mockCart = {
        totalPriceWithTax: { value: 0, currencyIso: 'USD' },
      } as Cart;

      const transactionInfo = await firstValueFrom(
        service['getNewTransactionInfo'](mockCart)
      );
      expect(transactionInfo).toBeUndefined();
    });
  });

  describe('buildDisplayItems', () => {
    it('should build display items from cart values', async () => {
      const mockCart = {
        subTotal: { value: 80 },
        totalTax: { value: 10 },
        deliveryCost: { value: 5 },
        totalDiscounts: { value: 2 },
        appliedOrderPromotions: [{ description: 'Promo' }],
      } as Cart;

      const items = await firstValueFrom(
        service['buildDisplayItems'](mockCart)
      );
      expect(items.length).toBe(4);
      expect(items[0]).toEqual({
        label: 'orderCost.subtotal',
        type: 'SUBTOTAL',
        price: '80',
      });
      expect(items.find((item) => item.type === 'DISCOUNT')?.price).toBe('-2');
    });
  });

  describe('setDeliveryMode', () => {
    it('should successfully set delivery mode', async () => {
      const mode = 'standard';
      mockQuickBuyTransactionService.setDeliveryMode.mockReturnValue(of({}));

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

      mockQuickBuyTransactionService.setBillingAddress.mockReturnValue(
        of(true)
      );

      service['setBillingAddress'](address as any).subscribe((result) => {
        expect(result).toBe(true);
        expect(
          mockQuickBuyTransactionService.setBillingAddress
        ).toHaveBeenCalledWith({
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
          firstName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
          lastName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
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

      expect(
        mockQuickBuyTransactionService.deleteUserAddresses
      ).toHaveBeenCalledWith(['address1', 'address2']);

      expect(service['initialTransactionDetails']['addressIds']).toEqual([]);
    });

    it('should not call deleteUserAddresses if there are no associated addresses', () => {
      (service as any).associatedShippingAddressIds = [];

      service['deleteAssociatedAddresses']();

      expect(
        mockQuickBuyTransactionService.deleteUserAddresses
      ).not.toHaveBeenCalled();
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
    it('should initialize transaction for active cart context', async () => {
      vi.spyOn(service, 'handleActiveCartTransaction').mockReturnValue(
        of(null)
      );

      mockQuickBuyTransactionService.getTransactionLocationContext.mockReturnValue(
        of(OpfQuickBuyLocation.CART)
      );

      mockQuickBuyTransactionService.getMerchantName.mockReturnValue(
        of(mockMerchantName)
      );

      service.initTransaction();

      expect(service['transactionDetails'].context).toBe(
        OpfQuickBuyLocation.CART
      );

      expect(service.handleActiveCartTransaction).toHaveBeenCalled();
    });
  });

  describe('renderPaymentButton', () => {
    let mockGooglePaymentClient: any;

    beforeEach(() => {
      mockGooglePaymentClient = { createButton: vi.fn() };
      service['googlePaymentClient'] = mockGooglePaymentClient;

      mockGooglePaymentClient.createButton.mockImplementation((config: any) => {
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
      vi.spyOn(service, 'initTransaction').mockImplementation(() => {});

      service.renderPaymentButton(container);

      const button = container.nativeElement.children[0];
      (button as any).click();

      expect(service.initTransaction).toHaveBeenCalled();
    });
  });

  describe('handlePaymentCallbacks', () => {
    const encodedMockToken = 'encodedMockToken';

    beforeEach(() => {
      vi.spyOn(window, 'btoa').mockImplementation(() => {
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
      it('should handle payment authorization', async () => {
        const mockEmail = 'test@mail.com';
        const callbacks = service['handlePaymentCallbacks']();
        const mockToken = 'mockToken';
        const paymentDataResponse = {
          paymentMethodData: {
            tokenizationData: {
              token: mockToken,
            },
          },
          email: mockEmail,
        } as google.payments.api.PaymentData;

        mockPaymentFacade.submitPayment.mockReturnValue(of(true));
        mockQuickBuyTransactionService.setBillingAddress.mockReturnValue(
          of(true)
        );
        mockQuickBuyTransactionService.setDeliveryAddress.mockReturnValue(
          of('addressId')
        );
        mockQuickBuyTransactionService.updateCartGuestUserEmail.mockReturnValue(
          of(true)
        );
        mockQuickBuyTransactionService.getCurrentCartId.mockReturnValue(
          of('cart-id')
        );

        if (callbacks.onPaymentAuthorized) {
          const result = await (callbacks.onPaymentAuthorized(
            paymentDataResponse
          ) as Promise<any>);

          const submitPaymentArgs =
            mockPaymentFacade.submitPayment.mock.lastCall[0];

          expect(result).toBeDefined();
          expect(mockPaymentFacade.submitPayment).toHaveBeenCalled();
          expect(
            mockQuickBuyTransactionService.updateCartGuestUserEmail
          ).toHaveBeenCalledWith(mockEmail);

          expect(Object.values(submitPaymentArgs.callbacks).length).toBe(3);
          Object.values(submitPaymentArgs.callbacks).forEach((callback) => {
            expect(typeof callback).toBe('function');
          });
          expect(submitPaymentArgs.encryptedToken).toBe(encodedMockToken);
          expect(submitPaymentArgs.paymentMethod).toBe(
            OpfQuickBuyProviderType.GOOGLE_PAY
          );
          expect(submitPaymentArgs.cartId).toBe('cart-id');
          expect(result).toEqual({ transactionState: 'SUCCESS' });
        }
      });
    });

    describe('onPaymentDataChanged', () => {
      it('should handle payment data changes', async () => {
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

        mockQuickBuyTransactionService.getCurrentCartId.mockReturnValue(
          of('cartId')
        );
        mockPaymentFacade.submitPayment.mockReturnValue(of());
        mockQuickBuyTransactionService.setDeliveryAddress.mockReturnValue(
          of('addressId')
        );
        mockQuickBuyTransactionService.setDeliveryMode.mockReturnValue(
          of({
            code: 'code',
          })
        );
        mockQuickBuyTransactionService.getCurrentCart.mockReturnValue(of({}));
        mockQuickBuyTransactionService.getSelectedDeliveryMode.mockReturnValue(
          of(selectedDeliveryMode)
        );
        mockQuickBuyTransactionService.getSupportedDeliveryModes.mockReturnValue(
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
          const paymentDataRequestUpdate =
            await (callbacks.onPaymentDataChanged(
              intermediatePaymentData
            ) as Promise<any>);
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
            mockQuickBuyTransactionService.setDeliveryAddress
          ).toHaveBeenCalled();
          expect(
            mockQuickBuyTransactionService.setDeliveryMode
          ).toHaveBeenCalled();
          expect(
            mockQuickBuyTransactionService.getCurrentCart
          ).toHaveBeenCalled();
          expect(
            mockQuickBuyTransactionService.getSelectedDeliveryMode
          ).toHaveBeenCalledWith();
        }
      });
    });
  });

  afterEach(() => {
    delete (window as any).google;

    TestBed.resetTestingModule();
  });
});
