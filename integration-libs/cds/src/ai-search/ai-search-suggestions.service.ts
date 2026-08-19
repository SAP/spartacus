/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { map, skip, take } from 'rxjs/operators';
import { SearchboxService } from '@spartacus/core';

export interface AiSearchSuggestion {
  phrase: string;
  matchedPrefix: string;
  suffix: string;
}

// Natural-language inspiration phrases shown when input is empty
const INSPIRATION_PHRASES: string[] = [
  'Comfortable sneakers for standing all day at work',
  'Gift ideas for a 30-year-old woman who likes skincare',
  'Fragrance similar to Chanel No. 5 but cheaper',
  'Best laptop for video editing under €1200',
  'Wireless headphones with long battery life for commuting',
];

@Injectable({ providedIn: 'root' })
export class AiSearchSuggestionsService {
  private readonly searchboxService = inject(SearchboxService);

  getSuggestions(query: string): Observable<AiSearchSuggestion[]> {
    if (!query || query.trim().length === 0) {
      return of(
        INSPIRATION_PHRASES.map((phrase) => ({
          phrase,
          matchedPrefix: '',
          suffix: phrase,
        }))
      );
    }

    const trimmed = query.trim();

    return defer(() => {
      this.searchboxService.searchSuggestions(trimmed, { pageSize: 5 });
      return this.searchboxService.getSuggestionResults().pipe(
        skip(1),
        take(1),
        map((suggestions) => {
          if (!suggestions || suggestions.length === 0) {
            return [];
          }
          return suggestions
            .filter((s) => !!s.value)
            .map((s) => {
              const value = s.value as string;
              const suffix = value.startsWith(trimmed)
                ? value.slice(trimmed.length)
                : value;
              return {
                phrase: value,
                matchedPrefix: value.startsWith(trimmed) ? trimmed : '',
                suffix,
              };
            });
        })
      );
    });
  }
}
