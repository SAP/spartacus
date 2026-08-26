/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';

/**
 * View model of configurator messages grouped by the severity they are
 * rendered with.
 */
export interface ConfiguratorMessagesView {
  warningMessages: string[];
  errorMessages: string[];
}

/**
 * Display data for one severity of configurator messages.
 */
export interface ConfiguratorMessageGroup {
  /** Messages of this severity. */
  messages: string[];
  /** CSS class applied to the message row. */
  messageClass: string;
  /** CSS class applied to the severity icon. */
  iconClass?: string;
  /** Icon representing the message severity. */
  iconType: ICON_TYPE;
  /** Prefix used to build a unique UI key for the message row. */
  uiKeyPrefix: string;
  /** Optional ARIA role, for example `alert` for errors. */
  role?: string;
}

/**
 * Splits configurator messages into the display buckets.
 * Such messages carry severity `info` or `warning`: `info` is rendered as
 * warning, `warning` as error. A message without severity is treated
 * like `info`.
 *
 * @param messages - Messages issued by the configuration engine
 * @returns Messages grouped by the severity they are rendered with
 */
export function splitMessagesBySeverity(
  messages?: Configurator.Message[]
): ConfiguratorMessagesView {
  const warningMessages: string[] = [];
  const errorMessages: string[] = [];
  messages?.forEach((message) => {
    if (message.severity === Configurator.MessageSeverity.WARNING) {
      errorMessages.push(message.message);
    } else {
      warningMessages.push(message.message);
    }
  });
  return { warningMessages, errorMessages };
}

/**
 * Presentational component that renders a list of configurator messages,
 * each with a severity icon and message text. Consumers pass styling,
 * icon type, ARIA role, and an optional id prefix so the same component
 * can be reused on product cards, attribute headers, and similar surfaces.
 */
@Component({
  selector: 'cx-configurator-message',
  templateUrl: './configurator-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, NgClass, IconComponent],
})
export class ConfiguratorMessageComponent {
  /**
   * Messages to display. Empty or undefined lists render nothing.
   */
  @Input() messages?: string[];
  /**
   * CSS class applied to each message row.
   */
  @Input() messageClass?: string;
  /**
   * CSS class applied to the severity icon.
   */
  @Input() iconClass?: string;
  /**
   * Icon representing the message severity.
   */
  @Input() iconType?: ICON_TYPE;
  /**
   * Prefix used to build a unique id for each message row. The row index
   * is appended as a suffix.
   */
  @Input() idPrefix?: string;
  /**
   * Optional ARIA role, for example `alert` for errors.
   */
  @Input() role?: string;

  /**
   * Builds a unique id for a message row.
   *
   * @param index - Zero-based index of the message in the list
   * @returns Id, or `undefined` if no prefix is provided
   */
  getMessageId(index: number): string | undefined {
    return this.idPrefix ? `${this.idPrefix}-${index}` : undefined;
  }
}
