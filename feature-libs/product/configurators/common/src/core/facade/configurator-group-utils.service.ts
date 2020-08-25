import { Injectable } from '@angular/core';
import { Configurator } from '@spartacus/core';

/**
 * Service for handling general group utils
 */
@Injectable()
export class ConfiguratorGroupUtilsService {
  constructor() {}

  getParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group
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
}
