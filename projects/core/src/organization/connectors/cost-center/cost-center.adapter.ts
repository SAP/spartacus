import { Observable } from 'rxjs';
import { CostCenter } from '../../../model/cost-center.model';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';

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
    params?: B2BSearchConfig
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
}
