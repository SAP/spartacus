import { ExternalJsFileLoader } from './externalJsFileLoader.service';
import {} from '@types/googlemaps';
import { Injectable } from '@angular/core';
import { SccConfigurationService } from './SccConfiguration.service';
import { OccE2eConfigurationService } from '../../occ/e2e/configuration-service';
import { catchError, mergeMap } from 'rxjs/operators';
import { Loc } from '../models/loc';
import { GeolocationData } from '../models/MapData';

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js';
const GOOGLE_API_KEY_PROPERRY_NAME = 'e2egoogleservices.apikey';
const DEFAULT_SCALE = 12;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapRendererServcie {
  private googleMap: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private loc: Loc;

  constructor(
    private externalJsFileLoader: ExternalJsFileLoader,
    private sccConfigurationService: OccE2eConfigurationService
  ) {
    this.loc = { number: '' };
  }

  public renderMap(mapElement: HTMLElement, payload: GeolocationData[]): void {
    if (this.googleMap === undefined) {
      this.sccConfigurationService
        .getConfiguration(GOOGLE_API_KEY_PROPERRY_NAME)
        .subscribe(result => {
          this.externalJsFileLoader.load(
            GOOGLE_MAP_API_URL,
            { key: result },
            () => this.initMap(mapElement, payload)
          );
        });
    } else {
      this.setMapOnAllMarkers(null);
      this.createMarkers(payload);
    }
  }

  protected initMap(mapElement: HTMLElement, payload: GeolocationData[]): void {
    console.log(payload);
    const mapProp = {
      center: new google.maps.LatLng(
        payload[0].getLatitude(),
        payload[0].getLongitude()
      ),
      zoom: DEFAULT_SCALE,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.googleMap = new google.maps.Map(mapElement, mapProp);
    this.createMarkers(payload);
  }

  protected createMarkers(payload: GeolocationData[]): void {
    payload.forEach(element => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          element.getLatitude(),
          element.getLongitude()
        )
      });
      this.markers.push(marker);
      marker.setMap(this.googleMap);
      marker.setLabel(element.getLabel());
      const contentString =
        '<div>hui<y-store-finder-search></y-store-finder-search></div>';
      const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', () =>
        infoWindow.open(this.googleMap, marker)
      );
    });
  }

  protected setMapOnAllMarkers(map: google.maps.Map): void {
    this.markers.forEach(marker => marker.setMap(map));
  }

  public centerMap(latitute: number, longitude: number): void {
    this.googleMap.panTo({ lat: latitute, lng: longitude });
  }
}
