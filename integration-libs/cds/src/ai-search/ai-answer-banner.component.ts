/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { SearchBoxComponentService } from '@spartacus/storefront';
import { AiSearchBackendService } from './ai-search-backend.service';

@Component({
  selector: 'cx-ai-answer-banner',
  template: `
    <div *ngIf="isSearching" class="cx-ai-answer-banner cx-ai-answer-banner--loading">
      <div class="cx-ai-stream-steps">
        <div class="cx-ai-stream-spinner"></div>
        <ul class="cx-ai-stream-log">
          <li *ngFor="let step of steps; let last = last"
              [class.cx-ai-stream-log-active]="last">
            {{ step }}
          </li>
        </ul>
      </div>
    </div>
    <div *ngIf="!isSearching && answer" class="cx-ai-answer-banner">
      {{ answer }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class AiAnswerBannerComponent implements OnInit, OnDestroy {
  private readonly searchBoxService = inject(SearchBoxComponentService);
  private readonly backendService = inject(AiSearchBackendService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sub = new Subscription();

  isSearching = false;
  answer: string | null = null;
  steps: string[] = [];

  ngOnInit(): void {
    this.sub.add(
      combineLatest([
        this.searchBoxService.lastSearchWasAi$,
        this.backendService.isSearching$,
      ]).subscribe(([isAi, searching]) => {
        const wasSearching = this.isSearching;
        this.isSearching = isAi && searching;
        if (!wasSearching && this.isSearching) {
          this.steps = ['Searching...'];
        }
        if (!this.isSearching) {
          this.steps = [];
        }
        this.cdr.detectChanges();
      })
    );

    this.sub.add(
      this.backendService.progress$.subscribe((progress) => {
        if (progress?.message && this.isSearching) {
          this.steps = [...this.steps, progress.message];
          this.cdr.detectChanges();
        }
      })
    );

    this.sub.add(
      combineLatest([
        this.searchBoxService.lastSearchWasAi$,
        this.backendService.lastAnswer$,
      ]).subscribe(([isAi, answer]) => {
        this.answer = isAi ? answer : null;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
