/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Translatable } from '@spartacus/core';
import { BaseMessageComponent } from '../base-message.component';
import { MessageData } from '../message.model';
import { MessageService } from '../services/message.service';
import { ConfirmationMessageData } from './confirmation-message.model';

/**
 * Renders a confirmation message and cancel/confirm button in the message component.
 */
@Component({
  selector: 'cx-org-confirmation',
  templateUrl: './confirmation-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfirmationMessageComponent
  extends BaseMessageComponent
  implements OnInit
{
  protected data: MessageData<ConfirmationMessageData>;
  protected platformId: any;
  protected messageService = inject(MessageService);

  cancelText: Translatable = {
    key: 'organization.confirmation.cancel',
  };
  confirmText: Translatable = {
    key: 'organization.confirmation.confirm',
  };

  constructor() {
    const data = inject<MessageData<ConfirmationMessageData>>(MessageData);
    const platformId = inject(PLATFORM_ID);

    super(data, platformId);
  
    this.data = data;
    this.platformId = platformId;
  }

  ngOnInit() {
    super.ngOnInit();
    this.cancelText = this.messageData.cancel ?? this.cancelText;
    this.confirmText = this.messageData.confirm ?? this.confirmText;
  }
  /**
   * Emits a confirmation event to the data events.
   *
   * The original author of the event message or other parties can observe
   * the event data.
   */
  confirm() {
    this.data.events?.next({ confirm: true });
  }
}
