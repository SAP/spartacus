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
    const names = name.split(' ');
    return `${names[0]?.split('')[0]}${names[1] ? names[1]?.split('')[0] : ''}`;
  }
}
