/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  distinctUntilChanged,
  filter,
  of,
  skip,
  switchMap,
  tap,
} from 'rxjs';
import { SemanticPathService, WindowRef } from '@spartacus/core';
import { SearchBoxComponentService } from '@spartacus/storefront';
import { Router } from '@angular/router';
import { AiProductCriteria } from './ai-product-criteria.service';

export interface AiBackendProduct {
  code: string;
  name?: string;
  criteria_detail: Array<{ label: string; matched: boolean }>;
  criteria_matched: number;
  criteria_total: number;
}

export interface AiBackendSearchResponse {
  answer: string;
  products: AiBackendProduct[];
  total: number;
  elapsed_seconds: number;
}

export interface AiSearchProgressEvent {
  step: string;
  message: string;
}

export interface AiSearchMeta {
  total: number;
  elapsed_seconds: number;
}

@Injectable({ providedIn: 'root' })
export class AiSearchBackendService implements OnDestroy {
  private readonly searchBoxService = inject(SearchBoxComponentService);
  private readonly semanticPathService = inject(SemanticPathService);
  private readonly router = inject(Router);
  private readonly winRef = inject(WindowRef);
  private readonly baseUrl = 'http://localhost:8000';

  private readonly _lastResults$ = new BehaviorSubject<Map<string, AiProductCriteria>>(new Map());
  readonly lastResults$ = this._lastResults$.asObservable();

  private readonly _lastAnswer$ = new BehaviorSubject<string | null>(null);
  readonly lastAnswer$ = this._lastAnswer$.asObservable();

  private readonly _lastMeta$ = new BehaviorSubject<AiSearchMeta | null>(null);
  readonly lastMeta$ = this._lastMeta$.asObservable();

  private readonly _progress$ = new BehaviorSubject<AiSearchProgressEvent | null>(null);
  readonly progress$ = this._progress$.asObservable();

  private readonly _isSearching$ = new BehaviorSubject<boolean>(false);
  readonly isSearching$ = this._isSearching$.asObservable();

  private readonly _lastError$ = new BehaviorSubject<string | null>(null);
  readonly lastError$ = this._lastError$.asObservable();

  private readonly subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.searchBoxService.aiSearchTrigger$.pipe(
        skip(1),
        distinctUntilChanged(),
        filter((query) => !!query && query.trim().length > 0),
        switchMap((query) =>
          this.searchStream(query).pipe(
            tap((result) => {
              if (result) {
                this.searchBoxService.markAiSearchLaunched(true);
                const path = this.semanticPathService.transform({
                  cxRoute: 'search',
                  params: { query },
                });
                const url = '/' + path.join('/');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigateByUrl(url);
                });
              }
            }),
            catchError((err) => {
              this._isSearching$.next(false);
              this._lastError$.next(err?.message ?? 'Unknown error');
              return of(null);
            })
          )
        )
      ).subscribe()
    );
  }

  searchStream(query: string, strategy: 'a' | 'b' = 'a'): Observable<AiBackendSearchResponse> {
    return new Observable<AiBackendSearchResponse>((observer) => {
      if (!this.winRef.isBrowser()) {
        observer.complete();
        return;
      }

      this._isSearching$.next(true);
      this._progress$.next(null);
      this._lastError$.next(null);

      const controller = new AbortController();

      fetch(`${this.baseUrl}/search/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, strategy }),
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok || !response.body) {
            throw new Error(`HTTP ${response.status}`);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const raw = line.slice(6).trim();
              if (!raw) continue;

              let event: Record<string, unknown>;
              try {
                event = JSON.parse(raw);
              } catch {
                continue;
              }

              if (event['step'] === 'result') {
                const result = event['result'] as AiBackendSearchResponse;
                console.log('[AI Backend] step:result — products:', result.products?.length, 'answer:', result.answer);
                const map = new Map<string, AiProductCriteria>();
                for (const product of result.products ?? []) {
                  if (product.code) {
                    map.set(product.code, {
                      matchedCount: product.criteria_matched,
                      totalCount: product.criteria_total,
                      criteria: product.criteria_detail,
                    });
                    console.log('[AI Backend] stored criteria for', product.code, ':', product.criteria_matched, '/', product.criteria_total);
                  }
                }
                this._lastAnswer$.next(result.answer ?? null);
                this._lastMeta$.next({
                  total: result.total ?? 0,
                  elapsed_seconds: result.elapsed_seconds ?? 0,
                });
                this._lastResults$.next(map);
                this._isSearching$.next(false);
                this._progress$.next(null);
                this._lastError$.next(null);
                observer.next(result);
                observer.complete();
              } else if (event['step'] === 'error') {
                const msg = (event['message'] as string) ?? 'AI search error';
                this._isSearching$.next(false);
                this._progress$.next(null);
                this._lastError$.next(msg);
                observer.error(new Error(msg));
              } else {
                this._progress$.next({
                  step: event['step'] as string,
                  message: event['message'] as string,
                });
              }
            }
          }
        })
        .catch((err) => {
          if (err?.name !== 'AbortError') {
            this._isSearching$.next(false);
            this._progress$.next(null);
            this._lastError$.next(err?.message ?? 'Network error');
            observer.error(err);
          }
        });

      return () => controller.abort();
    });
  }

  getCriteriaForProduct(code: string): AiProductCriteria | null {
    const map = this._lastResults$.getValue();
    console.log('[AI Backend] getCriteriaForProduct', code, 'map size:', map.size, 'keys:', [...map.keys()].slice(0, 5));
    return map.get(code) ?? null;
  }

  getAllResults(): Map<string, AiProductCriteria> {
    return this._lastResults$.getValue();
  }

  clearError(): void {
    this._lastError$.next(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
