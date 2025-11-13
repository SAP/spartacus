/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import {
  CostCenterService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { CostCenterFormService } from '../form/cost-center-form.service';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterItemService extends ItemService<CostCenter> {
  protected currentItemService: CurrentCostCenterService;
  protected routingService: RoutingService;
  protected formService: CostCenterFormService;
  protected costCenterService = inject(CostCenterService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const currentItemService = inject(CurrentCostCenterService);
    const routingService = inject(RoutingService);
    const formService = inject(CostCenterFormService);

    super(currentItemService, routingService, formService);
  
    this.currentItemService = currentItemService;
    this.routingService = routingService;
    this.formService = formService;
  }

  load(code: string): Observable<CostCenter> {
    this.costCenterService.load(code);
    return this.costCenterService.get(code);
  }

  update(
    code: string,
    value: CostCenter
  ): Observable<OrganizationItemStatus<CostCenter>> {
    this.costCenterService.update(code, value);
    return this.costCenterService.getLoadingStatus(value.code ?? '');
  }

  protected create(
    value: CostCenter
  ): Observable<OrganizationItemStatus<CostCenter>> {
    this.costCenterService.create(value);
    return this.costCenterService.getLoadingStatus(value.code ?? '');
  }

  protected getDetailsRoute(): string {
    return 'orgCostCenterDetails';
  }
}
