import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { publishReplay, refCount, switchMap } from 'rxjs/operators';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

@Injectable({ providedIn: 'root' })
export class CpqAccessStorgeService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;
  protected requestedAt: number;

  getCachedCpqAccessData(): Observable<Cpq.AccessData> {
    if (!this.cpqAccessData) {
      this.requestedAt = Date.now();
      this.cpqAccessData = this.cpqAccessLoaderService.getCpqAccessData().pipe(
        publishReplay(1),
        refCount(),
        switchMap((data) => {
          if (this.isTokenExpired(data)) {
            // token expired - fetch a new one and emit it instead
            this.clearCachedAccessData();
            this.cpqAccessData = this.getCachedCpqAccessData();
            return this.cpqAccessData;
          }
          return of(data); // token not expired - emit it.
        })
      );
    }
    return this.cpqAccessData;
  }

  protected isTokenExpired(tokenData: Cpq.AccessData) {
    return Date.now() > this.requestedAt + tokenData.tokenExpirationTime;
  }

  clearCachedAccessData() {
    this.cpqAccessData = undefined;
  }
}
