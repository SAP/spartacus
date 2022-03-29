import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
  DialogComponent,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-product-image-zoom-dialog',
  templateUrl: 'product-image-zoom-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageZoomDialogComponent extends DialogComponent {
  iconType = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @Input() galleryIndex: number;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {
    super(launchDialogService, el);
  }
}
