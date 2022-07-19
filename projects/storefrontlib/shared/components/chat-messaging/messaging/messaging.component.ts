import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from 'projects/storefrontlib/cms-components';

@Component({
  selector: 'cx-messaging',
  templateUrl: './messaging.component.html',
})
export class MessagingComponent implements OnInit {
  iconTypes = ICON_TYPE;
  messageTextLimit: number = 2000;
  messageText: string = '';

  get inputCharacterLeft(): number {
    return this.messageTextLimit - (this.messageText?.length || 0);
  }
  constructor() {}

  @Input() ticketDetails$: any;

  ngOnInit(): void {}

  getIntitials(name: string) {
    const names = name.split(' ');
    return `${names[0]?.split('')[0]}${names[1] ? names[1]?.split('')[0] : ''}`;
  }
}
