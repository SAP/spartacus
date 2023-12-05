export declare const ADD_BROWSER_LOCATION = "[Pickup Locations] Add Browser Location";
export type AddBrowserLocationProps = {
    longitude: number;
    latitude: number;
};
export declare const AddBrowserLocation: import("@ngrx/store").ActionCreator<"[Pickup Locations] Add Browser Location", (props: {
    payload: AddBrowserLocationProps;
}) => {
    payload: AddBrowserLocationProps;
} & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Add Browser Location">>;
