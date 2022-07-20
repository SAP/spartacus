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

  constructor(private readonly globeService: GlobeService) {}

  ngAfterViewInit(): void {
    this.globeService
      .getSupplyChainForProduct('productCode')
      .subscribe((supplyChain) => {
        const arcsData = supplyChain.paths
          .map((path) => {
            const arcs = path.slice(0, -1).map(({ lat, long }, index) => ({
              startLat: lat,
              startLng: long,
              endLat: path[index + 1].lat,
              endLng: path[index + 1].long,
            }));
            return arcs;
          })
          .reduce((acc, val) => acc.concat(val), []);

        const { lat, lng } = supplyChain.labels.reduce(
          (acc, val) => ({ lat: acc.lat + val.lat, lng: acc.lng + val.long }),
          { lat: 0, lng: 0 }
        );
        const averageLocation = {
          lat: lat / supplyChain.labels.length,
          lng: lng / supplyChain.labels.length,
          altitude: 2.5,
        };

        const myGlobe = Globe();
        myGlobe
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
          .width(545)
          .height(545)
          .backgroundColor('rgba(0, 0, 0, 0)')
          .arcsData(arcsData)
          .arcColor(() => '#FE5757')
          .arcDashLength(() => Math.random())
          .arcDashGap(() => Math.random())
          .arcDashAnimateTime(() => Math.random() * 4000 + 500)
          .arcStroke(() => 1)
          .labelsData(supplyChain.labels)
          .labelLat((d: any) => d.lat)
          .labelLng((d: any) => d.long)
          .labelText((d: any) => d.label)
          .labelSize(1.5)
          .labelDotRadius(1)
          .labelColor(() => 'rgba(255, 165, 0, 0.75)')
          .labelResolution(2)
          .pointOfView(averageLocation, 10)
          .bumpImageUrl(
            '//unpkg.com/three-globe/example/img/earth-topology.png'
          )(this.globeViz.nativeElement);
      });
  }
}
