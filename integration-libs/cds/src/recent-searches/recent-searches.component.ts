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
  ICON_TYPE,
  HighlightPipe,
  IconComponent,
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
  ],
})
export class RecentSearchesComponent implements OnInit {
  public result$: Observable<string[]>;
  public outletContext$: Observable<SearchBoxOutlet>;
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);
  protected enterKeyPressedOnCloseButton = false;

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

    if (this.shouldSkipBlurEvent(event)) {
      return;
    }

    if (this.shouldSkipEnterEvent(event)) {
      return;
    }

    // Only share keyboard events, not blur events (blur events are handled separately)
    if (event.type === 'keydown' || event.type === 'keyup') {
      this.searchBoxComponentService.shareEvent(event as KeyboardEvent);
    }
  }

  protected shouldSkipBlurEvent(event: KeyboardEvent | FocusEvent): boolean {
    if (event.type !== 'blur') {
      return false;
    }
    const target = event.target as HTMLElement;
    const closeButton = target?.closest?.(CLOSE_BUTTON_SELECTOR);
    return !!(closeButton && this.enterKeyPressedOnCloseButton);
  }

  protected shouldSkipEnterEvent(event: KeyboardEvent | FocusEvent): boolean {
    if (event.type !== 'keydown') {
      return false;
    }
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.code !== 'Enter') {
      return false;
    }
    const target = event.target as HTMLElement;
    return !!(
      target &&
      (target.classList?.contains('close') ||
        target.closest?.(CLOSE_BUTTON_SELECTOR))
    );
  }

  removeFromRecentSearch(phrase?: string) {
    if (!phrase) {
      return;
    }
    this.recentSearchesService.removePhrase(phrase);
  }

  clearPhrases(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation?.();
    }
    this.recentSearchesService.clearPhrases();
  }

  handleCloseButtonEnter(event: KeyboardEvent, phrase: string): void {
    this.enterKeyPressedOnCloseButton = true;

    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation?.();

    const button = (event.target as HTMLElement)?.closest?.(
      CLOSE_BUTTON_SELECTOR
    ) as HTMLButtonElement;
    if (button) {
      // Add capture-phase listener to prevent click from bubbling to results div
      const stopClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation?.();
        button.removeEventListener('click', stopClick, true);
      };
      button.addEventListener('click', stopClick, true);

      // Remove listener after a delay
      setTimeout(() => {
        button.removeEventListener('click', stopClick, true);
      }, 200);
    }

    this.removeFromRecentSearch(phrase);

    setTimeout(() => {
      this.enterKeyPressedOnCloseButton = false;
    }, 200);
  }

  handleCloseButtonClick(phrase: string): void {
    this.removeFromRecentSearch(phrase);
  }

  protected readonly iconTypes = ICON_TYPE;
}
