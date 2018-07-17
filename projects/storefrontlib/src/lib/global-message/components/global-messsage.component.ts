import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import * as fromAction from '../store/actions';
import { GlobalMessageType, GlobalMessage } from './../models/message.model';

@Component({
  selector: 'y-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss']
})
export class GlobalMessageComponent implements OnInit {
  messages$: Observable<any>;
  messageType: typeof GlobalMessageType = GlobalMessageType;

  constructor(protected store: Store<fromStore.GlobalMessageState>) {
    // for testing purpose
    this.store.dispatch(
      new fromAction.AddMessage({
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        text: 'test confirmation message'
      })
    );

    this.store.dispatch(
      new fromAction.AddMessage({
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        text: 'test confirmation message'
      })
    );

    this.store.dispatch(
      new fromAction.AddMessage({
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        text: 'test confirmation message again'
      })
    );

    this.store.dispatch(
      new fromAction.AddMessage({
        type: GlobalMessageType.MSG_TYPE_ERROR,
        text: 'test error message'
      })
    );

    this.store.dispatch(
      new fromAction.AddMessage({
        type: GlobalMessageType.MSG_TYPE_INFO,
        text: 'test info message'
      })
    );
  }

  ngOnInit() {
    this.messages$ = this.store
      .select(fromStore.getGlobalMessages)
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
