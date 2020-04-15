import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { asapScheduler, BehaviorSubject, interval, Subscription } from 'rxjs';
import { delay, delayWhen, filter, observeOn } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFacetNavigationComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  /**
   * We delay the removal of DOM so that animations can finish playing until the
   * DOM is created.
   */
  protected CLOSE_DELAY = 300;

  /**
   * The trigger element is used to open the facet navigation in a dialog.
   * The usage of the dialog depends on the availability of the trigger
   * element, which is driven by CSS.
   *
   * The element reference is also used to refocus the trigger element after
   * the dialog is closed.
   */
  @ViewChild('trigger') dialogTrigger: ElementRef<HTMLElement>;

  /**
   * Indicates whether the facet navigation is launched.
   */
  launched$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  /**
   * Indicates the active state of the dialog. This is used to apply css classes
   * and keyboard focus to the dialog.
   */
  active$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  private subscriptions = new Subscription();

  constructor(protected breakpointService: BreakpointService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.breakpointService.breakpoint$
        .pipe(observeOn(asapScheduler))
        .subscribe(() => this.launched$.next(!this.hasTrigger))
    );

    // when the facet navigation is toggled we delay the activated state
    this.subscriptions.add(
      this.launched$
        .pipe(
          filter((launched) => launched !== undefined),
          delayWhen((launched) =>
            launched ? interval(0) : interval(this.CLOSE_DELAY)
          )
        )
        .subscribe((launched) => {
          if (launched || this.active$.value) {
            this.active$.next(launched === true);
          }
        })
    );

    this.subscriptions.add(
      this.active$
        .pipe(
          filter((active) => active !== undefined),
          delay(this.CLOSE_DELAY)
        )
        .subscribe((active) => {
          if (this.hasTrigger && !active && this.launched$.value === true) {
            this.launched$.next(false);
            this.dialogTrigger.nativeElement.focus();
          }
        })
    );
  }

  /**
   * Indicates that the facet navigation should open in a dialog. This is fully
   * controlled by CSS, where the trigger button can be hidden (display:none)
   * for certain screen sizes.
   */
  get hasTrigger() {
    return this.dialogTrigger.nativeElement.offsetParent !== null;
  }

  /**
   * The trigger button is used to open the facet dialog. The facet
   * dialog will be created first and after some time the `active` class
   * is applied, so that we can animate the dialog.
   *
   * After the dialog is opened, the dialog is focussed to allow
   * for an accessibility flow.
   */
  launch() {
    this.launched$.next(true);
  }

  /**
   * Closes the facet dialog by first removing the `active` class. After
   * little time, we toggle the `isOpen` property, so that the DOM gets
   * removed (so that we can't tab into those elements).
   *
   * The trigger element will be focussed as well.
   */
  close() {
    this.active$.next(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
