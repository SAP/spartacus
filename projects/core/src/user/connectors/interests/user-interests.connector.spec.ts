import { TestBed } from '@angular/core/testing';

import { UserInterestsConnector } from './user-interests.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserInterestsAdapter } from './user-interests.adapter';
import createSpy = jasmine.createSpy;
import { ProductInterestEntryRelation } from '../../../model/product-interest.model';

class MockUserInterestsAdapter implements UserInterestsAdapter {
  removeInterest = createSpy('removeInterest').and.returnValue(of([]));
  getInterests = createSpy('getInterests').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
  addInterest = createSpy('addInterest').and.stub();
}

fdescribe('UserInterestsConnector', () => {
  let service: UserInterestsConnector;
  let adapter: UserInterestsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserInterestsAdapter, useClass: MockUserInterestsAdapter },
      ],
    });

    service = TestBed.get(UserInterestsConnector);
    adapter = TestBed.get(UserInterestsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove interests should call adapter', () => {
    let result;
    const relationData: ProductInterestEntryRelation = {
      product: {},
      productInterestEntry: [],
    };
    service
      .removeInterest('user-id', relationData)
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.removeInterest).toHaveBeenCalledWith(
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
