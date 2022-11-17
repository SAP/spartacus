import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { MessageEvent } from '../messaging/index';

@Component({
  selector: 'cx-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() message: MessageEvent;
  iconTypes = ICON_TYPE;

  constructor() {}

  getInitials(author: string) {
    return author
      .split(' ')
      .map((author) => author[0])
      .join('');
  }
}
