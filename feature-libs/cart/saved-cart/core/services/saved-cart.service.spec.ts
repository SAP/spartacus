// import { TestBed } from '@angular/core/testing';
// import { Store } from '@ngrx/store';
// import {
//   Cart,
//   MultiCartService,
//   StateWithMultiCart,
//   User,
//   UserIdService,
//   UserService,
// } from '@spartacus/core';
// import { ProcessesLoaderState } from 'projects/core/src/state/utils/processes-loader/processes-loader-state';
// import { Observable, of } from 'rxjs';

// import { SavedCartService } from './saved-cart.service';

// class MockMultiCartService implements Partial<MultiCartService> {
//   getCartEntity(_cartId: string): Observable<ProcessesLoaderState<Cart>> {
//     return of();
//   }
//   isStable(_cartId: string): Observable<boolean> {
//     return of();
//   }
//   getCarts(): Observable<Cart[]> {
//     return of([]);
//   }
//   deleteCart(_cartId: string, _userId: string): void {}
// }

// class MockUserService implements Partial<UserService> {
//   get(): Observable<User> {
//     return of();
//   }
// }
// class MockUserIdService implements Partial<UserIdService> {
//   takeUserId(): Observable<string | never> {
//     return of();
//   }
// }

// describe('SavedCartService', () => {
//   let service: SavedCartService;
//   let store: Store<StateWithMultiCart>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: MultiCartService, useClass: MockMultiCartService },
//         { provide: UserService, useClass: MockUserService },
//         { provide: UserIdService, useClass: MockUserIdService },
//       ],
//     });
//     store = TestBed.inject(Store);
//     service = TestBed.inject(SavedCartService);
//     spyOn(store, 'dispatch').and.callThrough();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
