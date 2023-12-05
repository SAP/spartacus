/// <reference types="@types/google.maps" />
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="@types/google.maps" />
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import * as i0 from "@angular/core";
import * as i1 from "../config/store-finder-config";
import * as i2 from "../facade/store-finder.service";
import * as i3 from "@spartacus/core";
export class GoogleMapRendererService {
    constructor(config, storeFinderService, scriptLoader) {
        this.config = config;
        this.storeFinderService = storeFinderService;
        this.scriptLoader = scriptLoader;
        this.googleMap = null;
        this.logger = inject(LoggerService);
    }
    /**
     * Renders google map on the given element and draws markers on it.
     * If map already exists it will use an existing map otherwise it will create one
     * @param mapElement HTML element inside of which the map will be displayed
     * @param locations array containign geo data to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    renderMap(mapElement, locations, selectMarkerHandler) {
        if (this.config.googleMaps?.apiKey) {
            if (Object.entries(locations[Object.keys(locations)[0]]).length > 0) {
                if (this.googleMap === null) {
                    const apiKey = this.config.googleMaps.apiKey === GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG
                        ? ''
                        : this.config.googleMaps.apiKey;
                    this.scriptLoader.embedScript({
                        src: this.config.googleMaps.apiUrl,
                        params: { key: apiKey },
                        attributes: { type: 'text/javascript' },
                        callback: () => {
                            this.drawMap(mapElement, locations, selectMarkerHandler);
                        },
                    });
                }
                else {
                    this.drawMap(mapElement, locations, selectMarkerHandler);
                }
            }
        }
        else {
            if (isDevMode()) {
                this.logger.warn('A Google Maps api key is required in the store finder configuration to display the Google map.');
            }
        }
    }
    /**
     * Centers the map to the given point
     * @param latitute latitude of the new center
     * @param longitude longitude of the new center
     */
    centerMap(latitute, longitude) {
        this.googleMap.panTo({ lat: latitute, lng: longitude });
        this.googleMap.setZoom(this.config.googleMaps.selectedMarkerScale);
    }
    /**
     * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
     * @param locations list of locations
     */
    defineMapCenter(locations) {
        return new google.maps.LatLng(this.storeFinderService.getStoreLatitude(locations[0]), this.storeFinderService.getStoreLongitude(locations[0]));
    }
    /**
     * Creates google map inside if the given HTML element centered to the given point
     * @param mapElement {@link HTMLElement} inside of which the map will be created
     * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
     */
    initMap(mapElement, mapCenter) {
        const gestureOption = 'greedy';
        const mapProp = {
            center: mapCenter,
            zoom: this.config.googleMaps.scale,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: gestureOption,
        };
        this.googleMap = new google.maps.Map(mapElement, mapProp);
    }
    /**
     * Erases the current map's markers and create a new one based on the given locations
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    createMarkers(locations, selectMarkerHandler) {
        this.markers = [];
        locations.forEach((element, index) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.storeFinderService.getStoreLatitude(element), this.storeFinderService.getStoreLongitude(element)),
                label: index + 1 + '',
            });
            this.markers.push(marker);
            marker.setMap(this.googleMap);
            marker.addListener('mouseover', function () {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            });
            marker.addListener('mouseout', function () {
                marker.setAnimation(null);
            });
            if (selectMarkerHandler) {
                marker.addListener('click', function () {
                    selectMarkerHandler(index);
                });
            }
        });
    }
    /**
     * Initialize and draw the map
     * @param mapElement {@link HTMLElement} inside of which the map will be drawn
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    drawMap(mapElement, locations, selectMarkerHandler) {
        this.initMap(mapElement, this.defineMapCenter(locations));
        this.createMarkers(locations, selectMarkerHandler);
    }
}
GoogleMapRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, deps: [{ token: i1.StoreFinderConfig }, { token: i2.StoreFinderService }, { token: i3.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
GoogleMapRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GoogleMapRendererService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderConfig }, { type: i2.StoreFinderService }, { type: i3.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1yZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvcmUvc2VydmljZS9nb29nbGUtbWFwLXJlbmRlcmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsNENBQTRDO0FBTjVDOzs7O0dBSUc7QUFFSCw0Q0FBNEM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7O0FBT2pGLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFDWSxNQUF5QixFQUN6QixrQkFBc0MsRUFDdEMsWUFBMEI7UUFGMUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVI5QixjQUFTLEdBQW9CLElBQUksQ0FBQztRQUdoQyxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBTXRDLENBQUM7SUFFSjs7Ozs7O09BTUc7SUFDSCxTQUFTLENBQ1AsVUFBdUIsRUFDdkIsU0FBZ0IsRUFDaEIsbUJBQThCO1FBRTlCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO1lBQ2xDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDM0IsTUFBTSxN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RyxDQUFDLEdBQUcsRUFBRTthQUN0QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO2dCQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxtQkFBbUIsRUFBRTtnQkFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxPQUFPLENBQ2IsVUFBdUIsRUFDdkIsU0FBZ0IsRUFDaEIsbUJBQTZCO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7O3FIQTlJVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkB0eXBlcy9nb29nbGUubWFwc1wiIC8+XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgU2NyaXB0TG9hZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEdPT0dMRV9NQVBTX0RFVkVMT1BNRU5UX0tFWV9DT05GSUcgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZmluZGVyL3Jvb3QnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJDb25maWcgfSBmcm9tICcuLi9jb25maWcvc3RvcmUtZmluZGVyLWNvbmZpZyc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlclNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvc3RvcmUtZmluZGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwUmVuZGVyZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBnb29nbGVNYXA6IGdvb2dsZS5tYXBzLk1hcCA9IG51bGw7XG4gIHByaXZhdGUgbWFya2VyczogZ29vZ2xlLm1hcHMuTWFya2VyW107XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBTdG9yZUZpbmRlckNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgc3RvcmVGaW5kZXJTZXJ2aWNlOiBTdG9yZUZpbmRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNjcmlwdExvYWRlcjogU2NyaXB0TG9hZGVyXG4gICkge31cblxuICAvKipcbiAgICogUmVuZGVycyBnb29nbGUgbWFwIG9uIHRoZSBnaXZlbiBlbGVtZW50IGFuZCBkcmF3cyBtYXJrZXJzIG9uIGl0LlxuICAgKiBJZiBtYXAgYWxyZWFkeSBleGlzdHMgaXQgd2lsbCB1c2UgYW4gZXhpc3RpbmcgbWFwIG90aGVyd2lzZSBpdCB3aWxsIGNyZWF0ZSBvbmVcbiAgICogQHBhcmFtIG1hcEVsZW1lbnQgSFRNTCBlbGVtZW50IGluc2lkZSBvZiB3aGljaCB0aGUgbWFwIHdpbGwgYmUgZGlzcGxheWVkXG4gICAqIEBwYXJhbSBsb2NhdGlvbnMgYXJyYXkgY29udGFpbmlnbiBnZW8gZGF0YSB0byBiZSBkaXNwbGF5ZWQgb24gdGhlIG1hcFxuICAgKiBAcGFyYW0gc2VsZWN0TWFya2VySGFuZGxlciBmdW5jdGlvbiB0byBoYW5kbGUgd2hlbmV2ZXIgYSBtYXJrZXIgb24gYSBtYXAgaXMgY2xpY2tlZFxuICAgKi9cbiAgcmVuZGVyTWFwKFxuICAgIG1hcEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGxvY2F0aW9uczogYW55W10sXG4gICAgc2VsZWN0TWFya2VySGFuZGxlcj86IEZ1bmN0aW9uXG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZy5nb29nbGVNYXBzPy5hcGlLZXkpIHtcbiAgICAgIGlmIChPYmplY3QuZW50cmllcyhsb2NhdGlvbnNbT2JqZWN0LmtleXMobG9jYXRpb25zKVswXV0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHRoaXMuZ29vZ2xlTWFwID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgYXBpS2V5ID1cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmdvb2dsZU1hcHMuYXBpS2V5ID09PSBHT09HTEVfTUFQU19ERVZFTE9QTUVOVF9LRVlfQ09ORklHXG4gICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgOiB0aGlzLmNvbmZpZy5nb29nbGVNYXBzLmFwaUtleTtcblxuICAgICAgICAgIHRoaXMuc2NyaXB0TG9hZGVyLmVtYmVkU2NyaXB0KHtcbiAgICAgICAgICAgIHNyYzogdGhpcy5jb25maWcuZ29vZ2xlTWFwcy5hcGlVcmwsXG4gICAgICAgICAgICBwYXJhbXM6IHsga2V5OiBhcGlLZXkgfSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd01hcChtYXBFbGVtZW50LCBsb2NhdGlvbnMsIHNlbGVjdE1hcmtlckhhbmRsZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRyYXdNYXAobWFwRWxlbWVudCwgbG9jYXRpb25zLCBzZWxlY3RNYXJrZXJIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAnQSBHb29nbGUgTWFwcyBhcGkga2V5IGlzIHJlcXVpcmVkIGluIHRoZSBzdG9yZSBmaW5kZXIgY29uZmlndXJhdGlvbiB0byBkaXNwbGF5IHRoZSBHb29nbGUgbWFwLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2VudGVycyB0aGUgbWFwIHRvIHRoZSBnaXZlbiBwb2ludFxuICAgKiBAcGFyYW0gbGF0aXR1dGUgbGF0aXR1ZGUgb2YgdGhlIG5ldyBjZW50ZXJcbiAgICogQHBhcmFtIGxvbmdpdHVkZSBsb25naXR1ZGUgb2YgdGhlIG5ldyBjZW50ZXJcbiAgICovXG4gIGNlbnRlck1hcChsYXRpdHV0ZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZ29vZ2xlTWFwLnBhblRvKHsgbGF0OiBsYXRpdHV0ZSwgbG5nOiBsb25naXR1ZGUgfSk7XG4gICAgdGhpcy5nb29nbGVNYXAuc2V0Wm9vbSh0aGlzLmNvbmZpZy5nb29nbGVNYXBzLnNlbGVjdGVkTWFya2VyU2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgYW5kIHJldHVybnMge0BsaW5rIGdvb2dsZS5tYXBzLkxhdExuZ30gcmVwcmVzZW50aW5nIGEgcG9pbnQgd2hlcmUgdGhlIG1hcCB3aWxsIGJlIGNlbnRlcmVkXG4gICAqIEBwYXJhbSBsb2NhdGlvbnMgbGlzdCBvZiBsb2NhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZGVmaW5lTWFwQ2VudGVyKGxvY2F0aW9uczogYW55W10pOiBnb29nbGUubWFwcy5MYXRMbmcge1xuICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKFxuICAgICAgdGhpcy5zdG9yZUZpbmRlclNlcnZpY2UuZ2V0U3RvcmVMYXRpdHVkZShsb2NhdGlvbnNbMF0pLFxuICAgICAgdGhpcy5zdG9yZUZpbmRlclNlcnZpY2UuZ2V0U3RvcmVMb25naXR1ZGUobG9jYXRpb25zWzBdKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBnb29nbGUgbWFwIGluc2lkZSBpZiB0aGUgZ2l2ZW4gSFRNTCBlbGVtZW50IGNlbnRlcmVkIHRvIHRoZSBnaXZlbiBwb2ludFxuICAgKiBAcGFyYW0gbWFwRWxlbWVudCB7QGxpbmsgSFRNTEVsZW1lbnR9IGluc2lkZSBvZiB3aGljaCB0aGUgbWFwIHdpbGwgYmUgY3JlYXRlZFxuICAgKiBAcGFyYW0gbWFwQ2VudGVyIHtAbGluayBnb29nbGUubWFwcy5MYXRMbmd9IHRoZSBwb2ludCB3aGVyZSB0aGUgbWFwIHdpbGwgYmUgY2VudGVyZWRcbiAgICovXG4gIHByaXZhdGUgaW5pdE1hcChcbiAgICBtYXBFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBtYXBDZW50ZXI6IGdvb2dsZS5tYXBzLkxhdExuZ1xuICApOiB2b2lkIHtcbiAgICB0eXBlIEdlc3R1cmVIYW5kbGluZ09wdGlvbnMgPSAnY29vcGVyYXRpdmUnIHwgJ2dyZWVkeScgfCAnbm9uZScgfCAnYXV0byc7XG4gICAgY29uc3QgZ2VzdHVyZU9wdGlvbjogR2VzdHVyZUhhbmRsaW5nT3B0aW9ucyA9ICdncmVlZHknO1xuXG4gICAgY29uc3QgbWFwUHJvcCA9IHtcbiAgICAgIGNlbnRlcjogbWFwQ2VudGVyLFxuICAgICAgem9vbTogdGhpcy5jb25maWcuZ29vZ2xlTWFwcy5zY2FsZSxcbiAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICBnZXN0dXJlSGFuZGxpbmc6IGdlc3R1cmVPcHRpb24sXG4gICAgfTtcbiAgICB0aGlzLmdvb2dsZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwUHJvcCk7XG4gIH1cblxuICAvKipcbiAgICogRXJhc2VzIHRoZSBjdXJyZW50IG1hcCdzIG1hcmtlcnMgYW5kIGNyZWF0ZSBhIG5ldyBvbmUgYmFzZWQgb24gdGhlIGdpdmVuIGxvY2F0aW9uc1xuICAgKiBAcGFyYW0gbG9jYXRpb25zIGFycmF5IG9mIGxvY2F0aW9ucyB0byBiZSBkaXNwbGF5ZWQgb24gdGhlIG1hcFxuICAgKiBAcGFyYW0gc2VsZWN0TWFya2VySGFuZGxlciBmdW5jdGlvbiB0byBoYW5kbGUgd2hlbmV2ZXIgYSBtYXJrZXIgb24gYSBtYXAgaXMgY2xpY2tlZFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXJzKFxuICAgIGxvY2F0aW9uczogYW55W10sXG4gICAgc2VsZWN0TWFya2VySGFuZGxlcj86IEZ1bmN0aW9uXG4gICk6IHZvaWQge1xuICAgIHRoaXMubWFya2VycyA9IFtdO1xuICAgIGxvY2F0aW9ucy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKFxuICAgICAgICAgIHRoaXMuc3RvcmVGaW5kZXJTZXJ2aWNlLmdldFN0b3JlTGF0aXR1ZGUoZWxlbWVudCksXG4gICAgICAgICAgdGhpcy5zdG9yZUZpbmRlclNlcnZpY2UuZ2V0U3RvcmVMb25naXR1ZGUoZWxlbWVudClcbiAgICAgICAgKSxcbiAgICAgICAgbGFiZWw6IGluZGV4ICsgMSArICcnLFxuICAgICAgfSk7XG4gICAgICB0aGlzLm1hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLmdvb2dsZU1hcCk7XG4gICAgICBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFya2VyLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFKTtcbiAgICAgIH0pO1xuICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFya2VyLnNldEFuaW1hdGlvbihudWxsKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbGVjdE1hcmtlckhhbmRsZXIpIHtcbiAgICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxlY3RNYXJrZXJIYW5kbGVyKGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhbmQgZHJhdyB0aGUgbWFwXG4gICAqIEBwYXJhbSBtYXBFbGVtZW50IHtAbGluayBIVE1MRWxlbWVudH0gaW5zaWRlIG9mIHdoaWNoIHRoZSBtYXAgd2lsbCBiZSBkcmF3blxuICAgKiBAcGFyYW0gbG9jYXRpb25zIGFycmF5IG9mIGxvY2F0aW9ucyB0byBiZSBkaXNwbGF5ZWQgb24gdGhlIG1hcFxuICAgKiBAcGFyYW0gc2VsZWN0TWFya2VySGFuZGxlciBmdW5jdGlvbiB0byBoYW5kbGUgd2hlbmV2ZXIgYSBtYXJrZXIgb24gYSBtYXAgaXMgY2xpY2tlZFxuICAgKi9cbiAgcHJpdmF0ZSBkcmF3TWFwKFxuICAgIG1hcEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGxvY2F0aW9uczogYW55W10sXG4gICAgc2VsZWN0TWFya2VySGFuZGxlcjogRnVuY3Rpb25cbiAgKSB7XG4gICAgdGhpcy5pbml0TWFwKG1hcEVsZW1lbnQsIHRoaXMuZGVmaW5lTWFwQ2VudGVyKGxvY2F0aW9ucykpO1xuICAgIHRoaXMuY3JlYXRlTWFya2Vycyhsb2NhdGlvbnMsIHNlbGVjdE1hcmtlckhhbmRsZXIpO1xuICB9XG59XG4iXX0=