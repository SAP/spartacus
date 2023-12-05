import { WindowRef } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * A service to wrap the browser's current position API.
 */
export declare class CurrentLocationService {
    protected windowRef: WindowRef;
    constructor(windowRef: WindowRef);
    /**
     * Obtains the user's current position for the browser and calls the provided callback with it.
     *
     * @param successCallback - A callback to be called with the current location.
     * @param errorCallback - A callback to be called with the error.
     * @param options - Options for the current position API.
     */
    getCurrentLocation(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentLocationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentLocationService>;
}
