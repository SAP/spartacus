import { Observable } from 'rxjs';
import { Budget } from '../../../model/budget.model';

export abstract class BudgetAdapter {
  /**
   * Abstract method used to load budgetManagment's details data.
   * Budget's data can be loaded from alternative sources, as long as the structure
   * converts to the `Budget`.
   *
   * @param userId The `userId` for given budgetManagment
   * @param budgetCode The `budgetCode` for given budgetManagment
   */
  abstract load(userId: string, budgetCode: string): Observable<Budget>;

  abstract loadBudgets(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string,
    fields: string
  ): Observable<Budget[]>;

  abstract post(
    userId: string,
    budget: Budget
  ): Observable<Budget>;

  abstract patch(
    userId: string,
    budget: Budget
  ): Observable<Budget>;
}
