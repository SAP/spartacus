// TODO: Add unit tests

// import { Action } from '@ngrx/store';
// import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
// import { BehaviorSubject, of, Subject } from 'rxjs';
//
// const mockCartId = '00004546';
//
// const mockUserId = 'test-user';
// const mockCartData: StateUtils.ProcessesLoaderState<Cart> = {
//   value: { code: mockCartId },
// };
//
// class MockUserIdService implements Partial<UserIdService> {
//   takeUserId = createSpy().and.returnValue(of(mockUserId));
// }
//
// class MockMultiCartService implements Partial<MultiCartService> {
//   createCart = createSpy().and.returnValue(of(mockCartData));
//   addEntries = createSpy().and.callThrough();
// }
//
// class MockSavedCartService implements Partial<SavedCartFacade> {
//   saveCart = createSpy().and.callThrough();
//   loadSavedCarts = createSpy().and.callThrough();
//   getSaveCartProcessLoading = createSpy().and.returnValue(of(false));
// }
//
// const routerStateSubject = new BehaviorSubject<RouterState>({
//   state: {
//     semanticRoute: 'savedCarts',
//   },
// } as RouterState);
//
// class MockRoutingService implements Partial<RoutingService> {
//   getRouterState = createSpy().and.returnValue(
//     routerStateSubject.asObservable()
//   );
// }
//
// class MockActiveCartService implements Partial<ActiveCartService> {
//   addEntries = createSpy().and.callThrough();
//   getActiveCartId = createSpy().and.returnValue(of(mockCartId));
// }
//
// const mockActionsSubject = new Subject<Action>();
