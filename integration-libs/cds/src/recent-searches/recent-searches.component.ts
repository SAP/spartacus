/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Optional,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  HighlightPipe,
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RecentSearchesService } from './recent-searches.service';

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
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    HighlightPipe,
    UrlPipe,
  ],
})
export class RecentSearchesComponent implements OnInit {
  public result$: Observable<string[]>;
  public outletContext$: Observable<SearchBoxOutlet>;
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);

  constructor(
    @Optional() protected outletContext: OutletContextData<SearchBoxOutlet>
  ) {}

  ngOnInit() {
    this.result$ = combineLatest([
      this.outletContext?.context$,
      this.recentSearchesService.recentSearches$,
    ]).pipe(
      map(([context, recentSearches]: [SearchBoxOutlet, string[]]) =>
        recentSearches
          .filter(
            (phrase) =>
              phrase.toLowerCase().indexOf(context.search.toLowerCase()) >= 0
          )
          .slice(0, context.maxRecentSearches ?? MAX_RECENT_SEARCHES)
      ),
      tap((results) => {
        this.searchBoxComponentService.setRecentSearches(!!results.length);
      })
    );

    this.outletContext$ = this.outletContext.context$;
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
}
