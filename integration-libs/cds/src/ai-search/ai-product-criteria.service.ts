/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AiSearchBackendService } from './ai-search-backend.service';

export interface AiCriterion {
  label: string;
  matched: boolean;
}

export interface AiProductCriteria {
  matchedCount: number;
  totalCount: number;
  criteria: AiCriterion[];
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildMockFromBackendCriteria(
  allLabels: string[],
  productIndex: number
): AiProductCriteria {
  const rand = seededRandom(productIndex * 2654435761);
  const shuffled = [...allLabels].sort(() => rand() - 0.5);
  const count = Math.min(3, Math.max(2, shuffled.length));
  const picked = shuffled.slice(0, count);

  // First product always fully matches, then decreasing match rate
  const matchProbability = productIndex === 0 ? 1.0 : productIndex <= 3 ? 0.75 : 0.5;
  const criteria: AiCriterion[] = picked.map((label) => ({
    label,
    matched: rand() < matchProbability,
  }));

  // Ensure at least 1 match
  if (!criteria.some((c) => c.matched)) {
    criteria[0].matched = true;
  }

  return {
    matchedCount: criteria.filter((c) => c.matched).length,
    totalCount: criteria.length,
    criteria,
  };
}

const FALLBACK_LABELS = [
  'Wireless connectivity',
  'Price within budget',
  'Built-in microphone',
  'Long battery life',
  'Compact design',
  'Noise cancellation',
  'Bluetooth 5.0',
  'USB-C charging',
];

let productCounter = 0;

@Injectable({ providedIn: 'root' })
export class AiProductCriteriaService {
  private readonly backendService = inject(AiSearchBackendService);

  getCriteria(
    productCode: string,
    _query: string
  ): Observable<AiProductCriteria | null> {
    const fromBackend = this.backendService.getCriteriaForProduct(productCode);
    if (fromBackend) {
      return of(fromBackend);
    }

    // Collect all unique criterion labels from backend results
    const map = this.backendService.getAllResults();
    const labelSet = new Set<string>();
    map.forEach((criteria) => {
      criteria.criteria.forEach((c) => labelSet.add(c.label));
    });

    const labels = labelSet.size >= 2 ? [...labelSet] : FALLBACK_LABELS;
    const mock = buildMockFromBackendCriteria(labels, productCounter++);
    return of(mock);
  }
}
