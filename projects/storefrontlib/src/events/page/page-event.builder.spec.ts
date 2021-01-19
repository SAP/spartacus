import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { createFrom, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation';
import { PageEventBuilder } from './page-event.builder';
import { HomePageEvent } from './page.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('PageEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(PageEventBuilder); // register events
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
      jasmine.objectContaining({ navigation: { ...navigationEvent } })
    );
  });
});
