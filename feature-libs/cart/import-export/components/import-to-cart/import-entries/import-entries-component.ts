import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  openDialog(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      this.vcr
    );
  }
}
