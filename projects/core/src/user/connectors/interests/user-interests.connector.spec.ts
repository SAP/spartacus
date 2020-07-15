import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  NotificationType,
  ProductInterestEntryRelation,
} from '../../../model/product-interest.model';
import { UserInterestsAdapter } from './user-interests.adapter';
import { UserInterestsConnector } from './user-interests.connector';

import createSpy = jasmine.createSpy;

const PAGE_SIZE_TEN = 10;

class MockUserInterestsAdapter implements UserInterestsAdapter {
  getInterests = createSpy('getInterests').and.callFake((userId) =>
    of(`loadList-${userId}`)
  );
  removeInterest = createSpy('removeInterest').and.returnValue(of([]));
  addInterest = createSpy('addInterest').and.stub();
}

describe('UserInterestsConnector', () => {
  let service: UserInterestsConnector;
  let adapter: UserInterestsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserInterestsAdapter, useClass: MockUserInterestsAdapter },
      ],
    });

    service = TestBed.inject(UserInterestsConnector);
    adapter = TestBed.inject(UserInterestsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get interests should call adapter', () => {
    let result;
    service
      .getInterests(
        'user-id',
        PAGE_SIZE_TEN,
        0,
        'name:asc',
        '343898',
        NotificationType.BACK_IN_STOCK
      )
      .subscribe((res) => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getInterests).toHaveBeenCalledWith(
      'user-id',
      PAGE_SIZE_TEN,
      0,
      'name:asc',
      '343898',
      NotificationType.BACK_IN_STOCK
    );
  });

  it('remove interests should call adapter', () => {
    let result;
    const relationData: ProductInterestEntryRelation = {
      product: {},
      productInterestEntry: [],
    };
    service
      .removeInterest('user-id', relationData)
      .subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.removeInterest).toHaveBeenCalledWith(
      'user-id',
      relationData
    );
  });
});
