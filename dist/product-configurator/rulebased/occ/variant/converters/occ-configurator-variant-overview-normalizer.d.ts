import { Converter, ConverterService, TranslationService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantOverviewNormalizer implements Converter<OccConfigurator.Overview, Configurator.Overview> {
    protected translation: TranslationService;
    protected converterService: ConverterService;
    constructor(translation: TranslationService, converterService: ConverterService);
    convert(source: OccConfigurator.Overview, target?: Configurator.Overview): Configurator.Overview;
    convertGroup(source: OccConfigurator.GroupOverview): Configurator.GroupOverview[];
    setGeneralDescription(group: Configurator.GroupOverview): void;
    protected setIssueCounters(target: Configurator.Overview, source: OccConfigurator.Overview): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantOverviewNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantOverviewNormalizer>;
}
