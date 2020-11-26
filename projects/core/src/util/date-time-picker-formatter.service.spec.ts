// TODO: Reenable and improve for usage #9753

// import {
//   DateTimePickerFormatterService,
//   DATETIME_PICKER_INPUT_TYPE,
// } from './date-time-picker-formatter.service';

// describe('DateTimePickerFormatter Service', () => {
//   let service: DateTimePickerFormatterService;

//   beforeEach(() => {
//     service = new DateTimePickerFormatterService();
//   });

//   function fakeDateTimezoneOffset(offset: number, callback: Function): any {
//     const original = Date.prototype.getTimezoneOffset;
//     Date.prototype.getTimezoneOffset = () => offset;
//     callback();
//     Date.prototype.getTimezoneOffset = original;
//   }

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('type="datetime-local"', () => {
//     const inputType = DATETIME_PICKER_INPUT_TYPE.DATETIME_LOCAL;

//     describe('toNative', () => {
//       it('should return null if value is empty', () => {
//         expect(service.toNative(undefined, inputType)).toEqual(null);
//         expect(service.toNative(null, inputType)).toEqual(null);
//         expect(service.toNative('', inputType)).toEqual(null);
//       });

//       describe('should convert value to HTML native datetime-local format', () => {
//         it('should return utc-0 offset string', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual('2010-01-01T00:00');
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual('2034-07-12T23:59');
//           });
//         });

//         it('should return past offset string (using local offset)', () => {
//           fakeDateTimezoneOffset(120, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual('2009-12-31T22:00');
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual('2034-07-12T21:59');
//           });
//         });

//         it('should return past offset string (using string offset)', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+02:00', inputType)
//             ).toEqual('2009-12-31T22:00');
//             expect(
//               service.toNative('2034-07-12T23:59+02:00', inputType)
//             ).toEqual('2034-07-12T21:59');
//           });
//         });

//         it('should return future offset string (using local offset)', () => {
//           fakeDateTimezoneOffset(-180, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual('2010-01-01T03:00');
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual('2034-07-13T02:59');
//           });
//         });

//         it('should return future offset string (using string offset)', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00-03:00', inputType)
//             ).toEqual('2010-01-01T03:00');
//             expect(
//               service.toNative('2034-07-12T23:59-03:00', inputType)
//             ).toEqual('2034-07-13T02:59');
//           });
//         });
//       });
//     });

//     describe('toModel', () => {
//       it('should return null if value is empty', () => {
//         expect(service.toModel(undefined, inputType)).toEqual(null);
//         expect(service.toModel(null, inputType)).toEqual(null);
//         expect(service.toModel('', inputType)).toEqual(null);
//       });

//       describe('should convert value to format supported by occ', () => {
//         it('should return utc-0 offset string', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(service.toModel('2010-01-01T00:00', inputType)).toEqual(
//               '2010-01-01T00:00:00+00:00'
//             );
//             expect(service.toModel('2010-01-01T23:59', inputType)).toEqual(
//               '2010-01-01T23:59:00+00:00'
//             );
//           });
//         });

//         it('should return past offset string', () => {
//           fakeDateTimezoneOffset(120, () => {
//             expect(service.toModel('2010-01-01T00:00', inputType)).toEqual(
//               '2010-01-01T00:00:00-02:00'
//             );
//             expect(service.toModel('2010-01-01T23:59', inputType)).toEqual(
//               '2010-01-01T23:59:00-02:00'
//             );
//           });
//         });

//         it('should return future offset string', () => {
//           fakeDateTimezoneOffset(-180, () => {
//             expect(service.toModel('2010-01-01T00:00', inputType)).toEqual(
//               '2010-01-01T00:00:00+03:00'
//             );
//             expect(service.toModel('2010-01-01T23:59', inputType)).toEqual(
//               '2010-01-01T23:59:00+03:00'
//             );
//           });
//         });
//       });
//     });
//   });

//   describe('type="date"', () => {
//     const inputType = DATETIME_PICKER_INPUT_TYPE.DATE;

//     describe('toNative', () => {
//       it('should return null if value is empty', () => {
//         expect(service.toNative(undefined, inputType)).toEqual(null);
//         expect(service.toNative(null, inputType)).toEqual(null);
//         expect(service.toNative('', inputType)).toEqual(null);
//       });

//       describe('should convert value to HTML native datetime-local format', () => {
//         it('should return utc-0 offset string', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual(new Date('2010-01-01T00:00+0000').toLocaleDateString());
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual(new Date('2034-07-12T23:59+0000').toLocaleDateString());
//           });
//         });

//         it('should return past offset string (using local offset)', () => {
//           fakeDateTimezoneOffset(120, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual(new Date('2010-01-01T00:00+0000').toLocaleDateString());
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual(new Date('2034-07-12T23:59+0000').toLocaleDateString());
//           });
//         });

//         it('should return past offset string (using string offset)', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+02:00', inputType)
//             ).toEqual(new Date('2010-01-01T00:00+02:00').toLocaleDateString());
//             expect(
//               service.toNative('2034-07-12T23:59+02:00', inputType)
//             ).toEqual(new Date('2034-07-12T23:59+02:00').toLocaleDateString());
//           });
//         });

//         it('should return future offset string (using local offset)', () => {
//           fakeDateTimezoneOffset(-180, () => {
//             expect(
//               service.toNative('2010-01-01T00:00+0000', inputType)
//             ).toEqual(new Date('2010-01-01T00:00+0000').toLocaleDateString());
//             expect(
//               service.toNative('2034-07-12T23:59+0000', inputType)
//             ).toEqual(new Date('2034-07-12T23:59+0000').toLocaleDateString());
//           });
//         });

//         it('should return future offset string (using string offset)', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(
//               service.toNative('2010-01-01T00:00-03:00', inputType)
//             ).toEqual(new Date('2010-01-01T00:00-03:00').toLocaleDateString());
//             expect(
//               service.toNative('2034-07-12T23:59-03:00', inputType)
//             ).toEqual(new Date('2034-07-12T23:59-03:00').toLocaleDateString());
//           });
//         });
//       });
//     });

//     describe('toModel', () => {
//       it('should return null if value is empty', () => {
//         expect(service.toModel(undefined, inputType)).toEqual(null);
//         expect(service.toModel(null, inputType)).toEqual(null);
//         expect(service.toModel('', inputType)).toEqual(null);
//       });

//       describe('should convert value to format supported by occ', () => {
//         it('should return utc-0 offset string', () => {
//           fakeDateTimezoneOffset(0, () => {
//             expect(service.toModel('2010-01-01', inputType)).toEqual(
//               '2010-01-01T00:00:00+00:00'
//             );
//           });
//         });

//         it('should return past offset string', () => {
//           fakeDateTimezoneOffset(120, () => {
//             expect(service.toModel('2010-01-01', inputType)).toEqual(
//               '2010-01-01T00:00:00-02:00'
//             );
//           });
//         });

//         it('should return future offset string', () => {
//           fakeDateTimezoneOffset(-180, () => {
//             expect(service.toModel('2010-01-01', inputType)).toEqual(
//               '2010-01-01T00:00:00+03:00'
//             );
//           });
//         });
//       });
//     });
//   });
// });
