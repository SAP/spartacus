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

  arcsData: ArcDatum[] = [];
  carbonFootprint = 0;
  moreDetailsVisible = false;

  constructor(private readonly globeService: GlobeService) {}

  ngAfterViewInit(): void {
    const arcColour = (opacity: number) => `rgba(254, 87, 87, ${opacity})`;
    const OPACITY = 1;
    const GAP = 0.2;

    const markerSvg = `<svg viewBox="-4 0 36 71">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

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
                label: `${label} → ${path[index + 1].label}`,
                distance: this.getDistanceFromLatLonInKm(
                  lat,
                  long,
                  path[index + 1].lat,
                  path[index + 1].long
                ),
                co2:
                  (this.getDistanceFromLatLonInKm(
                    lat,
                    long,
                    path[index + 1].lat,
                    path[index + 1].long
                  ) *
                    0.0005) /
                  10,
              })
            );
            return arcs;
          })
          .reduce((acc, val) => acc.concat(val), []);
        this.arcsData = arcsData;
        this.carbonFootprint = arcsData.reduce((acc, val) => acc + val.co2, 0);

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
          .onArcHover((hoverArc) => {
            (myGlobe.controls() as any).autoRotate = !hoverArc;
            myGlobe
              .arcColor((d: any) => {
                const op = !hoverArc || d === hoverArc ? OPACITY : OPACITY / 4;
                return arcColour(op);
              })
              .arcDashGap((d: any) => (!hoverArc || d !== hoverArc ? GAP : 0));
          })

          .labelsData(supplyChain.labels)
          .labelLat((d: any) => d.lat)
          .labelLng((d: any) => d.long)
          .labelText((d: any) => d.label)
          .labelSize(1.5)
          .labelResolution(2)
          .htmlElementsData(supplyChain.labels)
          .htmlLat((d: any) => d.lat)
          .htmlLng((d: any) => d.long)
          .htmlElement((_d: any) => {
            const el = document.createElement('div');
            el.innerHTML = markerSvg;
            el.style.color = arcColour(1);
            el.style.width = '20px';

            return el;
          })
          .pointOfView(averageLocation, 10)
          .bumpImageUrl(
            '//unpkg.com/three-globe/example/img/earth-topology.png'
          )(this.globeViz.nativeElement);

        (myGlobe.controls() as any).autoRotate = true;
        (myGlobe.controls() as any).autoRotateSpeed = 0.35;
      });
  }

  toggleMoreDetails() {
    this.moreDetailsVisible = !this.moreDetailsVisible;
  }

  private getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}

type ArcDatum = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  label: string;
  distance: number;
  co2: number;
};
