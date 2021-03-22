import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAccountAdapter } from './user-account.adapter';
import { UserAccountConnector } from './user-account.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserAccountAdapter {
  load = createSpy('load').and.callFake((userId) => of(`load-${userId}`));
  update = createSpy('update').and.returnValue(of({}));
  register = createSpy('register').and.callFake((userId) => of(userId));
  registerGuest = createSpy('registerGuest').and.callFake((userId) =>
    of(userId)
  );
  remove = createSpy('remove').and.returnValue(of({}));
  requestForgotPasswordEmail = createSpy(
    'requestForgotPasswordEmail'
  ).and.returnValue(of({}));
  resetPassword = createSpy('resetPassword').and.returnValue(of({}));
  updateEmail = createSpy('updateEmail').and.returnValue(of({}));
  updatePassword = createSpy('updatePassword').and.returnValue(of({}));
  loadTitles = createSpy('loadTitles').and.returnValue(of([]));
}

describe('UserConnector', () => {
  let service: UserAccountConnector;
  let adapter: UserAccountAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserAccountAdapter, useClass: MockUserAdapter }],
    });

    service = TestBed.inject(UserAccountConnector);
    adapter = TestBed.inject(UserAccountAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter', () => {
    let result;
    service.get('user-id').subscribe((res) => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.load).toHaveBeenCalledWith('user-id');
  });
});
