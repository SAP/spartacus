import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';
import { LAUNCH_CALLER } from '../../../layout/launch-dialog/config/launch-config';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  @ViewChild('open') openElement: ElementRef;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ANONYMOUS_CONSENT,
      this.openElement,
      this.vcr
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
