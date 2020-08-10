import { Observable } from 'rxjs';
import { Budget } from '../../model/budget.model';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '@spartacus/core';

export abstract class BudgetAdapter {
  /**
   * Abstract method used to load budgetManagement's details data.
   * Budget's data can be loaded from alternative sources, as long as the structure
   * converts to the `Budget`.
   *
   * @param userId The `userId` for given budgetManagement
   * @param budgetCode The `budgetCode` for given budgetManagement
   */
  abstract load(userId: string, budgetCode: string): Observable<Budget>;

  abstract loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Budget>>;

  abstract create(userId: string, budget: Budget): Observable<Budget>;

  abstract update(
    userId: string,
    budgetCode: string,
    budget: Budget
  ): Observable<Budget>;
}
