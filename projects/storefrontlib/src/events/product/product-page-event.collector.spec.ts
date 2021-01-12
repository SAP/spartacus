import { TestBed } from '@angular/core/testing';
import { EventService, TmsEvent } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductPageEventCollector } from './product-page-event.collector';
import {
  CategoryPageResultsEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

let subject: Subject<any>;

describe('ProductPageEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    eventService = TestBed.inject(EventService);
    subject = new Subject<any>();

    TestBed.inject(ProductPageEventCollector); // register events
  });

  describe('ProductDetailsPageEvent', () => {
    const eventData: ProductDetailsPageEvent = {
      context: { id: 'cart' },
      url: 'cart page url',
      params: {},
      name: 'product',
      code: 'product-code',
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(ProductDetailsPageEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(ProductDetailsPageEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });

  describe('CategoryPageResultsEvent', () => {
    const eventData: CategoryPageResultsEvent = {
      context: { id: 'cart' },
      url: 'cart page url',
      params: {},
      categoryName: 'category',
      categoryCode: 'category-code',
      numberOfResults: 1,
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(CategoryPageResultsEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(CategoryPageResultsEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });

  describe('SearchPageResultsEvent', () => {
    const eventData: SearchPageResultsEvent = {
      context: { id: 'cart' },
      url: 'cart page url',
      params: {},
      searchTerm: 'search term',
      numberOfResults: 1,
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(SearchPageResultsEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(SearchPageResultsEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
