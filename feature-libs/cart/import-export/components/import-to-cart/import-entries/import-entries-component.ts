import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ImportContext,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';

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
