import { Injectable, OnDestroy } from '@angular/core';
import { AuthConfig, AuthService, AuthStorageService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  EMPTY,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
  timer,
} from 'rxjs';

@Injectable()
export class ExtendSessionDialogService implements OnDestroy {
  protected subscription: Subscription;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected authStorageService: AuthStorageService,
    protected authConfig: AuthConfig,
    protected authService: AuthService
  ) {
    this.initialize();
  }

  /**
   * Initializes the session extension warning mechanism.
   *
   * @protected
   */
  protected initialize(): void {
    if (!this.isWarningEnabled()) {
      return;
    }

    const warningInterval =
      this.authConfig.authentication?.sessionExpirationWarning?.interval;
    if (warningInterval) {
      this.listenForToken(warningInterval);
    }
  }

  /**
   * Checks if the session expiration warning is enabled in the configuration.
   *
   * @returns boolean - Returns true if the warning is enabled, false otherwise.
   */
  isWarningEnabled(): boolean {
    const config = this.authConfig.authentication?.sessionExpirationWarning;

    return !!config?.enabled;
  }

  /**
   * Opens a modal dialog to warn the user about session expiration.
   *
   * @param timeLeft - The time left in seconds before the session expires.
   */
  openModal(timeLeft: number): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.EXTEND_SESSION,
      undefined,
      { timeLeft }
    );
  }

  /**
   * Closes the modal dialog.
   *
   * @param reason - Optional reason for closing the dialog.
   */
  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  /**
   * Listens for changes in the authentication token and sets up a timer to
   * open the session expiration warning modal.
   *
   * @param interval - The interval in seconds before the session expiration to show the warning.
   * @protected
   */
  protected listenForToken(interval: number) {
    this.subscription = combineLatest([
      this.authStorageService
        .getToken()
        .pipe(
          filter((token) =>
            Boolean(token && token.expires_at && token.refresh_token)
          )
        ),
      this.authService.isUserLoggedIn(),
    ])
      .pipe(
        distinctUntilChanged(
          ([prevToken, prevIsLoggedIn], [currToken, currIsLoggedIn]) =>
            prevToken.expires_at === currToken.expires_at &&
            prevIsLoggedIn === currIsLoggedIn
        ),
        switchMap(([token, isLoggedIn]) => {
          if (!token.expires_at || !isLoggedIn) {
            return EMPTY;
          }

          const tokenExpiresIn = Math.floor(
            (new Date(Number(token.expires_at)).getTime() - Date.now()) / 1000
          );
          // If token expires sooner than `{interval}` seconds, adjust the interval
          const adjustedInterval = Math.min(interval, tokenExpiresIn);

          const delayTimeMs = (tokenExpiresIn - adjustedInterval) * 1000;
          return timer(delayTimeMs).pipe(
            tap(() => this.openModal(adjustedInterval))
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
