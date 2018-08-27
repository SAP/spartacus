/// <reference types="@types/googlemaps" />
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { Injectable } from '@angular/core';
import { OccE2eConfigurationService } from '../../occ/e2e/e2e-configuration-service';
import { StoreDataService } from '.';

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js';
const GOOGLE_API_KEY_PROPERRY_NAME = 'e2egoogleservices.apikey';
const DEFAULT_SCALE = 12;

@Injectable({
  providedIn: 'root'
})
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
   */
  public renderMap(mapElement: HTMLElement, locations: any[]): void {
    if (this.googleMap === null) {
      this.sccConfigurationService
        .getConfiguration(GOOGLE_API_KEY_PROPERRY_NAME)
        .subscribe(result => {
          this.externalJsFileLoader.load(
            GOOGLE_MAP_API_URL,
            { key: result },
            () => {
              this.initMap(mapElement, this.defineMapCenter(locations));
              this.createMarkers(locations);
            }
          );
        });
    } else {
      this.setMapOnAllMarkers(null);
      this.createMarkers(locations);
    }
  }

  /**
   * Centers the map to the given point
   * @param latitute latitude of the new center
   * @param longitude longitude of the new center
   */
  public centerMap(latitute: number, longitude: number): void {
    this.googleMap.panTo({ lat: latitute, lng: longitude });
  }

  /**
   * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
   * @param locations list of locations
   */
  protected defineMapCenter(locations: any): google.maps.LatLng {
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
  protected initMap(
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
   */
  protected createMarkers(locations: any[]): void {
    this.markers = [];
    locations.forEach((element, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          this.storeDataService.getStoreLatitude(element),
          this.storeDataService.getStoreLongitude(element)
        )
      });
      this.markers.push(marker);
      marker.setMap(this.googleMap);
      marker.setLabel(index + 1 + '');
    });
  }

  /**
   * Moves all the markers to the given map
   * @param map {@link google.maps.Map} the map where all the markers will be moved. Pass null if you just want to erase markers
   */
  protected setMapOnAllMarkers(map: google.maps.Map): void {
    this.markers.forEach(marker => marker.setMap(map));
  }
}
