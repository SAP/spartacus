import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import { GlobalMessageType } from './../models/message.model';

@Component({
  selector: 'y-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss']
})
export class GlobalMessageComponent implements OnInit {
  messages$: Observable<Map<GlobalMessageType, string[]>>;
  messageType: typeof GlobalMessageType = GlobalMessageType;

  constructor(protected store: Store<fromStore.GlobalMessageState>) {}

  ngOnInit() {
    this.messages$ = this.store
      .select(fromStore.getGlobalMessagesEntities)
      .pipe(filter(data => data !== undefined));
  }

  clear(type: GlobalMessageType, index: number) {
    this.store.dispatch(
      new fromAction.RemoveMessage({
        type: type,
        index: index
      })
    );
  }
}
