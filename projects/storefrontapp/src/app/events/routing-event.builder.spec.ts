import { TestBed } from '@angular/core/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, ActionsSubject } from '@ngrx/store';
import { ActivatedRouterStateSnapshot, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingEventBuilder } from './routing-event.builder';
import {
  CartPageVisited,
  HomePageVisited,
  PageVisited,
} from './routing.events';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('Routing-Event Builder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(RoutingEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('PageVisited', () => {
    const payload = {
      routerState: {
        semanticRoute: 'aPage',
        url: 'random url',
        // TODO:#events - should not be mapped
        cmsRequired: true,
      } as ActivatedRouterStateSnapshot,
    };

    let result: PageVisited;
    eventService
      .get(PageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toEqual(jasmine.objectContaining(payload.routerState));
  });

  it('HomePageVisited', () => {
    const payload = {
      routerState: {
        semanticRoute: 'home',
        url: 'home url',
      } as ActivatedRouterStateSnapshot,
    };

    let result: HomePageVisited;
    eventService
      .get(HomePageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toBeTruthy();
  });

  it('CartPageVisited', () => {
    const payload = {
      routerState: {
        semanticRoute: 'cart',
        url: 'cart url',
      } as ActivatedRouterStateSnapshot,
    };

    let result: CartPageVisited;
    eventService
      .get(CartPageVisited)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    actions$.next({ type: ROUTER_NAVIGATED, payload });
    expect(result).toBeTruthy();
  });
});
