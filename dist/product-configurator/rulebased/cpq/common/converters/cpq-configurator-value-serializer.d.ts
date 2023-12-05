import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorValueSerializer implements Converter<Configurator.Configuration, Cpq.UpdateValue> {
    convert(source: Configurator.Configuration): Cpq.UpdateValue;
    protected convertAttribute(attribute: Configurator.Attribute, configurationId: string): Cpq.UpdateValue;
    protected findFirstChangedValue(attribute: Configurator.Attribute): Configurator.Value;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorValueSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorValueSerializer>;
}
