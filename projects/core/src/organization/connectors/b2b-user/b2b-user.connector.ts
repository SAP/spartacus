import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';
import { B2BUser } from '../../../model/org-unit.model';
import { B2BUserAdapter } from './b2b-user.adapter';
import { Permission } from '../../../model/permission.model';
import { OrgUnitUserGroup } from '../../../model/user-group.model';

@Injectable({
  providedIn: 'root',
})
export class B2BUserConnector {
  constructor(protected adapter: B2BUserAdapter) {}

  get(userId: string, orgUnitCustomerId: string): Observable<B2BUser> {
    return this.adapter.load(userId, orgUnitCustomerId);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadList(userId, params);
  }

  getApprovers(
    userId: string,
    orgUnitCustomerId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.adapter.loadApprovers(
      userId,
      orgUnitCustomerId,
      params
    );
  }

  getPermissions(
    userId: string,
    orgUnitCustomerId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>> {
    return this.adapter.loadApprovers(
      userId,
      orgUnitCustomerId,
      params
    );
  }

  getUserGroups(
    userId: string,
    orgUnitCustomerId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.adapter.loadUserGroups(
      userId,
      orgUnitCustomerId,
      params
    );
  }
}
