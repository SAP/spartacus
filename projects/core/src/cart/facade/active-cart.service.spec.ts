import { TestBed } from '@angular/core/testing';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService, UserToken } from '../../auth/index';
import { ActiveCartService } from './active-cart.service';
import { MultiCartService } from './multi-cart.service';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../cart/store/reducers/index';
import { StateWithMultiCart } from '../store';
import { StateWithProcess } from '../../process';
import { Type } from '@angular/core';

const userToken$ = new ReplaySubject<UserToken>();

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

class MultiCartServiceStub {}

fdescribe('ActiveCartService', () => {
  let service: ActiveCartService;
  let multiCartService: MultiCartService;
  let authService: AuthService;
  let store: Store<StateWithMultiCart | StateWithProcess<void>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('multi-cart', fromReducers.getMultiCartReducers())
      ],
      providers: [
        ActiveCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });
    service = TestBed.get(ActiveCartService as Type<ActiveCartService>);
    multiCartService = TestBed.get(MultiCartService as Type<MultiCartService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
    store = TestBed.get(Store as Type<Store<StateWithMultiCart | StateWithProcess<void>>>);
  });

  describe('getActive', () => {

  })

  describe('getActiveCartId', () => {

  })

  describe('getEntries', () => {

  })

  describe('getLoaded', () => {

  })

  describe('getAddEntryLoaded', () => {

  })

  describe('addEntry', () => {

  })

  describe('removeEntry', () => {

  })

  describe('updateEntry', () => {

  })

  describe('getEntry', () => {

  })

  describe('addEmail', () => {

  })

  describe('getAssignedUser', () => {

  })

  describe('isGuestCart', () => {

  })

  describe('addEntries', () => {

  })

  describe('isEmail', () => {

  })

  describe('guestCartMerge', () => {

  })

  describe('isEmpty', () => {

  })

  describe('isJustLoggedIn', () => {
    it('should ')
  })
});
