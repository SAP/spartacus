import { TestBed } from '@angular/core/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, ActionsSubject } from '@ngrx/store';
import { ActivatedRouterStateSnapshot, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageEventBuilder } from './page-event.builder';
import { HomePageEvent, PageEvent } from './page.events';

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

  it('PageEvent', () => {
    const payload = {
      routerState: {
        semanticRoute: 'aPage',
        url: 'random url',
      } as ActivatedRouterStateSnapshot,
    };

    let result: PageEvent;
    eventService
      .get(PageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toEqual(jasmine.objectContaining(payload.routerState));
  });

  it('HomePageEvent', () => {
    const payload = {
      routerState: {
        semanticRoute: 'home',
        url: 'home url',
      } as ActivatedRouterStateSnapshot,
    };

    let result: HomePageEvent;
    eventService
      .get(HomePageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toEqual(jasmine.objectContaining(payload.routerState));
  });
});
