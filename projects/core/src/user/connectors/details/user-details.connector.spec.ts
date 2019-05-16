import { TestBed } from '@angular/core/testing';

import { UserDetailsConnector } from './user-details.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserDetailsAdapter } from './user-details.adapter';
import createSpy = jasmine.createSpy;

class MockUserDetailsAdapter implements UserDetailsAdapter {
  load = createSpy('load').and.callFake(userId => of(`load-${userId}`));
  update = createSpy('update').and.returnValue(of({}));
}

describe('SiteConnector', () => {
  let service: UserDetailsConnector;
  let adapter: UserDetailsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserDetailsAdapter, useClass: MockUserDetailsAdapter },
      ],
    });

    service = TestBed.get(UserDetailsConnector);
    adapter = TestBed.get(UserDetailsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load should call adapter', () => {
    let result;
    service.load('user-id').subscribe(res => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.load).toHaveBeenCalledWith('user-id');
  });

  it('update should call adapter', () => {
    let result;
    service.update('user-id', {}).subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.update).toHaveBeenCalledWith('user-id', {});
  });
});
