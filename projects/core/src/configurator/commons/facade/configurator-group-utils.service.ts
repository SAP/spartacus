import { Injectable } from '@angular/core';
import { Configurator } from '../../../model';

/**
 * Service for handling general group utils
 */
@Injectable()
export class ConfiguratorGroupUtilsService {
  constructor() {}

  findParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): Configurator.Group {
    if (groups.includes(group)) {
      return parentGroup;
    }

    return groups
      .map((currentGroup) =>
        this.findParentGroup(currentGroup.subGroups, group, currentGroup)
      )
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  findCurrentGroup(
    groups: Configurator.Group[],
    groupId: String
  ): Configurator.Group {
    const currentGroup = groups.find((group) => group.id === groupId);
    if (currentGroup) {
      return currentGroup;
    }

    return groups
      .map((group) => this.findCurrentGroup(group.subGroups, groupId))
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  getGroup(groups: Configurator.Group[], groupId: string): Configurator.Group {
    if (groups.find((value) => value.id === groupId)) {
      return groups.find((value) => value.id === groupId);
    }

    return groups
      .map((currentGroup) => this.getGroup(currentGroup.subGroups, groupId))
      .filter((foundGroup) => foundGroup)
      .pop();
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }
}
