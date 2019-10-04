import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
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
        switchMap(currentTemplates =>
          this.anonymousConsentsService.checkAnonymousConsentTemplateUpdates(
            currentTemplates
          )
        ),
        withLatestFrom(
          this.anonymousConsentsService.isAnonymousConsentsBannerVisible()
        ),
        map(([isUpdated, isVisible]) => isUpdated || isVisible)
      );

    //############# 1
    /*
    this.bannerVisible$ = this.anonymousConsentsService
      .getAnonymousConsentTemplates()
      .pipe(
        withLatestFrom(currentTemplates => {
          if (DELETE_ME) {
            console.log(
              'THIS MUST BE CALLED ONLY ONCE! OTHERWISE IT IS AN ENDLESS LOOP'
            );
          }
          return this.anonymousConsentsService
            .checkAnonymousConsentTemplateUpdates(currentTemplates)
            .pipe(
              exhaustMap(templatesUpdated => {
                if (templatesUpdated) {
                  this.anonymousConsentsService.toggleAnonymousConsentsBannerVisibility(
                    true
                  );
                }
                return this.anonymousConsentsService.isAnonymousConsentsBannerVisible();
              })
            );
        }),
        mergeMap(x => x)
      );
      */

    // this.bannerVisible$ = this.anonymousConsentsService.checkAnonymousConsentTemplateUpdates(this.anonymousConsentsService.getAnonymousConsentTemplates())
    // this.bannerVisible$ = this.anonymousConsentsService.isAnonymousConsentsBannerVisible();
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
