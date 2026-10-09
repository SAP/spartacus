/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { ConfiguratorTranslatableMessage } from '../service/configurator-message.service';

/**
 * Presentational component that renders a list of messages,
 * each optionally with a severity icon and message text. Consumers pass styling,
 * icon type, icon visibility, ARIA role, and an optional id prefix so the same
 * component can be reused on product cards, attribute headers, and similar surfaces.
 */
@Component({
  selector: 'cx-configurator-message',
  templateUrl: './configurator-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, NgClass, IconComponent, TranslatePipe],
})
export class ConfiguratorMessageComponent {
  /**
   * Messages to display, in render order. Plain strings are shown as-is;
   * {@link Translatable} entries are resolved through the translation pipe.
   * Callers merge their plain and translatable messages into this single list.
   * Empty or undefined lists render nothing.
   */
  @Input() messages?: ConfiguratorTranslatableMessage[];
  /**
   * CSS class applied to each message row.
   */
  @Input() messageClass?: string;
  /**
   * Icon representing the message severity.
   */
  @Input() iconType?: ICON_TYPE;
  /**
   * Whether the severity icon is displayed.
   */
  @Input() showIcon = false;
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
   * Type guard used by the template to decide whether a message must be
   * translated. Plain strings are already resolved text and rendered as-is.
   *
   * @param message - Message to inspect
   * @returns `true` if the message is a plain string
   */
  isString(message: ConfiguratorTranslatableMessage): message is string {
    return typeof message === 'string';
  }

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
