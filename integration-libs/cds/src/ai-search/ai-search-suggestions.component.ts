/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  debounceTime,
  tap,
  distinctUntilChanged,
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
  isQueryEmpty = true;
  isLoading = false;

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
      tap(() => {
        this.isLoading = true;
        this.cdr.markForCheck();
      }),
      debounceTime(300),
      switchMap((query: string) => this.aiSearchService.getSuggestions(query)),
      tap(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
      shareReplay({ bufferSize: 1, refCount: true })
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

  shareEvent(event: KeyboardEvent): void {
    if (event) {
      this.searchBoxComponentService.shareEvent(event);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
