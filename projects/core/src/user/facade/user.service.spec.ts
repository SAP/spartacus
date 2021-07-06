import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserService } from './user.service';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserService', () => {
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
        UserService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));
});
