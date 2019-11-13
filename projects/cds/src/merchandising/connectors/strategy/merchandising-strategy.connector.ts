import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchandisingProducts } from '../../model/merchandising.products.model';
import { MerchandisingStrategyAdapter } from './merchandising-strategy.adapter';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingStrategyConnector {
  constructor(protected strategyAdapter: MerchandisingStrategyAdapter) {}

  loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts> {
    return this.strategyAdapter.loadProductsForStrategy(strategyId);
  }
}
