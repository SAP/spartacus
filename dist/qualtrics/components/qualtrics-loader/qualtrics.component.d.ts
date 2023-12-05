import { LoggerService } from '@spartacus/core';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';
import * as i0 from "@angular/core";
/**
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
export declare class QualtricsComponent {
    protected qualtricsLoader: QualtricsLoaderService;
    protected config: QualtricsConfig;
    protected logger: LoggerService;
    constructor(qualtricsLoader: QualtricsLoaderService, config: QualtricsConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<QualtricsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QualtricsComponent, "cx-qualtrics", never, {}, {}, never, never, false, never>;
}
