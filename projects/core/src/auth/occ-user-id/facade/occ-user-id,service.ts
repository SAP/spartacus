import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { UserToken } from '../models/token-types.model';
import { OccUserIdService } from '../occ-user-id';
import { AUTH_OCC_USER_ID_FEATURE, OccUserIdState } from '../store';
import * as fromReducers from '../store/reducers/index';
import { AuthService } from './auth.service';

const mockToken = {
  userId: 'user@sap.com',
  refresh_token: 'foo',
  access_token: 'testToken-access-token',
} as UserToken;

describe('OccUserIdService', () => {
  let service: OccUserIdService;
  let store: Store<OccUserIdState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          AUTH_OCC_USER_ID_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [OccUserIdService],
    });

    service = TestBed.get(AuthService as Type<OccUserIdService>);
    store = TestBed.get(Store as Type<Store<OccUserIdState>>);
  });

  it('should return anonymous userid when no user token exists', () => {
    let result: string;
    service
      .getOccUserId()
      .subscribe(token => (result = token))
      .unsubscribe();
    expect(result).toEqual(OCC_USER_ID_ANONYMOUS);
  });

  it('should return the token userid when a user token exists', () => {
    let result: string;
    service
      .getOccUserId()
      .subscribe(token => (result = token))
      .unsubscribe();
    expect(result).toEqual(mockToken.userId);
  });
});
