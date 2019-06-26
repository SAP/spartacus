import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as operators from 'rxjs/operators';
import { defaultGlobalMessageConfigFactory } from '../../config/default-global-message-config';
import { GlobalMessageConfig } from '../../config/global-message-config';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import * as fromEffects from '../effects/global-message.effect';
import {
  GLOBAL_MESSAGE_FEATURE,
  StateWithGlobalMessage,
} from '../global-message-state';

function spyOnOperator(obj: any, prop: string): any {
  const oldProp: Function = obj[prop];
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    value: oldProp,
    writable: true,
  });
  return spyOn(obj, prop);
}

const message: GlobalMessage = {
  text: { raw: 'Test message' },
  type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
};

describe('GlobalMessage Effects', () => {
  let actions$: Observable<GlobalMessageActions.GlobalMessageAction>;
  let effects: fromEffects.GlobalMessageEffect;
  let config: GlobalMessageConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: <StateWithGlobalMessage>{
            [GLOBAL_MESSAGE_FEATURE]: {
              entities: {
                [message.type]: [
                  {
                    key: 'test',
                  },
                ],
              },
            },
          },
        }),
        provideMockActions(() => actions$),
        fromEffects.GlobalMessageEffect,
        {
          provide: GlobalMessageConfig,
          useValue: defaultGlobalMessageConfigFactory(),
        },
      ],
    });
    effects = TestBed.get(fromEffects.GlobalMessageEffect);
    config = TestBed.get(GlobalMessageConfig);
  });

  describe('hideAfterDelay$', () => {
    it('should hide message after delay', () => {
      spyOnOperator(operators, 'delay').and.returnValue(data => data);

      const action = new GlobalMessageActions.AddMessage(message);
      const completion = new GlobalMessageActions.RemoveMessage({
        type: message.type,
        index: 0,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.hideAfterDelay$).toBeObservable(expected);
      expect(operators.delay).toHaveBeenCalledWith(
        config.globalMessages[message.type].timeout
      );
    });
  });
});
