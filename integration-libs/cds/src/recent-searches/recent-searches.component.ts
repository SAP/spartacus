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
import {
  FeatureConfigService,
  FeatureDirective,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  ICON_TYPE,
  HighlightPipe,
  IconComponent,
  OutletContextData,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RecentSearchesHeaderComponent } from './recent-searches-header.component';
import { RecentSearchesService } from './recent-searches.service';

export interface SearchBoxOutlet {
  search: string;
  searchBoxActive: boolean;
  maxRecentSearches?: number;
}

const MAX_RECENT_SEARCHES = 5;
const CLOSE_BUTTON_SELECTOR = 'button.close';

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
    IconComponent,
    FeatureDirective,
    RecentSearchesHeaderComponent,
  ],
})
export class RecentSearchesComponent implements OnInit {
  public result$: Observable<string[]>;
  public outletContext$: Observable<SearchBoxOutlet>;
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);
  private readonly featureConfigService = inject(FeatureConfigService);

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

  shareEvent(event: KeyboardEvent | FocusEvent) {
    if (!event) {
      throw new Error('Missing Event');
    }

    if (
      !this.featureConfigService.isEnabled('searchBoxRecentSearchesRemoval')
    ) {
      this.searchBoxComponentService.shareEvent(event as KeyboardEvent);
      return;
    }

    // Only share keyboard events. Blur events are handled by SearchBoxComponent's own handlers.
    if (event.type === 'keydown' || event.type === 'keyup') {
      const keyboardEvent = event as KeyboardEvent;
      // Skip sharing Enter when focus is on the remove (X) button.
      if (
        keyboardEvent.code === 'Enter' &&
        (keyboardEvent.target as HTMLElement)?.closest?.(CLOSE_BUTTON_SELECTOR)
      ) {
        return;
      }
      this.searchBoxComponentService.shareEvent(keyboardEvent);
    }
  }

  removeFromRecentSearch(phrase?: string) {
    if (!phrase) {
      return;
    }
    this.recentSearchesService.removePhrase(phrase);
  }

  handleCloseButtonEnter(event: KeyboardEvent, phrase: string): void {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation?.();

    this.removeFromRecentSearch(phrase);
  }

  handleCloseButtonClick(phrase: string): void {
    this.removeFromRecentSearch(phrase);
  }

  protected readonly iconTypes = ICON_TYPE;
}
