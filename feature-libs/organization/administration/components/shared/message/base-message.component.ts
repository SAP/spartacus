/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Directive, HostBinding, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageData } from './message.model';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseMessageComponent implements OnInit {
  protected messageData = inject(MessageData);
  protected platformId = inject(PLATFORM_ID);

  @HostBinding('class') type: string | undefined;
  @HostBinding('class.terminated') terminated = false;

  message: Translatable;
  messageTitle?: Translatable;

  /**
   * Icon used to display next to the message.
   */
  messageIcon: ICON_TYPE | undefined;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.message = this.messageData.message ?? {};
    this.messageTitle = this.messageData.messageTitle;
    this.type = this.resolveType();
    this.messageIcon = this.messageData.messageIcon;

    if (this.messageData.timeout) {
      this.handleAutoHide();
    }
  }

  close(): void {
    this.messageData.events?.next({ close: true });
  }

  protected resolveType(): string | undefined {
    if (
      !this.messageData.type ||
      this.messageData.type === GlobalMessageType.MSG_TYPE_INFO
    ) {
      return 'info';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_ERROR) {
      return 'error';
    }
    if (this.messageData.type === GlobalMessageType.MSG_TYPE_WARNING) {
      return 'warning';
    }
  }

  protected handleAutoHide() {
    if (isPlatformBrowser(this.platformId)) {
      // we don't want to run this logic when doing SSR
      setTimeout(() => {
        this.close();
      }, this.messageData.timeout);
    }
  }
}
