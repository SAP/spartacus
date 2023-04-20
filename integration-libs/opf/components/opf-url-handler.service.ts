/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { KeyValuePair } from '../root/model';

@Injectable({
  providedIn: 'root',
})
export class OpfUrlHandlerService {
  constructor(protected routingService: RoutingService) {}

  convertParamsToKeyValuePairs(params: Params): KeyValuePair[] {
    if (!params) return [];
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  findFromKeyValuePairs(key: string, list: KeyValuePair[]): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }

  getAsoluteUrl(cxRoute: string) {
    return this.routingService.getFullUrl({ cxRoute });
  }
  goToPage(cxRoute: string) {
    return this.routingService.go({ cxRoute });
  }
}
