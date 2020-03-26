import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import {
  EntitiesModel,
  OrgUnitUserGroup,
  Permission,
  B2BUser,
} from '../../../model';

export abstract class OrgUnitUserGroupAdapter {
  /**
   * Abstract method used to load orgUnitUserGroupManagement's details data.
   * orgUnitUserGroup's data can be loaded from alternative sources, as long as the structure
   * converts to the `OrgUnitUserGroup`.
   *
   * @param userId The `userId` for given orgUnitUserGroupManagement
   * @param orgUnitUserGroupUid The `orgUnitUserGroupUid` for given orgUnitUserGroupManagement
   */
  abstract load(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup>;

  abstract loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>>;

  abstract loadAvailableOrderApprovalPermissions(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>>;

  abstract loadAvailableOrgCustomers(
    userId: string,
    orgUnitUserGroupUid: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>>;

  abstract create(
    userId: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup>;

  abstract update(
    userId: string,
    orgUnitUserGroupUid: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup>;

  abstract delete(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<OrgUnitUserGroup>;

  abstract assignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any>;

  abstract assignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any>;

  abstract unassignMember(
    userId: string,
    orgUnitUserGroupUid: string,
    orgCustomerId: string
  ): Observable<any>;

  abstract unassignAllMembers(
    userId: string,
    orgUnitUserGroupUid: string
  ): Observable<any>;

  abstract unassignOrderApprovalPermission(
    userId: string,
    orgUnitUserGroupUid: string,
    orderApprovalPermissionCode: string
  ): Observable<any>;
}
