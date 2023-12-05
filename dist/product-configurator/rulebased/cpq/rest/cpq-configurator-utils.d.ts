import { Configurator } from '@spartacus/product-configurator/rulebased';
interface CpqUpdateInformation {
    standardAttributeCode: string;
    tabId: string;
}
export declare class CpqConfiguratorUtils {
    /**
     * Collects information that we need to fire a CPQ update
     *
     * @param {Configurator.Attribute} attribute Configurator attribute
     * @returns {CpqUpdateInformation} Update information
     */
    static getUpdateInformation(attribute: Configurator.Attribute): CpqUpdateInformation;
    /**
     * Finds first changed attribute
     * @param {Configurator.Configuration} source Configuration
     * @returns {Configurator.Attribute} First attribute of first group
     */
    static findFirstChangedAttribute(source: Configurator.Configuration): Configurator.Attribute;
}
export {};
