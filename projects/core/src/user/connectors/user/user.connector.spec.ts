import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAdapter } from './user.adapter';
import { UserConnector } from './user.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserAdapter {
  load = createSpy('load').and.callFake((userId) => of(`load-${userId}`));
  register = createSpy('register').and.callFake((userId) => of(userId));
  registerGuest = createSpy('registerGuest').and.callFake((userId) =>
    of(userId)
  );
  loadTitles = createSpy('loadTitles').and.returnValue(of([]));
}

describe('UserConnector', () => {
  let service: UserConnector;
  let adapter: UserAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserAdapter, useClass: MockUserAdapter }],
    });

    service = TestBed.inject(UserConnector);
    adapter = TestBed.inject(UserAdapter);
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

  it('registerGuest should call adapter', () => {
    let result;

    service
      .registerGuest('guid', 'password')
      .subscribe((res) => (result = res));
    expect(result).toBe('guid');
    expect(adapter.registerGuest).toHaveBeenCalledWith('guid', 'password');
  });

  it('getTitles should call adapter', () => {
    let result;
    service.getTitles().subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadTitles).toHaveBeenCalledWith();
  });
});
