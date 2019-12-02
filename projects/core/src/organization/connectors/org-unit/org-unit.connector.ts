import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgUnitAdapter } from './org-unit.adapter';
import { B2BUnitNode } from 'projects/core/src/model';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitConnector {
  constructor(protected adapter: OrgUnitAdapter) {}

  get(userId: string, orgUnitId: string): Observable<B2BUnitNode> {
    return this.adapter.load(userId, orgUnitId);
  }

  getList(userId: string, params?: any): Observable<B2BUnitNode> {
    return this.adapter.loadList(userId, params);
  }

  create(userId: string, orgUnit: B2BUnitNode): Observable<B2BUnitNode> {
    return this.adapter.create(userId, orgUnit);
  }

  update(userId: string, orgUnit: B2BUnitNode): Observable<B2BUnitNode> {
    return this.adapter.update(userId, orgUnit);
  }
}
