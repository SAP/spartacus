import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { AsmSessionEffects } from './asm-session.effect';
import { AsmConnector } from '../../connectors';
import { AsmSessionActions } from '../actions';
import { AsmSessionCreationOptions } from '@spartacus/asm/root';
import { LoggerService } from '@spartacus/core';

class AsmConnectorMock {
  createAsmSessionEvent(_payload: AsmSessionCreationOptions): Observable<void> {
    return of(void 0);
  }
}

describe('AsmSessionEffects', () => {
  let asmConnector: AsmConnector;
  let effects: AsmSessionEffects;
  let actions$: Observable<AsmSessionActions.AsmSessionAction>;

  const payload: AsmSessionCreationOptions = {
    eventType: 'createEvent',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsmSessionEffects,
        { provide: AsmConnector, useClass: AsmConnectorMock },
        LoggerService,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(AsmSessionEffects);
    asmConnector = TestBed.inject(AsmConnector);
  });

  describe('createAsmSessionEvent$', () => {
    it('should emit AsmSessionCreationSuccess on successful creation', () => {
      vi.spyOn(asmConnector, 'createAsmSessionEvent').mockReturnValue(of(void 0));

      const action = new AsmSessionActions.AsmSessionCreationAction(payload);
      const completion = new AsmSessionActions.AsmSessionCreationSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.createAsmSessionEvent$).toBeObservable(expected);
      expect(asmConnector.createAsmSessionEvent).toHaveBeenCalledWith(payload);
    });
  });
});
