import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserIdService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import {
  PROCESS_FEATURE,
  StateWithProcess,
} from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { CartActions } from '../store/actions/index';
import { ActiveCartService } from './active-cart.service';
import { CartVoucherService } from './cart-voucher.service';

const userId = 'testUserId';

class UserIdServiceStub implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of(userId);
  }
}

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  getActiveCartId(): Observable<string> {
    return of('testCartId');
  }
}

describe('CartVoucherService', () => {
  let service: CartVoucherService;
  let store: Store<StateWithProcess<void>>;

  const cart: Cart = { code: 'testCartId', guid: 'testGuid', totalItems: 2 };
  const voucherId = 'voucherTest1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CartVoucherService,
        { provide: UserIdService, useClass: UserIdServiceStub },
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
      ],
    });

    service = TestBed.inject(CartVoucherService);
    store = TestBed.inject(Store);

    store.dispatch(
      new CartActions.CreateCartSuccess({
        cart,
        userId: 'userId',
        tempCartId: 'tempCartId',
        cartId: cart.code,
      })
    );
  });

  describe('add Voucher', () => {
    it('should dispatch addVoucher action', () => {
      spyOn(store, 'dispatch').and.stub();
      service.addVoucher(voucherId, cart.code);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartAddVoucher({
          userId: userId,
          cartId: cart.code,
          voucherId: voucherId,
        })
      );
    });

    it('should return the error flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucherFail({
          error: 'error',
          userId,
          cartId: cart.code,
          voucherId,
        })
      );
      service
        .getAddVoucherResultError()
        .subscribe((result) => expect(result).toEqual(true))
        .unsubscribe();
    });

    it('should return the success flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucherSuccess({
          userId,
          cartId: cart.code,
          voucherId,
        })
      );
      service
        .getAddVoucherResultSuccess()
        .subscribe((result) => expect(result).toEqual(true))
        .unsubscribe();
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucher({
          userId: 'userId',
          cartId: 'cartId',
          voucherId: voucherId,
        })
      );
      let result = false;
      service
        .getAddVoucherResultLoading()
        .subscribe((loading) => (result = loading))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should dispatch a reset action', () => {
      spyOn(store, 'dispatch').and.stub();
      service.resetAddVoucherProcessingState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartResetAddVoucher()
      );
    });
  });

  describe('remove Voucher', () => {
    it('should be able to removeVoucher', () => {
      spyOn(store, 'dispatch').and.stub();
      service.removeVoucher(voucherId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.CartRemoveVoucher({
          userId: userId,
          cartId: cart.code,
          voucherId: voucherId,
        })
      );
    });
  });
});
