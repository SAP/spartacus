import { Injectable } from '@angular/core';
import { createFrom, EventService, Product, Suggestion } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchBoxComponentService } from '../search-box-component.service';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';

export interface SearchBoxEventData {
  freeText: string;
  isProduct: boolean;
  selected: string;
  values?: Suggestion[] | Product[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchBoxEventBuilder {
  constructor(
    protected eventService: EventService,
    protected searchBoxComponentService: SearchBoxComponentService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      SearchBoxSuggestionSelectedEvent,
      this.buildSuggestionSelectedSearchEvent()
    );
    this.eventService.register(
      SearchBoxProductSelectedEvent,
      this.buildProductSelectedEvent()
    );
  }

  /**
   * Returns a stream that will fire an event when a product suggestion is selected, which results in the user navigating to the product details page
   */
  protected buildSuggestionSelectedSearchEvent(): Observable<
    SearchBoxSuggestionSelectedEvent
  > {
    return this.searchBoxComponentService.searchBoxSuggestionSelectedEvents.pipe(
      filter((event) => Boolean(event)),
      map((data) =>
        createFrom(SearchBoxSuggestionSelectedEvent, {
          freeText: data.freeText,
          selectedSuggestion: data.selected,
          searchSuggestions: data.values as Suggestion[],
        })
      )
    );
  }

  /**
   * Returns a stream that will fire an event when a product suggestion is selected, which results in the user navigating to the product details page
   */
  protected buildProductSelectedEvent(): Observable<
    SearchBoxProductSelectedEvent
  > {
    return this.searchBoxComponentService.searchBoxProductSelectedEvents.pipe(
      filter((event) => Boolean(event)),
      map((data) =>
        createFrom(SearchBoxProductSelectedEvent, {
          freeText: data.freeText,
          selectedCode: data.selected,
        })
      )
    );
  }
}
