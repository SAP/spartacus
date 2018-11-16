import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';

@Component({
  selector: 'cx-store-finder-map',
  templateUrl: './store-finder-map.component.html',
  styleUrls: ['./store-finder-map.component.scss']
})
export class StoreFinderMapComponent implements OnChanges {
  @ViewChild('mapElement')
  mapElement: ElementRef;
  @Input()
  locations: any[];
  @Output()
  selectedStoreItem: EventEmitter<number> = new EventEmitter();

  constructor(private googleMapRendererService: GoogleMapRendererService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.locations && this.locations) {
      this.googleMapRendererService.renderMap(
        this.mapElement.nativeElement,
        this.locations,
        markerIndex => {
          this.selectStoreItemClickHandle(markerIndex);
        }
      );
    }
  }

  /**
   * Sets the center of the map to the given location
   * @param latitude latitude of the new center
   * @param longitude longitude of the new center
   */
  centerMap(latitude: number, longitude: number): void {
    this.googleMapRendererService.centerMap(latitude, longitude);
  }

  private selectStoreItemClickHandle(markerIndex: number) {
    this.selectedStoreItem.emit(markerIndex);
  }
}
