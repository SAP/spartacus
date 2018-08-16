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
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-store-finder-map',
  templateUrl: './store-finder-map.component.html',
  styleUrls: ['./store-finder-map.component.scss']
})
export class StoreFinderMapComponent implements OnInit, OnChanges {
  @ViewChild('mapElement') private mapElement: ElementRef;

  @Input() centerLat: number;
  @Input() centerLong: number;

  constructor(
    private googleMapRendererService: GoogleMapRendererServcie,
    private store: Store<fromStore.StoresState>
  ) {}

  ngOnInit(): void {
    this.store.select(fromStore.getAllStores).subscribe(locations => {
      if (locations.stores) {
        this.googleMapRendererService.renderMap(
          this.mapElement.nativeElement,
          locations.stores.map((store, index) => {
            return {
              ...store,
              getLabel: () => '' + (index + 1),
              getLatitude: () => store.geoPoint.latitude,
              getLongitude: () => store.geoPoint.longitude
            };
          })
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.centerLat && this.centerLong) {
      this.googleMapRendererService.centerMap(this.centerLat, this.centerLong);
    }
  }
}
