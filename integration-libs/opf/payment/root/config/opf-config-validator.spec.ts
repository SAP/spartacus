// TODO: Add unit tests

// import { OpfConfig } from './opf-config';
// import { opfConfidValidator } from './opf-config-validator';

// describe('opfConfidValidator', () => {
//   it('should warn about an undefined opf configuration section', () => {
//     const CONFIG: OpfConfig = {};
//     expect(opfConfidValidator(CONFIG)).toBeTruthy();
//   });

//   it('should warn about undefined baseUrl configuration url', () => {
//     const CONFIG: OpfConfig = {
//       opf: {
//         baseUrl: undefined,
//         commerceCloudPublicKey: 'test',
//       },
//     };
//     expect(opfConfidValidator(CONFIG)).toBeTruthy();
//   });

//   it('should warn about undefined commerceCloudPublicKey configuration property', () => {
//     const CONFIG: OpfConfig = {
//       opf: {
//         baseUrl: 'test url',
//         commerceCloudPublicKey: undefined,
//       },
//     };
//     expect(opfConfidValidator(CONFIG)).toBeTruthy();
//   });
// });
