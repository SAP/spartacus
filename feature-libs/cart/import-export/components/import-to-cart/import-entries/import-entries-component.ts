import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { ImportContext } from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  @Input()
  context: ImportContext;

  constructor(protected launchDialogService: LaunchDialogService) {}

  openDialog(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      { context: this.context }
    );
  }
}
