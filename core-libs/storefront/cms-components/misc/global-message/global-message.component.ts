/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FeatureDirective,
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
  imports: [IconComponent, AsyncPipe, TranslatePipe, FeatureDirective],
})
export class GlobalMessageComponent implements OnInit {
  protected globalMessageService = inject(GlobalMessageService);

  iconTypes = ICON_TYPE;

  messages$: Observable<GlobalMessageEntities>;
  messageType: typeof GlobalMessageType = GlobalMessageType;

  constructor() {
    useFeatureStyles('a11yIncreaseContastGlobalMessageCloseButton');
    useFeatureStyles('globalMessageCloseButtonPadding');
  }

  ngOnInit(): void {
    this.messages$ = this.globalMessageService.get();
  }

  clear(type: GlobalMessageType, index: number): void {
    this.globalMessageService.remove(type, index);
  }
}
