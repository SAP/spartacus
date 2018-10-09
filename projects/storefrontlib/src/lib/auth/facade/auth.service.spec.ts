import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import * as NgrxStore from '@ngrx/store';
import * as fromAuthStore from '../store';
import { UserToken } from '../models/token-types.model';

const mockToken = {
  userId: 'user@sap.com'
} as UserToken;

describe('AuthService', () => {
  const mockSelect = createSpy('select').and.returnValue(() => of(mockToken));
  let store;

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthService]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should expose userToken state', inject(
    [AuthService],
    (service: AuthService) => {
      service.userToken$.subscribe(token => {
        expect(mockSelect).toHaveBeenCalledWith(fromAuthStore.getUserToken);
        expect(token).toEqual(mockToken);
      });
    }
  ));

  it('should dispatch proper action for authorize', inject(
    [AuthService],
    (service: AuthService) => {
      service.authorize('user', 'password');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromAuthStore.LoadUserToken({
          userId: 'user',
          password: 'password'
        })
      );
    }
  ));

  it('should dispatch proper action for authorizeToken', inject(
    [AuthService],
    (service: AuthService) => {
      service.authorizeWithToken(mockToken);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromAuthStore.LoadUserTokenSuccess(mockToken)
      );
    }
  ));

  it('should dispatch proper action for login', inject(
    [AuthService],
    (service: AuthService) => {
      service.login();
      expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Login());
    }
  ));

  it('should dispatch proper action for logout', inject(
    [AuthService],
    (service: AuthService) => {
      service.logout();
      expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Logout());
    }
  ));
});
