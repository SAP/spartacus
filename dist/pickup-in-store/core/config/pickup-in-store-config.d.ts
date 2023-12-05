import * as i0 from "@angular/core";
export declare abstract class PickupInStoreConfig {
    pickupInStore?: {
        consentTemplateId?: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupInStoreConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupInStoreConfig>;
}
declare module '@spartacus/core' {
    interface Config extends PickupInStoreConfig {
    }
}
