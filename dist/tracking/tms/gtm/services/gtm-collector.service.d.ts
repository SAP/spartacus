import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsCollector, TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { GtmCollectorConfig } from '../config/default-gtm.config';
import * as i0 from "@angular/core";
/**
 * Default Google Tag Manager collector.
 */
export declare class GtmCollectorService implements TmsCollector {
    protected winRef: WindowRef;
    constructor(winRef: WindowRef);
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
     */
    init(config: GtmCollectorConfig, windowObject: WindowObject): void;
    pushEvent<T extends CxEvent>(config: TmsCollectorConfig, windowObject: WindowObject, event: T | any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GtmCollectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GtmCollectorService>;
}
