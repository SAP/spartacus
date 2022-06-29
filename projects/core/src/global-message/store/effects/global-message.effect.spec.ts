import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ObjectComparisonUtils } from '../../../util/object-comparison-utils';
import { defaultGlobalMessageConfig } from '../../config/default-global-message-config';
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
          useValue: defaultGlobalMessageConfig,
        },
      ],
    });
    effects = TestBed.inject(fromEffects.GlobalMessageEffect);
  });

  describe('hideAfterDelay$', () => {
    it('should hide message after delay', () => {
      getTestScheduler().run(() => {
        const action = new GlobalMessageActions.AddMessage(message);
        const completion = new GlobalMessageActions.RemoveMessage({
          type: message.type,
          index: 0,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('- 3000ms b', { b: completion });
        expect(effects.hideAfterDelay$).toBeObservable(expected);
      });
    });

    it('should hide messages after delay', () => {
      getTestScheduler().run(() => {
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
        const expected = cold(`- 3000ms c 6999ms d`, {
          c: completion,
          d: completion2,
        });

        expect(effects.hideAfterDelay$).toBeObservable(expected);
      });
    });
  });

  it('should hide message after duration defined in message model', () => {
    getTestScheduler().run(() => {
      const action = new GlobalMessageActions.AddMessage(messageWithDuration);
      const completion = new GlobalMessageActions.RemoveMessage({
        type: message.type,
        index: 0,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('- 10000ms b', { b: completion });
      expect(effects.hideAfterDelay$).toBeObservable(expected);
    });
  });

  describe('removeDuplicated$', () => {
    it('should not remove message if there is only one', () => {
      getTestScheduler().run(() => {
        spyOn(ObjectComparisonUtils, 'countOfDeepEqualObjects').and.returnValue(
          1
        );
        spyOn(ObjectComparisonUtils, 'indexOfFirstOccurrence').and.returnValue(
          0
        );

        const action = new GlobalMessageActions.AddMessage(message2);

        actions$ = hot('-a', { a: action });
        const expected = cold('--');

        expect(effects.removeDuplicated$).toBeObservable(expected);
        expect(
          ObjectComparisonUtils.countOfDeepEqualObjects
        ).toHaveBeenCalledWith(message2.text, [message2.text]);
        expect(
          ObjectComparisonUtils.indexOfFirstOccurrence
        ).not.toHaveBeenCalled();
      });
    });

    it('should remove message if already exist', () => {
      getTestScheduler().run(() => {
        spyOn(ObjectComparisonUtils, 'countOfDeepEqualObjects').and.returnValue(
          2
        );
        spyOn(ObjectComparisonUtils, 'indexOfFirstOccurrence').and.returnValue(
          0
        );

        const action = new GlobalMessageActions.AddMessage(message2);
        const completion = new GlobalMessageActions.RemoveMessage({
          type: message.type,
          index: 0,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effects.removeDuplicated$).toBeObservable(expected);
        expect(
          ObjectComparisonUtils.countOfDeepEqualObjects
        ).toHaveBeenCalledWith(message2.text, [message2.text]);
        expect(
          ObjectComparisonUtils.indexOfFirstOccurrence
        ).toHaveBeenCalledWith(message2.text, [message2.text]);
      });
    });
  });
});
