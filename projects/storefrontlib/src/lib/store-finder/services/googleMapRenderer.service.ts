import { ExternalJsFileLoader } from './externalJsFileLoader.service';
import {} from '@types/googlemaps';
import { Injectable } from '@angular/core';
import { SccConfigurationService } from './SccConfiguration.service';
import { OccE2eConfigurationService } from '../../occ/e2e/configuration-service';
import { catchError, mergeMap } from 'rxjs/operators';
import { Loc } from '../models/loc';
import { MapData } from '../models/MapData';

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

  public renderMap(mapElement: HTMLElement, payload: MapData[]): void {
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

  protected initMap(mapElement: HTMLElement, payload: MapData[]): void {
    const mapProp = {
      center: new google.maps.LatLng(payload[0].latitude, payload[0].longitude),
      zoom: DEFAULT_SCALE,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.googleMap = new google.maps.Map(mapElement, mapProp);
    this.createMarkers(payload);
  }

  protected createMarkers(payload: MapData[]): void {
    payload.forEach(element => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.latitude, element.longitude)
      });
      this.markers.push(marker);
      marker.setMap(this.googleMap);
      marker.setLabel(element.label);
    });
  }

  protected setMapOnAllMarkers(map: google.maps.Map): void {
    this.markers.forEach(marker => marker.setMap(map));
  }
}
