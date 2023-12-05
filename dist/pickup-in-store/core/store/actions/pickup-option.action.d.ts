import { PickupOption } from '@spartacus/pickup-in-store/root';
export declare const SetPickupOption: import("@ngrx/store").ActionCreator<"[PickupOption] Set Pickup Option", (props: {
    payload: {
        entryNumber: number;
        pickupOption: PickupOption;
    };
}) => {
    payload: {
        entryNumber: number;
        pickupOption: PickupOption;
    };
} & import("@ngrx/store/src/models").TypedAction<"[PickupOption] Set Pickup Option">>;
export declare const RemovePickupOption: import("@ngrx/store").ActionCreator<"[PickupOption] Remove Pickup Option", (props: {
    payload: {
        entryNumber: number;
    };
}) => {
    payload: {
        entryNumber: number;
    };
} & import("@ngrx/store/src/models").TypedAction<"[PickupOption] Remove Pickup Option">>;
export declare const RemoveAllPickupOptions: import("@ngrx/store").ActionCreator<"[PickupOption] Remove All Pickup Option", () => import("@ngrx/store/src/models").TypedAction<"[PickupOption] Remove All Pickup Option">>;
export declare const SetPageContext: import("@ngrx/store").ActionCreator<"[PickupOption] Set Page Context", (props: {
    payload: {
        pageContext: string;
    };
}) => {
    payload: {
        pageContext: string;
    };
} & import("@ngrx/store/src/models").TypedAction<"[PickupOption] Set Page Context">>;
