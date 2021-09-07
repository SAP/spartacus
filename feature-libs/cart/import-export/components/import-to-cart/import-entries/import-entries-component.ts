import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CmsImportEntriesComponent } from '@spartacus/cart/import-export/core';
import {
  CmsComponentData,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  @ViewChild('open') element: ElementRef;

  componentData$ = this.componentData.data$;

  constructor(
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService,
    protected componentData: CmsComponentData<CmsImportEntriesComponent>
  ) {}

  openDialog(cmsData: CmsImportEntriesComponent): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      this.vcr,
      cmsData
    );
  }
}
