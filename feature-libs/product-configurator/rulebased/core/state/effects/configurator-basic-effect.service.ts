import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';

/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorBasicEffectService {
  /**
   * Finds first group with attributes for a configuration. Throws error if such a group does not exist,
   * as this is an illegal state
   * @param configuration
   * @returns Group id
   */
  getFirstGroupWithAttributes(
    configuration: Configurator.Configuration
  ): string {
    const id = this.getFirstGroupWithAttributesForList(configuration.groups);
    if (id) {
      return id;
    } else {
      throw new Error('Configuration does not have any attributes');
    }
  }
  /**
   * Finds first group with attributes in a list of groups
   * @param groups
   * @returns Group or undefined if such a group does not exist
   */
  protected getFirstGroupWithAttributesForList(
    groups: Configurator.Group[]
  ): string | undefined {
    const groupWithAttributes: Configurator.Group | undefined = groups
      .filter(
        (currentGroup) =>
          currentGroup.attributes && currentGroup.attributes.length > 0
      )
      .pop();
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
          this.getFirstGroupWithAttributesForList(currentGroup.subGroups)
        )
        .filter((groupId) => groupId) //Filter undefined strings
        .pop();
    }
    return id;
  }
}
