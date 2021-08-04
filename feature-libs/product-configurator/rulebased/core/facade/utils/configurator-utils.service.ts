import { Injectable } from '@angular/core';
import { StateUtils } from '@spartacus/core';
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
   * @returns Parent group. Might be undefined
   */
  getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup?: Configurator.Group
  ): Configurator.Group | undefined {
    if (groups.includes(group)) {
      return parentGroup;
    }

    return groups
      .map((currentGroup) => {
        return currentGroup.subGroups
          ? this.getParentGroup(currentGroup.subGroups, group, currentGroup)
          : undefined;
      })
      .filter((foundGroup) => foundGroup)
      .pop();
  }
  /**
   * Finds group identified by its ID, and ensures that we always get a valid group.
   * If nothing is found in the configuration group list, this methods returns the first group.
   *
   * The exceptional case can happen if e.g. an edit in a conflict was done that
   * resolved the conflict, or if a group vanished due to object dependencies.
   * @param {Configurator.Group[]} groups - List of groups
   * @param groupId Group id
   * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise first group
   */
  getGroupById(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group {
    const currentGroup = groups.find((group) => group.id === groupId);
    if (currentGroup) {
      return currentGroup;
    }
    const groupFound = this.getGroupFromSubGroups(groups, groupId);
    return groupFound ? groupFound : groups[0];
  }

  /**
   * Finds group identified by its ID. If nothing is found, this
   * methods returns undefined
   * @param {Configurator.Group[]} groups - List of groups
   * @param groupId Group id
   * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise undefined
   */
  getOptionalGroupById(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group | undefined {
    const currentGroup = groups.find((group) => group.id === groupId);
    return currentGroup
      ? currentGroup
      : this.getGroupFromSubGroups(groups, groupId);
  }

  protected getGroupByIdIfPresent(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group | undefined {
    const currentGroup = groups.find((group) => group.id === groupId);
    if (currentGroup) {
      return currentGroup;
    }

    return this.getGroupFromSubGroups(groups, groupId);
  }

  protected getGroupFromSubGroups(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group | undefined {
    const groupFound = groups
      .map((group) => {
        return group.subGroups
          ? this.getGroupByIdIfPresent(group.subGroups, groupId)
          : undefined;
      })
      .filter((foundGroup) => foundGroup)
      .pop();
    return groupFound;
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }

  isConfigurationCreated(configuration?: Configurator.Configuration): boolean {
    const configId = configuration?.configId;
    return (
      configId !== undefined &&
      configId.length !== 0 &&
      configuration !== undefined &&
      (configuration.flatGroups.length > 0 ||
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
      flatGroups: [],
      interactionState: {},
      owner: configuration.owner,
      productCode: configuration.productCode,
      updateType,
    };

    const groupPath: Configurator.Group[] = [];

    if (changedAttribute.groupId) {
      this.buildGroupPath(
        changedAttribute.groupId,
        configuration.groups,
        groupPath
      );
    } else {
      throw Error('GroupId must be available at attribute level during update');
    }

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
    const group: Configurator.Group | undefined = groupList.find(
      (currentGroup) => currentGroup.id === groupId
    );

    if (group) {
      groupPath.push(group);
      haveFoundGroup = true;
    } else {
      groupList
        .filter((currentGroup) => currentGroup.subGroups)
        .forEach((currentGroup) => {
          if (
            currentGroup.subGroups &&
            this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)
          ) {
            groupPath.push(currentGroup);
            haveFoundGroup = true;
          }
        });
    }
    return haveFoundGroup;
  }
  /**
   * Retrieves the configuration from state, and throws an error in case the configuration is
   * not available
   * @param configurationState Process loader state containing product configuration
   * @returns The actual product configuration
   */
  getConfigurationFromState(
    configurationState: StateUtils.ProcessesLoaderState<Configurator.Configuration>
  ): Configurator.Configuration {
    const configuration = configurationState.value;
    if (configuration) {
      return configuration;
    } else {
      throw new Error('Configuration must be defined at this point');
    }
  }

  protected buildGroupForExtract(
    group: Configurator.Group
  ): Configurator.Group {
    const changedGroup: Configurator.Group = {
      groupType: group.groupType,
      id: group.id,
      subGroups: [],
    };
    return changedGroup;
  }
}
