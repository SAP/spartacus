import { B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';

export abstract class B2BUserAdapter {
  /**
   * Abstract method used to load orgUnitCustomerManagement's details data.
   * orgUnitCustomer's data can be loaded from alternative sources, as long as the structure
   * converts to the `B2BUser`.
   *
   * @param userId The `userId` for given orgUnitCustomerManagement
   * @param orgCustomerId The `orgUnitCustomerId` for given orgUnitCustomerManagement
   */
  abstract load(userId: string, orgCustomerId: string): Observable<B2BUser>;

  abstract loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>>;

  abstract create(userId: string, orgCustomer: B2BUser): Observable<B2BUser>;

  abstract update(
    userId: string,
    orgCustomerId: string,
    orgCustomer: B2BUser
  ): Observable<B2BUser>;

  abstract loadApprovers(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<B2BUser>>;

  abstract assignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any>;

  abstract unassignApprover(
    userId: string,
    orgCustomerId: string,
    approverId: string
  ): Observable<any>;

  abstract loadPermissions(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<Permission>>;

  abstract assignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any>;

  abstract unassignPermission(
    userId: string,
    orgCustomerId: string,
    permissionId: string
  ): Observable<any>;

  abstract loadUserGroups(
    userId: string,
    orgCustomerId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<UserGroup>>;

  abstract assignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any>;

  abstract unassignUserGroup(
    userId: string,
    orgCustomerId: string,
    userGroupId: string
  ): Observable<any>;
}
