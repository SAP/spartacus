import { LoggerService, ScriptLoader } from '@spartacus/core';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderService } from '../facade/store-finder.service';
import * as i0 from "@angular/core";
export declare class GoogleMapRendererService {
    protected config: StoreFinderConfig;
    protected storeFinderService: StoreFinderService;
    protected scriptLoader: ScriptLoader;
    private googleMap;
    private markers;
    protected logger: LoggerService;
    constructor(config: StoreFinderConfig, storeFinderService: StoreFinderService, scriptLoader: ScriptLoader);
    /**
     * Renders google map on the given element and draws markers on it.
     * If map already exists it will use an existing map otherwise it will create one
     * @param mapElement HTML element inside of which the map will be displayed
     * @param locations array containign geo data to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    renderMap(mapElement: HTMLElement, locations: any[], selectMarkerHandler?: Function): void;
    /**
     * Centers the map to the given point
     * @param latitute latitude of the new center
     * @param longitude longitude of the new center
     */
    centerMap(latitute: number, longitude: number): void;
    /**
     * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
     * @param locations list of locations
     */
    private defineMapCenter;
    /**
     * Creates google map inside if the given HTML element centered to the given point
     * @param mapElement {@link HTMLElement} inside of which the map will be created
     * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
     */
    private initMap;
    /**
     * Erases the current map's markers and create a new one based on the given locations
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    private createMarkers;
    /**
     * Initialize and draw the map
     * @param mapElement {@link HTMLElement} inside of which the map will be drawn
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    private drawMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<GoogleMapRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GoogleMapRendererService>;
}
