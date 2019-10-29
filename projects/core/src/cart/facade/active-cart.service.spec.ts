import { TestBed } from '@angular/core/testing';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../auth/index';
import { ActiveCartService } from './active-cart.service';
import { MultiCartService } from './multi-cart.service';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../cart/store/reducers/index';
import { StateWithMultiCart } from '../store';
import { StateWithProcess } from '../../process';
import { Type } from '@angular/core';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, OCC_CART_ID_CURRENT } from '../../occ/utils/occ-constants';
import { OrderEntry } from '../../model/order.model';

const userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

class AuthServiceStub {
  getOccUserId(): Observable<string> {
    return userId$.asObservable();
  }
}

class MultiCartServiceStub {
  loadCart() {}
  deleteCart() {}
  initAddEntryProcess() {}
}

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: 'code' },
  quantity: 1,
};

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

    console.log(multiCartService, authService, store)
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
    it('should add each entry one by one', () => {
      spyOn(service, 'addEntry').and.callThrough();

      service.addEntries([mockCartEntry, mockCartEntry], false)
      expect(service['addEntry']).toHaveBeenCalledTimes(2);
      expect(service['addEntry']).toHaveBeenCalledWith(mockCartEntry.product.code, mockCartEntry.quantity, false);
    })

    it('should pass guestMerge flag', () => {
      spyOn(service, 'addEntry').and.callThrough();

      service.addEntries([mockCartEntry], true)
      expect(service['addEntry']).toHaveBeenCalledWith(mockCartEntry.product.code, mockCartEntry.quantity, true);
    })
  })

  describe('isEmail', () => {
    it('should return false for empty email', () => {
      const result = service['isEmail']('');
      expect(result).toBe(false);
    })

    it('should return false for incorrect email', () => {
      const result = service['isEmail']('test@email');
      expect(result).toBe(false);
    })

    it('should return true for correct email', () => {
      const result = service['isEmail']('test@email.com');
      expect(result).toBe(true);
    })
  })

  describe('guestCartMerge', () => {
    it('should delete cart and add entries from previous cart', () => {
      spyOn(multiCartService, 'deleteCart').and.callThrough();
      spyOn(service, 'addEntries').and.callThrough();
      spyOn(service, 'getEntries').and.returnValue(of([mockCartEntry]))

      service['guestCartMerge']('cartId');
      expect(service['addEntries']).toHaveBeenCalledWith([mockCartEntry], true)
      expect(multiCartService['deleteCart']).toHaveBeenCalledWith('cartId', OCC_USER_ID_ANONYMOUS);
    })
  })

  describe('isEmpty', () => {
    it('should return true for undefined', () => {
      const result = service['isEmpty'](undefined);
      expect(result).toBe(true);
    })

    it('should return true for null', () => {
      const result = service['isEmpty'](null);
      expect(result).toBe(true);
    })

    it('should return true for empty object', () => {
      const result = service['isEmpty']({});
      expect(result).toBe(true);
    })

    it('should return false for correct cart', () => {
      const result = service['isEmpty']({ code: 'testCode'});
      expect(result).toBe(false);
    })
  })

  describe('isJustLoggedIn', () => {
    it('should only return true after user change', () => {
      const result = service['isJustLoggedIn'](OCC_USER_ID_CURRENT);
      expect(result).toBe(true);
    })

    it('should return false when previous user is identical', () => {
      userId$.next(OCC_CART_ID_CURRENT);
      const result = service['isJustLoggedIn'](OCC_USER_ID_CURRENT);
      expect(result).toBe(false);
    })
  })
});
