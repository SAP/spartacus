import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../../auth/facade/auth.service';
import { ReplenishmentOrderList } from '../../model/replenishment-order.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserReplenishmentOrderService } from './user-replenishment-order.service';

class MockAuthService {
    invokeWithUserId(cb) {
        cb(OCC_USER_ID_CURRENT);
    }
}

describe('UserReplenishmentOrderService', () => {
  let service: UserReplenishmentOrderService;
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
              UserReplenishmentOrderService,
              { provide: AuthService, useClass: MockAuthService },
          ],
      });

      store = TestBed.inject(Store);
      spyOn(store, 'dispatch').and.callThrough();
      service = TestBed.inject(UserReplenishmentOrderService);
  });

  it('should UserOrderService is injected', inject(
    [UserReplenishmentOrderService],
    (userReplenishmentOrderService: UserReplenishmentOrderService) => {
      expect(userReplenishmentOrderService).toBeTruthy();
    }
  ));

  it('should be able to get replenishment order history list', () => {
      store.dispatch(
        new UserActions.LoadUserReplenishmentOrdersSuccess({
              replenishmentOrders: [],
              pagination: {},
              sorts: [],
          })
      );

      let orderList: ReplenishmentOrderList;
      service
          .getReplenishmentOrderHistoryList(1)
          .subscribe((data) => {
              orderList = data;
          })
          .unsubscribe();
      expect(orderList).toEqual({
          replenishmentOrders: [],
          pagination: {},
          sorts: [],
      });
  });

  it('should be able to get replenishment order list loaded flag', () => {
    store.dispatch(new UserActions.LoadUserReplenishmentOrdersSuccess({}));

      let orderListLoaded: boolean;
      service
        .getReplenishmentOrderHistoryListLoaded()
        .subscribe((data) => {
            console.log('from loaded flag service', data);
            orderListLoaded = data;
        })
        .unsubscribe();
      expect(orderListLoaded).toEqual(true);
  });

    it('should be able to load replenishment order list data', () => {
    service.loadReplenishmentOrderList(10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadUserReplenishmentOrders({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should be able to clear replenishment order list', () => {
    service.clearReplenishmentOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearUserReplenishmentOrders()
    );
  });

});