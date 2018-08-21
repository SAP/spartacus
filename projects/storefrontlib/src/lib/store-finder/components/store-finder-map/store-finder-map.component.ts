import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';
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
    private googleMapRendererService: GoogleMapRendererService,
    private store: Store<fromStore.StoresState>
  ) {}

  ngOnInit(): void {
    this.store.select(fromStore.getAllStores).subscribe(locations => {
      if (locations.stores) {
        this.googleMapRendererService.renderMap(
          this.mapElement.nativeElement,
          locations.stores
        );
      }
    });
  }

  /**
   * Sets the center of the map to the given location
   * @param latitude latitude of the new center
   * @param longitude longitude of the new center
   */
  public centerMap(latitude: number, longitude: number): void {
    this.googleMapRendererService.centerMap(latitude, longitude);
  }
}
