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
    const arcColour = (opacity: number) => `rgba(254, 87, 87, ${opacity})`;
    const OPACITY = 1;
    const GAP = 0.2;

    this.globeService
      .getSupplyChainForProduct('358639')
      .subscribe((supplyChain) => {
        const arcsData = supplyChain.paths
          .map((path) => {
            const arcs = path.slice(0, -1).map(
              ({ label, lat, long }, index): ArcDatum => ({
                startLat: lat,
                startLng: long,
                endLat: path[index + 1].lat,
                endLng: path[index + 1].long,
                label: `${label} &#8594; ${path[index + 1].label}`,
              })
            );
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
          altitude: 2,
        };

        const myGlobe = Globe();
        myGlobe
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
          .width(545)
          .height(545)
          .backgroundColor('rgba(0, 0, 0, 0)')
          .arcsData(arcsData)
          .arcLabel((d: any) => `<div class="arc-label">${d.label}</div>`)
          .arcColor(() => arcColour(OPACITY))
          .arcDashLength(0.4)
          .arcDashGap(GAP)
          .arcDashAnimateTime(2000)
          .arcStroke(() => 1)
          .onArcHover((hoverArc) =>
            myGlobe
              .arcColor((d: any) => {
                const op = !hoverArc || d === hoverArc ? OPACITY : OPACITY / 4;
                return arcColour(op);
              })
              .arcDashGap((d: any) => (!hoverArc || d !== hoverArc ? GAP : 0))
          )

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

type ArcDatum = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  label: string;
};
