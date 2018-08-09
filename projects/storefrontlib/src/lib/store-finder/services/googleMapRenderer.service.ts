import { ExternalJsFileLoader } from "./externalJsFileLoader.service";

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js';

export class GoogleMapRendererServcie {
    constructor(
        private externalJsFileLoader: ExternalJsFileLoader
    ) {}

    public renderMap(mapElement: HTMLElement): void {
        this.externalJsFileLoader.load(GOOGLE_MAP_API_URL, {key: 'AIzaSyB7KXTrhIgBrBMNNVHWVWVyHfWcV_2Qe0Q'}, () => this.initMap(mapElement));
    }

    protected initMap(mapElement: HTMLElement): void {
        const mapProp = {
            center: new google.maps.LatLng(28.4595, 77.0266),
            zoom: 21,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          const map = new google.maps.Map(mapElement, mapProp);
          const marker = new google.maps.Marker({position: mapProp.center});
          marker.setMap(map);
    }
}
