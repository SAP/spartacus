import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextEventBuilder } from './site-context-event.builder';
import { CurrencySetEvent, LanguageSetEvent } from './site-context.events';

describe('SiteContextEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [{ provide: ActionsSubject, useValue: actions$ }],
    });

    TestBed.inject(SiteContextEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('LanguageSetEvent', () => {
    it('should emit the event when the action is fired', () => {
      const payload = 'en';

      let result: LanguageSetEvent;
      eventService
        .get(LanguageSetEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      actions$.next({
        type: SiteContextActions.SET_ACTIVE_LANGUAGE,
        payload,
      } as SiteContextActions.SetActiveLanguage);
      expect(result).toEqual(
        jasmine.objectContaining({ activeLanguage: payload })
      );
    });

    it('should emit each time the action is fired', () => {
      let payload = 'en';

      let result: LanguageSetEvent;
      eventService
        .get(LanguageSetEvent)
        .pipe(take(3))
        .subscribe((value) => (result = value));

      actions$.next({
        type: SiteContextActions.SET_ACTIVE_LANGUAGE,
        payload,
      } as SiteContextActions.SetActiveLanguage);
      expect(result).toEqual(
        jasmine.objectContaining({ activeLanguage: payload })
      );

      payload = 'de';
      actions$.next({
        type: SiteContextActions.SET_ACTIVE_LANGUAGE,
        payload,
      } as SiteContextActions.SetActiveLanguage);
      expect(result).toEqual(
        jasmine.objectContaining({ activeLanguage: payload })
      );

      payload = 'ja';
      actions$.next({
        type: SiteContextActions.SET_ACTIVE_LANGUAGE,
        payload,
      } as SiteContextActions.SetActiveLanguage);
      expect(result).toEqual(
        jasmine.objectContaining({ activeLanguage: payload })
      );
    });
  });

  describe('CurrencySetEvent', () => {
    it('should emit the event when the action is fired', () => {
      const payload = 'en';

      let result: CurrencySetEvent;
      eventService
        .get(CurrencySetEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      actions$.next({
        type: SiteContextActions.SET_ACTIVE_CURRENCY,
        payload,
      } as SiteContextActions.SetActiveCurrency);
      expect(result).toEqual(
        jasmine.objectContaining({ activeCurrency: payload })
      );
    });
  });
});
