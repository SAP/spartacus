import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  GlobalMessage,
  GlobalMessageType
} from '../models/global-message.model';
import {
  GlobalMessageEntities,
  StateWithGlobalMessage,
  getGlobalMessageEntities,
  AddMessage,
  RemoveMessage,
  RemoveMessagesByType
} from '../store/index';

@Injectable()
export class GlobalMessageService {
  constructor(private store: Store<StateWithGlobalMessage>) {}

  /**
   * Get all global messages
   */
  get(): Observable<GlobalMessageEntities> {
    return this.store.pipe(
      select(getGlobalMessageEntities),
      filter(data => data !== undefined)
    );
  }

  /**
   * Add one message into store
   * @param message: GlobalMessage object
   */
  add(message: GlobalMessage) {
    this.store.dispatch(new AddMessage(message));
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
        new RemoveMessage({
          type: type,
          index: index
        })
      );
    } else {
      this.store.dispatch(new RemoveMessagesByType(type));
    }
  }
}
