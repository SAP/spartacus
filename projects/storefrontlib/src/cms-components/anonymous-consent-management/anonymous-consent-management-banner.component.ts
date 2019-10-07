import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  first,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AnonymousConsentsDialogComponent } from '../../shared/components/anonymous-consents/dialog/anonymous-consents-dialog.component';
import { ModalService } from '../../shared/components/modal/index';

@Component({
  selector: 'cx-anonymous-consent-management-banner',
  templateUrl: './anonymous-consent-management-banner.component.html',
  styleUrls: ['./anonymous-consent-management-banner.component.scss'],
})
export class AnonymousConsentManagementBannerComponent
  implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  bannerVisible$: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  ngOnInit(): void {
    this.bannerVisible$ = this.anonymousConsentsService
      .getAnonymousConsentTemplates()
      .pipe(
        take(1),
        first(),
        switchMap(currentTemplates =>
          this.anonymousConsentsService
            .checkAnonymousConsentTemplateUpdates(currentTemplates)
            .pipe(take(1))
        ),
        withLatestFrom(
          this.anonymousConsentsService.isAnonymousConsentsBannerVisible()
        ),
        map(([isUpdated, isVisible]) => isUpdated || isVisible)
      );
  }

  viewDetails(): void {
    this.hideBanner();
    this.modalService.open(AnonymousConsentsDialogComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }

  allowAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService
        .giveAllAnonymousConsents()
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
