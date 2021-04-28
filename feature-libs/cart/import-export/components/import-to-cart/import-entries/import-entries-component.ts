import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ImportEntriesLaunchDialogService } from 'feature-libs/cart/import-export/core/services/import-entries-launch-dialog.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent implements OnDestroy {
  private subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected vcr: ViewContainerRef,
    protected importEntriesLaunchDialogService: ImportEntriesLaunchDialogService
  ) {}

  openDialog(): void {
    const dialog = this.importEntriesLaunchDialogService.openDialog(
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
