import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { FacetDialogComponent } from './facet-dialog';
import { DialogMode } from './facet.model';

const DELAY = 200;

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent implements AfterViewInit {
  iconTypes = ICON_TYPE;

  /**
   * The trigger element is used to open the facet navigation in a dialog.
   * The usage of the dialog depends on the availability of the trigger
   * element, which is driven by CSS.
   *
   * The element reference is also used to refocus the trigger element after
   * the dialog is closed.
   */
  @ViewChild('dialogTrigger') dialogTrigger: ElementRef<HTMLElement>;

  /**
   * The dialog element reference is used to focus the dialog once it's launched
   * and add an `active` class to it.
   */
  @ViewChild(FacetDialogComponent, { read: ElementRef }) dialog: ElementRef<
    HTMLElement
  >;

  /** Indicates that the dialog is loaded.  */
  isLoaded: boolean;

  /**
   * Indicates that the dialog is opened.
   *
   * This is default in inline mode, but requires explicit action in mobile mode.
   */
  isOpen: boolean;

  /**
   * Indicates that the facet navigation is rendered in dialog, often
   * a modal or sidenav. The dialog experience is driven by CSS
   */
  dialogMode$: Observable<DialogMode>;

  constructor(
    protected breakpointService: BreakpointService,
    protected cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    // We initiate the dialogMode inside the `AfterViewInit` so that we can detect
    // the availability of the trigger element.
    this.dialogMode$ = this.breakpointService.breakpoint$.pipe(
      map(() => (this.hasTrigger ? DialogMode.POP : DialogMode.INLINE)),
      distinctUntilChanged(),
      tap(() => (this.isOpen = false))
    );
    // given that we've done this after view init, we need to kick the cd once more.
    this.cd.markForCheck();
  }

  /**
   * Indicates that the facet naviation should open in a dialog. This is fully
   * controlled by CSS, where the trigger button can be hidden (display:none)
   * for certain screen sizes.
   */
  protected get hasTrigger() {
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
    this.isOpen = true;

    setTimeout(() => {
      this.dialog.nativeElement.classList.add('active');
      this.dialog.nativeElement.focus();
    }, DELAY);
  }

  /**
   * Closes the facet dialog by first removing the `active` class. After
   * little time, we toggle the `isOpen` property, so that the DOM gets
   * removed (so that we can't tab into those elements).
   *
   * The trigger element will be focussed as well.
   */
  close() {
    this.dialog.nativeElement.classList.remove('active');
    this.dialogTrigger.nativeElement.focus();

    setTimeout(() => {
      this.isOpen = false;
      this.cd.markForCheck();
    }, DELAY);
  }
}
