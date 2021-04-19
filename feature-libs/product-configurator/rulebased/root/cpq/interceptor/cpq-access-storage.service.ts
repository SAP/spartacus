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
import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';

@Injectable({ providedIn: 'root' })
export class CpqAccessStorageService {
  protected readonly EXPIRED_TOKEN = {
    accessToken: 'INVALID DUMMY',
    accessTokenExpirationTime: 0,
  };

  constructor(
    protected cpqAccessLoaderService: CpqAccessLoaderService,
    protected authService: AuthService,
    protected config: CpqConfiguratorAuthConfig
  ) {}

  protected cpqAccessObservable: Observable<CpqAccessData>;
  protected currentCpqAccessSubscription: Subscription;
  protected cpqAccessDataCache: BehaviorSubject<CpqAccessData>;

  protected currentCpqSessionId: string | null = null;

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
    const authSettings = this.config.productConfigurator.cpq.authentication;
    // we schedule a request to update our cache some time before expiration
    let fetchNextIn: number =
      data.accessTokenExpirationTime -
      Date.now() -
      authSettings.tokenExpirationBuffer;
    if (fetchNextIn < authSettings.tokenMinValidity) {
      fetchNextIn = authSettings.tokenMinValidity;
    } else if (fetchNextIn > authSettings.tokenMaxValidity) {
      fetchNextIn = authSettings.tokenMaxValidity;
    }
    return fetchNextIn;
  }

  protected isTokenExpired(tokenData: CpqAccessData) {
    return (
      Date.now() >
      tokenData.accessTokenExpirationTime -
        this.config.productConfigurator.cpq.authentication.tokenExpirationBuffer
    );
  }

  get cpqSessionId(): string | null {
    return this.currentCpqSessionId;
  }
  set cpqSessionId(cpqSessionId: string | null) {
    this.currentCpqSessionId = cpqSessionId;
  }
}
