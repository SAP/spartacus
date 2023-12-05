import { Converter, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorOverviewNormalizer implements Converter<Cpq.Configuration, Configurator.Overview> {
    protected cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService;
    protected translation: TranslationService;
    protected readonly NO_OPTION_SELECTED = 0;
    constructor(cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService, translation: TranslationService);
    convert(source: Cpq.Configuration, target?: Configurator.Overview): Configurator.Overview;
    protected convertTab(tab: Cpq.Tab, currency: string): Configurator.GroupOverview;
    protected convertAttribute(attr: Cpq.Attribute, currency: string): Configurator.AttributeOverview[];
    protected convertAttributeValue(attr: Cpq.Attribute, currency: string): Configurator.AttributeOverview[];
    protected extractValue(valueSelected: Cpq.Value, attr: Cpq.Attribute, currency: string): Configurator.AttributeOverview;
    protected extractValueUserInput(attr: Cpq.Attribute, currency: string): Configurator.AttributeOverview;
    protected calculateTotalNumberOfIssues(source: Cpq.Configuration): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorOverviewNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorOverviewNormalizer>;
}
