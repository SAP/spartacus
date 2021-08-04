import { Configurator } from '../model/configurator.model';

export class ConfiguratorStateUtils {
  static mergeGroupsWithSupplements(
    groups: Configurator.Group[],
    attributeSupplements: Configurator.AttributeSupplement[]
  ): Configurator.Group[] {
    const mergedGroups: Configurator.Group[] = [];
    groups.forEach((group) =>
      mergedGroups.push(
        this.mergeGroupWithSupplements(group, attributeSupplements)
      )
    );
    return mergedGroups;
  }

  protected static mergeGroupWithSupplements(
    group: Configurator.Group,
    attributeSupplements: Configurator.AttributeSupplement[]
  ): Configurator.Group {
    if (this.isTargetGroup(group, attributeSupplements)) {
      return this.mergeTargetGroupWithSupplements(group, attributeSupplements);
    } else {
      return {
        ...group,
        subGroups: this.mergeGroupsWithSupplements(
          group.subGroups,
          attributeSupplements
        ),
      };
    }
  }

  protected static mergeTargetGroupWithSupplements(
    group: Configurator.Group,
    attributeSupplements: Configurator.AttributeSupplement[]
  ): Configurator.Group {
    let mergedAttributes = group.attributes;

    attributeSupplements.forEach((attributeSupplement) => {
      const attributeName = ConfiguratorStateUtils.getAttributeName(
        attributeSupplement.attributeUiKey
      );
      mergedAttributes = this.updateArrayElement(
        mergedAttributes,
        (attribute) => attribute.name === attributeName,
        (attribute) => {
          return {
            ...attribute,
            values: this.mergeValuesWithSupplement(
              attribute.values,
              attributeSupplement
            ),
          };
        }
      );
    });

    return {
      ...group,
      attributes: mergedAttributes,
    };
  }

  protected static mergeValuesWithSupplement(
    attributeValues: Configurator.Value[] | undefined,
    attributeSupplement: Configurator.AttributeSupplement
  ): Configurator.Value[] | undefined {
    let mergedValues = attributeValues;

    attributeSupplement.valueSupplements.forEach((valueSupplement) => {
      mergedValues = this.updateArrayElement(
        mergedValues,
        (value) => value.valueCode === valueSupplement.attributeValueKey,
        (value) => {
          return {
            ...value,
            valuePrice: valueSupplement.priceValue,
          };
        }
      );
    });

    return mergedValues;
  }

  protected static isTargetGroup(
    group: Configurator.Group,
    attributeSupplements: Configurator.AttributeSupplement[]
  ): boolean {
    const firstSupplement = attributeSupplements[0];
    if (firstSupplement) {
      const attributeName = ConfiguratorStateUtils.getAttributeName(
        firstSupplement.attributeUiKey
      );
      const attributeUiKey = ConfiguratorStateUtils.getKey(
        firstSupplement.attributeUiKey,
        attributeName
      );
      return group.id.indexOf(attributeUiKey) >= 0;
    } else {
      // that should never happen, as we merge existing groups
      // with supplements only if supplements are available
      throw new Error('We expect at least one attribute supplement');
    }
  }

  /**
   * It searches in the given `array` for the first element satisfying the `predicate` function.
   * Then it returns a fresh array, where this element is replaced with the result of the `projection` function.
   *
   * If no element of the `array` satisfied the `predicate`, it returns the original `array`.
   */
  protected static updateArrayElement<T>(
    array: T[] | undefined,
    predicate: (value: T, index: number, obj: T[]) => unknown,
    projection: (value: T, index: number) => T
  ): T[] | undefined {
    if (array) {
      const index = array.findIndex(predicate);
      if (index === -1) {
        return array;
      }
      const value = array[index];
      const newValue = projection(value, index);
      const newArray = [...array];
      newArray[index] = newValue;
      return newArray;
    }
  }

  protected static getAttributeName(attributeUiKey: string): string {
    const lastIndexOf = attributeUiKey.lastIndexOf('@');
    return attributeUiKey.slice(lastIndexOf + 1);
  }

  protected static getKey(key: string, name: string): string {
    return key.replace('@' + name, '');
  }
}
