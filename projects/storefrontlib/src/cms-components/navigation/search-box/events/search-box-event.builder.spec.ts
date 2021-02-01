import { TestBed } from '@angular/core/testing';
import { createFrom, EventService, Product, Suggestion } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { SearchBoxEventBuilder } from './search-box-event.builder';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';

const mockSuggestions: Suggestion[] = [
  { value: 'camera' },
  { value: 'test1' },
  { value: 'test2' },
];

const mockProduct: Product = {
  code: '123456',
};

describe('SearchBoxEventBuilder', () => {
  let eventService: EventService;
  let searchBoxEventBuilder: SearchBoxEventBuilder;

  beforeEach(() => {
    searchBoxEventBuilder = TestBed.inject(SearchBoxEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('SearchBoxSuggestionSelectedEvent', () => {
    it('should fire event', () => {
      let result: SearchBoxSuggestionSelectedEvent;
      eventService
        .get(SearchBoxSuggestionSelectedEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const searchBoxSuggestionSelectedEvent = createFrom(
        SearchBoxSuggestionSelectedEvent,
        {
          freeText: 'camera',
          selectedSuggestion: mockSuggestions[0].value,
          searchSuggestions: mockSuggestions,
        }
      );

      searchBoxEventBuilder.dispatchSuggestionSelectedEvent({
        freeText: 'camera',
        isProduct: false,
        selected: mockSuggestions[0].value,
        values: mockSuggestions,
      });

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxSuggestionSelectedEvent)
      );
    });

    it('should fire multiple event', () => {
      const result: SearchBoxSuggestionSelectedEvent[] = [];
      eventService
        .get(SearchBoxSuggestionSelectedEvent)
        .subscribe((value) => result.push(value));

      searchBoxEventBuilder.dispatchSuggestionSelectedEvent({
        freeText: 'camera',
        isProduct: false,
        selected: mockSuggestions[0].value,
        values: mockSuggestions,
      });

      searchBoxEventBuilder.dispatchSuggestionSelectedEvent({
        freeText: 'camileo',
        isProduct: false,
        selected: mockSuggestions[1].value,
        values: mockSuggestions,
      });

      searchBoxEventBuilder.dispatchSuggestionSelectedEvent({
        freeText: 'camcorder',
        isProduct: false,
        selected: mockSuggestions[2].value,
        values: mockSuggestions,
      });

      expect(result.length).toEqual(3);
    });
  });

  describe('SearchBoxProductSelectedEvent', () => {
    it('should fire event', () => {
      let result: SearchBoxProductSelectedEvent;
      eventService
        .get(SearchBoxProductSelectedEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const searchBoxProductSelectedEvent = createFrom(
        SearchBoxProductSelectedEvent,
        {
          freeText: 'camera',
          productCode: mockProduct.code,
        }
      );

      searchBoxEventBuilder.dispatchProductSelectedEvent({
        freeText: 'camera',
        isProduct: true,
        selected: mockProduct.code,
      });

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxProductSelectedEvent)
      );
    });
  });
});
