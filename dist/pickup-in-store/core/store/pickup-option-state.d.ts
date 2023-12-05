import { PickupOption } from '@spartacus/pickup-in-store/root';
export declare const PICKUP_OPTION_FEATURE = "pickup-option";
export interface StateWithPickupOption {
    [PICKUP_OPTION_FEATURE]: PickupOptionState;
}
export type EntryPickupOption = {
    entryNumber: number;
    pickupOption: PickupOption;
};
export interface PickupOptionState {
    pageContext: string;
    pickupOption: EntryPickupOption[];
}
