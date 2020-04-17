import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { asapScheduler, BehaviorSubject, interval, Observable, of } from 'rxjs';
import { delayWhen, observeOn, switchMap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFacetNavigationComponent {
  iconTypes = ICON_TYPE;

  /**
   * We delay the removal of DOM so that animations can finish playing before the
   * DOM is removed. Removing the DOM, as hidding is not enough to stop elements
   * to be focused.
   */
  protected CLOSE_DELAY = 300;

  /**
   * Used to open the facet navigation in a dialog. The usage of the dialog depends
   * on the availability of the trigger element, which is driven by CSS.
   *
   * The reference is also used to refocus the trigger after the dialog is closed.
   */
  @ViewChild('dialogTrigger') dialogTrigger: ElementRef<HTMLElement>;

  protected open$ = new BehaviorSubject(false);

  isOpen$: Observable<boolean> = this.breakpointService.breakpoint$.pipe(
    observeOn(asapScheduler),
    switchMap(() => (this.hasTrigger ? this.open$ : of(true))),
    delayWhen((launched) => interval(launched ? 0 : this.CLOSE_DELAY))
  );

  isActive$ = this.open$.pipe(observeOn(asapScheduler));

  constructor(protected breakpointService: BreakpointService) {}

  launch() {
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
    this.dialogTrigger.nativeElement.focus();
  }

  /**
   * Indicates that the facet navigation should be open explicitely by a trigger.
   * This is fully controlled by CSS, where the trigger button can be hidden
   * (display:none) for certain screen sizes.
   */
  get hasTrigger() {
    return this.dialogTrigger.nativeElement.offsetParent !== null;
  }
}
