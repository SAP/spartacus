import { TestBed } from '@angular/core/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, ActionsSubject } from '@ngrx/store';
import { ActivatedRouterStateSnapshot, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NavigationEventBuilder } from './navigation-event.builder';
import { NavigationEvent } from './navigation.event';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('NavigationEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(NavigationEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('PageEvent', () => {
    const payload = {
      routerState: {
        semanticRoute: 'aPage',
        url: 'random url',
      } as ActivatedRouterStateSnapshot,
    };

    let result: NavigationEvent;
    eventService
      .get(NavigationEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toEqual(jasmine.objectContaining(payload.routerState));
  });
});
