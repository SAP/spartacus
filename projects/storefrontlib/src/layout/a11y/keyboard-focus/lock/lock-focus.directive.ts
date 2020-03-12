import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { FOCUS_GROUP_ATTR, LockFocusConfig } from '../keyboard-focus.model';
import { TrapFocusDirective } from '../trap/trap-focus.directive';
import { LockFocusService } from './lock-focus.service';

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
  protected defaultConfig: LockFocusConfig = { lock: true };

  @Input('cxLockFocus') protected config: LockFocusConfig = {};

  private hasbeenUnlocked = false;

  /**
   * When the user selects enter or space, the focusable childs are
   * unlocked, which means that the tabindex is set to 0.
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected handleUnlock = (event: KeyboardEvent) => {
    if (this.isLocked && !this.hasFocusableChildren) {
      this.hasbeenUnlocked = true;
      this.addTabindexToChildren(0);
      this.handleFocus(event);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  /**
   * In case any of the children elements is clicked by the mouse,
   * the group is unlocked automatically.
   */
  @HostListener('click', ['$event'])
  protected handleClick(event: KeyboardEvent) {
    if (event.target !== this.host) {
      this.handleUnlock(event);
    }
  }

  constructor(
    protected elementRef: ElementRef,
    protected service: LockFocusService
  ) {
    super(elementRef, service);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.isLocked) {
      // when the host is configured to be locked, we explicitly make
      // it focusable, if it wasn't already focusable.
      if (
        this.requiresExplicitTabIndex ||
        !this.currentIndex ||
        this.currentIndex === '-1'
      ) {
        this.tabindex = 0;
      }
      // Locked elements will be set to `autofocus` by default if it's not
      // been configured. This will ensure that autofocus kicks in upon unlock.
      if (!this.config.hasOwnProperty('autofocus')) {
        this.config.autofocus = true;
      }

      // Locked elements will be set to `focusOnEscape` by default if it's not
      // been configured. This will ensure that  the host gets locked again when
      // `escape` is pressed.
      if (!this.config.hasOwnProperty('focusOnEscape')) {
        this.config.focusOnEscape = !(this.config?.focusOnEscape === false);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!!this.group) {
      /**
       * If the component hosts a group of focusable children elmenents,
       * we persist the group key to the children, so that they can taken this
       * into account when they persist their focus state.
       */
      this.service.findFocusable(this.host).forEach(el =>
        // SSR...
        el.setAttribute(FOCUS_GROUP_ATTR, this.group)
      );
    }

    /**
     * When the component got (re)created, we lock the focusable children elements
     * by settng the tabindex to `-1`.
     */
    if (this.isLocked) {
      this.addTabindexToChildren(this.hasPersistedFocus ? 0 : -1);
    }

    if (this.isLocked && this.hasPersistedFocus) {
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
      this.addTabindexToChildren(-1);
    } else {
      super.handleFocus(event);
      this.hasbeenUnlocked = false;
    }
  }

  /**
   * Indicates that the host element is locked for keyboarding.
   */
  protected get isLocked(): boolean {
    return this.config?.lock;
  }

  /**
   * Add the tabindex attribute to the focusable children elements
   */
  protected addTabindexToChildren(index = 0): void {
    if (!(this.hasFocusableChildren && index === 0) || index === 0) {
      this.focusable.forEach(el =>
        // SSR! consider renderer2
        el.setAttribute('tabindex', index.toString())
      );
    }
  }

  /**
   * Utility method, returns all focusable children for the host element.
   *
   * We keep this private to not polute the API.
   */
  private get hasFocusableChildren(): boolean {
    return this.service.hasFocusableChildren(this.host);
  }

  /**
   * Returns the focusable children of the host element. If the host element
   * is configured to be locked, the query is restricted to child elements
   * with a tabindex !== `-1`.
   *
   * We keep this private to not polute the API.
   */
  private get focusable(): HTMLElement[] {
    return this.service.findFocusable(this.host, this.isLocked);
  }
}
