import * as i0 from "@angular/core";
export declare abstract class PersonalizationConfig {
    personalization?: {
        enabled?: boolean;
        httpHeaderName?: {
            id: string;
            timestamp: string;
        };
        context?: {
            slotPosition: string;
            componentId: string;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PersonalizationConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PersonalizationConfig>;
}
declare module '@spartacus/core' {
    interface Config extends PersonalizationConfig {
    }
}
