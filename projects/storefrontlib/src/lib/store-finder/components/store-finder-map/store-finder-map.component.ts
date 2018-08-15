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
export class StoreFinderMapComponent implements OnInit {
  @ViewChild('mapElement') private mapElement: ElementRef;

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
              label: '' + (index + 1),
              latitude: store.geoPoint.latitude,
              longitude: store.geoPoint.longitude
            };
          })
        );
      }
    });
  }
}
