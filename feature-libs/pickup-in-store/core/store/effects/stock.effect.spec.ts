import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { StockConnector } from '../../connectors/index';
import {
  StockLevel,
  StockLevelAtStore,
  StockLevelAtStoreSuccess,
  StockLevelFail,
  StockLevelSuccess,
} from '../actions/stock.action';
import { StockEffect } from './stock.effect';

class MockStockConnector {
  loadStockLevels = () => of({});
  loadStockLevelAtStore = () => of({});
}

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('StockEffect', () => {
  let stockEffects: StockEffect;
  let actions$: Observable<any>;
  let stockConnector: StockConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],

      providers: [
        {
          provide: StockConnector,
          useClass: MockStockConnector,
        },
        { provide: LoggerService, useClass: MockLoggerService },
        StockEffect,

        provideMockActions(() => actions$),
      ],
    });

    stockEffects = TestBed.inject(StockEffect);
    stockConnector = TestBed.inject(StockConnector);
  });

  it('should call the connector on the StockLevel action and create success action', () => {
    spyOn(stockConnector, 'loadStockLevels').and.callThrough();
    const action = new StockLevel({ productCode: 'P0001', location: '' });
    const actionSuccess = new StockLevelSuccess({
      productCode: 'P0001',
      stockLevels: {},
    });

    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });

    expect(stockEffects.loadStockLevels$).toBeObservable(expected);
    expect(stockConnector.loadStockLevels).toHaveBeenCalledWith('P0001', {
      location: '',
    });
  });

  it('should create a fail action on connector error', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Error',
    });
    spyOn(stockConnector, 'loadStockLevels').and.returnValue(
      throwError(() => error)
    );
    const action = new StockLevel({ productCode: 'P0001', location: '' });
    const actionFail = new StockLevelFail(
      normalizeHttpError(error, new MockLoggerService())
    );

    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: actionFail });

    expect(stockEffects.loadStockLevels$).toBeObservable(expected);
  });

  it('should call the connector on the StockLevelAtStore action and create StockLevelAtStoreSuccess action', () => {
    spyOn(stockConnector, 'loadStockLevelAtStore').and.callThrough();
    const action = StockLevelAtStore({
      payload: { productCode: 'P0001', storeName: 'London School' },
    });
    const actionSuccess = StockLevelAtStoreSuccess({
      payload: {
        productCode: 'P0001',
        storeName: 'London School',
        stockLevel: {},
      },
    });

    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });

    expect(stockEffects.loadStockLevelAtStore$).toBeObservable(expected);
    expect(stockConnector.loadStockLevelAtStore).toHaveBeenCalledWith(
      'P0001',
      'London School'
    );
  });
});
