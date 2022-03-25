/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { ScriptLoader } from '@spartacus/core';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderService } from '../facade/store-finder.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapRendererService {
  private googleMap: google.maps.Map = null;
  private markers: google.maps.Marker[];

  constructor(
    protected config: StoreFinderConfig,
    protected storeFinderService: StoreFinderService,
    protected scriptLoader: ScriptLoader
  ) {}

  /**
   * Renders google map on the given element and draws markers on it.
   * If map already exists it will use an existing map otherwise it will create one
   * @param mapElement HTML element inside of which the map will be displayed
   * @param locations array containign geo data to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  renderMap(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler?: Function
  ): void {
    if (Object.entries(locations[Object.keys(locations)[0]]).length > 0)
      if (this.googleMap === null) {
        this.scriptLoader.embedScript({
          src: this.config.googleMaps.apiUrl,
          params: { key: this.config.googleMaps.apiKey },
          attributes: { type: 'text/javascript' },
          callback: () => {
            this.drawMap(mapElement, locations, selectMarkerHandler);
          },
        });
      } else {
        this.drawMap(mapElement, locations, selectMarkerHandler);
      }
  }

  /**
   * Centers the map to the given point
   * @param latitute latitude of the new center
   * @param longitude longitude of the new center
   */
  centerMap(latitute: number, longitude: number): void {
    this.googleMap.panTo({ lat: latitute, lng: longitude });
    this.googleMap.setZoom(this.config.googleMaps.selectedMarkerScale);
  }

  /**
   * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
   * @param locations list of locations
   */
  private defineMapCenter(locations: any[]): google.maps.LatLng {
    return new google.maps.LatLng(
      this.storeFinderService.getStoreLatitude(locations[0]),
      this.storeFinderService.getStoreLongitude(locations[0])
    );
  }

  /**
   * Creates google map inside if the given HTML element centered to the given point
   * @param mapElement {@link HTMLElement} inside of which the map will be created
   * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
   */
  private initMap(
    mapElement: HTMLElement,
    mapCenter: google.maps.LatLng
  ): void {
    type GestureHandlingOptions = 'cooperative' | 'greedy' | 'none' | 'auto';
    const gestureOption: GestureHandlingOptions = 'greedy';

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
  private createMarkers(
    locations: any[],
    selectMarkerHandler?: Function
  ): void {
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

  /**
   * Initialize and draw the map
   * @param mapElement {@link HTMLElement} inside of which the map will be drawn
   * @param locations array of locations to be displayed on the map
   * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
   */
  private drawMap(
    mapElement: HTMLElement,
    locations: any[],
    selectMarkerHandler: Function
  ) {
    this.initMap(mapElement, this.defineMapCenter(locations));
    this.createMarkers(locations, selectMarkerHandler);
  }
}
