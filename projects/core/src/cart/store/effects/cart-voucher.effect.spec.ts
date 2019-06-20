import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { OccConfig } from '../../../occ/index';
import { CartVoucherAdapter } from '../../connectors';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import * as fromActions from '../actions';
import * as fromEffects from './cart-voucher.effect';
import createSpy = jasmine.createSpy;

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

fdescribe('Cart effect', () => {
  let voucherEffects: fromEffects.CartVoucherEffects;
  let actions$: Observable<any>;
  let cartVoucherConnector: CartVoucherConnector;

  const userId = 'testUserId';
  const cartId = 'testCartId';
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

    voucherEffects = TestBed.get(fromEffects.CartVoucherEffects);
    cartVoucherConnector = TestBed.get(CartVoucherConnector);

    spyOn(cartVoucherConnector, 'add').and.returnValue(of({}));
    spyOn(cartVoucherConnector, 'remove').and.returnValue(of({}));
  });

  describe('addCartVoucher$', () => {
    it('should add a voucher', () => {
      const action = new fromActions.AddCartVoucher({
        userId: userId,
        cartId: cartId,
        voucherId: voucherId,
      });
      const completion = new fromActions.AddCartVoucherSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(voucherEffects.addCartVoucher$).toBeObservable(expected);
    });
  });

  describe('removeCartVoucher$', () => {
    it('should remove voucher', () => {
      const action = new fromActions.RemoveCartVoucher({
        userId: userId,
        cartId: cartId,
        voucherId: voucherId,
      });
      const completion = new fromActions.RemoveCartVoucherSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(voucherEffects.removeCartVoucher$).toBeObservable(expected);
    });
  });
});
