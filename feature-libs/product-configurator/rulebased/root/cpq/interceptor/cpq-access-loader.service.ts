import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';

@Injectable({ providedIn: 'root' })
export class CpqAccessLoaderService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {}

  getCpqAccessData(): Observable<CpqAccessData> {
    return this.http.get<CpqAccessData>(
      this.occEndpointsService.buildUrl('getCpqAccessData')
    );
  }
}
