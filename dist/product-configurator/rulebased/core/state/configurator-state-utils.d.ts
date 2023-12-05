import { Configurator } from '../model/configurator.model';
export declare class ConfiguratorStateUtils {
    static mergeGroupsWithSupplements(groups: Configurator.Group[], attributeSupplements: Configurator.AttributeSupplement[]): Configurator.Group[];
    protected static mergeGroupWithSupplements(group: Configurator.Group, attributeSupplements: Configurator.AttributeSupplement[]): Configurator.Group;
    protected static mergeTargetGroupWithSupplements(group: Configurator.Group, attributeSupplements: Configurator.AttributeSupplement[]): Configurator.Group;
    protected static mergeValuesWithSupplement(attributeValues: Configurator.Value[] | undefined, attributeSupplement: Configurator.AttributeSupplement): Configurator.Value[] | undefined;
    protected static isTargetGroup(group: Configurator.Group, attributeSupplements: Configurator.AttributeSupplement[]): boolean;
    /**
     * It searches in the given `array` for the first element satisfying the `predicate` function.
     * Then it returns a fresh array, where this element is replaced with the result of the `projection` function.
     *
     * If no element of the `array` satisfied the `predicate`, it returns the original `array`.
     */
    protected static updateArrayElement<T>(array: T[] | undefined, predicate: (value: T, index: number, obj: T[]) => unknown, projection: (value: T, index: number) => T): T[] | undefined;
    protected static getAttributeName(attributeUiKey: string): string;
    protected static getKey(key: string, name: string): string;
}
