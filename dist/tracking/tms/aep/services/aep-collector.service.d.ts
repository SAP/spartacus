import { CxEvent, ScriptLoader } from '@spartacus/core';
import { TmsCollector, TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { AepCollectorConfig } from '../config/default-aep.config';
import * as i0 from "@angular/core";
/**
 * Default Adobe Experience Platform Launch collector.
 */
export declare class AepCollectorService implements TmsCollector {
    protected scriptLoader: ScriptLoader;
    constructor(scriptLoader: ScriptLoader);
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `digitalData`
     */
    init(config: AepCollectorConfig, windowObject: WindowObject): void;
    pushEvent<T extends CxEvent>(config: TmsCollectorConfig, windowObject: WindowObject, event: T | any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AepCollectorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AepCollectorService>;
}
