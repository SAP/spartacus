import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from 'projects/storefrontlib/cms-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageDetails } from './messaging.model';

@Component({
  selector: 'cx-messaging',
  templateUrl: './messaging.component.html',
})
export class MessagingComponent implements OnInit {
  @Input() messageDetails$: Observable<MessageDetails>;

  iconTypes = ICON_TYPE;
  messageTextLimit: number = 2000;
  messageText: string = '';

  get inputCharacterLeft(): Observable<number> {
    return this.messageDetails$.pipe(
      map((details) => details.characterLimit || this.messageTextLimit)
    );
  }
  constructor() {}

  ngOnInit(): void {}

  getIntitials(name: string) {
    const names = name.split(' ');
    return `${names[0]?.split('')[0]}${names[1] ? names[1]?.split('')[0] : ''}`;
  }
}
