/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  CostCenter,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({ providedIn: 'root' })
export class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentCostCenterService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const translation = inject(TranslationService);

    super(translation);
  }

  protected getParams(): Observable<CostCenter | undefined> {
    return this.currentItemService.item$;
  }
}
