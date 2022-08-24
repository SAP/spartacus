import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageEvent } from '../messaging';

@Component({
  selector: 'cx-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
  @Input() event: MessageEvent;
  iconTypes = ICON_TYPE;

  constructor() {}

  ngOnInit(): void {}

  getIntitials(name: string) {
    return name
      .split(' ')
      .map((name) => name[0])
      .join('');
  }
}
