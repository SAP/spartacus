import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';

import { NotAuthGuard } from './not-auth.guard';
import * as fromRoot from './../../routing/store';
import * as fromStore from './../../auth/store';

const mockUserValidToken = {
  access_token: 'Mock Access Token'
};

const mockUserInvalidToken = {};

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
    spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

    authGuard.canActivate().subscribe(value => expect(value).toBe(false));
  });

  it('should return true', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserInvalidToken));

    authGuard.canActivate().subscribe(value => expect(value).toBe(true));
  });
});
