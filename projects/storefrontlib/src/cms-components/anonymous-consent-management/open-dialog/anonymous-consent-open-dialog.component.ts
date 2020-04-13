import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent implements OnDestroy {
  @ViewChild('open') openElement: ElementRef;

  private subscription = new Subscription();

  constructor(
    protected vcr: ViewContainerRef,
    protected anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService
  ) {}

  openDialog(): void {
    const dialog = this.anonymousConsentLaunchDialogService.openDialog({
      openElement: this.openElement,
      vcr: this.vcr,
    });
    if (dialog) {
      this.subscription.add(dialog.subscribe());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
