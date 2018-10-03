import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { NotAuthGuard } from './not-auth.guard';
import * as fromRoot from './../../routing/store';
import * as fromStore from './../../auth/store';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
};

describe('NotAuthGuard', () => {
  let authGuard: NotAuthGuard;
  let store: Store<fromStore.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotAuthGuard],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromStore.getReducers())
        })
      ]
    });
    store = TestBed.get(Store);
    authGuard = TestBed.get(NotAuthGuard);
  });

  it('should return false', () => {
    store.dispatch(new fromStore.LoadUserTokenSuccess(mockUserToken));

    authGuard.canActivate().subscribe(value => expect(value).toBe(false));
  });

  it('should return true', () => {
    authGuard.canActivate().subscribe(value => expect(value).toBe(true));
  });
});
