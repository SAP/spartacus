import { Converter, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorNormalizer implements Converter<Cpq.Configuration, Configurator.Configuration> {
    protected cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService;
    protected translation: TranslationService;
    constructor(cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService, translation: TranslationService);
    convert(source: Cpq.Configuration, target?: Configurator.Configuration): Configurator.Configuration;
    protected generateTotalNumberOfIssues(source: Cpq.Configuration): number;
    protected generateWarningMessages(source: Cpq.Configuration): string[];
    protected generateErrorMessages(source: Cpq.Configuration): string[];
    protected convertGroup(source: Cpq.Tab, sourceAttributes: Cpq.Attribute[], currency: string, groupList: Configurator.Group[], flatGroupList: Configurator.Group[]): void;
    protected convertGenericGroup(sourceAttributes: Cpq.Attribute[], incompleteAttributes: string[], currency: string, groupList: Configurator.Group[], flatGroupList: Configurator.Group[]): void;
    protected convertAttribute(sourceAttribute: Cpq.Attribute, groupId: number, currency: string, attributeList: Configurator.Attribute[]): void;
    /**
     * In case the CPQ API is called via REST, the attribute id is returned using field name pA_ID.
     * If we call CPQ via OCC the attribute is mapped to field name PA_ID.
     * This can't be changed easily and is related to the non-standard conform name 'pA_ID';
     * @param sourceAttribute source attribute
     * @returns value of PA_ID or pA_ID, depending on which field is filled.
     */
    protected mapPAId(sourceAttribute: Cpq.Attribute): string;
    protected setSelectedSingleValue(attribute: Configurator.Attribute): void;
    protected convertValueDisplay(sourceValue: Cpq.Value, sourceAttribute: Cpq.Attribute, value: Configurator.Value): void;
    protected convertValueCode(valueCode: number): string;
    protected convertValue(sourceValue: Cpq.Value, sourceAttribute: Cpq.Attribute, currency: string, values: Configurator.Value[]): void;
    protected convertAttributeType(sourceAttribute: Cpq.Attribute): Configurator.UiType;
    protected findUiTypeFromDisplayType(displayAs: number | undefined, displayAsProduct: boolean, sourceAttribute: Cpq.Attribute): Configurator.UiType;
    protected compileAttributeIncomplete(attribute: Configurator.Attribute): void;
    protected hasValueToBeIgnored(attribute: Cpq.Attribute, value: Cpq.Value): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorNormalizer>;
}
