import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import {
  ICON_TYPE,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ImageZoomDialogComponent } from '../dialog/image-zoom-dialog.component';

@Component({
  selector: 'cx-image-zoom-trigger',
  templateUrl: 'image-zoom-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageZoomTriggerComponent {
  iconType = ICON_TYPE;
  protected subscriptions = new Subscription();

  @Input() galleryIndex: number;
  @Input() set expandImage(expand: boolean) {
    if (expand) {
      this.toggleZoom();
    }
  }

  @Output() dialogClose = new EventEmitter<void>();

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  /**
   * Method to open the zoom dialog
   */
  toggleZoom(): void {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.IMAGE_ZOOM,
      this.vcr
    );
    if (component) {
      this.subscriptions.add(
        combineLatest([component, this.launchDialogService.dialogClose])
          .pipe(
            tap(([comp]) => {
              if (this.galleryIndex) {
                (comp as ComponentRef<
                  ImageZoomDialogComponent
                >).instance.galleryIndex = this.galleryIndex;
              }
            }),
            filter(([, close]) => Boolean(close)),
            tap(([comp]) => {
              this.launchDialogService.clear(LAUNCH_CALLER.IMAGE_ZOOM);
              comp.destroy();
              this.dialogClose.emit();
            })
          )
          .subscribe()
      );
    }
  }
}
