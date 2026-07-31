/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

// Autocomplete suffixes appended after the typed query
const AUTOCOMPLETE_SUFFIXES: string[] = [
  '',
  ' live video feed',
  ' 4K camera control',
  ' for monitoring',
  ' battery',
];

/**
 * Placeholder service for AI-powered search suggestions (CXCDS-18834).
 * Replace with a real AI endpoint once backend is ready.
 */
@Injectable({ providedIn: 'root' })
export class AiSearchSuggestionsService {
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
    return of(
      AUTOCOMPLETE_SUFFIXES.map((suffix) => ({
        phrase: trimmed + suffix,
        matchedPrefix: trimmed,
        suffix,
      }))
    );
  }
}
