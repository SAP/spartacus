import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';

/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorUtilsService {
  /**
   * Determines the direct parent group for an attribute group
   * @param groups List of groups where we search for parent
   * @param group If already part of groups, no further search is needed, and we return the provided parent group
   * @param parentGroup Optional.
   * @returns Parent group. Might be null
   */
  getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group = null
  ): Configurator.Group {
    if (groups.includes(group)) {
      return parentGroup;
    }

    return groups
      .map((currentGroup) =>
        this.getParentGroup(currentGroup.subGroups, group, currentGroup)
      )
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  getGroupById(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group {
    const currentGroup = groups.find((group) => group.id === groupId);
    if (currentGroup) {
      return currentGroup;
    }

    return groups
      .map((group) => this.getGroupById(group.subGroups, groupId))
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }

  isConfigurationCreated(configuration: Configurator.Configuration): boolean {
    const configId: String = configuration?.configId;
    return (
      configId !== undefined &&
      configId.length !== 0 &&
      (configuration?.flatGroups !== undefined ||
        configuration?.overview !== undefined)
    );
  }

  createConfigurationExtract(
    changedAttribute: Configurator.Attribute,
    configuration: Configurator.Configuration,
    updateType?: Configurator.UpdateType
  ): Configurator.Configuration {
    if (!updateType) {
      updateType = Configurator.UpdateType.ATTRIBUTE;
    }
    const newConfiguration: Configurator.Configuration = {
      configId: configuration.configId,
      groups: [],
      interactionState: {},
      owner: configuration.owner,
      productCode: configuration.productCode,
      updateType,
    };

    const groupPath: Configurator.Group[] = [];

    this.buildGroupPath(
      changedAttribute.groupId,
      configuration.groups,
      groupPath
    );

    const groupPathLength = groupPath.length;

    if (groupPathLength === 0) {
      throw new Error(
        'At this point we expect that group is available in the configuration: ' +
          changedAttribute.groupId +
          ', ' +
          JSON.stringify(configuration.groups.map((cGroup) => cGroup.id))
      );
    }

    let currentGroupInExtract: Configurator.Group = this.buildGroupForExtract(
      groupPath[groupPathLength - 1]
    );

    let currentLeafGroupInExtract: Configurator.Group = currentGroupInExtract;

    newConfiguration.groups.push(currentGroupInExtract);

    for (let index = groupPath.length - 1; index > 0; index--) {
      currentLeafGroupInExtract = this.buildGroupForExtract(
        groupPath[index - 1]
      );
      currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
      currentGroupInExtract = currentLeafGroupInExtract;
    }

    currentLeafGroupInExtract.attributes = [changedAttribute];
    return newConfiguration;
  }

  buildGroupPath(
    groupId: string,
    groupList: Configurator.Group[],
    groupPath: Configurator.Group[]
  ): boolean {
    let haveFoundGroup = false;
    const group: Configurator.Group = groupList.find(
      (currentGroup) => currentGroup.id === groupId
    );

    if (group) {
      groupPath.push(group);
      haveFoundGroup = true;
    } else {
      groupList
        .filter((currentGroup) => currentGroup.subGroups)
        .forEach((currentGroup) => {
          if (this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
            groupPath.push(currentGroup);
            haveFoundGroup = true;
          }
        });
    }
    return haveFoundGroup;
  }
  protected buildGroupForExtract(
    group: Configurator.Group
  ): Configurator.Group {
    const changedGroup: Configurator.Group = {
      groupType: group.groupType,
      id: group.id,
    };
    return changedGroup;
  }
}
