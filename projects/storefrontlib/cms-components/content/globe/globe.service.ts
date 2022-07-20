// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobeService {
  // constructor(private httpClient: HttpClient) {}

  getSupplyChainForProduct(_productCode: string): Observable<SupplyChain> {
    // return this.httpClient.get(
    //   'http://localhost:8080/api/products/{productCode}/supplyChain'
    // );
    return of({
      paths: [
        [
          { label: 'Charger', lat: 22.0982223, long: -98.0962343 },
          { label: 'Final Assembly', lat: 52.52, long: 13.405 },
        ],
        [
          { label: 'Flash', lat: -15.39576181, long: -47.42236352 },
          { label: 'Final Assembly', lat: 52.52, long: 13.405 },
        ],
        [
          { label: 'Strap', lat: 13.97617718, long: 107.9970552 },
          { label: 'Bag', lat: 37.51562299, long: 13.7621899 },
          { label: 'Final Assembly', lat: 52.52, long: 13.405 },
        ],
        [
          { label: 'USB cable', lat: 40.24073428, long: 117.7730985 },
          { label: 'Final Assembly', lat: 52.52, long: 13.405 },
        ],
        [
          { label: 'Storage', lat: 37.42430086, long: 126.7640152 },
          { label: 'Logic board', lat: 36.02885615, long: 140.2290113 },
        ],
        [
          { label: 'Software', lat: 13.09965792, long: 80.22204975 },
          { label: 'Logic board', lat: 36.02885615, long: 140.2290113 },
          { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
        ],
        [
          { label: 'Battery', lat: 14.41657988, long: 121.2177977 },
          { label: 'Body', lat: 17.33703582, long: 76.83375983 },
          { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
        ],
        [
          { label: 'LCD Screen', lat: 35.83101982, long: 128.6385217 },
          { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
        ],
        [
          { label: 'Lens', lat: 13.79431884, long: 100.5243153 },
          { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
        ],
        [
          { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
          { label: 'Final Assembly', lat: 52.52, long: 13.405 },
          { label: 'Warehouse', lat: 51.45272333, long: -0.9722902991 },
        ],
      ],
      labels: [
        { label: 'Bag', lat: 37.51562299, long: 13.7621899 },
        { label: 'Battery', lat: 14.41657988, long: 121.2177977 },
        { label: 'Charger', lat: 22.0982223, long: -98.0962343 },
        { label: 'Body', lat: 17.33703582, long: 76.83375983 },
        { label: 'Flash', lat: -15.39576181, long: -47.42236352 },
        { label: 'LCD Screen', lat: 35.83101982, long: 128.6385217 },
        { label: 'Lens', lat: 13.79431884, long: 100.5243153 },
        { label: 'Logic board', lat: 36.02885615, long: 140.2290113 },
        { label: 'Software', lat: 13.09965792, long: 80.22204975 },
        { label: 'Storage', lat: 37.42430086, long: 126.7640152 },
        { label: 'Strap', lat: 13.97617718, long: 107.9970552 },
        { label: 'USB cable', lat: 40.24073428, long: 117.7730985 },
        { label: 'Chengdu Assembly', lat: 30.65786276, long: 104.0659259 },
        { label: 'Final Assembly', lat: 52.52, long: 13.405 },
        { label: 'Warehouse', lat: 51.45272333, long: -0.9722902991 },
      ],
    });
  }
}

type SupplyChain = {
  paths: LabeledPoint[][];
  labels: LabeledPoint[];
};

type LabeledPoint = {
  label?: string;
  lat: number;
  long: number;
};
