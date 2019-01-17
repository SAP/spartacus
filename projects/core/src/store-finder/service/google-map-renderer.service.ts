/// <reference types="@types/googlemaps" />
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { Injectable } from '@angular/core';
import { OccE2eConfigurationService } from '../occ/index';
import { StoreDataService } from '../facade/store-data.service';

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js';
const GOOGLE_API_KEY_PROPERTY_NAME = 'e2egoogleservices.apikey';
const DEFAULT_SCALE = 12;
const SELECTED_MARKER_SCALE = 16;

@Injectable()
export class GoogleMapRendererService {
  private googleMap: google.maps.Map = null;
  private markers: google.maps.Marker[];

  constructor(
    private externalJsFileLoader: ExternalJsFileLoader,
    private sccConfigurationService: OccE2eConfigurationService,
    private storeDataService: StoreDataService
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
    if (this.googleMap === null) {
      this.sccConfigurationService
        .getConfiguration(GOOGLE_API_KEY_PROPERTY_NAME)
        .subscribe(result => {
          this.externalJsFileLoader.load(
            GOOGLE_MAP_API_URL,
            { key: result },
            () => {
              this.drawMap(mapElement, locations, selectMarkerHandler);
            }
          );
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
    this.googleMap.setZoom(SELECTED_MARKER_SCALE);
  }

  /**
   * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
   * @param locations list of locations
   */
  private defineMapCenter(locations: any[]): google.maps.LatLng {
    return new google.maps.LatLng(
      this.storeDataService.getStoreLatitude(locations[0]),
      this.storeDataService.getStoreLongitude(locations[0])
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
    const mapProp = {
      center: mapCenter,
      zoom: DEFAULT_SCALE,
      mapTypeId: google.maps.MapTypeId.ROADMAP
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
          this.storeDataService.getStoreLatitude(element),
          this.storeDataService.getStoreLongitude(element)
        ),
        label: index + 1 + ''
      });
      this.markers.push(marker);
      marker.setMap(this.googleMap);
      marker.addListener('mouseover', function() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
      marker.addListener('mouseout', function() {
        marker.setAnimation(null);
      });
      if (selectMarkerHandler) {
        marker.addListener('click', function() {
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
