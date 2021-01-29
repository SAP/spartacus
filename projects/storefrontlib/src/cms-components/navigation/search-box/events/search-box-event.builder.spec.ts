import { TestBed } from '@angular/core/testing';
import { createFrom, EventService, Product, Suggestion } from '@spartacus/core';
import { SearchBoxComponentService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventData, SearchBoxEventBuilder } from './search-box-event.builder';
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

const searchBoxProductSelectedEvents$ = new BehaviorSubject<EventData>(null);
const searchBoxSuggestionSelectedEvents$ = new BehaviorSubject<EventData>(null);
class MockSearchBoxComponentService
  implements Partial<SearchBoxComponentService> {
  get searchBoxProductSelectedEvents() {
    return searchBoxProductSelectedEvents$;
  }

  get searchBoxSuggestionSelectedEvents() {
    return searchBoxSuggestionSelectedEvents$;
  }
}

describe('SearchBoxEventBuilder', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchBoxComponentService,
          useClass: MockSearchBoxComponentService,
        },
      ],
    });

    TestBed.inject(SearchBoxEventBuilder); // register events

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

      searchBoxSuggestionSelectedEvents$.next({
        freeText: 'camera',
        isProduct: false,
        selected: mockSuggestions[0].value,
        values: mockSuggestions,
      });

      expect(result).toEqual(
        jasmine.objectContaining(searchBoxSuggestionSelectedEvent)
      );
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
          selectedCode: mockProduct.code,
        }
      );

      searchBoxProductSelectedEvents$.next({
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
