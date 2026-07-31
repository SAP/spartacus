/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AiCriterion {
  label: string;
  matched: boolean;
}

export interface AiProductCriteria {
  matchedCount: number;
  totalCount: number;
  criteria: AiCriterion[];
}

const MOCK_CRITERIA: AiProductCriteria[] = [
  {
    matchedCount: 3,
    totalCount: 3,
    criteria: [
      { label: 'High resolution camera', matched: true },
      { label: 'Under $15,000', matched: true },
      { label: 'Thermal imaging', matched: true },
    ],
  },
  {
    matchedCount: 2,
    totalCount: 3,
    criteria: [
      { label: 'High resolution camera', matched: true },
      { label: 'Under $15,000', matched: true },
      { label: 'Thermal imaging', matched: false },
    ],
  },
  {
    matchedCount: 1,
    totalCount: 3,
    criteria: [
      { label: 'High resolution camera', matched: false },
      { label: 'Under $15,000', matched: true },
      { label: 'Thermal imaging', matched: false },
    ],
  },
];

let mockIndex = 0;

@Injectable({ providedIn: 'root' })
export class AiProductCriteriaService {
  getCriteria(
    _productCode: string,
    _query: string
  ): Observable<AiProductCriteria | null> {
    const criteria = MOCK_CRITERIA[mockIndex % MOCK_CRITERIA.length];
    mockIndex++;
    return of(criteria);
  }
}
