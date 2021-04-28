import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  @ViewChild('open') openElement: ElementRef;

  // TODO(#12167): make launchDialogService a required dependency instead of anonymousConsentLaunchDialogService and remove deprecated constructor
  /**
   * Default constructor
   *
   * @param {ViewContainerRef} vcr
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
  /**
   * @deprecated since 3.3
   */
  constructor(
    vcr: ViewContainerRef,
    anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService
  );
  constructor(
    protected vcr: ViewContainerRef,
    protected anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService,
    protected launchDialogService?: LaunchDialogService
  ) {}

  openDialog(): void {
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.ANONYMOUS_CONSENT,
        this.openElement,
        this.vcr
      );
      if (dialog) {
        dialog.pipe(take(1)).subscribe();
      }
    } else {
      const dialog = this.anonymousConsentLaunchDialogService.openDialog(
        this.openElement,
        this.vcr
      );
      if (dialog) {
        dialog.pipe(take(1)).subscribe();
      }
    }
  }
}
