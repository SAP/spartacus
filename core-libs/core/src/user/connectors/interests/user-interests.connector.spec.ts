import { of } from 'rxjs';
import { vi } from 'vitest';
import {
  NotificationType,
  ProductInterestEntryRelation,
} from '../../../model/product-interest.model';
import { UserInterestsConnector } from './user-interests.connector';

describe('UserInterestsConnector', () => {
  let service: UserInterestsConnector;
  let adapter: {
    getInterests: ReturnType<typeof vi.fn>;
    removeInterest: ReturnType<typeof vi.fn>;
    addInterest: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      getInterests: vi
        .fn()
        .mockImplementation((userId) => of(`loadList-${userId}`)),
      removeInterest: vi.fn().mockReturnValue(of([])),
      addInterest: vi.fn(),
    };
    service = new UserInterestsConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get interests should call adapter', () => {
    let result: any;
    service
      .getInterests(
        'user-id',
        10,
        0,
        'name:asc',
        '343898',
        NotificationType.BACK_IN_STOCK
      )
      .subscribe((res) => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getInterests).toHaveBeenCalledWith(
      'user-id',
      10,
      0,
      'name:asc',
      '343898',
      NotificationType.BACK_IN_STOCK
    );
  });

  it('remove interests should call adapter', () => {
    let result: any;
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
