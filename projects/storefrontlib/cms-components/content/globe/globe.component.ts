import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Globe from 'globe.gl';
import { GlobeService } from './globe.service';

@Component({
  selector: 'cx-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent implements AfterViewInit {
  @ViewChild('globeViz') globeViz: ElementRef<HTMLElement>;

  constructor(protected readonly globeService: GlobeService) {}

  ngAfterViewInit(): void {
    // Gen random data
    // const M = 20;
    // const arcsData = [...Array(M)].map(() => ({
    //   startLat: (Math.random() - 0.5) * 180,
    //   startLng: (Math.random() - 0.5) * 360,
    //   endLat: (Math.random() - 0.5) * 180,
    //   endLng: (Math.random() - 0.5) * 360,
    //   color: [
    //     ['red', 'blue', 'green'][Math.round(Math.random() * 2)],
    //     ['red', 'blue', 'green'][Math.round(Math.random() * 2)],
    //   ],
    // }));

    // this.globeService.getGeoData().subscribe((places) => {
    //   console.log('places', places);

    //   Globe()
    //     .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
    //     .width(545)
    //     .height(545)
    //     .backgroundColor('#ffffff')
    //     .labelsData(places.features)
    //     .labelLat((d: any) => d.properties.latitude)
    //     .labelLng((d: any) => d.properties.longitude)
    //     .labelText((d: any) => d.properties.name)
    //     .labelSize((d: any) => Math.sqrt(d.properties.pop_max) * 4e-4)
    //     .labelDotRadius((d: any) => Math.sqrt(d.properties.pop_max) * 4e-4)
    //     .labelColor(() => 'rgba(255, 165, 0, 0.75)')
    //     .labelResolution(2)
    //     .arcsData(arcsData)
    //     .arcColor('color')
    //     .arcDashLength(() => Math.random())
    //     .arcDashGap(() => Math.random())
    //     .arcDashAnimateTime(() => Math.random() * 4000 + 500)
    //     .arcStroke(() => 1)
    //     .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')(
    //     this.globeViz.nativeElement
    //   );
    // });

    const places = {
      type: 'MultiLineString',
      coordinates: [
        [
          [51.45272333, -0.9722902991],
          [52.52, 13.405],
        ],
        [
          [51.45272333, -0.9722902991],
          [30.65786276, 104.0659259],
          [13.79431884, 100.5243153],
        ],
        [
          [30.65786276, 104.0659259],
          [13.09965792, 80.22204975],
        ],
      ],
    };

    const arcsData = places.coordinates.map((path) => {
      const points = [...path].reverse();
      const arcs = points.slice(0, -1).map((point, index) => ({
        startLat: point[0],
        startLng: point[1],
        endLat: points[index + 1][0],
        endLng: points[index + 1][1],
      }));
      return arcs;
    }).reduce((acc, val) => acc.concat(val), []);

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
      .width(545)
      .height(545)
      .backgroundColor('rgba(0,0,0, 0)')
      .arcsData(arcsData)
      // .arcColor('color')
      .arcDashLength(() => Math.random())
      .arcDashGap(() => Math.random())
      .arcDashAnimateTime(() => Math.random() * 4000 + 500)
      .arcStroke(() => 1)
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')(
      this.globeViz.nativeElement
    );
  }
}
