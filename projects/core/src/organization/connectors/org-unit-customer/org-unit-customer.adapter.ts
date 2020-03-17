import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel, OrgUnitCustomer } from '../../../model';

export abstract class OrgUnitCustomerAdapter {
  /**
   * Abstract method used to load orgUnitCustomerManagement's details data.
   * orgUnitCustomer's data can be loaded from alternative sources, as long as the structure
   * converts to the `OrgUnitCustomer`.
   *
   * @param userId The `userId` for given orgUnitCustomerManagement
   * @param orgUnitCustomerId The `orgUnitCustomerId` for given orgUnitCustomerManagement
   */
  abstract load(
    userId: string,
    orgCustomerId: string
  ): Observable<OrgUnitCustomer>;

  abstract loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitCustomer>>;

  // abstract loadApprovers(
  //   userId: string,
  //   orgCustomerId: string,
  //   params?: B2BSearchConfig
  // ): Observable<EntitiesModel<OrgUnitCustomer>>;

  // abstract loadUserGroups(
  //   userId: string,
  //   orgCustomerId: string,
  //   params?: B2BSearchConfig
  // ): Observable<EntitiesModel<any>>; // TODO: change the type to user groups when they are ready
}
