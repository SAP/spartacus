import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { LAUNCH_CALLER } from '../../../../layout/launch-dialog/config/index';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/index';
import { ImageZoomDialogComponent } from '../dialog/image-zoom-dialog.component';

@Component({
  selector: 'cx-image-zoom-trigger',
  templateUrl: 'image-zoom-trigger.component.html',
})
export class ImageZoomTriggerComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  protected subscriptions = new Subscription();

  @Input() galleryIndex: number;
  @Input() $expandImage: Observable<boolean>;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    // Used to open image by clicking the product in ProductImagesComponent
    if (this.$expandImage) {
      this.subscriptions.add(
        this.$expandImage
          .pipe(
            filter((value) => Boolean(value)),
            tap(() => this.expandImage())
          )
          .subscribe()
      );
    }
  }

  /**
   * Method to open the zoom dialog
   */
  expandImage(): void {
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
                >).instance.galleryItem = this.galleryIndex;
              }
            }),
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
