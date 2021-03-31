import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAccountAdapter } from './user-account.adapter';
import { UserAccountConnector } from './user-account.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserAccountAdapter {
  load = createSpy('load').and.callFake((userId) => of(`load-${userId}`));
}

describe('UserConnector', () => {
  let service: UserAccountConnector;
  let adapter: UserAccountAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAccountConnector,
        { provide: UserAccountAdapter, useClass: MockUserAdapter },
      ],
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
