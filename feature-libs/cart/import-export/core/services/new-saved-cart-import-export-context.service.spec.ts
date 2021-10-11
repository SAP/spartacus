// TODO: Add unit tests

// import { ProductImportStatus } from '@spartacus/cart/import-export/core';
//
// describe('loadProductsToCart for saved cart', () => {
//   beforeEach(() => {
//     routerStateSubject.next({
//       state: {
//         semanticRoute: 'savedCarts',
//       },
//     } as RouterState);
//   });
//
//   it('should create, save and load cart', () => {
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe()
//       .unsubscribe();
//
//     expect(routingService.getRouterState).toHaveBeenCalledWith();
//     expect(userIdService.takeUserId).toHaveBeenCalledWith();
//     expect(multiCartService.createCart).toHaveBeenCalledWith({
//       userId: mockUserId,
//       extraData: { active: false },
//     });
//     expect(savedCartService.saveCart).toHaveBeenCalledWith({
//       cartId: mockCartId,
//       saveCartName: mockSavedCart.name,
//       saveCartDescription: mockSavedCart.description,
//     });
//     expect(savedCartService.loadSavedCarts).toHaveBeenCalled();
//     expect(multiCartService.addEntries).toHaveBeenCalledWith(
//       mockUserId,
//       mockCartId,
//       mockProductData
//     );
//   });
//
//   it('should return success action', () => {
//     let action;
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe((data) => (action = data));
//
//     mockActionsSubject.next(
//       new CartActions.CartAddEntrySuccess({
//         userId: mockUserId,
//         cartId: mockCartId,
//         productCode: '693923',
//         quantity: 1,
//         entry: { product: { name: 'mockProduct1' } },
//         quantityAdded: 1,
//         statusCode: ProductImportStatus.SUCCESS,
//       })
//     );
//
//     expect(action).toEqual({
//       productCode: '693923',
//       statusCode: ProductImportStatus.SUCCESS,
//       productName: 'mockProduct1',
//     });
//   });
//
//   it('should return low stock action', () => {
//     let action;
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe((data) => (action = data));
//
//     mockActionsSubject.next(
//       new CartActions.CartAddEntrySuccess({
//         userId: mockUserId,
//         cartId: mockCartId,
//         productCode: '693923',
//         entry: { product: { name: 'mockProduct1' } },
//         quantity: 4,
//         quantityAdded: 1,
//         statusCode: ProductImportStatus.LOW_STOCK,
//       })
//     );
//
//     expect(action).toEqual({
//       productName: 'mockProduct1',
//       quantity: 4,
//       quantityAdded: 1,
//       productCode: '693923',
//       statusCode: ProductImportStatus.LOW_STOCK,
//     });
//   });
//
//   it('should return no stock action', () => {
//     let action;
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe((data) => (action = data));
//
//     mockActionsSubject.next(
//       new CartActions.CartAddEntrySuccess({
//         userId: mockUserId,
//         cartId: mockCartId,
//         productCode: '693923',
//         entry: { product: { name: 'mockProduct1' } },
//         quantity: 4,
//         quantityAdded: 0,
//         statusCode: ProductImportStatus.NO_STOCK,
//       })
//     );
//
//     expect(action).toEqual({
//       productCode: '693923',
//       statusCode: ProductImportStatus.NO_STOCK,
//       productName: 'mockProduct1',
//     });
//   });
//
//   it('should return Unknown Identifier Error action', () => {
//     let action;
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe((data) => (action = data));
//
//     mockActionsSubject.next(
//       new CartActions.CartAddEntryFail({
//         userId: mockUserId,
//         cartId: mockCartId,
//         productCode: '693923',
//         quantity: 1,
//         error: { details: [{ type: 'UnknownIdentifierError' }] },
//       })
//     );
//
//     expect(action).toEqual({
//       productCode: '693923',
//       statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
//     });
//   });
//
//   it('should return unknown error action', () => {
//     let action;
//     service
//       .loadProductsToCart(mockProductData, mockSavedCart)
//       .subscribe((data) => (action = data));
//
//     mockActionsSubject.next(
//       new CartActions.CartAddEntrySuccess({
//         userId: mockUserId,
//         cartId: mockCartId,
//         productCode: '693923',
//         entry: { product: { name: 'mockProduct1' } },
//         quantity: 4,
//         quantityAdded: 1,
//         statusCode: 'CODE_WHICH_WE_DIDNT_REGISTER',
//       })
//     );
//
//     expect(action).toEqual({
//       productCode: '693923',
//       statusCode: ProductImportStatus.UNKNOWN_ERROR,
//     });
//   });
// });
