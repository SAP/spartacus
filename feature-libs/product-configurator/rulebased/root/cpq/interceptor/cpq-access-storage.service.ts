import { Injectable, OnDestroy } from '@angular/core';
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
export class CpqAccessStorageService implements OnDestroy {
  protected readonly EXPIRED_TOKEN: CpqAccessData = {
    accessToken: 'INVALID DUMMY',
    accessTokenExpirationTime: 0,
    endpoint: '',
  };

  constructor(
    protected cpqAccessLoaderService: CpqAccessLoaderService,
    protected authService: AuthService,
    protected config: CpqConfiguratorAuthConfig
  ) {}

  ngOnDestroy(): void {
    this.currentCpqAccessSubscription?.unsubscribe();
    this.currentAuthServiceSubscription?.unsubscribe();
  }

  protected cpqAccessData$: Observable<CpqAccessData>;
  protected currentCpqAccessSubscription: Subscription;
  protected currentAuthServiceSubscription: Subscription;
  protected _cpqAccessData$: BehaviorSubject<CpqAccessData>;

  getCpqAccessData(): Observable<CpqAccessData> {
    if (!this.cpqAccessData$ || this._cpqAccessData$.hasError) {
      this.initCpqAccessData();
    }
    return this.cpqAccessData$;
  }

  /**
   * Renews the current access data. All subscribers of getCachedCpqAccessData()
   * will receive the new data. Will only have an effect, if there are any subscribers
   * and the user is logged in.
   */
  renewCpqAccessData() {
    // only force token refresh if initialized.
    if (this.cpqAccessData$) {
      this.stopAutoFetchingCpqAccessData();
      this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
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

  protected initCpqAccessData() {
    this._cpqAccessData$ = new BehaviorSubject(this.EXPIRED_TOKEN);
    this.cpqAccessData$ = this._cpqAccessData$.pipe(
      // Never expose expired tokens - either cache was invalidated with expired token,
      // or the cached one expired before a new one was fetched.
      filter((data) => !this.isTokenExpired(data))
    );
    this.currentAuthServiceSubscription?.unsubscribe(); // cancel subscriptions created for old

    this.currentAuthServiceSubscription = this.authService
      .isUserLoggedIn()
      .pipe(distinctUntilChanged()) // only react if user login status changes
      .subscribe((loggedIn) => {
        if (loggedIn) {
          // user logged in - start/stop to ensure token is refreshed
          this.stopAutoFetchingCpqAccessData();
          this.startAutoFetchingCpqAccessData();
        } else {
          // user logged out - cancel token fetching
          this.stopAutoFetchingCpqAccessData();
          this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
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
      .subscribe(this._cpqAccessData$); // also propagate errors
  }

  protected fetchNextTokenIn(data: CpqAccessData) {
    const authSettings = this.config.productConfigurator.cpq?.authentication;
    if (authSettings) {
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
    } else {
      throw new Error('CPQ authentication configuration not present');
    }
  }

  protected isTokenExpired(tokenData: CpqAccessData): boolean {
    const authSettings = this.config.productConfigurator.cpq?.authentication;
    if (authSettings) {
      return (
        Date.now() >
        tokenData.accessTokenExpirationTime - authSettings.tokenExpirationBuffer
      );
    } else {
      throw new Error('CPQ authentication configuration not present');
    }
  }
}
