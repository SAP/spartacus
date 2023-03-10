import { Address } from '@spartacus/core';
import { getAddressNumbers } from './address-number-utils';

describe('Checkout utils', () => {
  describe('getAddressNumbers', () => {
    const mockAddress: Address = {
      firstName: 'Mock',
      lastName: 'Address',
      phone: '12345',
      cellphone: '67890',
    };

    it('should return phone number and mobile number when both are provided', () => {
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(
        `P: ${mockAddress.phone}\nM: ${mockAddress.cellphone}`
      );
    });

    it('should return phone number only when mobile number not provided', () => {
      mockAddress.cellphone = '';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(
        'P: ' + mockAddress.phone
      );
    });

    it('should return mobile number when phone number is not provided', () => {
      mockAddress.phone = '';
      mockAddress.cellphone = '67890';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(
        'M: ' + mockAddress.cellphone
      );
    });

    it('should return mobile number when moilbe number and phone number are the same', () => {
      mockAddress.phone = '67890';
      mockAddress.cellphone = '67890';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(
        'M: ' + mockAddress.cellphone
      );
    });

    it('should return undefined when no numbers are provided', () => {
      mockAddress.phone = '';
      mockAddress.cellphone = '';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(undefined);
    });
  });
});
