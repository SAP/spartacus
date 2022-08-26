import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageEvent } from '../messaging';

export const FROM_CUSTOMER = 'C';

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
      ? author
          ?.split(' ')
          .map((author) => author[0])
          .join('')
      : FROM_CUSTOMER;
  }
}
