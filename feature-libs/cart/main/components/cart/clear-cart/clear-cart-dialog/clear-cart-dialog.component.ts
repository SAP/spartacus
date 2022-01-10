import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClearCartService } from '../clear-cart.service';
import { LaunchDialogService, ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartDialogComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected clearCartService: ClearCartService
  ) {}

  ngOnInit(): void {}

  clear(): void {
    this.clearCartService.clearActiveCart();
    this.close('close dialog');
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.close('close dialog');
  }
}
