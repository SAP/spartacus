import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ActiveCartFacade, Cart } from '@spartacus/cart/main/root';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-clear-cart',
  templateUrl: './clear-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartComponent implements OnInit {
  cart$: Observable<Cart>;
  private subscription = new Subscription();
  @ViewChild('element') element: ElementRef;

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
  }

  openDialog(event: Event): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CLEAR_CART,
      this.element,
      this.vcr
    );
    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
    event.stopPropagation();
  }
}
