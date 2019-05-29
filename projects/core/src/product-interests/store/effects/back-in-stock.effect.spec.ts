import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromBackInStockEffect from './back-in-stock.effect';
import * as fromBackInStockAction from '../actions/back-in-stock.actions';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { OccProductInterestsService } from '../../occ/product-interest.service';
import { OccConfig } from '../../../occ/config/occ-config';
const loadParams = {
  userId: 'jack.ma@hybris.com',
  productCode: '9879',
  notificationType: 'BACK_IN_STOCK',
};


const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

describe('Back In Stock Effect', () => {
  let actions$: Actions;
  let backInStockEffectEffect: fromBackInStockEffect.BackInStockEffect;
  let productInterestsService: OccProductInterestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductInterestsService,
        fromBackInStockEffect.BackInStockEffect,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    backInStockEffectEffect = TestBed.get(
      fromBackInStockEffect.BackInStockEffect
    );
    productInterestsService = TestBed.get(OccProductInterestsService);
  });

  describe('loadProductInteres$', () => {
    it('should be able to load back in stock', () => {

      spyOn(productInterestsService, 'hasInterest').and.returnValue(
        of(true)
      );
      const action = new fromBackInStockAction.LoadBackInStock(loadParams);
      const completion = new fromBackInStockAction.LoadBackInStockSuccess(
        true
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.loadBackInStock$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for load back in stock', () => {
      spyOn(productInterestsService, 'hasInterest').and.returnValue(
        throwError('Error')
      );
      const action = new fromBackInStockAction.LoadBackInStock(loadParams);
      const completion = new fromBackInStockAction.LoadBackInStockFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.loadBackInStock$).toBeObservable(
        expected
      );
    });
  });

  describe('deleteBackInStock$', () => {
    it('should be able to delete  back in stock', () => {

      spyOn(productInterestsService, 'deleteInterest').and.returnValue(
        of(loadParams)
      );
      const action = new fromBackInStockAction.DeleteBackInStock(loadParams);
      const completion = new fromBackInStockAction.DeleteBackInStockSuccess(
        true
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.deleteBackInStock$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for load back in stock', () => {
      spyOn(productInterestsService, 'deleteInterest').and.returnValue(
        throwError('Error')
      );
      const action = new fromBackInStockAction.DeleteBackInStock(loadParams);
      const completion = new fromBackInStockAction.DeleteBackInStockFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.deleteBackInStock$).toBeObservable(
        expected
      );
    });
  });

  describe('createBackInStock$', () => {
    it('should be able to create back in stock', () => {

      spyOn(productInterestsService, 'createInterest').and.returnValue(
        of(loadParams)
      );
      const action = new fromBackInStockAction.CreateBackInStock(loadParams);
      const completion = new fromBackInStockAction.CreateBackInStockSuccess(
        true
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.createBackInStock$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for create back in stock', () => {
      spyOn(productInterestsService, 'createInterest').and.returnValue(
        throwError('Error')
      );
      const action = new fromBackInStockAction.CreateBackInStock(loadParams);
      const completion = new fromBackInStockAction.CreateBackInStockFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(backInStockEffectEffect.createBackInStock$).toBeObservable(
        expected
      );
    });
  });
});
