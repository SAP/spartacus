import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
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

  @Output() protected unlock = new EventEmitter<boolean>();

  // keeps track of the locked vs unlocked state
  protected unlockedState = false;

  /**
   * When the user selects enter or space, the focusable childs are
   * unlocked, which means that the tabindex is set to 0.
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected handleUnlock(event: KeyboardEvent) {
    console.log('enter, space', this.host);
    if (this.shouldLock) {
      this.addTabindexToChildren(0);
      super.handleFocus(event);

      this.unlock.emit(this.unlockedState);
    }
    // event.preventDefault();
    event.stopPropagation();
  }

  /**
   * In case any of the children elements is touched by the mouse,
   * we unlock the group to not break the mouse-experience.
   */
  // @HostListener('mousedown', ['$event'])
  // protected handleMousedown(event: UIEvent): void {
  //   this.handleUnlock(event as KeyboardEvent);
  // }

  constructor(
    protected elementRef: ElementRef,
    protected service: LockFocusService,
    protected renderer: Renderer2
  ) {
    super(elementRef, service);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.shouldLock) {
      this.tabindex = 0;

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
      this.service
        .findFocusable(this.host)
        .forEach(el =>
          this.renderer.setAttribute(el, FOCUS_GROUP_ATTR, this.group)
        );
    }

    /**
     * When the component got (re)created, we lock the focusable children elements
     * by settng the tabindex to `-1`.
     */
    if (this.shouldLock) {
      this.addTabindexToChildren(this.hasPersistedFocus ? 0 : -1);
    }

    super.ngAfterViewInit();
  }

  protected handleFocus(event: KeyboardEvent): void {
    if (this.isNotLocked) {
      super.handleFocus(event);
    }
  }

  protected get isNotLocked() {
    return !this.shouldLock || this.unlockedState; // && the lock state
  }

  /**
   * Indicates that the focusable children elements of the host element
   * are locked for keyboarding.
   */
  protected get shouldLock(): boolean {
    return this.config?.lock;
  }

  protected handleEscape(event: KeyboardEvent): void {
    this.addTabindexToChildren(-1);
    super.handleEscape(event);
  }

  /**
   * Add the tabindex attribute to the focusable children elements
   */
  protected addTabindexToChildren(index = 0): void {
    this.unlockedState = index === 0;
    if (!(this.hasFocusableChildren && index === 0) || index === 0) {
      this.focusable.forEach(el =>
        this.renderer.setAttribute(el, 'tabindex', index.toString())
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
    return this.service.findFocusable(this.host, this.shouldLock);
  }
}
