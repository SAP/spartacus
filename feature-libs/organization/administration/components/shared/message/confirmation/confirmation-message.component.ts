/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
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
  imports: [FocusDirective, IconComponent, TranslatePipe],
})
export class ConfirmationMessageComponent
  extends BaseMessageComponent
  implements OnInit
{
  protected data = inject<MessageData<ConfirmationMessageData>>(MessageData);
  protected messageService = inject(MessageService);

  cancelText: Translatable = {
    key: 'organization.confirmation.cancel',
  };
  confirmText: Translatable = {
    key: 'organization.confirmation.confirm',
  };

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
