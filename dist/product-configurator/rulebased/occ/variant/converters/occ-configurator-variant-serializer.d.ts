import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantSerializer implements Converter<Configurator.Configuration, OccConfigurator.Configuration> {
    /**
     * @deprecated since 6.2
     */
    static readonly RETRACT_VALUE_CODE = "###RETRACT_VALUE_CODE###";
    convert(source: Configurator.Configuration, target?: OccConfigurator.Configuration): OccConfigurator.Configuration;
    convertGroup(source: Configurator.Group, occGroups: OccConfigurator.Group[]): void;
    protected isRetractValue(attribute: Configurator.Attribute): boolean;
    protected getRetractedValue(attribute: Configurator.Attribute): string | undefined;
    protected retractValue(attribute: Configurator.Attribute, targetAttribute: OccConfigurator.Attribute): void;
    convertAttribute(attribute: Configurator.Attribute, occAttributes: OccConfigurator.Attribute[]): void;
    convertValue(value: Configurator.Value, values: OccConfigurator.Value[]): void;
    convertCharacteristicType(type: Configurator.UiType): OccConfigurator.UiType;
    convertGroupType(groupType: Configurator.GroupType): OccConfigurator.GroupType;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantSerializer>;
}
