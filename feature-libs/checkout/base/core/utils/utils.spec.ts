import { Address } from '@spartacus/core';
import { getAddressNumbers } from './utils';

describe('Checkout utils', () => {
  describe('getAddressNumbers', () => {
    const mockAddress: Address = {
      firstName: 'Mock',
      lastName: 'Address',
      phone:'12345',
      cellphone:'67890'
    };

    it('should return phone number and mobile number', () => {
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual(`P: ${mockAddress.phone}
      M: ${mockAddress.cellphone}`);
    });

    it('should return phone number only', () => {
      mockAddress.cellphone = '';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual('P:' + mockAddress.phone);
    });

    it('should return mobile number only', () => {
      mockAddress.phone = '';
      mockAddress.cellphone = '67890';
      expect(getAddressNumbers(mockAddress, 'P', 'M')).toEqual('M:' + mockAddress.cellphone);

      mockAddress.phone = '67890';
      mockAddress.cellphone = '67890';
      expect(getAddressNumbers(mockAddress,  'P', 'M')).toEqual('M:' + mockAddress.cellphone);

    });
  });
});
