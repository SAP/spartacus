/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeatureToggles, TranslatePipe } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorUtilsService } from '../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  ConfiguratorMessagesView,
  mergeMessagesViews,
  splitMessagesBySeverity,
} from '../message/configurator-message.component';

@Component({
  selector: 'cx-configuration-conflict-and-error-messages',
  templateUrl: './configurator-conflict-and-error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, NgFor, AsyncPipe, TranslatePipe],
})
export class ConfiguratorConflictAndErrorMessagesComponent {
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);
  private featureToggles = inject(FeatureToggles);

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
   * When `productConfiguratorCPQContainer` is enabled and the configuration
   * has the full CPQ state, root messages are taken from the typed
   * `messages` list rather than from `warningMessages`/`errorMessages`.
   *
   * @param configuration - Current configuration
   * @returns Messages of the currently viewed configuration
   */
  protected getMessages(
    configuration: Configurator.Configuration
  ): ConfiguratorMessagesView {
    const containerRowGroup = this.getCurrentContainerRowGroup(configuration);
    if (containerRowGroup) {
      return splitMessagesBySeverity(containerRowGroup.messages);
    }
    if (this.shouldUseTypedRootMessages(configuration)) {
      return mergeMessagesViews(
        splitMessagesBySeverity(configuration.messages),
        {
          infoMessages: [],
          warningMessages: configuration.warningMessages ?? [],
          errorMessages: configuration.errorMessages ?? [],
        }
      );
    }
    return {
      infoMessages: [],
      warningMessages: configuration.warningMessages ?? [],
      errorMessages: configuration.errorMessages ?? [],
    };
  }

  /**
   * Whether root messages should be read from the typed `messages` list.
   *
   * @param configuration - Current configuration
   * @returns `true` when the CPQ container feature is enabled and the
   * configuration has the full CPQ state
   */
  protected shouldUseTypedRootMessages(
    configuration: Configurator.Configuration
  ): boolean {
    return (
      !!this.featureToggles.productConfiguratorCPQContainer &&
      !!configuration.hasFullConfigurationState
    );
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
}
