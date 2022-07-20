import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Globe from 'globe.gl';

@Component({
  selector: 'cx-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent implements AfterViewInit {
  @ViewChild('globeViz') globeViz: ElementRef<HTMLElement>;

  constructor() {}

  ngAfterViewInit(): void {
    // Gen random data
    const N = 300;
    const gData = [...Array(N)].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }));

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')(this.globeViz.nativeElement);
  }
}
