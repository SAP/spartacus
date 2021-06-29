import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title, User, UserSignUp } from '../../model/misc.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserService } from './user.service';

class MockUserIdService implements Partial<UserIdService> {
  invokeWithUserId(cb) {
    cb(OCC_USER_ID_CURRENT);
    return new Subscription();
  }
}

describe('UserService', () => {
  let service: UserService;
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
    service = TestBed.inject(UserService);
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));

  describe('get user details', () => {
    it('should get user details from store', () => {
      store.dispatch(
        new UserActions.LoadUserDetailsSuccess({ uid: 'testUser' } as User)
      );

      let userDetails: User;
      service
        .get()
        .subscribe((data) => {
          userDetails = data;
        })
        .unsubscribe();
      expect(userDetails).toEqual({ uid: 'testUser' });
    });

    it('should dispatch LoadUserDetails when they are not present in the store', () => {
      let userDetails: User;
      service
        .get()
        .subscribe((data) => {
          userDetails = data;
        })
        .unsubscribe();
      expect(userDetails).toEqual({});
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserDetails(OCC_USER_ID_CURRENT)
      );
    });

    it('should load user details', () => {
      service.load();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserDetails(OCC_USER_ID_CURRENT)
      );
    });

    it('should not load anonymous user details', () => {
      const userIdService = TestBed.inject(UserIdService);
      spyOn(userIdService, 'invokeWithUserId').and.callFake((cb) =>
        cb(OCC_USER_ID_ANONYMOUS)
      );
      service.load();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('register user', () => {
    it('should be able to register user', () => {
      const userRegisterFormData: UserSignUp = {
        titleCode: 'Mr.',
        firstName: 'firstName',
        lastName: 'lastName',
        uid: 'uid',
        password: 'password',
      };
      service.register(userRegisterFormData);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.RegisterUser(userRegisterFormData)
      );
    });

    it('should be able to register guest', () => {
      service.registerGuest('guid', 'password');
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.RegisterGuest({ guid: 'guid', password: 'password' })
      );
    });
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new UserActions.LoadTitlesSuccess([
        { code: 't1', name: 't1' },
        { code: 't2', name: 't2' },
      ])
    );
    let titles: Title[];
    service
      .getTitles()
      .subscribe((data) => {
        titles = data;
      })
      .unsubscribe();
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' },
    ]);
  });

  it('should be able to load titles', () => {
    service.loadTitles();
    expect(store.dispatch).toHaveBeenCalledWith(new UserActions.LoadTitles());
  });
});
