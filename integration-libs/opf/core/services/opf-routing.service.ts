/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WindowRef } from '@spartacus/core';

export interface KeyValuePair {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class OpfRoutingService {
  constructor(protected winRef: WindowRef, protected route: ActivatedRoute) {}

  convertParamsToKeyValuePairs(params: Params): KeyValuePair[] {
    if (!params) return [];
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  getFullUrl(): string {
    return this.winRef.document.location.origin;
  }

  FindFromKeyValuePairs(key: string, list: KeyValuePair[]): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }

  getCurrentUrlParams(): KeyValuePair[] {
    return this.convertParamsToKeyValuePairs(this.route.snapshot.params);
  }
}
