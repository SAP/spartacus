import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CdcAuthActions } from '../store/actions';
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

  it('CdcLoadUserTokenFailEvent', async () => {
    const payload: any = { test: 'test' };

    const resultPromise = firstValueFrom(
      eventService.get(CdcLoadUserTokenFailEvent)
    );
    actions$.next({ type: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL, payload });
    const result = await resultPromise;
    expect(result).toEqual(expect.objectContaining(payload));
  });
});
