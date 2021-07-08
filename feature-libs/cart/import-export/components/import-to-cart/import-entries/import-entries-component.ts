import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  CmsComponentData,
} from '@spartacus/storefront';
import { CmsImportEntriesComponent } from '@spartacus/cart/import-export/core';

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
    protected launchDialogService: LaunchDialogService,
    protected componentData: CmsComponentData<CmsImportEntriesComponent>
  ) {}

  openDialog(): void {
    this.subscription.add(
      this.componentData.data$
        .pipe(
          map((componentData: CmsImportEntriesComponent) => {
            return this.launchDialogService.openDialog(
              LAUNCH_CALLER.IMPORT_TO_CART,
              this.element,
              this.vcr,
              componentData.fileValidity
            );
          }),
          take(1)
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
