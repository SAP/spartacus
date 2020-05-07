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
  @ViewChild('trigger') trigger: ElementRef<HTMLElement>;

  protected open$ = new BehaviorSubject(false);

  /**
   * Emits the open state that indicates whether the facet list should be rendered.
   * This is either done instantly, or after the user triggers this by using the trigger
   * button. This driven by the visiibility of the trigger, so that the CSS drives
   * the behaviour. This can differ per breakpoint.
   *
   * There's a configurable delay for the closed state, so that the DOM is not removed
   * before some CSS animations are done.
   */
  isOpen$: Observable<boolean> = this.breakpointService.breakpoint$.pipe(
    // deffer emitting a new value to the next micro-task to ensure that the `hasTrigger`
    // method represents the actual UI state.
    observeOn(asapScheduler),
    switchMap(() => (this.hasTrigger ? this.open$ : of(true))),
    delayWhen((launched) => interval(launched ? 0 : this.CLOSE_DELAY))
  );

  /**
   * Emits the active state that indicates whether the facet list is activated. Activation
   * is related to the css, so that a animation or transition can visualize opening/closing
   * the list (i.e. dialog).
   */
  isActive$ = this.open$.pipe(
    // deffer emitting a new value to the next micro-task to ensure the active class is
    //  applied after the DOM is created
    observeOn(asapScheduler)
  );

  constructor(protected breakpointService: BreakpointService) {}

  launch() {
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
    this.trigger.nativeElement.focus();
  }

  /**
   * Indicates that the facet navigation should be open explicitely by a trigger.
   * This is fully controlled by CSS, where the trigger button can be hidden
   * (display:none) for certain screen sizes.
   */
  get hasTrigger() {
    return this.trigger.nativeElement.offsetParent !== null;
  }
}
