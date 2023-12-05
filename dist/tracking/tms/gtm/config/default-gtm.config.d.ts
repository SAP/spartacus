import { TmsCollectorConfig, TmsConfig } from '@spartacus/tracking/tms/core';
export interface GtmCollectorConfig extends TmsCollectorConfig {
    gtmId?: string;
}
declare module '@spartacus/tracking/tms/core' {
    interface TmsCollectors {
        gtm?: GtmCollectorConfig;
    }
}
export declare const defaultGoogleTagManagerConfig: TmsConfig;
