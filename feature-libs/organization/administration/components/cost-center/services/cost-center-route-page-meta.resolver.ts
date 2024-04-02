/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  CostCenter,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({ providedIn: 'root' })
export class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentCostCenterService
  ) {
    super(translation);
  }

  protected getParams(): Observable<CostCenter | undefined> {
    return this.currentItemService.item$;
  }
}
