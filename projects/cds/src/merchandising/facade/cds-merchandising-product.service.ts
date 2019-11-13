import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyConnector } from './../connectors/strategy/cds-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(protected strategyConnector: StrategyConnector) {}

  loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts> {
    return this.strategyConnector.loadProductsForStrategy(strategyId);
  }
}
