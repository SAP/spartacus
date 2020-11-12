import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Cpq } from './../../cpq/cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqAccessLoaderService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {}

  getCpqAccessData(): Observable<Cpq.AccessData> {
    return this.http.get<Cpq.AccessData>(
      this.occEndpointsService.getUrl('getCpqAccessData')
    );
  }
}
