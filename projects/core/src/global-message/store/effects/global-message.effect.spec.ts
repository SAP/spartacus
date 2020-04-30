import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as operators from 'rxjs/operators';
import * as utils from '../../../util/compare-equal-objects';
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

const message2: GlobalMessage = {
  text: { key: 'test' },
  type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
};

const errorMessage: GlobalMessage = {
  text: { key: 'error' },
  type: GlobalMessageType.MSG_TYPE_ERROR,
};

const messageWithDuration: GlobalMessage = {
  text: { raw: 'Test message' },
  type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
  timeout: 10000,
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
                [message.type]: [message2.text],
                [errorMessage.type]: [errorMessage.text],
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
    effects = TestBed.inject(fromEffects.GlobalMessageEffect);
    config = TestBed.inject(GlobalMessageConfig);
  });

  describe('hideAfterDelay$', () => {
    it('should hide message after delay', () => {
      spyOnOperator(operators, 'delay').and.returnValue((data) => data);

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

    it('should hide messages after delay', () => {
      const spyDelay = spyOnOperator(operators, 'delay').and.returnValue(
        (data) => data
      );
      const action = new GlobalMessageActions.AddMessage(message);
      const action2 = new GlobalMessageActions.AddMessage(errorMessage);
      const completion = new GlobalMessageActions.RemoveMessage({
        type: message.type,
        index: 0,
      });
      const completion2 = new GlobalMessageActions.RemoveMessage({
        type: errorMessage.type,
        index: 0,
      });

      actions$ = hot('-a-b', { a: action, b: action2 });
      const expected = cold('-c-d', { c: completion, d: completion2 });
      expect(effects.hideAfterDelay$).toBeObservable(expected);
      expect(spyDelay.calls.allArgs()).toEqual([
        [config.globalMessages[message.type].timeout],
        [config.globalMessages[errorMessage.type].timeout],
      ]);
    });
  });

  it('should hide message after duration defined in message model', () => {
    spyOnOperator(operators, 'delay').and.returnValue((data) => data);

    const action = new GlobalMessageActions.AddMessage(messageWithDuration);
    const completion = new GlobalMessageActions.RemoveMessage({
      type: message.type,
      index: 0,
    });

    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.hideAfterDelay$).toBeObservable(expected);
    expect(operators.delay).toHaveBeenCalledWith(messageWithDuration.timeout);
  });

  describe('removeDuplicated$', () => {
    it('should not remove message if there is only one', () => {
      spyOn(utils, 'countOfDeepEqualObjects').and.returnValue(1);
      spyOn(utils, 'indexOfFirstOccurrence').and.returnValue(0);

      const action = new GlobalMessageActions.AddMessage(message2);

      actions$ = hot('-a', { a: action });
      const expected = cold('--');

      expect(effects.removeDuplicated$).toBeObservable(expected);
      expect(utils.countOfDeepEqualObjects).toHaveBeenCalledWith(
        message2.text,
        [message2.text]
      );
      expect(utils.indexOfFirstOccurrence).not.toHaveBeenCalled();
    });

    it('should remove message if already exist', () => {
      spyOn(utils, 'countOfDeepEqualObjects').and.returnValue(2);
      spyOn(utils, 'indexOfFirstOccurrence').and.returnValue(0);

      const action = new GlobalMessageActions.AddMessage(message2);
      const completion = new GlobalMessageActions.RemoveMessage({
        type: message.type,
        index: 0,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.removeDuplicated$).toBeObservable(expected);
      expect(utils.countOfDeepEqualObjects).toHaveBeenCalledWith(
        message2.text,
        [message2.text]
      );
      expect(utils.indexOfFirstOccurrence).toHaveBeenCalledWith(message2.text, [
        message2.text,
      ]);
    });
  });
});
