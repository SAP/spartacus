import { PointOfServiceNames } from '@spartacus/pickup-in-store/root';
export declare const LOAD_DEFAULT_POINT_OF_SERVICE = "[Default Point Of Service] Load Default Point Of Service";
export declare const LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS = "[Default Point Of Service] Load Default Point Of Service Success";
export declare const SET_DEFAULT_POINT_OF_SERVICE = "[Default Point Of Service] Set Default Point Of Service";
export declare const LoadDefaultPointOfService: import("@ngrx/store").ActionCreator<"[Default Point Of Service] Load Default Point Of Service", () => import("@ngrx/store/src/models").TypedAction<"[Default Point Of Service] Load Default Point Of Service">>;
export declare const LoadDefaultPointOfServiceSuccess: import("@ngrx/store").ActionCreator<"[Default Point Of Service] Load Default Point Of Service Success", (props: {
    payload: PointOfServiceNames;
}) => {
    payload: PointOfServiceNames;
} & import("@ngrx/store/src/models").TypedAction<"[Default Point Of Service] Load Default Point Of Service Success">>;
export declare const SetDefaultPointOfService: import("@ngrx/store").ActionCreator<"[Default Point Of Service] Set Default Point Of Service", (props: {
    payload: PointOfServiceNames;
}) => {
    payload: PointOfServiceNames;
} & import("@ngrx/store/src/models").TypedAction<"[Default Point Of Service] Set Default Point Of Service">>;
