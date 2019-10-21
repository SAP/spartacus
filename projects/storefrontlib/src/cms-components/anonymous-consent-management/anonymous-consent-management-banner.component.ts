import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsentsService,
  ANONYMOUS_CONSENTS_FEATURE,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnonymousConsentsDialogComponent } from '../../shared/components/anonymous-consents/dialog/anonymous-consents-dialog.component';
import { ModalService } from '../../shared/components/modal/index';

@Component({
  selector: 'cx-anonymous-consent-management-banner',
  templateUrl: './anonymous-consent-management-banner.component.html',
})
export class AnonymousConsentManagementBannerComponent
  implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  anonymousConsentsFeature = ANONYMOUS_CONSENTS_FEATURE;
  bannerVisible$: Observable<boolean>;
  templatesUpdated$: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  ngOnInit(): void {
    this.templatesUpdated$ = this.anonymousConsentsService
      .getTemplatesUpdated()
      .pipe(
        tap(updated => {
          if (updated) {
            this.anonymousConsentsService.toggleAnonymousConsentsBannerVisibility(
              true
            );
          }
        })
      );
    this.bannerVisible$ = this.anonymousConsentsService.isAnonymousConsentsBannerVisible();
  }

  viewDetails(): void {
    this.hideBanner();
    this.modalService.open(AnonymousConsentsDialogComponent, {
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
    this.anonymousConsentsService.toggleAnonymousConsentsBannerVisibility(
      false
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
