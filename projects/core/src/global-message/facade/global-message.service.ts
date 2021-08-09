import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Translatable } from '../../i18n/translatable';
import { isNotUndefined } from '../../util/type-guards';
import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageActions } from '../store/actions/index';
import {
  GlobalMessageEntities,
  StateWithGlobalMessage,
} from '../store/global-message-state';
import { GlobalMessageSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageService {
  constructor(protected store: Store<StateWithGlobalMessage>) {}

  /**
   * Get all global messages
   */
  get(): Observable<GlobalMessageEntities> {
    return this.store.pipe(
      select(GlobalMessageSelectors.getGlobalMessageEntities),
      filter(isNotUndefined)
    );
  }

  /**
   * Add one message into store
   * @param text: string | Translatable
   * @param type: GlobalMessageType object
   * @param timeout: number
   */
  add(
    text: string | Translatable,
    type: GlobalMessageType,
    timeout?: number
  ): void {
    this.store.dispatch(
      new GlobalMessageActions.AddMessage({
        text: typeof text === 'string' ? { raw: text } : text,
        type,
        timeout,
      })
    );
  }

  /**
   * Remove message(s) from store
   * @param type: GlobalMessageType
   * @param index:optional. Without it, messages will be removed by type; otherwise,
   * message will be removed from list by index.
   */
  remove(type: GlobalMessageType, index?: number): void {
    this.store.dispatch(
      index !== undefined
        ? new GlobalMessageActions.RemoveMessage({
            type: type,
            index: index,
          })
        : new GlobalMessageActions.RemoveMessagesByType(type)
    );
  }
}
