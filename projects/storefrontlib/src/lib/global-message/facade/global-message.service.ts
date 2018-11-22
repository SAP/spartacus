import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import { GlobalMessage, GlobalMessageType } from '../models/message.model';

@Injectable()
export class GlobalMessageService {
  readonly messages$: Observable<
    Map<GlobalMessageType, string[]>
  > = this.store.pipe(
    select(fromStore.getGlobalMessagesEntities),
    filter(data => data !== undefined)
  );

  constructor(private store: Store<fromStore.GlobalMessageState>) {}

  add(message: GlobalMessage) {
    this.store.dispatch(new fromStore.AddMessage(message));
  }

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
