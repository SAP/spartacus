import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ClearCartService } from './clear-cart.service';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartDialogComponent implements OnDestroy {
  iconTypes = ICON_TYPE;
  isClearing$: Observable<boolean> =
    this.clearCartService.getClearingCartProgess();

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected el: ElementRef,
    protected clearCartService: ClearCartService
  ) {}

  clear(): void {
    this.clearCartService.clearActiveCart();
  }

  close(reason: string): void {
    this.clearCartService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.close('close dialog on component destroy');
  }
}
