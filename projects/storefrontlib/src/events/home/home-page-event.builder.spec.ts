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
    let result: HomePageEvent;
    eventService
      .get(HomePageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const navigationEvent = createFrom(NavigationEvent, {
      context: { id: 'home' },
      semanticRoute: 'home',
      url: 'home url',
      params: undefined,
    });
    eventService.dispatch(navigationEvent);
    expect(result).toBeTruthy();
    expect(result).toEqual(
      jasmine.objectContaining({
        navigation: { ...navigationEvent } as HomePageEvent,
      })
    );
  });
});
