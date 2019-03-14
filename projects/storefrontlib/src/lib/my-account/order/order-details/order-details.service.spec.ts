// TODO
// import { Observable, of } from 'rxjs';
// import { Order, UserToken } from '@spartacus/core';
//
// const mockOrder: Order = {
//   code: '1',
//   statusDisplay: 'Shipped',
//   deliveryAddress: {
//     firstName: 'John',
//     lastName: 'Smith',
//     line1: 'Buckingham Street 5',
//     line2: '1A',
//     phone: '(+11) 111 111 111',
//     postalCode: 'MA8902',
//     town: 'London',
//     country: {
//       isocode: 'UK'
//     }
//   },
//   deliveryMode: {
//     name: 'Standard order-detail-shipping',
//     description: '3-5 days'
//   },
//   paymentInfo: {
//     accountHolderName: 'John Smith',
//     cardNumber: '************6206',
//     expiryMonth: '12',
//     expiryYear: '2026',
//     cardType: {
//       name: 'Visa'
//     },
//     billingAddress: {
//       firstName: 'John',
//       lastName: 'Smith',
//       line1: 'Buckingham Street 5',
//       line2: '1A',
//       phone: '(+11) 111 111 111',
//       postalCode: 'MA8902',
//       town: 'London',
//       country: {
//         isocode: 'UK'
//       }
//     }
//   }
// };
//
// class MockAuthService {
//   getUserToken(): Observable<UserToken> {
//     return of({ userId: 'test' } as UserToken);
//   }
// }
//
// class MockUserService {
//   getOrderDetails(): Observable<Order> {
//     return of(mockOrder);
//   }
//   loadOrderDetails(_userId: string, _orderCode: string): void {}
//   clearOrderDetails(): void {}
// }
