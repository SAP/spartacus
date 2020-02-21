import { Component, OnDestroy } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalService } from '../../../shared/components/modal/modal.service';

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
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  viewDetails(): void {
    this.hideBanner();
    this.modalService.open(AnonymousConsentDialogComponent, {
      centered: true,
      size: 'lg',
    });
  }

  allowAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService
        .giveAllConsents()
        .pipe(tap(_ => this.hideBanner()))
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
