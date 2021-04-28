import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-management-banner',
  templateUrl: './anonymous-consent-management-banner.component.html',
})
export class AnonymousConsentManagementBannerComponent implements OnDestroy {
  private subscriptions = new Subscription();

  bannerVisible$: Observable<boolean> = this.anonymousConsentsService.isBannerVisible();

  // TODO(#12167): make launchDialogService a required dependency instead of anonymousConsentLaunchDialogService and remove deprecated constructor
  /**
   * Default constructor
   *
   * @param {AnonymousConsentsService} anonymousConsentsService
   * @param {ViewContainerRef} vcr
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(
    anonymousConsentsService: AnonymousConsentsService,
    vcr: ViewContainerRef,
    launchDialogService: LaunchDialogService
  );

  /**
   * @deprecated since 3.3
   */
  constructor(
    anonymousConsentsService: AnonymousConsentsService,
    anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService,
    vcr: ViewContainerRef
  );
  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService,
    protected vcr: ViewContainerRef,
    protected launchDialogService?: LaunchDialogService
  ) {}

  viewDetails(): void {
    this.hideBanner();
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.ANONYMOUS_CONSENT,
        null,
        this.vcr
      );
      if (dialog) {
        this.subscriptions.add(dialog.subscribe());
      }
    } else {
      const dialog = this.anonymousConsentLaunchDialogService.openDialog(
        null,
        this.vcr
      );
      if (dialog) {
        this.subscriptions.add(dialog.subscribe());
      }
    }
  }

  allowAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService
        .giveAllConsents()
        .pipe(tap(() => this.hideBanner()))
        .subscribe()
    );
  }

  hideBanner(): void {
    this.anonymousConsentsService.toggleBannerDismissed(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
