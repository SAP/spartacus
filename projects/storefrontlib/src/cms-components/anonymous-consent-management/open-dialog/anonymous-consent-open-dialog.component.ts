import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { AnonymousConsentLaunchDialogService } from '../anonymous-consent-launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  @ViewChild('open') openElement: ElementRef;

  constructor(
    protected vcr: ViewContainerRef,
    protected anonymousConsentLaunchDialogService: AnonymousConsentLaunchDialogService
  ) {}

  openDialog(): void {
    const dialog = this.anonymousConsentLaunchDialogService.openDialog(
      this.openElement,
      this.vcr
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
