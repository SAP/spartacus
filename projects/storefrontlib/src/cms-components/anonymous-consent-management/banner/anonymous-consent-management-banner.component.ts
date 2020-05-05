import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-management-banner',
  templateUrl: './anonymous-consent-management-banner.component.html',
})
export class AnonymousConsentManagementBannerComponent implements OnDestroy {
  private subscriptions = new Subscription();

  bannerVisible$: Observable<
    boolean
  > = this.anonymousConsentsService.isBannerVisible();

  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  viewDetails(): void {
    this.hideBanner();
    const dialog = this.anonymousConsentLaunchDialogService.openDialog(
      null,
      this.vcr
    );
    if (dialog) {
      this.subscriptions.add(dialog.subscribe());
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
