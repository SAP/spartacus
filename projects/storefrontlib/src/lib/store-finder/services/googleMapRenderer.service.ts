import { ExternalJsFileLoader } from './externalJsFileLoader.service';
import {} from '@types/googlemaps';
import { Injectable } from '@angular/core';

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapRendererServcie {
  constructor(private externalJsFileLoader: ExternalJsFileLoader) {}

  public renderMap(mapElement: HTMLElement, payload: any): void {
    this.externalJsFileLoader.load(
      GOOGLE_MAP_API_URL,
      { key: 'AIzaSyB7KXTrhIgBrBMNNVHWVWVyHfWcV_2Qe0Q' },
      () => this.initMap(mapElement, payload)
    );
  }

  protected initMap(mapElement: HTMLElement, payload: any): void {
    console.log(payload);
    const mapProp = {
      center: new google.maps.LatLng(payload[0].latitude, payload[0].longitude),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(mapElement, mapProp);
    payload.forEach(element => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.latitude, element.longitude)
      });
      console.log(marker);
      marker.setMap(map);
    });
  }
}
