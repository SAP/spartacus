import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import * as fromStore from '../../store';
import * as fromAuthStore from '@auth/store';
import * as fromRouting from '../../../routing/store';
import { UserRegisterEffects } from './user-register.effect';
import { OccUserService } from '../../../occ/user/user.service';
import { UserRegisterFormData } from '../../models/user.model';

class MockUserService {
  registerUser(_user: UserRegisterFormData): Observable<any> {
    return;
  }
}

const user: UserRegisterFormData = {
  firstName: '',
  lastName: '',
  password: '',
  titleCode: '',
  uid: ''
};

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<any>;
  let userService: OccUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.reducers,
          user: combineReducers(fromStore.reducers)
        })
      ],
      providers: [
        UserRegisterEffects,
        { provide: OccUserService, useClass: MockUserService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(UserRegisterEffects);
    userService = TestBed.get(OccUserService);

    spyOn(userService, 'registerUser').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new fromStore.RegisterUser(user);
      const loadUser = new fromAuthStore.LoadUserToken({
        userId: '',
        password: ''
      });
      const navigate = new fromRouting.Go({ path: [''] });
      const completion = new fromStore.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: loadUser,
        c: navigate,
        d: completion
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });
});
