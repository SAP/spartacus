import { Observable } from 'rxjs';
import { MerchandisingProducts } from '../../model/merchandising.products.model';

export abstract class MerchandisingStrategyAdapter {
  /**
   * Load products for a given merchandising strategy
   *
   * @param strategyId the id of the merchandising strategy to load products for
   */
  abstract loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts>;
}
