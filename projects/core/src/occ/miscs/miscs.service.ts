import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Occ } from '../../occ/occ-models/occ.models';
import { OccEndpointsService } from '../services/occ-endpoints.service';

const ENDPOINT_REGIONS = 'regions';
const COUNTRIES_ENDPOINT = 'countries';

@Injectable({
  providedIn: 'root',
})
export class OccMiscsService {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  loadRegions(countryIsoCode: string): Observable<Occ.RegionList> {
    return this.http
      .get<Occ.RegionList>(
        this.occEndpoints.getEndpoint(this.buildRegionsUrl(countryIsoCode))
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private buildRegionsUrl(countryIsoCode: string): string {
    return `${COUNTRIES_ENDPOINT}/${countryIsoCode}/${ENDPOINT_REGIONS}`;
  }
}
