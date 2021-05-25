import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { OccConfig } from '../../../occ/index';
import { CartVoucherAdapter } from '../../connectors';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import { CartActions } from '../actions/index';
import * as fromEffects from './cart-voucher.effect';
import createSpy = jasmine.createSpy;
import { HttpErrorResponse } from '@angular/common/http';
import { normalizeHttpError } from '@spartacus/core';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockGlobalMessageService {
  add = createSpy();
}

describe('Cart Voucher effect', () => {
  let voucherEffects: fromEffects.CartVoucherEffects;
  let actions$: Observable<any>;
  let cartVoucherConnector: CartVoucherConnector;

  const userId = 'userId';
  const cartId = 'cartId';
  const voucherId = 'testVoucherId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CartVoucherAdapter, useValue: {} },
        fromEffects.CartVoucherEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    voucherEffects = TestBed.inject(fromEffects.CartVoucherEffects);
    cartVoucherConnector = TestBed.inject(CartVoucherConnector);

    spyOn(cartVoucherConnector, 'add').and.returnValue(of({}));
    spyOn(cartVoucherConnector, 'remove').and.returnValue(of({}));
  });

  describe('addCartVoucher$', () => {
    it('should add a voucher', () => {
      const action = new CartActions.CartAddVoucher({
        userId: userId,
        cartId: cartId,
        voucherId: voucherId,
      });
      const completion = new CartActions.CartAddVoucherSuccess({
        userId,
        cartId,
        voucherId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(voucherEffects.addCartVoucher$).toBeObservable(expected);
      expect(cartVoucherConnector.add).toHaveBeenCalledWith(
        userId,
        cartId,
        voucherId
      );
    });

    it('should fail', () => {
      const error = new HttpErrorResponse({ error: 'error' });
      cartVoucherConnector.add = createSpy().and.returnValue(throwError(error));
      const action = new CartActions.CartAddVoucher({
        userId,
        cartId,
        voucherId,
      });
      const completion1 = new CartActions.CartAddVoucherFail({
        userId,
        cartId,
        voucherId,
        error: normalizeHttpError(error),
      });
      const completion2 = new CartActions.CartProcessesDecrement(cartId);
      const completion3 = new CartActions.LoadCart({
        userId,
        cartId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: completion1,
        c: completion2,
        d: completion3,
      });

      expect(voucherEffects.addCartVoucher$).toBeObservable(expected);
      expect(cartVoucherConnector.add).toHaveBeenCalledWith(
        userId,
        cartId,
        voucherId
      );
    });
  });

  describe('removeCartVoucher$', () => {
    it('should remove voucher', () => {
      const action = new CartActions.CartRemoveVoucher({
        userId: userId,
        cartId: cartId,
        voucherId: voucherId,
      });
      const completion = new CartActions.CartRemoveVoucherSuccess({
        userId: 'userId',
        cartId: 'cartId',
        voucherId,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(voucherEffects.removeCartVoucher$).toBeObservable(expected);
    });
  });
});
