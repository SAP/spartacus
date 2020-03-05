import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { FOCUS_GROUP_ATTR, LockFocusConfig } from '../keyboard-focus.model';
import { TrapFocusDirective } from '../trap/trap-focus.directive';

/**
 * Directive that adds persistence for focussed element in case
 * the elements are being rebuild. This happens often when change
 * detection kicks in because of new data set from the backend.
 */
@Directive({
  selector: '[cxLockFocus]',
})
export class LockFocusDirective extends TrapFocusDirective
  implements OnInit, AfterViewInit {
  /** configuration options to steer the usage. defaults to true.  */
  @Input('cxLockFocus') protected config: LockFocusConfig;

  private hasbeenUnlocked = false;

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected handleUnlock = (event: KeyboardEvent) => {
    if (this.isLocked && !this.isFocussed) {
      this.hasbeenUnlocked = true;
      this.addTabindex(0);
      this.handleFocus(event);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  @HostListener('click', ['$event'])
  protected handleClick = (event: KeyboardEvent) => {
    if (event.target !== this.host) {
      this.handleUnlock(event);
    }
  };

  ngOnInit() {
    // whever the host should be locked, we explicitely set the element
    if (this.isLocked) {
      this.tabIndex = 0;
    }

    // autofocus will be the default for locked elements, unless explicitely set to false
    if (this.isLocked && !(this.config?.autofocus === false)) {
      this.config.autofocus = true;
      this.config.focusOnEscape = true;
    }

    super.ngOnInit();
  }

  /**
   * locks the focusable elements by setting the tabIndex to `-1`.
   */
  ngAfterViewInit(): void {
    if (this.group) {
      this.service.findFocusable(this.host).forEach(el => {
        el.setAttribute(FOCUS_GROUP_ATTR, this.group);
      });
    }

    if (this.isLocked) {
      // this is a problem; when the after init kicks in
      // the child components aren't rendered yet
      this.addTabindex(this.hasPersistedFocus ? 0 : -1);
    }

    if (this.hasPersistedFocus && this.isLocked) {
      this.hasbeenUnlocked = true;
      this.handleFocus(null);
    } else {
      super.ngAfterViewInit();
    }
  }

  /**
   * Locks focus handling in case of a locked experience.
   */
  protected handleFocus(event: KeyboardEvent): void {
    if (this.isLocked && !this.hasbeenUnlocked) {
      this.addTabindex(-1);
    } else {
      // console.log('handle focus?', this.host);
      super.handleFocus(event);
      this.hasbeenUnlocked = false;
    }
  }

  protected get isLocked(): boolean {
    return this.config?.lock;
  }

  /**
   * The escape keydown event will drop the focus for child elements (`tabindex="-1"`)
   * and locks the host element if it's not focussed yet. If the host element is already
   * focussed, the event will bubble up so that the parent escape handler can take
   * default action.
   */
  protected handleEscape(event: KeyboardEvent): void {
    if (this.isLocked) {
      this.addTabindex(-1);
    }

    super.handleEscape(event);
  }

  /**
   * Add the tabindex attribute to the references.
   *
   * @param index the tabindex that is added to the references, defaults to 0.
   */
  protected addTabindex(index = 0): void {
    if (!(this.isFocussed && index === 0) || index === 0) {
      this.focusable.forEach(el =>
        el.setAttribute('tabindex', index.toString())
      );
    }
  }

  /**
   * Utility method that passes the host element to the `KeyboardFocusService` to
   * get the focussed child elements.
   */
  protected get isFocussed(): boolean {
    return this.service.isFocussed(this.host);
  }

  /**
   * Returns the focusable childs of the host element. If the host element
   * is configured to be locked, the query is restricted to child elements
   * with a tabindex !== `-1`.
   */
  protected get focusable(): HTMLElement[] {
    return this.service.findFocusable(this.host, this.isLocked);
  }
}
