import { PointOfService } from '@spartacus/core';
export declare enum StoreFinderOutlets {
    PREFERRED_STORE = "cx-pick-up-in-store-make-my-store"
}
export interface StoreEntities {
    pointOfServices?: Array<PointOfService>;
}
