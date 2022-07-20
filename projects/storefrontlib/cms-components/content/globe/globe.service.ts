import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobeService {
  constructor(private httpClient: HttpClient) {}

  getGeoData(): Observable<any> {
    return this.httpClient.get(
      'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_populated_places_simple.geojson'
    );
  }
}
