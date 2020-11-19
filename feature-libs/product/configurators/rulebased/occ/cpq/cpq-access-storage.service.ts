import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { publishReplay, refCount, switchMap, tap } from 'rxjs/operators';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

@Injectable({ providedIn: 'root' })
export class CpqAccessStorageService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;
  protected nextCpqAccessData: Observable<Cpq.AccessData>;
  protected currentCpqAccessData: Cpq.AccessData;

  getCachedCpqAccessData(): Observable<Cpq.AccessData> {
    if (!this.cpqAccessData) {
      this.cpqAccessData = this.cpqAccessLoaderService.getCpqAccessData().pipe(
        publishReplay(1),
        refCount(),
        switchMap((data) => {
          if (this.isTokenExpired(data)) {
            // token expired - fetch a new one and emit it instead
            if (!this.nextCpqAccessData) {
              //ensure we only fecth one new token
              this.clearCachedCpqAccessData();
              console.log('fetch next');
              this.nextCpqAccessData = this.getCachedCpqAccessData();
            }
            return this.nextCpqAccessData;
          }

          return of(data); // token not expired - emit it.*/
        }),
        tap((data) => {
          console.log('store current');
          this.currentCpqAccessData = data;
        })
      );
    }
    return this.cpqAccessData;
  }

  protected isTokenExpired(tokenData: Cpq.AccessData) {
    return Date.now() > tokenData.tokenExpirationTime;
  }

  clearCachedCpqAccessData() {
    this.cpqAccessData = undefined;
  }
}
