import { Configurator } from '@spartacus/product-configurator/rulebased';

interface CpqUpdateInformation {
  standardAttributeCode: string;
  tabId: string;
}
export class CpqConfiguratorUtils {
  /**
   * Collects information that we need to fire a CPQ update
   * @param attribute
   * @returns
   */
  static getUpdateInformation(
    attribute: Configurator.Attribute
  ): CpqUpdateInformation {
    //attribute code cannot be made mandatory because of VC,
    //but in the CPQ context it is mandatory. The same is true of the group id
    //TODO CHHI add tests
    const attributeCode = attribute.attrCode;
    const groupId = attribute.groupId;
    if (attributeCode && groupId) {
      return {
        standardAttributeCode: attributeCode.toString(),
        tabId: groupId,
      };
    } else {
      throw new Error(
        'Attribute code of group id not present: ' + JSON.stringify(attribute)
      );
    }
  }

  static findFirstChangedAttribute(
    source: Configurator.Configuration
  ): Configurator.Attribute {
    const firstGroup: Configurator.Group = source.groups[0];
    if (firstGroup.attributes) {
      return firstGroup.attributes[0];
    } else {
      throw new Error('No changed attributes found');
    }
  }
}
