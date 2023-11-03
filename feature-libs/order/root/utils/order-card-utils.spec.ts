import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, Country, PaymentDetails } from '@spartacus/core';
import {
  billingAddressCard,
  deliveryAddressCard,
  deliveryModeCard,
  paymentMethodCard,
} from './order-card-utils';

describe('Order Card utils', () => {
  describe('deliveryAddressCard', () => {
    const mockCountry: Country = {
      isocode: 'JP',
      name: 'Japan',
    };
    const mockAddress: Address = {
      firstName: 'John',
      lastName: 'Doe',
      titleCode: 'mr',
      line1: 'Toyosaki 2 create on cart',
      line2: 'line2',
      town: 'town',
      region: { isocode: 'JP-27' },
      postalCode: 'zip',
      country: mockCountry,
    };
    const mockAddress2: Address = {
      line1: 'Toyosaki 2 create on cart',
      line2: 'line2',
      town: 'town',
      region: { isocode: 'JP-27' },
      postalCode: 'zip',
      country: mockCountry,
    };
    const mockAddress3: Address = {
      titleCode: 'mr',
      firstName: 'John',
      line1: 'Toyosaki 2 create on cart',
      line2: 'line2',
      town: 'town',
      region: { isocode: 'JP-27' },
      postalCode: 'zip',
      country: mockCountry,
    };

    it('should return delivery address card', () => {
      const card = deliveryAddressCard(
        'title',
        'phone',
        'mobile',
        mockAddress,
        'Canada'
      );
      expect(card.title).toEqual('title');
      expect(card.textBold).toEqual('John Doe');
      expect(card.text).toEqual([
        'Toyosaki 2 create on cart',
        'line2',
        'town, JP-27, Canada',
        'zip',
        undefined,
      ]);
      const card2 = deliveryAddressCard(
        'title',
        'phone',
        'mobile',
        mockAddress2,
        'Canada'
      );
      expect(card2.textBold).toEqual(undefined);
      const card3 = deliveryAddressCard(
        'title',
        'phone',
        'mobile',
        mockAddress3,
        'Canada'
      );
      expect(card3.textBold).toEqual('John');
    });
  });

  describe('deliveryModeCard', () => {
    const selectedMode: DeliveryMode = {
      code: 'standard-gross',
      name: 'Standard gross',
      description: 'Standard Delivery description',
      deliveryCost: {
        formattedValue: '$9.99',
      },
    };
    it('should return delivery mode card', () => {
      const card = deliveryModeCard('title', selectedMode);
      expect(card.title).toEqual('title');
      expect(card.textBold).toEqual('Standard gross');
      expect(card.text).toEqual(['Standard Delivery description', '$9.99']);
    });
  });

  describe('paymentMethodCard', () => {
    const mockPaymentDetails: PaymentDetails = {
      accountHolderName: 'Name',
      cardNumber: '123456789',
      cardType: { code: 'Visa', name: 'Visa' },
      expiryMonth: '01',
      expiryYear: '2022',
      cvn: '123',
      billingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        line1: '2343 test address',
        town: 'Montreal',
        region: {
          isocode: 'QC',
        },
        country: {
          isocode: 'CAN',
        },
        postalCode: 'H2N 1E3',
      },
    };
    it('should return payment method card', () => {
      const card = paymentMethodCard('title', 'expire', mockPaymentDetails);
      expect(card.title).toEqual('title');
      expect(card.text).toEqual([
        mockPaymentDetails.cardType?.name,
        mockPaymentDetails.accountHolderName,
        mockPaymentDetails.cardNumber,
        'expire',
      ]);
    });
  });

  describe('billingAddressCard', () => {
    const mockPaymentDetails: PaymentDetails = {
      accountHolderName: 'Name',
      cardNumber: '123456789',
      cardType: { code: 'Visa', name: 'Visa' },
      expiryMonth: '01',
      expiryYear: '2022',
      cvn: '123',
      billingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        line1: '2343 test address',
        town: 'Montreal',
        region: {
          isocode: 'QC',
        },
        country: {
          isocode: 'CAN',
        },
        postalCode: 'H2N 1E3',
      },
    };
    it('should return payment method card', () => {
      const card = billingAddressCard('title', 'billTo', mockPaymentDetails);
      expect(card.title).toEqual('title');
      expect(card.text).toEqual([
        'billTo',
        mockPaymentDetails.billingAddress?.firstName +
          ' ' +
          mockPaymentDetails.billingAddress?.lastName,
        mockPaymentDetails.billingAddress?.line1,
        mockPaymentDetails.billingAddress?.town +
          ', ' +
          mockPaymentDetails.billingAddress?.region?.isocode +
          ', ' +
          mockPaymentDetails.billingAddress?.country?.isocode,
        mockPaymentDetails.billingAddress?.postalCode,
      ]);
    });
  });
});
