import { PointOfService } from '@spartacus/core';
import { AugmentedPointOfService, PickupOption } from '@spartacus/pickup-in-store/root';
export declare const ADD_LOCATION = "[Pickup Locations] Add Location";
export declare const REMOVE_LOCATION = "[Pickup Locations] Remove Location";
export declare const SET_PICKUP_OPTION = "[Pickup Locations] Set Pickup Option";
export declare const GET_STORE_DETAILS = "[Pickup Locations] Get Store Details";
export declare const STORE_DETAILS_SUCCESS = "[Pickup Locations] Get Store Details Success";
export declare const STORE_DETAILS_FAIL = "[Pickup Locations] Get Store Details Fail";
export declare const SET_PICKUP_OPTION_TO_DELIVERY = "[Pickup Locations] Set Pickup Option To Delivery";
export declare const SET_PICKUP_OPTION_TO_DELIVERY_SUCCESS = "[Pickup Locations] Set Pickup Option To Delivery Success";
export declare const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE = "[Pickup Locations] Set Pickup Option To Pickup In Store";
export declare const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS = "[Pickup Locations] Set Pickup Option To Pickup In Store Success";
export declare const CART_RELOAD_SUCCESS = "[Pickup Locations] CART_RELOAD_SUCCESS";
export declare const DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS = "[Pickup Locations CHECKOUT] CHECKOUT_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS";
export type AddLocationProps = {
    payload: {
        productCode: string;
        location: AugmentedPointOfService;
    };
};
export type SetPickupOptionProps = {
    productCode: string;
    pickupOption: PickupOption;
};
/**
 * Add a proposed pickup location for a product code.
 */
export declare const AddLocation: import("@ngrx/store").ActionCreator<"[Pickup Locations] Add Location", (props: AddLocationProps) => AddLocationProps & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Add Location">>;
/**
 * Remove a proposed pickup location for a product code.
 */
export declare const RemoveLocation: import("@ngrx/store").ActionCreator<"[Pickup Locations] Remove Location", (props: {
    payload: string;
}) => {
    payload: string;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Remove Location">>;
/**
 * Set pickup option for a product code.
 */
export declare const SetPickupOption: import("@ngrx/store").ActionCreator<"[Pickup Locations] Set Pickup Option", (props: {
    payload: SetPickupOptionProps;
}) => {
    payload: SetPickupOptionProps;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Set Pickup Option">>;
/**
 * Get Store Details By Id
 */
export declare const GetStoreDetailsById: import("@ngrx/store").ActionCreator<"[Pickup Locations] Get Store Details", (props: {
    payload: string;
}) => {
    payload: string;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Get Store Details">>;
export declare const SetStoreDetailsSuccess: import("@ngrx/store").ActionCreator<"[Pickup Locations] Get Store Details Success", (props: {
    payload: PointOfService;
}) => {
    payload: PointOfService;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Get Store Details Success">>;
export declare const SetStoreDetailsFailure: import("@ngrx/store").ActionCreator<"[Pickup Locations] Get Store Details Fail", (props: {
    payload: any;
}) => {
    payload: any;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Get Store Details Fail">>;
