import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store/index';
import {
  GlobalMessage,
  GlobalMessageType
} from '../models/global-message.model';

@Injectable()
export class GlobalMessageService {
  readonly messages$: Observable<
    Map<GlobalMessageType, string[]>
  > = this.store.pipe(
    select(fromStore.getGlobalMessageEntities),
    filter(data => data !== undefined)
  );

  constructor(private store: Store<fromStore.GlobalMessageState>) {}

  /**
   * Get all global messages
   */
  get(): Observable<Map<GlobalMessageType, string[]>> {
    return this.store.pipe(
      select(fromStore.getGlobalMessageEntities),
      filter(data => data !== undefined)
    );
  }

  /**
   * Add one message into store
   * @param message: GlobalMessage object
   */
  add(message: GlobalMessage) {
    this.store.dispatch(new fromStore.AddMessage(message));
  }

  /**
   * Remove message(s) from store
   * @param type: GlobalMessageType
   * @param index:optional. Without it, messages will be removed by type; otherwise,
   * message will be removed from list by index.
   */
  remove(type: GlobalMessageType, index?: number) {
    if (index !== undefined) {
      this.store.dispatch(
        new fromStore.RemoveMessage({
          type: type,
          index: index
        })
      );
    } else {
      this.store.dispatch(new fromStore.RemoveMessagesByType(type));
    }
  }
}
