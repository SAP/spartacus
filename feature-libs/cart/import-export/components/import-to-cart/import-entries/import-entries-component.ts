import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent implements OnDestroy {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
