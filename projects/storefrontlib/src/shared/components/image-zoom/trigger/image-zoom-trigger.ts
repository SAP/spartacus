import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { LAUNCH_CALLER } from '../../../../layout/launch-dialog/config/index';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/index';

@Component({
  selector: 'cx-image-zoom-trigger',
  templateUrl: 'image-zoom-trigger.component.html',
})
export class ImageZoomTriggerComponent implements OnDestroy {
  iconTypes = ICON_TYPE;
  protected subscriptions = new Subscription();

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  expandImage(): void {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.IMAGE_ZOOM,
      this.vcr
    );
    if (component) {
      this.subscriptions.add(
        combineLatest([component, this.launchDialogService.dialogClose])
          .pipe(
            filter(([, close]) => close && close !== undefined),
            tap(([comp]) => {
              this.launchDialogService.clear(LAUNCH_CALLER.IMAGE_ZOOM);
              comp.destroy();
            })
          )
          .subscribe()
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
