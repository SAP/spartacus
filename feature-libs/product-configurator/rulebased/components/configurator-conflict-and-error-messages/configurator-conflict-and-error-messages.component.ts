/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorUtilsService } from '../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../core/model/configurator.model';

/**
 * View model of the messages to display. These belong to the configuration the
 * user currently views, which is either a nested (container row) configuration
 * or the root configuration.
 */
interface ConfiguratorMessagesView {
  warningMessages: string[];
  errorMessages: string[];
}

@Component({
  selector: 'cx-configuration-conflict-and-error-messages',
  templateUrl: './configurator-conflict-and-error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, NgFor, AsyncPipe, TranslatePipe],
})
export class ConfiguratorConflictAndErrorMessagesComponent {
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);

  iconTypes = ICON_TYPE;

  /**
   * @deprecated since 221121.17 - Use `messages$` instead, which only exposes
   * the messages of the configuration that is currently viewed. This
   * observable remains for backward compatibility and will be removed in a
   * future major version.
   */
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  /**
   * Messages of the configuration the user currently views. While a nested
   * (container row) configuration is viewed, only its messages are exposed,
   * so that messages of the root configuration and of enclosing nested
   * configurations do not appear.
   */
  messages$: Observable<ConfiguratorMessagesView> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
      map((configuration) => this.getMessages(configuration))
    );

  showWarnings = false;

  toggleWarnings(): void {
    this.showWarnings = !this.showWarnings;
  }

  showErrors = false;

  toggleErrors(): void {
    this.showErrors = !this.showErrors;
  }

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  /**
   * Determines the messages to display for the given configuration, taking the
   * nested configuration that is currently viewed into account.
   *
   * @param configuration - Current configuration
   * @returns Messages of the currently viewed configuration
   */
  protected getMessages(
    configuration: Configurator.Configuration
  ): ConfiguratorMessagesView {
    const containerRowGroup = this.getCurrentContainerRowGroup(configuration);
    if (!containerRowGroup) {
      return {
        warningMessages: configuration.warningMessages ?? [],
        errorMessages: configuration.errorMessages ?? [],
      };
    }
    return this.splitMessagesBySeverity(containerRowGroup.messages);
  }

  /**
   * Retrieves the group that carries the nested configuration the user
   * currently views. As the group path is collected innermost first, the first
   * container row group on it is the one being viewed. For a container within a
   * container this is the innermost one.
   *
   * @param configuration - Current configuration
   * @returns Container row group on the path to the current group, or
   * `undefined` if the root configuration is viewed
   */
  protected getCurrentContainerRowGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group | undefined {
    const currentGroupId = configuration.interactionState?.currentGroup;
    if (!currentGroupId || !configuration.groups?.length) {
      return undefined;
    }
    const groupPath: Configurator.Group[] = [];
    this.configuratorUtilsService.buildGroupPath(
      currentGroupId,
      configuration.groups,
      groupPath
    );
    return groupPath.find(
      (group) => group.groupType === Configurator.GroupType.CONTAINER_ROW_GROUP
    );
  }

  /**
   * Splits the messages of a nested configuration into the display buckets.
   * Such messages carry severity `info` or `warning`: `info` is rendered as
   * warning, `warning` as error. A message without severity is treated
   * like `info`.
   *
   * @param messages - Messages of a nested configuration
   * @returns Messages grouped by the severity they are rendered with
   */
  protected splitMessagesBySeverity(
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
}
