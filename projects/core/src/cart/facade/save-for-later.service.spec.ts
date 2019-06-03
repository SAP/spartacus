import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { AuthService, UserToken } from '../../auth';

import { StateWithCart } from '../store/cart-state';
import * as fromSaveForLaterCart from '../../cart/store';

import { ANONYMOUS_USERID } from './cart-data.service';
import { SaveForLaterService } from './save-for-later.service';
import { SaveForLaterDataService } from './save-for-later-data.service';
import { OrderEntry } from '../../model/order.model';
import { Cart } from '../../model/cart.model';
import { UserRegisterFormData, UserService } from '../../user';

class SaveForLaterDataServiceStub {
  userId;
  cart;
  cartId;
}

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class UserServiceStub {
  get(): Observable<UserRegisterFormData> {
    return of();
  }
}

describe('SaveForLaterService', () => {
  let service: SaveForLaterService;
  let saveForLaterData: SaveForLaterDataServiceStub;
  let authService: AuthServiceStub;
  let store: Store<StateWithCart>;

  const productCode = '1234';
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };
  const userToken: UserToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx',
  };
  const mockCartEntry: OrderEntry = {
    entryNumber: 0,
    product: { code: productCode },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromSaveForLaterCart.getReducers()),
      ],
      providers: [
        SaveForLaterService,
        {
          provide: SaveForLaterDataService,
          useClass: SaveForLaterDataServiceStub,
        },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: UserService, useClass: UserServiceStub },
      ],
    });

    service = TestBed.get(SaveForLaterService);
    authService = TestBed.get(AuthService);
    saveForLaterData = TestBed.get(SaveForLaterDataService);
    store = TestBed.get(Store);
  });

  it('should is injected', () => {
    expect(service).toBeTruthy();
  });

  describe('getSaveForLater', () => {
    it('should return a loaded state', () => {
      store.dispatch(new fromSaveForLaterCart.CreateSaveForLaterSuccess(cart));
      let result: Cart;
      service
        .getSaveForLater()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(cart);
    });
  });

  const setUserIdMethod = 'setUserId';
  describe(setUserIdMethod, () => {
    describe('when the userToken is empty', () => {
      it('should set an anonymous user', () => {
        const testUserToken: UserToken = <UserToken>{};
        service[setUserIdMethod](testUserToken);
        expect(saveForLaterData.userId).toEqual(ANONYMOUS_USERID);
      });
    });
    describe('when the userToken is not empty', () => {
      it('should set the user', () => {
        const testUserToken: UserToken = <UserToken>{ userId: 'testUser' };
        service[setUserIdMethod](testUserToken);
        expect(saveForLaterData.userId).toEqual('testUser');
      });
    });
  });

  const load = 'load';
  describe(load, () => {
    describe('when user is not an anonymous', () => {
      describe('and the save for later cart is not created', () => {
        it('should create save for later', () => {
          spyOn(service, 'isCreated').and.returnValue(false);
          spyOn(store, 'dispatch').and.stub();
          saveForLaterData.cart = cart;

          service[load]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromSaveForLaterCart.CreateSaveForLater({
              userId: saveForLaterData.userId,
              cartId: 'selectivecartundefined',
            })
          );
        });
      });
      describe('and the cart is created', () => {
        it('should merge the cart', () => {
          spyOn(service, 'isCreated').and.returnValue(true);
          spyOn(store, 'dispatch').and.stub();
          saveForLaterData.cart = cart;

          service[load]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromSaveForLaterCart.LoadSaveForLater({
              userId: saveForLaterData.userId,
              cartId: 'selectivecartundefined',
            })
          );
        });
      });
    });
  });

  const refreshMethod = 'refresh';
  describe(refreshMethod, () => {
    describe('when refresh is true', () => {
      it('should load the cart', () => {
        store.dispatch(new fromSaveForLaterCart.AddEntrySuccess('test'));
        saveForLaterData.cart = cart;
        spyOn(store, 'dispatch').and.stub();

        service[refreshMethod]();
        expect(store.dispatch).toHaveBeenCalledWith(
          new fromSaveForLaterCart.LoadSaveForLater({
            userId: saveForLaterData.userId,
            cartId: saveForLaterData.cartId,
          })
        );
      });
    });
  });

  const initSaveForLaterMethod = 'init';
  describe(initSaveForLaterMethod, () => {
    describe(`when user's token and cart's user id are not equal`, () => {
      it(`should call '${setUserIdMethod}' and '${load}' methods`, () => {
        spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
        store.dispatch(new fromSaveForLaterCart.LoadSaveForLaterSuccess(cart));
        store.dispatch(new fromSaveForLaterCart.AddEntrySuccess('foo'));
        spyOn<any>(service, setUserIdMethod).and.stub();
        spyOn<any>(service, load).and.stub();
        spyOn<any>(service, refreshMethod).and.stub();

        service[initSaveForLaterMethod]();
        expect(service[refreshMethod]).toHaveBeenCalled();
      });
    });

    describe(`when user's token and cart's user id are equal`, () => {
      it(`should not call '${setUserIdMethod}' and '${load}' methods`, () => {
        spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
        saveForLaterData.userId = userToken.userId;
        store.dispatch(new fromSaveForLaterCart.LoadSaveForLaterSuccess(cart));
        store.dispatch(new fromSaveForLaterCart.AddEntrySuccess('foo'));

        spyOn<any>(service, setUserIdMethod).and.stub();
        spyOn<any>(service, load).and.stub();
        spyOn<any>(service, refreshMethod).and.stub();

        service[initSaveForLaterMethod]();
        expect(saveForLaterData.cart).toEqual(cart);
        expect(service[setUserIdMethod]).not.toHaveBeenCalled();
        expect(service[load]).not.toHaveBeenCalled();
        expect(service[refreshMethod]).toHaveBeenCalled();
      });
    });
  });

  describe('Load save for later details', () => {
    it('should load more details when a user is logged in', () => {
      spyOn(store, 'dispatch').and.stub();
      saveForLaterData.userId = userId;
      saveForLaterData.cart = cart;

      service.loadDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.CreateSaveForLater({
          userId: userId,
          cartId: 'selectivecartundefined',
        })
      );
    });
  });

  describe('add Entry', () => {
    it('should be able to addEntry if cart exists', () => {
      spyOn(store, 'dispatch').and.callThrough();

      saveForLaterData.userId = userId;
      saveForLaterData.cart = cart;
      saveForLaterData.cartId = cart.code;

      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.AddEntry({
          userId: userId,
          cartId: cart.code,
          productCode: productCode,
          quantity: 2,
        })
      );
    });

    it('should be able to addEntry if cart does not exist', () => {
      spyOn(service, 'isCreated').and.returnValue(false);
      store.dispatch(new fromSaveForLaterCart.LoadSaveForLaterSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      saveForLaterData.userId = userId;
      saveForLaterData.cart = {};
      service.addEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.CreateSaveForLater({
          userId: userId,
          cartId: 'selectivecartundefined',
        })
      );
    });
  });

  describe('update Entry', () => {
    it('should be able to updateEntry with quantity <> 0', () => {
      spyOn(store, 'dispatch').and.stub();

      saveForLaterData.userId = userId;
      saveForLaterData.cart = cart;
      saveForLaterData.cartId = cart.code;
      service.updateEntry('1', 1);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.UpdateEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1',
          qty: 1,
        })
      );
    });

    it('should be able to updateEntry with quantity = 0', () => {
      spyOn(store, 'dispatch').and.stub();
      saveForLaterData.userId = userId;
      saveForLaterData.cart = cart;
      saveForLaterData.cartId = cart.code;
      service.updateEntry('1', 0);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.RemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1',
        })
      );
    });
  });

  describe('remove Entry', () => {
    it('should be able to removeEntry', () => {
      spyOn(store, 'dispatch').and.stub();
      saveForLaterData.userId = userId;
      saveForLaterData.cart = cart;
      saveForLaterData.cartId = cart.code;

      service.removeEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromSaveForLaterCart.RemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: mockCartEntry.entryNumber,
        })
      );
    });
  });

  describe('isCreated', () => {
    it('should return false, when argument is empty object', () => {
      expect(service.isCreated({})).toBe(false);
    });

    it('should return true, when argument is an non-empty object', () => {
      expect(service.isCreated({ guid: 'hash' })).toBe(true);
      expect(service.isCreated({ totalItems: 0 })).toBe(true);
      expect(service.isCreated({ totalItems: 99 })).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('should return true, when argument is an empty object', () => {
      expect(service.isEmpty({})).toBe(true);
    });

    it('should return true, when totalItems property of argument is 0', () => {
      expect(service.isEmpty({ totalItems: 0 })).toBe(true);
    });

    it('should return false, when totalItems property of argument is greater than 0', () => {
      expect(service.isEmpty({ totalItems: 1 })).toBe(false);
      expect(service.isEmpty({ totalItems: 99 })).toBe(false);
    });
  });

  describe('getLoaded', () => {
    it('should return a loaded state', () => {
      store.dispatch(new fromSaveForLaterCart.CreateSaveForLaterSuccess(cart));
      let result: boolean;
      service
        .getLoaded()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toBeTruthy();
    });
  });
});
