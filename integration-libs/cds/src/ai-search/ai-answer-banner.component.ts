/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { WindowRef } from '@spartacus/core';
import { SearchBoxComponentService } from '@spartacus/storefront';
import { AiSearchBackendService, AiSearchMeta } from './ai-search-backend.service';

@Component({
  selector: 'cx-ai-answer-banner',
  template: `
    <div *ngIf="isSearching" class="cx-ai-answer-banner cx-ai-answer-banner--loading">
      <div class="cx-ai-stream-spinner"></div>
      <span class="cx-ai-stream-label">AI searching...</span>
    </div>

    <div *ngIf="!isSearching && (answer || meta)" class="cx-ai-answer-banner cx-ai-answer-banner--result">
      <div class="cx-ai-answer-header">
        <span class="cx-ai-answer-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 3C6.5 3 7.2 6.8 10 7.5C7.2 8.2 6.5 12 6.5 12C6.5 12 5.8 8.2 3 7.5C5.8 6.8 6.5 3 6.5 3Z" fill="currentColor"/>
            <path d="M14 10.5C14 10.5 14.5 13 16.5 13.5C14.5 14 14 16.5 14 16.5C14 16.5 13.5 14 11.5 13.5C13.5 13 14 10.5 14 10.5Z" fill="currentColor"/>
          </svg>
        </span>
        <span class="cx-ai-answer-label">AI Answer</span>
        <span *ngIf="meta" class="cx-ai-answer-meta">
          {{ meta.total }} results &nbsp;·&nbsp; {{ meta.elapsed_seconds | number:'1.1-1' }}s
        </span>
      </div>
      <p *ngIf="answer" class="cx-ai-answer-text">{{ answer }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class AiAnswerBannerComponent implements OnInit, OnDestroy {
  private readonly searchBoxService = inject(SearchBoxComponentService);
  private readonly backendService = inject(AiSearchBackendService);
  private readonly winRef = inject(WindowRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sub = new Subscription();

  isSearching = false;
  answer: string | null = null;
  meta: AiSearchMeta | null = null;

  ngOnInit(): void {
    this.searchBoxService.restoreAiContextFromStorage();

    this.sub.add(
      combineLatest([
        this.searchBoxService.lastSearchWasAi$,
        this.backendService.isSearching$,
      ]).subscribe(([isAi, searching]) => {
        this.isSearching = isAi && searching;
        this.cdr.detectChanges();
      })
    );

    this.sub.add(
      combineLatest([
        this.searchBoxService.lastSearchWasAi$,
        this.backendService.lastAnswer$,
        this.backendService.lastMeta$,
      ]).subscribe(([isAi, answer, meta]) => {
        if (!isAi) {
          this.answer = null;
          this.meta = null;
        } else {
          this.answer = answer ?? this.buildMockAnswer();
          this.meta = meta ?? this.buildMockMeta();
        }
        this.cdr.detectChanges();
      })
    );
  }

  private getStoredQuery(): string {
    try {
      const raw = this.winRef.sessionStorage?.getItem('cx_ai_context');
      if (raw) return (JSON.parse(raw) as { query: string }).query || '';
    } catch {}
    return '';
  }

  private buildMockAnswer(): string {
    const query = this.getStoredQuery();
    return query
      ? `Here are the best products matching "${query}", ranked by relevance to your criteria.`
      : 'Here are the best products matching your AI search criteria.';
  }

  private buildMockMeta(): AiSearchMeta {
    return { total: 45, elapsed_seconds: 1.2 };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
