import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserInterestsService } from './user-interests.service';

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

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserInterestsService);
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
        userId: 'userId',
        pageSize: 5,
        currentPage: 1,
        sort: 'name:asc',
      })
    );
  });
  // it('should be able to get product interests', () => {
  //   store.dispatch(
  //     new UserActions.LoadProductInterestsSuccess({
  //       results: [],
  //       sorts: [],
  //       pagination: {},
  //     })
  //   );

  //   service
  //     .getProdutInterests(1)
  //     .subscribe(data =>
  //       expect(data).toEqual({
  //         orders: [],
  //         pagination: {},
  //         sorts: [],
  //       })
  //     )
  //     .unsubscribe();
  // });
  it('should be able to get product interests loaded flag', () => {
    store.dispatch(new UserActions.LoadProductInterestsSuccess({}));
    service
      .getProdutInterestsLoading()
      .subscribe(data => expect(data).toEqual(true))
      .unsubscribe();
  });
  it('should be able to delete product interests', () => {
    service.removeProdutInterest({});
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.RemoveProductInterests({
        userId: 'userId',
        item: {},
      })
    );
  });
  it('should be able to clear product interests', () => {
    service.clearProductInterests();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearProductInterests()
    );
  });
});
