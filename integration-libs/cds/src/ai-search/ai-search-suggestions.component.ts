/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Observable,
  EMPTY,
  switchMap,
  Subscription,
  shareReplay,
  distinctUntilChanged,
  pairwise,
  filter,
} from 'rxjs';
import { Router } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { ICON_TYPE, OutletContextData, SearchBoxComponentService } from '@spartacus/storefront';
import {
  AiSearchSuggestion,
  AiSearchSuggestionsService,
} from './ai-search-suggestions.service';
import { AiSearchBackendService, AiSearchProgressEvent } from './ai-search-backend.service';

@Component({
  selector: 'cx-ai-search-suggestions',
  templateUrl: './ai-search-suggestions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AiSearchSuggestionsComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  suggestions$: Observable<AiSearchSuggestion[]> = EMPTY;
  isSearching$: Observable<boolean>;
  progress$: Observable<AiSearchProgressEvent | null>;
  lastError$: Observable<string | null>;
  isQueryEmpty = true;

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private semanticPathService = inject(SemanticPathService);
  private subscription = new Subscription();

  protected outletContext = inject(OutletContextData, { optional: true }) as OutletContextData | null;
  protected aiSearchService = inject(AiSearchSuggestionsService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);
  protected backendService = inject(AiSearchBackendService);

  constructor() {
    this.isSearching$ = this.backendService.isSearching$;
    this.progress$ = this.backendService.progress$;
    this.lastError$ = this.backendService.lastError$;
  }

  ngOnInit(): void {
    const query$ = this.searchBoxComponentService.currentQuery$.pipe(
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.subscription.add(
      query$.subscribe((query: string) => {
        this.isQueryEmpty = !query || query.trim().length === 0;
        this.cdr.markForCheck();
      })
    );

    this.suggestions$ = query$.pipe(
      switchMap((query: string) => this.aiSearchService.getSuggestions(query)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Close panel after stream completes successfully (true → false, no error)
    this.subscription.add(
      this.backendService.isSearching$.pipe(
        pairwise(),
        filter(([prev, curr]) => prev === true && curr === false)
      ).subscribe(() => {
        // Only close if there was no error (error state keeps panel open to show message)
        this.backendService.lastError$.pipe(
          filter(err => !err)
        ).subscribe(() => {
          this.searchBoxComponentService.clearResults();
        }).unsubscribe();
      })
    );
  }

  selectSuggestion(phrase: string): void {
    this.searchBoxComponentService.markAiSearchLaunched(true);
    this.searchBoxComponentService.setAiQuery(phrase);
    const path = this.semanticPathService.transform({
      cxRoute: 'search',
      params: { query: phrase },
    });
    this.router.navigate(path);
  }

  dismissError(): void {
    this.backendService.clearError();
  }

  shareEvent(event: KeyboardEvent): void {
    if (event) {
      this.searchBoxComponentService.shareEvent(event);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
