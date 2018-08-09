import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GoogleMapRendererServcie } from '../../services/googleMapRenderer.service';

@Component({
  selector: 'y-store-finder-map',
  templateUrl: './store-finder-map.component.html',
  styleUrls: ['./store-finder-map.component.scss']
})
export class StoreFinderMapComponent implements OnInit {
  @ViewChild('mapElement') private mapElement: ElementRef;

  constructor(private googleMapRendererService: GoogleMapRendererServcie) {}

  ngOnInit(): void {
    this.googleMapRendererService.renderMap(this.mapElement.nativeElement);
  }
}
