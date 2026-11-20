/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  ViewContainerRef,
  inject,
  output,
  input,
  viewChild,
} from '@angular/core';
import {
  FeatureDirective,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Subscription, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ProductImageZoomDialogComponent } from '../product-image-zoom-dialog/product-image-zoom-dialog.component';

@Component({
  selector: 'cx-product-image-zoom-trigger',
  templateUrl: 'product-image-zoom-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureDirective, IconComponent, TranslatePipe],
})
export class ProductImageZoomTriggerComponent implements OnDestroy {
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);

  iconType = ICON_TYPE;
  protected subscriptions = new Subscription();

  //Expose the expand button so it can gain focus on closing the zoom window
  readonly expandButton = viewChild<ElementRef>('expandButton');

  readonly galleryIndex = input<number>();
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set expandImage(expand: boolean) {
    if (expand) {
      this.triggerZoom();
    }
  }

  readonly dialogClose = output<void>();

  constructor() {
    useFeatureStyles('a11yLinkBtnsToTertiaryBtns');
  }

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
              const galleryIndex = this.galleryIndex();
              if (galleryIndex) {
                (
                  comp as ComponentRef<ProductImageZoomDialogComponent>
                ).instance.galleryIndex = galleryIndex;
              }
            }),
            filter(([, close]) => Boolean(close)),
            tap(([comp]) => {
              this.launchDialogService.clear(LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM);
              comp?.destroy();
              this.dialogClose.emit();
              this.expandButton()?.nativeElement.focus();
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
