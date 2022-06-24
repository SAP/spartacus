import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import * as fromEffects from './stock.effect';
import { StockConnector } from '../../connectors/index';
import { provideMockActions } from '@ngrx/effects/testing';
// import { StockLevelActions } from '../actions/index';
import { Observable, of } from 'rxjs';
import { StockLevel, StockLevelSuccess } from '../actions/stock.action';
import { cold, hot } from 'jasmine-marbles';
import createSpy = jasmine.createSpy;

describe('StockEffect', () => {
  let stockEffects: fromEffects.StockEffect;
  let actions$: Observable<any>;
  beforeEach(() => {
    class MockStockConnector {
      loadStockLevels = createSpy().and.returnValue(of({}));
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],

      providers: [
        {
          provide: StockConnector,
          useClass: MockStockConnector,
        },
        fromEffects.StockEffect,

        provideMockActions(() => actions$),
      ],
    });

    stockEffects = TestBed.inject(fromEffects.StockEffect);
  });

  it('loadStockLevels$', () => {
    const action = new StockLevel({ productCode: 'P0001' });
    const actionSuccess = new StockLevelSuccess({});

    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', {
      b: actionSuccess,
    });

    expect(stockEffects.loadStockLevels$).toBeObservable(expected);
  });
});
