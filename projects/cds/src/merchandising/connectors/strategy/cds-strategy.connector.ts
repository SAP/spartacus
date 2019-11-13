import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchandisingProducts } from '../../model/merchandising.products.model';
import { StrategyAdapter } from './cds-strategy.adapter';

@Injectable({
  providedIn: 'root',
})
export class StrategyConnector {
  constructor(protected strategyAdapter: StrategyAdapter) {}

  loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts> {
    return this.strategyAdapter.loadProductsForStrategy(strategyId);
  }
}
