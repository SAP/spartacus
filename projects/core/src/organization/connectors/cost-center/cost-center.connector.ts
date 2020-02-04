import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostCenter } from '../../../model/cost-center.model';
import { CostCenterAdapter } from './cost-center.adapter';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterConnector {
  constructor(protected adapter: CostCenterAdapter) {}

  get(userId: string, costCenterCode: string): Observable<CostCenter> {
    return this.adapter.load(userId, costCenterCode);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<CostCenter>> {
    return this.adapter.loadList(userId, params);
  }

  create(userId: string, costCenter: CostCenter): Observable<CostCenter> {
    return this.adapter.create(userId, costCenter);
  }

  update(
    userId: string,
    costCenterCode: string,
    costCenter: CostCenter
  ): Observable<CostCenter> {
    return this.adapter.update(userId, costCenterCode, costCenter);
  }
}
