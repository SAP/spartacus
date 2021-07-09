import { Configurator } from '../model/configurator.model';

export class ConfiguratorStateUtils {
  static updateValuePrices(
    groups: Configurator.Group[],
    attributeSupplements?: Configurator.AttributeSupplement[]
  ) {
    attributeSupplements?.forEach((attributeSupplement) => {
      const attributeName = ConfiguratorStateUtils.getAttributeName(
        attributeSupplement.attributeUiKey
      );
      console.log('VPR attributeName: ' + attributeName);
      const attributeUiKey = ConfiguratorStateUtils.getKey(
        attributeSupplement?.attributeUiKey,
        attributeName
      );
      console.log('VPR attributeUiKey: ' + attributeUiKey);
      ConfiguratorStateUtils.updateValuePrice(
        groups,
        attributeUiKey,
        attributeName,
        attributeSupplement
      );
    });
  }

  static updateValuePrice(
    groups: Configurator.Group[],
    attributeUiKey: string,
    attributeName: string,
    attributeSupplement: Configurator.AttributeSupplement
  ) {
    const group = ConfiguratorStateUtils.getGroup(groups, attributeUiKey);
    if (group) {
      console.log('VPR found group ID: ' + group?.id);
      const attribute: Configurator.Attribute = ConfiguratorStateUtils.getAttribute(
        group.attributes,
        attributeName
      );
      if (attribute) {
        console.log('VPR found attribute name: ' + attribute.name);
        attributeSupplement?.valueSupplements?.forEach((valueSupplement) => {
          let value = ConfiguratorStateUtils.getValue(
            attribute.values,
            valueSupplement?.attributeValueKey
          );
          if (value) {
            console.log('VPR found value code: ' + value.valueCode);
            if (value.valuePrice) {
              console.log('VPR found existing value price: ' + value.valueCode);
              /**
            console.log(
              'writable: ' +
              Object.getOwnPropertyDescriptor(value, 'valuePrice')?.writable
            );
             */
              value.valuePrice = valueSupplement?.priceValue;
            } else {
              console.log(
                'VPR value price will be taken from supplement: ' +
                  JSON.stringify(valueSupplement?.priceValue)
              );
              value.valuePrice = valueSupplement.priceValue;

              //attribute.values?.push(newValue);
              //value = newValue;
            }

            //console.log('VPR value object: ' + JSON.stringify(value));
          }
        });
      }
      ConfiguratorStateUtils.updateValuePrice(
        group?.subGroups,
        attributeUiKey,
        attributeName,
        attributeSupplement
      );
    }
  }

  static getAttributeName(attributeUiKey: string): string {
    const lastIndexOf = attributeUiKey.lastIndexOf('@');
    return attributeUiKey.slice(lastIndexOf + 1);
  }

  static getKey(key: string, name: string): string {
    return key.replace('@' + name, '');
  }

  static deepCopy<T>(target: T): T {
    if (!target) {
      return target;
    }
    if (typeof target === 'object') {
      if (target instanceof Array) {
        const resultArray = [] as any[];
        if (((target as any) as any[]).length > 0) {
          for (const arrayMember of (target as any) as any[]) {
            resultArray.push(ConfiguratorStateUtils.deepCopy(arrayMember));
          }
        }
        return (resultArray as any) as T;
      } else {
        const targetKeys = Object.keys(target);
        const resultObject = {} as { [key: string]: any };
        if (targetKeys.length > 0) {
          for (const key of targetKeys) {
            resultObject[key] = ConfiguratorStateUtils.deepCopy(
              (target as { [key: string]: any })[key]
            );
          }
        }
        return resultObject as T;
      }
    }
    // target is atomic
    return target;
  }

  static getGroup(
    groups: Configurator.Group[],
    attributeUiKey: string
  ): Configurator.Group | undefined {
    return groups.find(
      (group) =>
        group?.id.indexOf(attributeUiKey) !== -1 ||
        attributeUiKey.indexOf(group?.id) !== -1
    );
  }

  static getAttribute(
    attributes: Configurator.Attribute[] | undefined,
    attributeName: string
  ): Configurator.Attribute {
    const attribute = attributes?.find(
      (attribute) => attribute.name === attributeName
    );
    if (attribute) {
      return attribute;
    } else {
      throw new Error('Attribute not found: ' + attributeName);
    }
  }

  static getValue(
    values: Configurator.Value[] | undefined,
    valueCode: string
  ): Configurator.Value {
    const value = values?.find((value) => value?.valueCode === valueCode);
    if (value) {
      return value;
    } else {
      throw new Error('Value not found: ' + valueCode);
    }
  }
}
