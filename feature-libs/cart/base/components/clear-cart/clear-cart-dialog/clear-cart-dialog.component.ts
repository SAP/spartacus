import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import {
  ICON_TYPE,
  FocusConfig,
  LaunchDialogService,
  DialogComponent,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartDialogComponent extends DialogComponent {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button.btn-primary',
    focusOnEscape: true,
  };

  isClearing: boolean = false;

  iconTypes = ICON_TYPE;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected clearCartDialogComponentService: ClearCartDialogComponentService
  ) {
    super(launchDialogService, el);
  }

  clearCart(): void {
    this.isClearing = true;
    this.clearCartDialogComponentService
      .deleteActiveCart()
      .subscribe(() => this.close('Close dialog after cart cleared'));
  }
}
