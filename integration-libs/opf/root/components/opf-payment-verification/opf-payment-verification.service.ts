/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { OpfResponseMapElement } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  constructor(protected routingService: RoutingService) {}

  getOpfResponseMap(params: Params): OpfResponseMapElement[] {
    if (!params) {
      return [];
    }
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  findInOpfResponseMap(
    key: string,
    list: OpfResponseMapElement[]
  ): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }
  goToPage(cxRoute: string) {
    return this.routingService.go({ cxRoute });
  }
}
