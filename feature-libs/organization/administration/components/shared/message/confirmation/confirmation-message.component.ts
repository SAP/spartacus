/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Translatable, TranslatePipe } from '@spartacus/core';
import { FocusDirective, IconComponent } from '@spartacus/storefront';
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
  imports: [FocusDirective, NgIf, IconComponent, TranslatePipe],
})
export class ConfirmationMessageComponent
  extends BaseMessageComponent
  implements OnInit
{
  cancelText: Translatable = {
    key: 'organization.confirmation.cancel',
  };
  confirmText: Translatable = {
    key: 'organization.confirmation.confirm',
  };

  constructor(
    protected data: MessageData<ConfirmationMessageData>,
    @Inject(PLATFORM_ID) protected platformId: any,
    protected messageService: MessageService
  ) {
    super(data, platformId);
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
