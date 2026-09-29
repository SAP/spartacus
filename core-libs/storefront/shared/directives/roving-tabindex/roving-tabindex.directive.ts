/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FeatureToggles } from '@spartacus/core';

/**
 * Implements the roving tabindex pattern (ARIA APG composite widget pattern).
 *
 * When applied to a container element this directive ensures exactly one item
 * has tabindex=0 at any time while all others have -1. It handles
 * ArrowDown/ArrowUp (vertical axis) or ArrowRight/ArrowLeft (horizontal axis)
 * to move focus between items, Home/End to jump to the first or last item, and
 * optionally emits itemActivated on Enter/Space. It re-clamps focusedIndex via
 * MutationObserver when items are added or removed.
 *
 * SSR safety: MutationObserver setup is guarded by
 * typeof MutationObserver === 'undefined'. document.activeElement access in
 * getCurrentFocusedIndex is similarly guarded.
 *
 * Native interactive descendants: keydowns originating from input, textarea,
 * select, or contenteditable elements nested inside a roving item are silently
 * ignored so their native keyboard behaviour (caret movement, option selection)
 * is not suppressed. button and a are intentionally excluded from this guard —
 * they carry no native arrow-key semantics, so redirecting focus from a focused
 * button or link inside a cell is correct behaviour.
 *
 * Table hosts: the item selector must use a data-prefixed attribute
 * (e.g. [data-cx-roving-item]). Non-prefixed Angular attribute selectors are
 * rejected by jsdom's CSS engine with "Invalid selector".
 *
 * Pagination wrapper: when this directive cannot be placed on the flex
 * container directly, use a span with style="display:contents" as the host.
 * ng-container cannot be used because @HostListener, querySelectorAll, and
 * MutationObserver all require a real DOM node. display:contents removes the
 * span from the box tree so its children remain direct flex participants.
 * Note that direct-child CSS selectors (> a) on the parent will not reach
 * children of this span.
 *
 * Feature-toggle gating is the caller's responsibility — apply the directive
 * inside a *cxFeature block rather than adding a toggle check here.
 */
@Directive({
  selector: '[cxRovingTabindex]',
  standalone: true,
})
export class CxRovingTabindexDirective implements AfterViewInit {
  /**
   * CSS selector used to discover focusable items within the host.
   * Defaults to [cxRovingTabindexItem] — a sentinel attribute placed on
   * items in the template. Override to a plain tag or class selector (e.g. 'a')
   * when items cannot carry an Angular attribute directive.
   */
  @Input('cxRovingTabindex') itemSelector = '[cxRovingTabindexItem]';

  /** Navigation axis: 'vertical' uses ArrowDown/Up; 'horizontal' uses ArrowRight/Left. */
  @Input() cxRovingTabindexAxis: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Whether to emit itemActivated when the user presses Enter or Space.
   * Set to false for containers whose items are native links — the browser
   * activates those natively and the keypress should not be swallowed.
   */
  @Input() cxRovingTabindexActivate = true;

  /**
   * Optional hint for the initial focused index. Set this before a data refresh
   * to control which item receives tabindex=0 after re-render.
   *
   * Must be set before the host's *ngFor re-renders (e.g. in the component's
   * @Input set setter, before calling render()), because the directive's
   * MutationObserver fires as a microtask after the DOM update — focusedIndex
   * must already be correct by then.
   *
   * Setting this input immediately re-applies tabindexes, which is needed when
   * items are already rendered and only the focus hint changed, e.g. after a
   * page navigation where the DOM has not yet mutated.
   */
  @Input() set cxRovingTabindexInitialIndex(value: number) {
    if (value >= 0) {
      this.focusedIndex = value;
      this.initTabindexes();
    }
  }

  /** Emits the zero-based index of the item activated by Enter or Space. */
  @Output() itemActivated = new EventEmitter<number>();

  /** Index of the item that currently holds tabindex=0. Public for host inspection. */
  focusedIndex = 0;

  protected readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  protected readonly destroyRef = inject(DestroyRef);
  private readonly featureToggles = inject(FeatureToggles);
  private mutationObserver: MutationObserver | undefined;

  ngAfterViewInit(): void {
    this.initTabindexes();
    if (typeof MutationObserver === 'undefined') {
      return;
    }
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'childList')) {
        this.initTabindexes();
      }
    });
    // Only observe childList — excluding 'attributes' prevents a feedback loop
    // when this directive sets tabindex on children.
    this.mutationObserver.observe(this.host, {
      childList: true,
      subtree: true,
    });
    this.destroyRef.onDestroy(() => this.mutationObserver?.disconnect());
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const items = this.getItems();
    if (!items.length) {
      return;
    }
    if (this.isNativeInteractiveTarget(event.target as HTMLElement)) {
      return;
    }
    const current = this.getCurrentFocusedIndex(items);
    const target = this.resolveTarget(event, current, items.length);
    if (target !== null) {
      this.moveFocus(items, target);
    }
  }

  /**
   * Activates the focused item on Space keyup when a11yNavigationSpaceKeyOnKeyUp
   * is enabled.
   *
   * Firing on keyup rather than keydown matches the browser's native button
   * behaviour (buttons activate on Space keyup) and prevents repeated activation
   * when the key is held down. The corresponding keydown handler suppresses the
   * default scroll action so the page does not jump while the key is held.
   *
   * When the toggle is off, activation fires on keydown via resolveTarget()
   * (legacy path) and this handler is a no-op.
   */
  @HostListener('keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    if (
      event.key !== ' ' ||
      !this.featureToggles.a11yNavigationSpaceKeyOnKeyUp ||
      !this.cxRovingTabindexActivate
    ) {
      return;
    }
    if (this.isNativeInteractiveTarget(event.target as HTMLElement)) {
      return;
    }
    const items = this.getItems();
    if (!items.length) {
      return;
    }
    const current = this.getCurrentFocusedIndex(items);
    this.emitActivate(event, current);
  }

  /**
   * Guards against intercepting keystrokes that originate from natively
   * interactive elements (input, textarea, select, contenteditable) nested
   * inside a navigation item.
   *
   * Without this guard, pressing ArrowDown inside a focused textarea that
   * lives inside a roving item would cause the directive to call
   * event.preventDefault() — killing native cursor movement — and steal
   * focus away from the textarea.
   *
   * The walk is bounded by the directive's own host element so it never
   * inspects ancestors outside the widget.
   *
   * button and a are intentionally excluded: browsers assign no native
   * arrow-key semantics to them, so redirecting focus on ArrowDown from a
   * focused button or link inside a cell is correct and expected behaviour.
   */
  private isNativeInteractiveTarget(target: HTMLElement): boolean {
    let el: HTMLElement | null = target;
    while (el && el !== this.host) {
      if (this.isInteractive(el)) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  /**
   * ARIA roles that imply native composite-widget keyboard navigation (typically
   * Arrow keys). If the event target carries one of these roles the directive
   * must not intercept Arrow/Home/End keys — the inner widget owns them.
   *
   * For example, a div with role="listbox" inside a table cell handles its own
   * ArrowDown/ArrowUp for option selection, and a div with role="slider" moves
   * its thumb with ArrowLeft/ArrowRight.
   */
  private static readonly INTERACTIVE_ARIA_ROLES = new Set([
    'listbox',
    'combobox',
    'grid',
    'tree',
    'treegrid',
    'radiogroup',
    'slider',
  ]);

  private isInteractive(el: HTMLElement): boolean {
    const tag = el.tagName;
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      // isContentEditable is the standard computed getter (real browsers);
      // el.contentEditable === 'true' is the fallback for environments like
      // jsdom where isContentEditable is not implemented but the IDL property is.
      el.isContentEditable ||
      el.contentEditable === 'true'
    ) {
      return true;
    }
    // Guard composite widgets identified by ARIA role — they own their own
    // arrow-key navigation and must not have it stolen by this directive.
    const role = el.getAttribute('role');
    return (
      role !== null &&
      CxRovingTabindexDirective.INTERACTIVE_ARIA_ROLES.has(role)
    );
  }

  private resolveTarget(
    event: KeyboardEvent,
    current: number,
    count: number
  ): number | null {
    switch (event.key) {
      case this.forwardKey:
        return this.navigate(event, current < count - 1 ? current + 1 : null);
      case this.backwardKey:
        return this.navigate(event, current > 0 ? current - 1 : null);
      case 'Home':
        return this.navigate(event, 0);
      case 'End':
        return this.navigate(event, count - 1);
      case 'Enter':
        return this.emitActivate(event, current);
      case ' ':
        // Always suppress the default scroll on keydown.
        // When a11yNavigationSpaceKeyOnKeyUp is off (legacy path), activate
        // immediately on keydown. When on, activation is deferred to onKeyup
        // so that behaviour matches native button (which fires on Space keyup
        // to avoid repeated activation while the key is held down).
        event.preventDefault();
        if (!this.featureToggles.a11yNavigationSpaceKeyOnKeyUp) {
          return this.emitActivate(event, current);
        }
        return null;
      default:
        return null;
    }
  }

  private navigate(event: KeyboardEvent, target: number | null): number | null {
    event.preventDefault();
    return target;
  }

  /**
   * Emits the itemActivated event for the currently focused item index.
   *
   * Called from both resolveTarget (keydown path, legacy/Enter) and
   * onKeyup (Space keyup path when a11yNavigationSpaceKeyOnKeyUp is on).
   * Always returns null so it can be used as a tail call in resolveTarget
   * without moving focus.
   */
  private emitActivate(event: KeyboardEvent, current: number): null {
    if (this.cxRovingTabindexActivate) {
      event.preventDefault();
      this.itemActivated.emit(current);
    }
    return null;
  }

  private get forwardKey(): string {
    return this.cxRovingTabindexAxis === 'vertical'
      ? 'ArrowDown'
      : 'ArrowRight';
  }

  private get backwardKey(): string {
    return this.cxRovingTabindexAxis === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  }

  getItems(): HTMLElement[] {
    return Array.from(
      this.host.querySelectorAll(this.itemSelector) as NodeListOf<HTMLElement>
    );
  }

  private initTabindexes(): void {
    const items = this.getItems();
    if (!items.length) {
      return;
    }
    this.focusedIndex = Math.min(this.focusedIndex, items.length - 1);
    items.forEach((el, i) =>
      el.setAttribute('tabindex', i === this.focusedIndex ? '0' : '-1')
    );
  }

  @HostListener('focusin', ['$event'])
  onFocusin(_event: FocusEvent): void {
    const items = this.getItems();
    if (!items.length) {
      return;
    }
    const idx = this.getCurrentFocusedIndex(items);
    if (idx >= 0 && idx < items.length) {
      this.focusedIndex = idx;
    }
  }

  private moveFocus(items: HTMLElement[], targetIndex: number): void {
    items[this.focusedIndex]?.setAttribute('tabindex', '-1');
    items[targetIndex].setAttribute('tabindex', '0');
    this.focusedIndex = targetIndex;
    items[targetIndex].focus();
  }

  private getCurrentFocusedIndex(items: HTMLElement[]): number {
    if (typeof document === 'undefined') {
      return this.focusedIndex;
    }
    const active = document.activeElement as HTMLElement | null;
    if (!active) {
      return this.focusedIndex;
    }
    // Match the item that IS the active element or contains it as a descendant,
    // so focus on a child inside a roving row (e.g. a link in a <td>) resolves
    // to that row's index rather than falling back to the stale focusedIndex.
    const idx = items.findIndex(
      (item) => item === active || item.contains(active)
    );
    return idx >= 0 ? idx : this.focusedIndex;
  }
}
