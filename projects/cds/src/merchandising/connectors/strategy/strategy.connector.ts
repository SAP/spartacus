import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyResult } from '../../model/strategy.result';
import { StrategyAdapter } from './strategy.adapter';

@Injectable({
  providedIn: 'root',
})
export class StrategyConnector {
  constructor(protected strategyAdapter: StrategyAdapter) {}

  loadProductsForStrategy(strategyId: string): Observable<StrategyResult> {
    return this.strategyAdapter.loadProductsForStrategy(strategyId);
  }
}
