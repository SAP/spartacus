// TODO: Add unit tests

// import { Address } from '@spartacus/core';
// import { Card } from '@spartacus/storefront';
// import { GetAddressCardContent } from './get-address-card-content.pipe';

// const mockedAddress: Address = {
//   country: { isocode: 'PL' },
//   titleCode: 'mr',
//   firstName: 'John',
//   lastName: 'Doe',
//   line1: 'Noname street',
//   line2: '',
//   town: 'Warsaw',
//   postalCode: '02651',
//   phone: '',
//   cellphone: '',
//   defaultAddress: false,
// };

// describe('GetAddressCardContent', () => {
//   const pipe = new GetAddressCardContent();

//   it('should return empty object if address has not been provided', () => {
//     expect(pipe.transform(undefined as unknown as Address)).toEqual({});
//   });

//   it('should show region as address region iso code if iso code present', () => {
//     const isocode: string = 'testIso';
//     const address: Address = {
//       ...mockedAddress,
//       region: { isocode },
//     };

//     expect(pipe.transform(address)).toContain(isocode);
//   });

//   it('should transform address object to card object', () => {
//     const expectedResult: Card = {
//       textBold: 'John Doe',
//       text: ['Noname street', '', 'Warsaw, PL', '02651', ''],
//     };

//     expect(pipe.transform(mockedAddress)).toEqual(expectedResult);
//   });
// });
