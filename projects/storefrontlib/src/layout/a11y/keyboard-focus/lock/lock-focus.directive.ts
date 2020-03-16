import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
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
  implements OnInit, AfterContentInit {
  protected defaultConfig: LockFocusConfig = { lock: true };

  @Input('cxLockFocus') protected config: LockFocusConfig = {};

  /**
   * Indicates that the host is configured to use locking. This is available as a
   * CSS class `focus-lock`.
   */
  @HostBinding('class.focus-lock') shouldLock: boolean;
  /**
   * Indicates that the host is locked. This is available as a CSS class `is-locked`.
   */
  @HostBinding('class.is-locked') isLocked: boolean;

  /**
   * Emits an event when the host is unlocked.
   */
  @Output() unlock = new EventEmitter<boolean>();

  /**
   * When the user selects enter or space, the focusable childs are
   * unlocked, which means that the tabindex is set to 0.
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleEnter(event: KeyboardEvent) {
    if (this.shouldLock && this.host === (event.target as HTMLElement)) {
      this.unlockFocus(event);
      event.stopPropagation();
    }
  }

  /**
   * In case any of the children elements is touched by the mouse,
   * we unlock the group to not break the mouse-experience.
   */
  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if (this.shouldLock && this.isLocked) {
      this.unlockFocus(event);
      event.stopPropagation();
    }
  }

  constructor(
    protected elementRef: ElementRef,
    protected service: LockFocusService,
    protected renderer: Renderer2
  ) {
    super(elementRef, service);
  }

  protected lockFocus() {
    this.addTabindexToChildren(-1);
  }

  protected unlockFocus(event?: UIEvent) {
    this.unlock.emit(true);
    this.addTabindexToChildren(0);
    // we focus the host if the event target was a nested child
    if (event?.target === this.host) {
      super.handleFocus(event as KeyboardEvent);
    }
  }

  ngOnInit() {
    super.ngOnInit();

    this.shouldLock = this.config?.lock;

    if (this.shouldLock) {
      this.tabindex = 0;

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

  ngAfterContentInit() {
    if (this.shouldLock) {
      /**
       * If the component hosts a group of focusable children elmenents,
       * we persist the group key to the children, so that they can taken this
       * into account when they persist their focus state.
       */
      if (!!this.group) {
        this.service
          .findFocusable(this.host)
          .forEach(el =>
            this.renderer.setAttribute(el, FOCUS_GROUP_ATTR, this.group)
          );
      }

      this.lockFocus();
    }
  }

  handleFocus(event?: KeyboardEvent): void {
    if (this.shouldLock) {
      this.lockFocus();

      if (!event && this.service.hasPersistedFocus(this.host, this.config)) {
        // Delay unlocking in case the host is using `ChangeDetectionStrategy.Default`
        setTimeout(() => this.unlockFocus(event));
      } else {
        this.lockFocus();
      }

      // let's not bubble up the handleFocus event if the host is locked
      if (this.isLocked) {
        event?.stopPropagation();
        return;
      }
    }

    super.handleFocus(event);
  }

  /**
   * Add the tabindex attribute to the focusable children elements
   */
  protected addTabindexToChildren(i = 0): void {
    if (this.shouldLock) {
      this.isLocked = i === -1;
      if (!(this.hasFocusableChildren && i === 0) || i === 0) {
        this.focusable.forEach(el => {
          this.renderer.setAttribute(el, 'tabindex', i.toString());
        });
      }
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
