// import { Cart, Order } from '@spartacus/core';
// import { Observable } from 'rxjs';
// import { Component, Input } from '@angular/core';
// import { Item } from '@spartacus/storefront';

// const mockItems = [
//   {
//     id: 0,
//     quantity: 1,
//     entryNumber: 0,
//     product: {
//       id: 0,
//       code: 'PR0000',
//     },
//   },
//   {
//     id: 1,
//     quantity: 5,
//     entryNumber: 1,
//     product: {
//       id: 1,
//       code: 'PR0001',
//     },
//   },
// ];

// const mockAppliedProductPromotions = [
//   {
//     consumedEntries: [
//       {
//         adjustedUnitPrice: 517.4,
//         orderEntryNumber: 0,
//         quantity: 1,
//       },
//     ],
//     description: '10% off on products EOS450D + 18-55 IS Kit',
//     promotion: {
//       code: 'product_percentage_discount',
//       promotionType: 'Rule Based Promotion',
//     },
//   },
// ];

// const mockPotentialProductPromotions = [
//   {
//     description: 'Buy two more and win a trip to the Moon',
//     consumedEntries: [
//       {
//         orderEntryNumber: 1,
//       },
//     ],
//   },
// ];

// const mockCart: Cart = {
//   guid: 'test',
//   code: 'test',
//   deliveryItemsQuantity: 123,
//   totalPrice: { formattedValue: '$999.98' },
//   potentialProductPromotions: [
//     { description: 'Promotion 1' },
//     { description: 'Promotion 2' },
//   ],
// };

// const mockedOrder: Order = {
//   guid: '1',
//   appliedOrderPromotions: [
//     {
//       consumedEntries: [
//         {
//           orderEntryNumber: 2,
//         },
//       ],
//       description: 'test applied order promotion',
//     },
//   ],
// };

// @Component({
//   template: '',
//   selector: 'cx-cart-item-list',
// })
// class MockCartItemListComponent {
//   @Input()
//   items: Item[];
//   @Input()
//   cartIsLoading: Observable<boolean>;
// }

// fdescribe('PromotionService', () => {
//   it('should be created', () => {
//     expect(true).toBeTruthy();
//   })
// });
