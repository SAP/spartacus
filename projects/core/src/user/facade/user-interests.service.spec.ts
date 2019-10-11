import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserInterestsService } from './user-interests.service';
import { Type } from '@angular/core';
import { ProductInterestSearchResult } from '../../model/product-interest.model';

const emptyInterestList: ProductInterestSearchResult = {
  results: [],
  sorts: [],
  pagination: {},
};

describe('UserInterestsService', () => {
  let service: UserInterestsService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [UserInterestsService],
    });

    store = TestBed.get(Store as Type<Store<StateWithUser>>);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserInterestsService as Type<UserInterestsService>);
  });

  it('should UserInterestsService is injected', inject(
    [UserInterestsService],
    (userInterestsService: UserInterestsService) => {
      expect(userInterestsService).toBeTruthy();
    }
  ));

  it('should be able to load product interests', () => {
    service.loadProductInterests(5, 0, 'name:asc');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadProductInterests({
        userId: 'current',
        pageSize: 5,
        currentPage: 0,
        sort: 'name:asc',
        productCode: undefined,
        notificationType: undefined,
      })
    );
  });

  it('should be able to get product interests', () => {
    store.dispatch(
      new UserActions.LoadProductInterestsSuccess(emptyInterestList)
    );

    service
      .getProdutInterests()
      .subscribe(data => expect(data).toEqual(emptyInterestList))
      .unsubscribe();
  });

  it('should be able to get product interests loading flag', () => {
    store.dispatch(new UserActions.LoadProductInterests({ userId: 'userId' }));
    service
      .getProdutInterestsLoading()
      .subscribe(data => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to remove product interest', () => {
    service.removeProdutInterest({});
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.RemoveProductInterest({
        userId: 'current',
        item: {},
      })
    );
  });

  it('should be able to get removeProdutInterestLoading flag', () => {
    store.dispatch(
      new UserActions.RemoveProductInterest({ userId: 'current', item: {} })
    );
    service
      .getRemoveProdutInterestLoading()
      .subscribe(data => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get removeProdutInterestSuccess flag', () => {
    store.dispatch(new UserActions.RemoveProductInterestSuccess('success'));
    service
      .getRemoveProdutInterestSuccess()
      .subscribe(data => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to clear product interests', () => {
    service.clearProductInterests();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearProductInterests()
    );
  });
});
