import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(protected strategyConnector: MerchandisingStrategyConnector) {}

  loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts> {
    return this.strategyConnector.loadProductsForStrategy(strategyId);
  }
}
