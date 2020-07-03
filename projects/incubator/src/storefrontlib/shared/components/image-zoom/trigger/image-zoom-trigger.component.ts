import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ICON_TYPE,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ImageZoomDialogComponent } from '../dialog/image-zoom-dialog.component';

@Component({
  selector: 'cx-image-zoom-trigger',
  styleUrls: ['image-zoom-trigger.component.scss'],
  templateUrl: 'image-zoom-trigger.component.html',
})
export class ImageZoomTriggerComponent implements OnInit, OnDestroy {
  iconType = ICON_TYPE;
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
                >).instance.galleryIndex = this.galleryIndex;
              }
            }),
            filter(([, close]) => Boolean(close)),
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
