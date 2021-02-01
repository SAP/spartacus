import { Injectable } from '@angular/core';
import { EventService, Product, Suggestion } from '@spartacus/core';
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
  constructor(protected eventService: EventService) {}

  /**
   * Dispatch suggestion selected event for the provided data
   *
   * @param eventData data for the suggestion selected event
   */
  dispatchSuggestionSelectedEvent(eventData: SearchBoxEventData): void {
    this.eventService.dispatch<SearchBoxSuggestionSelectedEvent>(
      {
        freeText: eventData.freeText,
        selectedSuggestion: eventData.selected,
        searchSuggestions: eventData.values as Suggestion[],
      },
      SearchBoxSuggestionSelectedEvent
    );
  }

  /**
   * Dispatch product selected event for the provided data
   *
   * @param eventData data for the product selected event
   */
  dispatchProductSelectedEvent(eventData: SearchBoxEventData): void {
    this.eventService.dispatch<SearchBoxProductSelectedEvent>(
      {
        freeText: eventData.freeText,
        selectedCode: eventData.selected,
      },
      SearchBoxProductSelectedEvent
    );
  }
}
