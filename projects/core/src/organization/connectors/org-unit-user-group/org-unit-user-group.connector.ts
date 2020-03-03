import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';
import { OrgUnitUserGroupAdapter } from './org-unit-user-group.adapter';
import { OrgUnitUserGroup } from 'projects/core/src/model';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitUserGroupConnector {
  constructor(protected adapter: OrgUnitUserGroupAdapter) {}

  get(
    userId: string,
    orgUnitUserGroupCode: string
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.load(userId, orgUnitUserGroupCode);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.adapter.loadList(userId, params);
  }

  create(
    userId: string,
    orgUnitUserGroupCode: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.create(userId, orgUnitUserGroupCode);
  }

  update(
    userId: string,
    orgUnitUserGroupCode: string,
    orgUnitUserGroup: OrgUnitUserGroup
  ): Observable<OrgUnitUserGroup> {
    return this.adapter.update(userId, orgUnitUserGroupCode, orgUnitUserGroup);
  }
}
