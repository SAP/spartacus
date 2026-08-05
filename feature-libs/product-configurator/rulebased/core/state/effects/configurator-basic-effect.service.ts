/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';

/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorBasicEffectService {
  protected configuratorUtilsService = inject(ConfiguratorUtilsService);

  /**
   * Returns the given configuration from the store if the requested tab (group)
   * was loaded before and still holds attributes, so that the caller can avoid
   * an unnecessary backend read.
   *
   * This is relevant for configurator types that load tabs lazily (one group
   * per backend call) and may safely reuse an already loaded tab.
   *
   * @param configuration - configuration currently held in the store
   * @param configId - requested configuration ID
   * @param groupId - requested group (tab) ID
   * @param owner - configuration owner
   * @returns configuration from the store, or undefined if the tab was not loaded before or has no attributes
   */
  getConfigurationIfTabAlreadyLoaded(
    configuration: Configurator.Configuration,
    configId: string,
    groupId: string,
    owner: CommonConfigurator.Owner
  ): Configurator.Configuration | undefined {
    if (!configuration || !groupId || configuration.configId !== configId) {
      return undefined;
    }

    const group = this.configuratorUtilsService.getGroupById(
      configuration.groups,
      groupId
    );

    if (!group?.attributes?.length) {
      return undefined;
    }

    return {
      ...configuration,
      owner,
      interactionState: {
        ...configuration.interactionState,
        currentGroup: groupId,
      },
    };
  }

  /**
   * Finds first attribute group with attributes for a configuration (ignores conflict groups per default).
   * If optional parameter 'includeConflicts' is set to true it finds first group with attributes including conflict groups.
   * Throws error if such a group does not exist, as this is an illegal state
   * @param configuration
   * @param includeConflicts (optional) if true it includes also conflict groups in the search
   * @returns Group id
   *
   */
  getFirstGroupWithAttributes(
    configuration: Configurator.Configuration,
    includeConflicts = false
  ): string {
    const id = this.getFirstGroupWithAttributesForList(
      configuration.groups,
      includeConflicts
    );
    if (id) {
      return id;
    } else {
      throw new Error('Configuration does not have any attributes');
    }
  }

  /**
   * Finds first group with attributes in a list of groups. Dependent on 'includeConflicts' parameters it includes conflict groups in the search or it ignores them.
   * @param groups
   * @param includeConflicts set to true in order to include conflict groups in the seach
   * @returns Group id
   */
  protected getFirstGroupWithAttributesForList(
    groups: Configurator.Group[],
    includeConflicts: boolean
  ): string | undefined {
    let groupWithAttributes: Configurator.Group | undefined;
    if (
      includeConflicts &&
      groups.length > 0 &&
      groups[0].groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP
    ) {
      //check if conflicts exist and try to return first conflict group with attributes
      groupWithAttributes = groups[0].subGroups
        .filter(
          (currentGroup) =>
            currentGroup.attributes && currentGroup.attributes.length > 0
        )
        .shift();
    }
    groupWithAttributes ??= groups
      .filter(
        (currentGroup) =>
          currentGroup.attributes &&
          currentGroup.attributes.length > 0 &&
          currentGroup.groupType !== Configurator.GroupType.CONFLICT_GROUP
      )
      .shift();
    let id: string | undefined;
    if (groupWithAttributes) {
      id = groupWithAttributes.id;
    } else {
      id = groups
        .filter(
          (currentGroup) =>
            currentGroup.subGroups && currentGroup.subGroups.length > 0
        )
        .flatMap((currentGroup) =>
          this.getFirstGroupWithAttributesForList(
            currentGroup.subGroups,
            includeConflicts
          )
        )
        .filter((groupId) => groupId) //Filter undefined strings
        .shift();
    }
    return id;
  }
}
