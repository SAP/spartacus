import { TestBed } from '@angular/core/testing';

import { MyInterestsConnector } from './user-interests.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserInterestsAdapter } from './user-interests.adapter';
import createSpy = jasmine.createSpy;
import { ProductInterestRelation } from '../../../model/product-interest.model';

class MockMyInterestsAdapter implements UserInterestsAdapter {
  removeInterests = createSpy('removeInterests').and.returnValue(of([]));
  getInterests = createSpy('getInterests').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
}

describe('UserInterestsConnector', () => {
  let service: MyInterestsConnector;
  let adapter: UserInterestsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserInterestsAdapter, useClass: MockMyInterestsAdapter },
      ],
    });

    service = TestBed.get(MyInterestsConnector);
    adapter = TestBed.get(UserInterestsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove interests should call adapter', () => {
    let result;
    const relationData: ProductInterestRelation = {
      product: {},
      productInterestEntry: [],
    };
    service
      .removeInterests('user-id', relationData)
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.removeInterests).toHaveBeenCalledWith(
      'user-id',
      relationData
    );
  });

  it('get interests should call adapter', () => {
    let result;
    service.getInterests('user-id').subscribe(res => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getInterests).toHaveBeenCalledWith('user-id');
  });
});
