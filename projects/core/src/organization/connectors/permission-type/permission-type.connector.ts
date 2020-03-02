import { OrderApprovalPermissionType } from './../../../model/permission.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionTypeAdapter } from './permission-type.adapter';
import { EntitiesModel } from '../../../model/misc.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionTypeConnector {
  constructor(protected adapter: PermissionTypeAdapter) {}

  getList(): Observable<EntitiesModel<OrderApprovalPermissionType>> {
    return this.adapter.loadList();
  }
}
