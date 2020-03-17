import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';
import { OrgUnitCustomerAdapter } from './org-unit-customer.adapter';
import { OrgUnitCustomer } from 'projects/core/src/model';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitCustomerConnector {
  constructor(protected adapter: OrgUnitCustomerAdapter) {}

  get(userId: string, orgUnitCustomerId: string): Observable<OrgUnitCustomer> {
    return this.adapter.load(userId, orgUnitCustomerId);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitCustomer>> {
    return this.adapter.loadList(userId, params);
  }

  // getApprovers(
  //   userId: string,
  //   orgUnitCustomerId: string,
  //   params?: B2BSearchConfig
  // ): Observable<EntitiesModel<Permission>> {
  //   return this.adapter.loadApprovers(
  //     userId,
  //     orgUnitCustomerId,
  //     params
  //   );
  // }

  // getUserGroups(
  //   userId: string,
  //   orgUnitCustomerId: string,
  //   params?: B2BSearchConfig
  // ): Observable<EntitiesModel<User>> {
  //   return this.adapter.loadUserGroups(
  //     userId,
  //     orgUnitCustomerId,
  //     params
  //   );
  // }
}
