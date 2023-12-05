import * as i0 from "@angular/core";
export declare abstract class CustomerTicketingConfig {
    customerTicketing?: {
        agentSessionTimer?: {
            startingDelayInSeconds?: number;
        };
        attachmentRestrictions?: {
            maxSize?: number;
            allowedTypes?: string[];
        };
        inputCharactersLimit?: number;
        inputCharactersLimitForSubject?: number;
        listViewPageSize?: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingConfig>;
}
declare module '@spartacus/core' {
    interface Config extends CustomerTicketingConfig {
    }
}
