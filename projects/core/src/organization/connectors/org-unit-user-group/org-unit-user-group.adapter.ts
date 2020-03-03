import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel, OrgUnitUserGroup } from '../../../model';

export abstract class OrgUnitUserGroupAdapter {
  /**
   * Abstract method used to load orgUnitUserGroupManagement's details data.
   * orgUnitUserGroup's data can be loaded from alternative sources, as long as the structure
   * converts to the `OrgUnitUserGroup`.
   *
   * @param userId The `userId` for given orgUnitUserGroupManagement
   * @param orgUnitUserGroupCode The `orgUnitUserGroupCode` for given orgUnitUserGroupManagement
   */
  abstract load(
    userId: string,
    orgUnitUserGroupCode: string
  ): Observable<OrgUnitUserGroup>;

  abstract loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>>;

  abstract create(
    userId: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup>;

  abstract update(
    userId: string,
    orgUnitUserGroupCode: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup>;
}
