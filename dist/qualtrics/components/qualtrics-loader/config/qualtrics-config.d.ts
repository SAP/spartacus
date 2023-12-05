import * as i0 from "@angular/core";
/**
 * Configuration options for the Qualtrics integration, which allows you to
 * specify the qualtrics project and deployment script.
 */
export declare abstract class QualtricsConfig {
    /**
     * Holds the qualtrics integration options.
     */
    qualtrics?: {
        /**
         * Deployment script, loaded from a resource, to integrate the deployment of the qualtrics project.
         * You would typically store the file in the local assets folder.
         *
         */
        scriptSource?: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<QualtricsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QualtricsConfig>;
}
declare module '@spartacus/core' {
    interface Config extends QualtricsConfig {
    }
}
