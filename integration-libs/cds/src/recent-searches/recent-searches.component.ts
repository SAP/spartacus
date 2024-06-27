/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Optional,
  OnDestroy,
} from '@angular/core';
import {
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { RecentSearchesService } from './recent-searches.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

export interface SearchBoxOutlet {
  search: string;
  searchBoxActive: boolean;
  maxRecentSearches?: number;
}

const MAX_RECENT_SEARCHES = 5;

@Component({
  selector: 'cx-recent-searches',
  templateUrl: './recent-searches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSearchesComponent implements OnInit, OnDestroy {
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);
  public result$: Observable<string[]>;
  protected destroy$ = new Subject<void>();

  constructor(
    @Optional() protected outletContext: OutletContextData<SearchBoxOutlet>
  ) {}

  ngOnInit() {
    this.result$ = this.outletContext?.context$.pipe(
      switchMap((context: SearchBoxOutlet) =>
        this.recentSearchesService.recentSearches$.pipe(
          map((recentSearches: string[]) =>
            recentSearches
              .filter(
                (phrase) =>
                  phrase.toLowerCase().indexOf(context.search.toLowerCase()) >=
                  0
              )
              .slice(0, context.maxRecentSearches ?? MAX_RECENT_SEARCHES)
          )
        )
      )
    );

    this.result$.pipe(takeUntil(this.destroy$)).subscribe((results) => {
      this.searchBoxComponentService.setRecentSearches(!!results.length);
    });
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  updateChosenWord(chosenWord: string) {
    this.searchBoxComponentService.changeSelectedWord(chosenWord);
  }

  shareEvent(event: KeyboardEvent) {
    if (!event) {
      throw new Error('Missing Event');
    }
    this.searchBoxComponentService.shareEvent(event);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
