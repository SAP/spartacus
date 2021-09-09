import { TestBed } from '@angular/core/testing';
import { createFrom, EventService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { HomePageEventBuilder } from './home-page-event.builder';
import { HomePageEvent } from './home-page.events';

describe('HomePageEventBuilder', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.inject(HomePageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('HomePageEvent', () => {
    let result: HomePageEvent | undefined;
    eventService
      .get(HomePageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const navigationEvent = createFrom(NavigationEvent, {
      context: { id: 'home' },
      semanticRoute: 'home',
      url: 'home url',
      params: {},
    });
    eventService.dispatch(navigationEvent);

    expect(result).toBeTruthy();
    const expected = createFrom(HomePageEvent, {
      navigation: navigationEvent,
    });
    expect(result).toEqual(jasmine.objectContaining({ ...expected }));
  });
});
