/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Translatable } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';

/** Message rendered via the translation pipe. */
export type ConfiguratorTranslatableMessage = string | Translatable;

/**
 * View model of configurator messages grouped by severity.
 */
export interface ConfiguratorMessagesView {
  infoMessages: string[];
  warningMessages: string[];
  errorMessages: string[];
  /** Container min/max row info shown before other info messages. */
  containerInfoMessages?: Translatable[];
  /** Required container message shown before other error messages. */
  requiredErrorMessages?: Translatable[];
}

export interface ConfiguratorMessageGroup {
  /**
   * Messages of this severity. Plain strings are rendered as-is, while
   * {@link Translatable} entries are resolved through the translation pipe.
   */
  messages: ConfiguratorTranslatableMessage[];
  /** CSS class applied to the message row. */
  messageClass: string;
  /** Icon representing the message severity. */
  iconType?: ICON_TYPE;
  /** Whether the severity icon is displayed. */
  showIcon: boolean;
  /** Prefix used to build a unique UI key for the message row. */
  uiKeyPrefix: string;
  /** Optional ARIA role, for example `alert` for errors. */
  role?: string;
}

/**
 * Context used to prepend container min/max info and required messages.
 */
export interface ConfiguratorContainerMessagesContext {
  minRows?: number;
  maxRows?: number;
  rows?: Configurator.ContainerRow[];
  includeContainerInfo?: boolean;
  includeRequiredError?: boolean;
  getContainerRowInfoKey: (
    minRows?: number,
    maxRows?: number
  ) => Translatable | undefined;
  getContainerRequiredMessageKey: (
    minRows?: number,
    rows?: Configurator.ContainerRow[]
  ) => Translatable | undefined;
}

/**
 * Reusable service that groups, merges, filters and enriches configurator
 * messages so that the logic can be shared by any component that renders
 * configurator messages.
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorMessageService {
  /**
   * Splits configurator messages into severity buckets.
   * A message without severity is treated like `info`.
   *
   * @param messages - Messages by the configuration engine
   * @returns Messages grouped by severity
   */
  splitMessagesBySeverity(
    messages?: Configurator.Message[]
  ): ConfiguratorMessagesView {
    const infoMessages: string[] = [];
    const warningMessages: string[] = [];
    const errorMessages: string[] = [];
    messages?.forEach((message) => {
      switch (message.severity) {
        case Configurator.MessageSeverity.ERROR:
          errorMessages.push(message.message);
          break;
        case Configurator.MessageSeverity.WARNING:
          warningMessages.push(message.message);
          break;
        case Configurator.MessageSeverity.INFO:
          infoMessages.push(message.message);
          break;
        default:
          infoMessages.push(message.message);
          break;
      }
    });
    return { infoMessages, warningMessages, errorMessages };
  }

  /**
   * Filters messages for a container product card by selection state.
   * Selected products show error messages,
   * unselected products show info, error, container relevant and required messages.
   *
   * @param view - Messages grouped by severity
   * @param selected - Whether the product card is selected
   * @returns Messages applicable to the product selection state
   */
  filterMessagesByProductSelection(
    view: ConfiguratorMessagesView,
    selected: boolean
  ): ConfiguratorMessagesView {
    if (selected) {
      return {
        ...view,
        infoMessages: [],
        warningMessages: [],
        containerInfoMessages: [],
        requiredErrorMessages: [],
      };
    }

    return {
      ...view,
      errorMessages: [],
    };
  }

  /**
   * Adds container min/max info and required messages to a severity view.
   * Both are kept separate so callers can render them before engine messages.
   *
   * @param view - Messages grouped by severity
   * @param context - Container context and helper callbacks
   * @returns View enriched with container info and required messages
   */
  enrichMessagesWithContainerContext(
    view: ConfiguratorMessagesView,
    context: ConfiguratorContainerMessagesContext
  ): ConfiguratorMessagesView {
    const enriched: ConfiguratorMessagesView = { ...view };
    if (context.includeContainerInfo) {
      const containerInfo = context.getContainerRowInfoKey(
        context.minRows,
        context.maxRows
      );
      if (containerInfo) {
        enriched.containerInfoMessages = [
          ...(view.containerInfoMessages ?? []),
          containerInfo,
        ];
      }
    }

    if (context.includeRequiredError) {
      const requiredInfo = context.getContainerRequiredMessageKey(
        context.minRows,
        context.rows
      );
      if (requiredInfo) {
        enriched.requiredErrorMessages = [
          ...(view.requiredErrorMessages ?? []),
          requiredInfo,
        ];
      }
    }

    return enriched;
  }

  /**
   * Builds severity based message groups (info, error, warning) from a
   * message view, keeping only the groups that actually contain messages.
   *
   * @param messages - Messages grouped by severity
   * @returns Non-empty severity message groups
   */
  buildSeverityMessageGroups(
    messages: ConfiguratorMessagesView
  ): ConfiguratorMessageGroup[] {
    return [
      {
        messages: messages.infoMessages,
        messageClass: 'cx-info-msg',
        showIcon: false,
        uiKeyPrefix: 'info-msg',
      },
      {
        messages: messages.errorMessages,
        messageClass: 'cx-error-msg',
        iconType: ICON_TYPE.ERROR,
        showIcon: true,
        uiKeyPrefix: 'error-msg',
        role: 'alert',
      },
      {
        messages: messages.warningMessages,
        messageClass: 'cx-warning-msg',
        iconType: ICON_TYPE.WARNING,
        showIcon: true,
        uiKeyPrefix: 'warning-msg',
      },
    ].filter((group) => group.messages.length > 0);
  }

  /**
   * Builds the severity message groups from the given view and prepends the
   * container info and required message groups before them.
   *
   * @param messagesView - View that may contain container context messages view
   * @param options - Styling and icon configuration for the prepended messageGroups
   * @returns Groups with container context messagesView first, followed by the
   * severity based message groups
   */
  prependContainerContextMessageGroups(
    messagesView: ConfiguratorMessagesView,
    options: {
      containerInfoMessageClass: string;
      requiredErrorMessageClass: string;
      iconTypeError: ICON_TYPE;
      containerInfoUiKeyPrefix: string;
      requiredErrorUiKeyPrefix: string;
    }
  ): ConfiguratorMessageGroup[] {
    const messageGroups = this.buildSeverityMessageGroups(messagesView);
    const prependedGroups: ConfiguratorMessageGroup[] = [];

    if (messagesView.containerInfoMessages?.length) {
      prependedGroups.push({
        messages: messagesView.containerInfoMessages,
        messageClass: options.containerInfoMessageClass,
        showIcon: false,
        uiKeyPrefix: options.containerInfoUiKeyPrefix,
      });
    }

    if (messagesView.requiredErrorMessages?.length) {
      prependedGroups.push({
        messages: messagesView.requiredErrorMessages,
        messageClass: options.requiredErrorMessageClass,
        iconType: options.iconTypeError,
        showIcon: true,
        uiKeyPrefix: options.requiredErrorUiKeyPrefix,
        role: 'alert',
      });
    }

    return [...prependedGroups, ...messageGroups];
  }
}
