import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { expand, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

const ONE_DAY = 24 * 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class CpqAccessStorageService {
  constructor(protected cpqAccessLoaderService: CpqAccessLoaderService) {}

  protected cpqAccessData: Observable<Cpq.AccessData>;
  protected currentCpqAccessData: Cpq.AccessData;
  protected cache: BehaviorSubject<Cpq.AccessData>;

  getCachedCpqAccessData(): Observable<Cpq.AccessData> {
    if (!this.cpqAccessData) {
      this.cpqAccessData = this.cpqAccessLoaderService.getCpqAccessData().pipe(
        expand((data) =>
          timer(this.tokenExpiresIn(data)).pipe(
            switchMap(() => this.cpqAccessLoaderService.getCpqAccessData())
          )
        ),
        // filter we only need, because of tests having too strict input (emmitting an already expired token, shall not happen)
        filter((data) => !this.isTokenExpired(data)),
        tap((data) => (this.currentCpqAccessData = data)),
        shareReplay(1)
      );
    }
    return this.cpqAccessData;
  }

  protected tokenExpiresIn(data: Cpq.AccessData) {
    // we schedule a request to update our cache some time before expiration (10 seconds)
    let expiresIn: number = data.tokenExpirationTime - Date.now() - 10;
    if (expiresIn < 0) {
      expiresIn = 0;
    }
    if (expiresIn > ONE_DAY) {
      expiresIn = ONE_DAY;
    }
    return expiresIn;
  }

  protected isTokenExpired(tokenData: Cpq.AccessData) {
    return Date.now() > tokenData.tokenExpirationTime;
  }

  clearCachedCpqAccessData() {
    this.cpqAccessData = undefined;
  }
}
