import { CxEvent } from '@spartacus/core';
/**
 * Indicates the failure during the loading of the user token.
 */
export declare class CdcLoadUserTokenFailEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CdcLoadUserTokenFailEvent";
}
export declare class CdcReConsentEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CdcReConsentEvent";
    user: string;
    password: string;
    consentIds: string[];
    errorMessage: string;
    regToken: string;
}
