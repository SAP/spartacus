import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import { SaveForLaterConnector } from '../../connectors/cart/save-for-later.connector';
import * as fromSaveForLaterActions from '../actions/save-for-later.action';
import { ProductImageNormalizer } from '../../../product';
import { SaveForLaterDataService } from '../../facade/save-for-later-data.service';
import { SaveForLaterService } from '../../facade/save-for-later.service';
import * as fromCart from '../../store/index';
import * as fromAuth from '../../../auth/store/index';
import * as fromUser from '../../../user/store/index';

import * as fromEffects from './save-for-later.effect';
import { OccConfig } from '@spartacus/core';
import { Cart } from '../../../model/cart.model';
import createSpy = jasmine.createSpy;

const testCart: Cart = {
  code: 'xxx',
  guid: 'testGuid',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

class MockCartConnector {
  create = createSpy().and.returnValue(of(testCart));
  load = createSpy().and.returnValue(of(testCart));
}

describe('Save for later cart effect', () => {
  let saveForLaterEffects: fromEffects.SaveForLaterEffects;
  let actions$: Observable<any>;

  const MockOccModuleConfig: OccConfig = {
    backend: {
      occ: {
        baseUrl: '',
        prefix: '',
      },
    },
  };

  const userId = 'testUserId';
  const cartId = 'testCartId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromCart.getReducers()),
        StoreModule.forFeature('user', fromUser.getReducers()),
        StoreModule.forFeature('auth', fromAuth.getReducers()),
      ],

      providers: [
        {
          provide: SaveForLaterConnector,
          useClass: MockCartConnector,
        },
        ProductImageNormalizer,
        fromEffects.SaveForLaterEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        SaveForLaterService,
        SaveForLaterDataService,
        provideMockActions(() => actions$),
      ],
    });

    saveForLaterEffects = TestBed.get(fromEffects.SaveForLaterEffects);
  });

  describe('loadSaveForLaterCart$', () => {
    it('should load a save for later cart', () => {
      const action = new fromSaveForLaterActions.LoadSaveForLater({
        userId: userId,
        cartId: cartId,
      });
      const completion = new fromSaveForLaterActions.LoadSaveForLaterSuccess(
        testCart
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(saveForLaterEffects.loadSaveForLater$).toBeObservable(expected);
    });
  });

  describe('createSaveForLaterCart$', () => {
    fit('should create a save for later cart', () => {
      const action = new fromSaveForLaterActions.CreateSaveForLater(userId);
      const completion = new fromSaveForLaterActions.CreateSaveForLaterSuccess(
        testCart
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(saveForLaterEffects.createSaveForLater$).toBeObservable(expected);
    });
  });
});
