import { TmsCollectorConfig, TmsConfig } from '@spartacus/tracking/tms/core';
export interface AepCollectorConfig extends TmsCollectorConfig {
    scriptUrl?: string;
}
declare module '@spartacus/tracking/tms/core' {
    interface TmsCollectors {
        aep?: AepCollectorConfig;
    }
}
export declare const defaultAdobeExperiencePlatformConfig: TmsConfig;
