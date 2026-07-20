/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'cx-global-message',
  templateUrl: './global-message.component.html',
  imports: [NgIf, NgFor, IconComponent, AsyncPipe, TranslatePipe],
})
export class GlobalMessageComponent implements OnInit {
  iconTypes = ICON_TYPE;

  messages$: Observable<GlobalMessageEntities>;
  messageType: typeof GlobalMessageType = GlobalMessageType;

  constructor(protected globalMessageService: GlobalMessageService) {
    useFeatureStyles('a11yIncreaseContastGlobalMessageCloseButton');
  }

  ngOnInit(): void {
    this.messages$ = this.globalMessageService.get();
  }

  clear(type: GlobalMessageType, index: number): void {
    this.globalMessageService.remove(type, index);
  }
}
