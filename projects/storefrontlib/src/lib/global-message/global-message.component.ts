import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  GlobalMessageService,
  GlobalMessageType,
  GlobalMessageEntities
} from '@spartacus/core';

@Component({
  selector: 'cx-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss']
})
export class GlobalMessageComponent implements OnInit {
  messages$: Observable<GlobalMessageEntities>;
  messageType: typeof GlobalMessageType = GlobalMessageType;

  constructor(protected globalMessageService: GlobalMessageService) {}

  ngOnInit() {
    this.messages$ = this.globalMessageService.get();
  }

  clear(type: GlobalMessageType, index: number) {
    this.globalMessageService.remove(type, index);
  }
}
