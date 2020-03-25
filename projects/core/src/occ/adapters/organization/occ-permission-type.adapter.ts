import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OrderApprovalPermissionType } from '../../../model/permission.model';
import { EntitiesModel } from '../../../model/misc.model';
import { PermissionTypeAdapter } from 'projects/core/src/organization/connectors/permission-type/permission-type.adapter';
import { PERMISSION_TYPES_NORMALIZER } from 'projects/core/src/organization/connectors/permission-type';

@Injectable()
export class OccPermissionTypeAdapter implements PermissionTypeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadList(): Observable<EntitiesModel<OrderApprovalPermissionType>> {
    return this.http
      .get<Occ.OrderApprovalPermissionTypeList>(
        this.getPermissionTypeEndpoint()
      )
      .pipe(this.converter.pipeable(PERMISSION_TYPES_NORMALIZER));
  }

  protected getPermissionTypeEndpoint(): string {
    return this.occEndpoints.getUrl('orderApprovalPermissionTypes');
  }
}
