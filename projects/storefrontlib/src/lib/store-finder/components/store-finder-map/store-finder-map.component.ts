import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { GoogleMapRendererServcie } from '../../services/googleMapRenderer.service';

@Component({
  selector: 'y-store-finder-map',
  templateUrl: './store-finder-map.component.html',
  styleUrls: ['./store-finder-map.component.scss']
})
export class StoreFinderMapComponent implements OnInit, OnChanges {
  @ViewChild('mapElement') private mapElement: ElementRef;
  @Input() locations: any;

  constructor(private googleMapRendererService: GoogleMapRendererServcie) {
    this.locations = { stores: [{ geoPoint: { latitude: 0, longtitude: 0 } }] };
  }

  ngOnInit(): void {}

  convert() {
    return this.locations.stores.map(store => {
      return {
        name: store.displayName,
        latitude: store.geoPoint.latitude,
        longitude: store.geoPoint.longitude
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.locations.stores) {
      console.log(this.locations);
      this.googleMapRendererService.renderMap(
        this.mapElement.nativeElement,
        this.convert()
      );
    }
  }
}
