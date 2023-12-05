import { AbstractType, Type } from '@angular/core';
import { CxEvent } from '@spartacus/core';
import { TmsCollector } from '../model/tms.model';
import * as i0 from "@angular/core";
/**
 * Collector configuration
 */
export interface TmsCollectorConfig {
    /** Should be enabled in development mode only */
    debug?: boolean;
    /**
     * The name for the data layer object.
     */
    dataLayerProperty?: string;
    /**
     * Events to send to the configured TMS.
     */
    events?: AbstractType<CxEvent>[];
    /**
     * The collector service implementation.
     */
    collector?: Type<TmsCollector>;
}
export interface TmsCollectors {
    [tms: string]: TmsCollectorConfig | undefined;
}
/**
 * TMS configuration
 */
export declare abstract class TmsConfig {
    /**
     * Tag manager config
     */
    tagManager?: TmsCollectors;
    static ɵfac: i0.ɵɵFactoryDeclaration<TmsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TmsConfig>;
}
declare module '@spartacus/core' {
    interface Config extends TmsConfig {
    }
}
