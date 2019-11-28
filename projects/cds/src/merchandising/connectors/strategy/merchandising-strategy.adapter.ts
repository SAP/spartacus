import { Observable } from 'rxjs';
import { MerchandisingProducts } from '../../model/merchandising-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';

export abstract class MerchandisingStrategyAdapter {
  /**
   * Load products for a given merchandising strategy
   *
   * @param strategyId the id of the merchandising strategy to load products for
   */
  abstract loadProductsForStrategy(
    strategyId: string,
    strategyRequest?: StrategyRequest
  ): Observable<MerchandisingProducts>;
}
