import { Observable } from 'rxjs';
import { B2BUnitNode } from 'projects/core/src/model/index';
import { Occ } from '../../../occ/occ-models/occ.models';
import B2BUnitNodeList = Occ.B2BUnitNodeList;

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

  abstract loadList(userId: string, params?: any): Observable<B2BUnitNodeList>;

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
