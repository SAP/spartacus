import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ICON_TYPE,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ProductImageZoomDialogComponent } from '../product-image-zoom-dialog/product-image-zoom-dialog.component';

@Component({
  selector: 'cx-product-image-zoom-trigger',
  templateUrl: 'product-image-zoom-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageZoomTriggerComponent implements OnDestroy {
  iconType = ICON_TYPE;
  protected subscriptions = new Subscription();

  //Expose the expand button so it can gain focus on closing the zoom window
  @ViewChild('expandButton') expandButton: ElementRef;

  @Input() galleryIndex: number;
  @Input() set expandImage(expand: boolean) {
    if (expand) {
      this.triggerZoom();
    }
  }

  @Output() dialogClose = new EventEmitter<void>();

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  triggerZoom(): void {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM,
      this.vcr
    );
    if (component) {
      this.subscriptions.add(
        combineLatest([component, this.launchDialogService.dialogClose])
          .pipe(
            tap(([comp]) => {
              if (this.galleryIndex) {
                (
                  comp as ComponentRef<ProductImageZoomDialogComponent>
                ).instance.galleryIndex = this.galleryIndex;
              }
            }),
            filter(([, close]) => Boolean(close)),
            tap(([comp]) => {
              this.launchDialogService.clear(LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM);
              comp?.destroy();
              this.dialogClose.emit();
              this.expandButton.nativeElement.focus();
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
