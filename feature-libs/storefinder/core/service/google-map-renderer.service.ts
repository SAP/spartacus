/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/google.maps" />
import { DOCUMENT } from '@angular/common';
import { Injectable, inject, isDevMode } from '@angular/core';
import { FeatureToggles, LoggerService, ScriptLoader } from '@spartacus/core';
// eslint-disable-next-line @nx/workspace-no-self-public-api-import -- ESLint is misfiring here: core and root are not the same library — they're separate entry points
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderService } from '../facade/store-finder.service';
import { StoreLocationService } from './store-location.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapRendererService {
  private googleMap: google.maps.Map | null = null;
  private markers: google.maps.Marker[];
  private advancedMarkers: google.maps.marker.AdvancedMarkerElement[];
  // Ensures each async-loaded map gets a distinct global callback name.
  private static callbackCounter = 0;

  protected logger = inject(LoggerService);
  protected storeLocationService = inject(StoreLocationService);
  protected document = inject(DOCUMENT);
  private featureToggles = inject(FeatureToggles);

  constructor(
    protected config: StoreFinderConfig,
    protected storeFinderService: StoreFinderService,
    protected scriptLoader: ScriptLoader
  ) {}

  /**
   * Renders google map on the given element and draws markers on it.
   * If map already exists it will use an existing map otherwise it will create one
   * @param mapElement HTML element inside of which the map will be displayed
   * @param locations array of geo data to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  renderMap(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler?: Function
  ): void {
    if (!this.config.googleMaps?.apiKey) {
      if (isDevMode()) {
        this.logger.warn(
          'A Google Maps api key is required in the store finder configuration to display the Google map.'
        );
      }
      return;
    }

    if (Object.entries(locations[0]).length === 0) {
      return;
    }

    // Reuse the existing map; otherwise load the API script, which draws it.
    if (this.googleMap === null) {
      this.embedMapScript(mapElement, locations, selectMarkerHandler);
    } else {
      this.drawMap(mapElement, locations, selectMarkerHandler);
    }
  }

  /**
   * Loads the Google Maps API script and arranges for the map to be drawn once
   * the API is ready.
   * @param mapElement HTML element inside of which the map will be displayed
   * @param locations array of geo data to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  private embedMapScript(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler?: Function
  ): void {
    const apiKey =
      this.config.googleMaps?.apiKey === GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG
        ? ''
        : this.config.googleMaps?.apiKey;

    const useAsyncLoading = this.featureToggles.useGoogleMapsAsyncLoading;

    // With `loading=async`, Google invokes a global `callback` function once
    // the API is ready instead of firing the script `load` event.
    const callbackName = useAsyncLoading
      ? this.registerMapCallback(mapElement, locations, selectMarkerHandler)
      : undefined;

    this.scriptLoader.embedScript({
      src: this.config.googleMaps?.apiUrl ?? '',
      params: {
        key: apiKey,
        // Opt into async loading to avoid Google's "loaded directly without
        // loading=async" performance warning.
        ...(useAsyncLoading
          ? { loading: 'async', callback: callbackName }
          : {}),
        // Advanced markers require the optional `marker` library.
        ...(this.featureToggles.useAdvancedGoogleMarkers
          ? { libraries: 'marker' }
          : {}),
      },
      attributes: { type: 'text/javascript' },
      // Classic load exposes the API on `load`; async draws from the callback.
      callback: useAsyncLoading
        ? undefined
        : () => {
            this.drawMap(mapElement, locations, selectMarkerHandler);
          },
    });
  }

  /**
   * Registers a uniquely-named global callback that Google's async loader
   * invokes once the API is ready, then returns its name for the `callback`
   * URL param. The callback draws the map and removes itself so it can't leak
   * or fire twice.
   */
  private registerMapCallback(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler?: Function
  ): string {
    GoogleMapRendererService.callbackCounter++;
    const callbackName = `__spartacusGoogleMapsInit_${GoogleMapRendererService.callbackCounter}`;
    // `defaultView` is null without a browser window (e.g. SSR); skip
    // registering rather than throwing on a null global.
    const global = this.document.defaultView as any;
    if (global) {
      global[callbackName] = () => {
        delete global[callbackName];
        this.drawMap(mapElement, locations, selectMarkerHandler);
      };
    }
    return callbackName;
  }

  /**
   * Centers the map to the given point
   * @param latitute latitude of the new center
   * @param longitude longitude of the new center
   */
  centerMap(latitute: number, longitude: number): void {
    this.googleMap?.panTo({ lat: latitute, lng: longitude });
    const scale = this.config.googleMaps?.selectedMarkerScale;
    if (scale !== undefined) {
      this.googleMap?.setZoom(scale);
    }
  }

  /**
   * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
   * @param locations list of locations
   */
  private defineMapCenter(locations: any[]): google.maps.LatLng | undefined {
    const latitude = this.storeLocationService.getStoreLatitude(locations[0]);
    const longitude = this.storeLocationService.getStoreLongitude(locations[0]);
    if (latitude === undefined || longitude === undefined) {
      return undefined;
    }
    return new google.maps.LatLng(latitude, longitude);
  }

  /**
   * Creates google map inside if the given HTML element centered to the given point
   * @param mapElement {@link HTMLElement} inside of which the map will be created
   * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
   */
  private initMap(
    mapElement: HTMLElement,
    mapCenter?: google.maps.LatLng
  ): void {
    type GestureHandlingOptions = 'cooperative' | 'greedy' | 'none' | 'auto';
    const gestureOption: GestureHandlingOptions = 'greedy';

    const mapProp = {
      center: mapCenter,
      zoom: this.config.googleMaps?.scale,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: gestureOption,
      // Advanced markers only render on a map that has a `mapId`.
      ...(this.featureToggles.useAdvancedGoogleMarkers
        ? { mapId: this.config.googleMaps?.mapId }
        : {}),
    };
    this.googleMap = new google.maps.Map(mapElement, mapProp);
  }

  /**
   * Erases the current map's markers and create a new one based on the given locations
   * @param locations array of locations to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  private createMarkers(
    locations: any[],
    selectMarkerHandler?: Function
  ): void {
    if (this.featureToggles.useAdvancedGoogleMarkers) {
      this.advancedMarkers = [];
      locations.forEach((element, index) => {
        const latitude = this.storeLocationService.getStoreLatitude(element);
        const longitude = this.storeLocationService.getStoreLongitude(element);
        // Skip stores without geolocation rather than placing them at (0, 0).
        if (latitude === undefined || longitude === undefined) {
          return;
        }
        // `PinElement` keeps the classic teardrop pin with the store number as
        // its glyph. `glyphText` supersedes the deprecated `glyph` but isn't in
        // the pinned `@types/google.maps` yet, so it's spread in via a cast.
        const pin = new google.maps.marker.PinElement({
          glyphColor: '#fff',
          ...({
            glyphText: `${index + 1}`,
          } as google.maps.marker.PinElementOptions),
        });
        // Wrap the pin: `AdvancedMarkerElement` positions its `content` via a
        // CSS transform, so bounce must animate an inner element or it fights
        // Google's transform. `PinElement` is itself an `HTMLElement`, so it's
        // appended directly (its `.element` property is deprecated).
        const wrapper = this.document.createElement('div');
        wrapper.appendChild(pin);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: new google.maps.LatLng(latitude, longitude),
          content: wrapper,
          // Advanced markers only dispatch clicks when explicitly clickable.
          gmpClickable: !!selectMarkerHandler,
        });
        this.advancedMarkers.push(marker);
        marker.map = this.googleMap;
        // Advanced markers don't emit gmp mouseover/mouseout, so toggle bounce
        // via native DOM events on the pin (not the transformed wrapper).
        wrapper.addEventListener('mouseover', () => {
          pin.classList.add('cx-store-marker-bounce');
        });
        wrapper.addEventListener('mouseout', () => {
          pin.classList.remove('cx-store-marker-bounce');
        });
        if (selectMarkerHandler) {
          // Advanced markers emit the DOM `gmp-click` event, not legacy `click`.
          marker.addEventListener('gmp-click', function () {
            selectMarkerHandler(index);
          });
        }
      });
    } else {
      this.markers = [];
      locations.forEach((element, index) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            this.storeFinderService.getStoreLatitude(element),
            this.storeFinderService.getStoreLongitude(element)
          ),
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
  }

  /**
   * Initialize and draw the map
   * @param mapElement {@link HTMLElement} inside of which the map will be drawn
   * @param locations array of locations to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  private drawMap(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler?: Function
  ) {
    this.initMap(mapElement, this.defineMapCenter(locations));
    this.createMarkers(locations, selectMarkerHandler);
  }
}
