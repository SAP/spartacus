// import { TestBed } from '@angular/core/testing';
//
// import { UserConnector } from './user.connector';
// import { of } from 'rxjs/internal/observable/of';
// import { UserAdapter } from './user.adapter';
// import createSpy = jasmine.createSpy;
//
// class MockUserAdapter implements UserAdapter {
//   place = createSpy('UserAdapter.place').and.callFake((userId, cartId) =>
//     of(`placedUser-${userId}-${cartId}`)
//   );
//
//   load = createSpy('UserAdapter.load').and.callFake((userId, userCode) =>
//     of(`user-${userId}-${userCode}`)
//   );
//
//   loadHistory = createSpy('UserAdapter.loadHistory').and.callFake(userId =>
//     of(`userHistory-${userId}`)
//   );
// }
//
// describe('SiteConnector', () => {
//   let service: UserConnector;
//   let adapter: UserAdapter;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [{ provide: UserAdapter, useClass: MockUserAdapter }],
//     });
//
//     service = TestBed.get(UserConnector);
//     adapter = TestBed.get(UserAdapter);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   it('place should call adapter', () => {
//     let result;
//     service.place('user1', 'cart1').subscribe(res => (result = res));
//     expect(result).toBe('placedUser-user1-cart1');
//     expect(adapter.place).toHaveBeenCalledWith('user1', 'cart1');
//   });
//
//   it('get should call adapter', () => {
//     let result;
//     service.get('user2', 'user2').subscribe(res => (result = res));
//     expect(result).toBe('user-user2-user2');
//     expect(adapter.load).toHaveBeenCalledWith('user2', 'user2');
//   });
//
//   it('getHistory should call adapter', () => {
//     let result;
//     service.getHistory('user3').subscribe(res => (result = res));
//     expect(result).toBe('userHistory-user3');
//     expect(adapter.loadHistory).toHaveBeenCalledWith(
//       'user3',
//       undefined,
//       undefined,
//       undefined
//     );
//   });
// });
