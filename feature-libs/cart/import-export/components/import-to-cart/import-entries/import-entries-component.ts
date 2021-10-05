import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { AbstractImportExportService } from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  @Input()
  service: AbstractImportExportService;

  constructor(protected launchDialogService: LaunchDialogService) {}

  openDialog(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      this.service
    );
  }
}
