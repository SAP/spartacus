/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';

/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorBasicEffectService {
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
    if (groupWithAttributes === undefined) {
      groupWithAttributes = groups
        .filter(
          (currentGroup) =>
            currentGroup.attributes &&
            currentGroup.attributes.length > 0 &&
            currentGroup.groupType !== Configurator.GroupType.CONFLICT_GROUP
        )
        .shift();
    }
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
