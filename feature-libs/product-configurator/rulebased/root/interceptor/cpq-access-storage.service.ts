import { Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import {
  distinctUntilChanged,
  expand,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

export abstract class CpqConfiguratorTokenConfig {
  cpqConfigurator: {
    /* We should stop using/sending a token shortly before expiration,
     * to avoid that it is actually expired when evaluated in the target system.
     * Time given in ms. */
    tokenExpirationBuffer: number;
    /* max time in ms to pass until a token is considered expired and refetched,
     * even if token expiration time is longer */
    tokenMaxValidity: number;
    /* min time to pass until a token is refecthed, even if token expiration time is shorter */
    tokenMinValidity: number;
  };
}

export const DefaultCpqConfiguratorTokenConfig: CpqConfiguratorTokenConfig = {
  cpqConfigurator: {
    tokenExpirationBuffer: 10000, // ten seconds
    tokenMaxValidity: 24 * 60 * 60 * 1000, //one day
    tokenMinValidity: 5000, // five seconds
  },
};

@Injectable({ providedIn: 'root' })
export class CpqAccessStorageService {
  protected readonly EXPIRED_TOKEN = {
    accessToken: 'INVALID DUMMY',
    accessTokenExpirationTime: 0,
  };

  constructor(
    protected cpqAccessLoaderService: CpqAccessLoaderService,
    protected authService: AuthService,
    protected config: CpqConfiguratorTokenConfig
  ) {}

  protected cpqAccessObservable: Observable<CpqAccessData>;
  protected currentCpqAccessSubscription: Subscription;
  protected cpqAccessDataCache: BehaviorSubject<CpqAccessData>;

  getCachedCpqAccessData(): Observable<CpqAccessData> {
    if (!this.cpqAccessObservable) {
      this.initCpqAccessObservable();
    }
    return this.cpqAccessObservable;
  }

  /**
   * Renews the current access data. All subscribers of getCachedCpqAccessData()
   * will receive the new data. Will only have an effect, if there are any subscribers
   * and the user is logged in.
   */
  renewCachedCpqAccessData() {
    // only force token refresh if initialized.
    if (this.cpqAccessObservable) {
      this.stopAutoFetchingCpqAccessData();
      this.cpqAccessDataCache.next(this.EXPIRED_TOKEN); // invalidate cache
      this.authService
        .isUserLoggedIn()
        .pipe(take(1)) // get current login state
        .subscribe((loggedIn) => {
          // only fetch new token if user is logged in.
          if (loggedIn) {
            this.startAutoFetchingCpqAccessData();
          }
        });
    }
  }

  protected initCpqAccessObservable() {
    this.cpqAccessDataCache = new BehaviorSubject(this.EXPIRED_TOKEN);
    this.cpqAccessObservable = this.cpqAccessDataCache.pipe(
      // Never expose expired tokens - either cache was invalidated with expired token,
      // or the cached one expired before a new one was fetched.
      filter((data) => !this.isTokenExpired(data))
    );
    this.authService
      .isUserLoggedIn()
      .pipe(distinctUntilChanged()) // only react if user login status changes
      .subscribe((loggedIn) => {
        if (loggedIn) {
          // user logged in - start/stop to ensure token is refreshed
          this.stopAutoFetchingCpqAccessData();
          this.startAutoFetchingCpqAccessData();
        } else {
          // user logged of - cancel token fetching
          this.stopAutoFetchingCpqAccessData();
          this.cpqAccessDataCache.next(this.EXPIRED_TOKEN); // invalidate cache
        }
      });
  }

  protected stopAutoFetchingCpqAccessData() {
    this.currentCpqAccessSubscription?.unsubscribe();
  }

  protected startAutoFetchingCpqAccessData() {
    this.currentCpqAccessSubscription = this.cpqAccessLoaderService
      .getCpqAccessData()
      .pipe(
        expand((data) =>
          timer(this.fetchNextTokenIn(data)).pipe(
            switchMap(() => this.cpqAccessLoaderService.getCpqAccessData())
          )
        )
      )
      .subscribe(this.cpqAccessDataCache); // also propagate errors
  }

  protected fetchNextTokenIn(data: CpqAccessData) {
    // we schedule a request to update our cache some time before expiration
    let fetchNextIn: number =
      data.accessTokenExpirationTime -
      Date.now() -
      this.config.cpqConfigurator.tokenExpirationBuffer;
    if (fetchNextIn < this.config.cpqConfigurator.tokenMinValidity) {
      fetchNextIn = this.config.cpqConfigurator.tokenMinValidity;
    } else if (fetchNextIn > this.config.cpqConfigurator.tokenMaxValidity) {
      fetchNextIn = this.config.cpqConfigurator.tokenMaxValidity;
    }
    return fetchNextIn;
  }

  protected isTokenExpired(tokenData: CpqAccessData) {
    return (
      Date.now() >
      tokenData.accessTokenExpirationTime -
        this.config.cpqConfigurator.tokenExpirationBuffer
    );
  }
}
