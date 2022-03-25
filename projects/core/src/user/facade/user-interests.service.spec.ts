import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import {
  NotificationType,
  ProductInterestSearchResult,
} from '../../model/product-interest.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserInterestsService } from './user-interests.service';

const emptyInterestList: ProductInterestSearchResult = {
  results: [],
  sorts: [],
  pagination: {},
};

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

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
      providers: [
        UserInterestsService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserInterestsService);
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
      .getAndLoadProductInterests()
      .subscribe((data) => expect(data).toEqual(emptyInterestList))
      .unsubscribe();

    service
      .getProductInterests()
      .subscribe((data) => expect(data).toEqual(emptyInterestList))
      .unsubscribe();
  });

  it('should be able to get product interests loading flag', () => {
    store.dispatch(new UserActions.LoadProductInterests({ userId: 'userId' }));
    service
      .getProdutInterestsLoading()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to remove product interest', () => {
    service.removeProdutInterest({});
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.RemoveProductInterest({
        userId: 'current',
        item: {},
        singleDelete: undefined,
      })
    );

    service.removeProdutInterest({}, true);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.RemoveProductInterest({
        userId: 'current',
        item: {},
        singleDelete: true,
      })
    );
  });

  it('should be able to get removeProdutInterestLoading flag', () => {
    store.dispatch(
      new UserActions.RemoveProductInterest({ userId: 'current', item: {} })
    );
    service
      .getRemoveProdutInterestLoading()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get removeProdutInterestSuccess flag', () => {
    store.dispatch(new UserActions.RemoveProductInterestSuccess('success'));
    service
      .getRemoveProdutInterestSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to add a product interest', () => {
    service.addProductInterest('5514465', NotificationType.BACK_IN_STOCK);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.AddProductInterest({
        userId: 'current',
        productCode: '5514465',
        notificationType: NotificationType.BACK_IN_STOCK,
      })
    );
  });

  it('should be able to get a product interest adding success flag', () => {
    store.dispatch(new UserActions.AddProductInterestSuccess('success'));
    service
      .getAddProductInterestSuccess()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to get a product interest adding error flag', () => {
    store.dispatch(new UserActions.AddProductInterestFail('error'));
    service
      .getAddProductInterestError()
      .subscribe((data) => expect(data).toEqual(true))
      .unsubscribe();
  });

  it('should be able to reset interest removing state', () => {
    service.resetRemoveInterestState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetRemoveInterestState()
    );
  });

  it('should be able to reset interest adding state', () => {
    service.resetAddInterestState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetAddInterestState()
    );
  });

  it('should be able to clear product interests', () => {
    service.clearProductInterests();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearProductInterests()
    );
  });
});
