import { Converter, ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from '../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantOverviewSerializer implements Converter<Configurator.Overview, OccConfigurator.Overview> {
    protected converterService: ConverterService;
    constructor(converterService: ConverterService);
    convert(source: Configurator.Overview, target?: OccConfigurator.Overview): OccConfigurator.Overview;
    protected convertAttributeFilters(attributeFilters?: Configurator.OverviewFilter[]): OccConfigurator.OverviewFilter[];
    protected convertGroupFilters(groupFilters?: string[]): OccConfigurator.OverviewFilter[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantOverviewSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantOverviewSerializer>;
}
