import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/index';
import { Cart } from '../../model/cart.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import * as DeprecatedCartActions from '../store/actions/cart.action';
import { CartActions } from '../store/actions/index';
import { StateWithCart } from '../store/cart-state';
import * as fromReducers from '../store/reducers/index';
import { CartVoucherService } from './cart-voucher.service';

const userId = 'testUserId';

class AuthServiceStub {
  getOccUserId(): Observable<string> {
    return of(userId);
  }
}

describe('CartVoucherService', () => {
  let service: CartVoucherService;
  let store: Store<StateWithCart>;

  const cart: Cart = { code: 'testCartId', guid: 'testGuid', totalItems: 2 };
  const voucherId = 'voucherTest1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CartVoucherService,
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.inject(CartVoucherService);
    store = TestBed.inject(Store);

    store.dispatch(new DeprecatedCartActions.CreateCartSuccess(cart));
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
      store.dispatch(new CartActions.CartAddVoucherFail('error'));
      service
        .getAddVoucherResultError()
        .subscribe(result => expect(result).toEqual(true))
        .unsubscribe();
    });

    it('should return the success flag', () => {
      store.dispatch(
        new CartActions.CartAddVoucherSuccess({
          userId: userId,
          cartId: cart.code,
        })
      );
      service
        .getAddVoucherResultSuccess()
        .subscribe(result => expect(result).toEqual(true))
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
        .subscribe(loading => (result = loading))
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
