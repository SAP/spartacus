import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as operators from 'rxjs/operators';
import { cold, hot } from 'jasmine-marbles';

import * as fromActions from '../actions/global-message.actions';
import * as fromReducer from '../reducers/index';
import * as fromEffects from '../effects/global-message.effect';
import { GlobalMessageConfig } from '../../config/global-message-config';
import { GLOBAL_MESSAGE_FEATURE } from '../global-message-state';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { defaultGlobalMessageConfigFactory } from '../../config/default-global-message-config';

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

describe('GlobalMessage Effects', () => {
  let actions$: Observable<fromActions.GlobalMessageAction>;
  let effects: fromEffects.GlobalMessageEffect;
  let store: Store<GlobalMessage>;
  let config: GlobalMessageConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          GLOBAL_MESSAGE_FEATURE,
          fromReducer.getReducers()
        ),
      ],
      providers: [
        provideMockActions(() => actions$),
        fromEffects.GlobalMessageEffect,
        Store,
        {
          provide: GlobalMessageConfig,
          useValue: defaultGlobalMessageConfigFactory(),
        },
      ],
    });
    effects = TestBed.get(fromEffects.GlobalMessageEffect);
    store = TestBed.get(Store);
    config = TestBed.get(GlobalMessageConfig);
  });

  describe('hideAfterDelay$', () => {
    it('should hide message after delay', () => {
      spyOn(store, 'select').and.returnValue(of(1));
      spyOnOperator(operators, 'delay').and.returnValue(data => data);

      const message: GlobalMessage = {
        text: { raw: 'Test message' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      };

      const action = new fromActions.AddMessage(message);
      const completion = new fromActions.RemoveMessage({
        type: message.type,
        index: 0,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.hideAfterDelay$).toBeObservable(expected);
      expect(store.select).toHaveBeenCalled();
      expect(operators.delay).toHaveBeenCalledWith(
        config.globalMessages[message.type].timeout
      );
    });
  });
});
