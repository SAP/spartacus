import { Observable } from 'rxjs';
import { EntitiesModel } from '../../../model/misc.model';
import { B2BUnitNode } from '../../../model/org-unit.model';

export abstract class OrgUnitAdapter {
  /**
   * Abstract method used to load orgUnit's details data.
   * B2BUnitNode's data can be loaded from alternative sources, as long as the structure
   * converts to the `B2BUnitNode`.
   *
   * @param userId The `userId` for given orgUnit
   * @param orgUnitId The `orgUnitId` for given orgUnit
   */
  abstract load(userId: string, orgUnitId: string): Observable<B2BUnitNode>;

  abstract loadList(
    userId: string,
    params?: any
  ): Observable<EntitiesModel<B2BUnitNode>>;

  abstract create(
    userId: string,
    orgUnit: B2BUnitNode
  ): Observable<B2BUnitNode>;

  abstract update(
    userId: string,
    orgUnitId: string,
    orgUnit: B2BUnitNode
  ): Observable<B2BUnitNode>;
}
