import { TestBed } from '@angular/core/testing';
import { EventService, TmsEvent } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageEventCollector } from './page-event.collector';
import { HomePageEvent, PageEvent } from './page.events';

let subject: Subject<any>;

describe('PageEventCollector', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    eventService = TestBed.inject(EventService);
    subject = new Subject<any>();

    TestBed.inject(PageEventCollector); // register events
  });

  describe('PageEvent', () => {
    const eventData: PageEvent = {
      context: { id: 'page' },
      url: 'random page url',
      params: {},
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(PageEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(PageEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });

  describe('HomePageEvent', () => {
    const eventData: HomePageEvent = {
      context: { id: 'home' },
      url: 'home page url',
      params: {},
    };

    beforeEach(() => {
      subject = new Subject<any>();
      eventService.register(HomePageEvent, subject.asObservable());
    });

    it('should be registered', () => {
      let result: TmsEvent;
      eventService
        .get(TmsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      subject.next(eventData);
      expect(result).not.toBeUndefined();
      expect(result.event).toEqual(HomePageEvent.type);
      expect(result.payload).toEqual(jasmine.objectContaining(eventData));
    });
  });
});
