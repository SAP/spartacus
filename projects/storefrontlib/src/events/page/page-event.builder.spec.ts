import { TestBed } from '@angular/core/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  ActivatedRouterStateSnapshot,
  ContentPageMetaResolver,
  EventService,
} from '@spartacus/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageEventBuilder } from './page-event.builder';
import { HomePageEvent, PageEvent } from './page.events';

interface ActionWithPayload extends Action {
  payload: any;
}

const resolveTitleBehavior = new BehaviorSubject<string>(undefined);
class MockContentPageMetaResolver {
  resolveTitle = () => resolveTitleBehavior;
}

describe('PageEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        {
          provide: ContentPageMetaResolver,
          useClass: MockContentPageMetaResolver,
        },
      ],
    });

    TestBed.inject(PageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('PageEvent', () => {
    resolveTitleBehavior.next('random page title');
    const state = {
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

    actions$.next({ type: ROUTER_NAVIGATED, payload: state });
    expect(result).toEqual(
      jasmine.objectContaining({
        ...state.routerState,
        title: 'random page title',
      })
    );
  });

  it('HomePageEvent', () => {
    resolveTitleBehavior.next('home page title');
    const state = {
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

    actions$.next({ type: ROUTER_NAVIGATED, payload: state });
    expect(result).toEqual(
      jasmine.objectContaining({
        ...state.routerState,
        title: 'home page title',
      })
    );
  });
});
