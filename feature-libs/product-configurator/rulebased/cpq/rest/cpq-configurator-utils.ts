/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Configurator } from '@spartacus/product-configurator/rulebased';

interface CpqUpdateInformation {
  standardAttributeCode: string;
  tabId: string;
  rowId?: string;
}
export class CpqConfiguratorUtils {
  /**
   * Collects information that we need to fire a CPQ update
   *
   * @param attribute - Configurator attribute
   * @returns Update information
   */
  static getUpdateInformation(
    attribute: Configurator.Attribute
  ): CpqUpdateInformation {
    //attribute code cannot be made mandatory because of VC,
    //but in the CPQ context it is mandatory. The same is true of the group id

    const attributeCode = attribute.attrCode;
    const groupId = attribute.groupId;
    if (attributeCode && groupId) {
      return {
        standardAttributeCode: attributeCode.toString(),
        tabId: CpqConfiguratorUtils.getTabId(groupId),
        rowId: attribute.containerRowId,
      };
    } else {
      throw new Error(
        'Attribute code of group id not present: ' + JSON.stringify(attribute)
      );
    }
  }
  /**
   * Extracts the CPQ tab ID from a configurator group ID.
   *
   * Tabs of a nested (container row) configuration carry a group ID that is
   * prefixed with their row group ID, because CPQ numbers the tabs of every
   * configuration independently. Only the trailing CPQ tab ID must be sent to
   * the backend.
   *
   * @param groupId - Configurator group ID
   * @returns CPQ tab ID
   */
  static getTabId(groupId: string): string {
    return groupId.startsWith(`${Configurator.ContainerRowGroupIdPrefix}@`)
      ? groupId.substring(groupId.lastIndexOf('@') + 1)
      : groupId;
  }

  /**
   * Finds first changed attribute
   *
   * Walks the first-child group path because configuration extracts for nested
   * container-row attributes put the change on a leaf group, not on the root.
   *
   * @param source - Configuration
   * @returns First attribute of the first leaf group along the extract path
   */
  static findFirstChangedAttribute(
    source: Configurator.Configuration
  ): Configurator.Attribute {
    let group: Configurator.Group | undefined = source.groups[0];
    while (group) {
      if (group.attributes && group.attributes.length > 0) {
        return group.attributes[0];
      }
      group = group.subGroups?.[0];
    }
    throw new Error('No changed attributes found');
  }
}
