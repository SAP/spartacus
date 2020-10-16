import { CostCenter, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget } from '../../model/budget.model';

export abstract class CostCenterAdapter {
  /**
   * Abstract method used to load costCenterManagement's details data.
   * CostCenter's data can be loaded from alternative sources, as long as the structure
   * converts to the `CostCenter`.
   *
   * @param userId The `userId` for given costCenterManagement
   * @param costCenterCode The `costCenterCode` for given costCenterManagement
   */
  abstract load(userId: string, costCenterCode: string): Observable<CostCenter>;

  abstract loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<CostCenter>>;

  abstract create(
    userId: string,
    costCenter: CostCenter
  ): Observable<CostCenter>;

  abstract update(
    userId: string,
    costCenterCode: string,
    costCenter: CostCenter
  ): Observable<CostCenter>;

  abstract loadBudgets(
    userId: string,
    costCenterCode: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Budget>>;

  abstract assignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any>;

  abstract unassignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any>;
}
