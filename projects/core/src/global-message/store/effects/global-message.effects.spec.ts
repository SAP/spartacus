import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';

import * as fromActions from '../actions/global-message.actions';
import * as fromEffects from '../effects/global-message.effects';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
// import { cold, hot } from 'jasmine-marbles';
import { GlobalMessage, GlobalMessageType } from '@spartacus/core';

import { GlobalMessageConfig } from '../../config/global-message-config';
import { defaultGlobalMessageConfig } from '../../config/default-global-message-config';
import { delay } from 'rxjs/operators';

const scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));

describe('GlobalMessage Effects', () => {
  let actions$: Observable<fromActions.GlobalMessageAction>;
  let effects: fromEffects.GlobalMessageEffects;
  let config: GlobalMessageConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: GlobalMessageConfig, useValue: defaultGlobalMessageConfig },
        fromEffects.GlobalMessageEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.GlobalMessageEffects);
    config = TestBed.get(GlobalMessageConfig);
  });

  describe('hideAfterDelay$', () => {
    it('should hide message after delay', () => {
      const message: GlobalMessage = {
        text: { raw: 'Test message' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      };
      const timeout = config.globalMessages[message.type].timeout;
      scheduler.run(helpers => {
        const action = new fromActions.AddMessage(message);
        const completion = new fromActions.RemoveMessage({
          type: message.type,
          index: 0,
        });

        actions$ = helpers.hot('-a', { a: action });
        helpers
          .expectObservable(
            effects.hideAfterDelay$.pipe(delay(timeout, scheduler))
          )
          .toBe('-b', { b: completion });
      });
    });
  });
});
