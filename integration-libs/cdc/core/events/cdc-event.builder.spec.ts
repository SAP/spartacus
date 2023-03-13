import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcAuthActions } from '../auth/store/actions/index';
import { CdcEventBuilder } from './cdc-event.builder';

interface ActionWithPayload extends Action {
  payload: any;
}

describe('CdcEventBuilder', () => {
  let eventService: EventService;
  let actions$: Subject<ActionWithPayload>;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        CdcEventBuilder,
        { provide: ActionsSubject, useValue: actions$ },
      ],
    });

    TestBed.inject(CdcEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('CdcLoadUserTokenFailEvent', (done) => {
    const payload: any = { test: 'test' };

    eventService
      .get(CdcLoadUserTokenFailEvent)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(jasmine.objectContaining(payload));
        done();
      });

    actions$.next({ type: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL, payload });
  });
});
