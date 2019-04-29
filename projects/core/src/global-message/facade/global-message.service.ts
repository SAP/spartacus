import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GlobalMessageType } from '../models/global-message.model';
import {
  GlobalMessageEntities,
  StateWithGlobalMessage,
  getGlobalMessageEntities,
  AddMessage,
  RemoveMessage,
  RemoveMessagesByType,
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
  add(message: { text: string; type: GlobalMessageType }): void {
    this.store.dispatch(
      new AddMessage({
        type: message.type,
        text: { raw: message.text },
      })
    );
  }

  /**
   * Add one translatable message into store
   * @param message: GlobalMessage object
   */
  addI18n(message: {
    key: string;
    params?: { [param: string]: any };
    type: GlobalMessageType;
  }): void {
    this.store.dispatch(
      new AddMessage({
        type: message.type,
        text: { key: message.key, params: message.params },
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
    if (index !== undefined) {
      this.store.dispatch(
        new RemoveMessage({
          type: type,
          index: index,
        })
      );
    } else {
      this.store.dispatch(new RemoveMessagesByType(type));
    }
  }
}
