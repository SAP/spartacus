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

/**
 * Implements the roving tabindex pattern (ARIA APG composite widget pattern).
 *
 * When applied to a container element this directive:
 * - Ensures exactly one item has tabindex=0 at any time; all others have -1
 * - Handles ArrowDown/ArrowUp (vertical) or ArrowRight/ArrowLeft (horizontal)
 *   to move focus between items
 * - Handles Home/End to jump to the first/last item
 * - Optionally emits `itemActivated` on Enter/Space (disable for native links)
 * - Re-clamps focusedIndex via MutationObserver when items are added/removed
 *
 * Feature-toggle gating is the caller's responsibility — apply the directive
 * inside a `*cxFeature` block rather than adding a toggle check here.
 *
 * @usage
 * ```html
 * <!-- Table rows (vertical, with activation) -->
 * <table cxRovingTabindex (itemActivated)="launch(data[$event])">
 *   <tr data-cx-roving-item *ngFor="let item of data">...</tr>
 * </table>
 *
 * <!-- Pagination links (horizontal, no activation — links use native Enter) -->
 * <div cxRovingTabindex="a" cxRovingTabindexAxis="horizontal"
 *      [cxRovingTabindexActivate]="false">
 *   <a *ngFor="let page of pages">{{ page.label }}</a>
 * </div>
 * ```
 */
@Directive({
  selector: '[cxRovingTabindex]',
  standalone: true,
})
export class CxRovingTabindexDirective implements AfterViewInit {
  /**
   * CSS selector used to discover focusable items within the host.
   * Defaults to `[cxRovingTabindexItem]` — a sentinel attribute placed on
   * items in the template. Override to a plain tag/class selector (e.g. `'a'`)
   * when items cannot carry an Angular attribute directive.
   */
  @Input('cxRovingTabindex') itemSelector = '[cxRovingTabindexItem]';

  /** Navigation axis: 'vertical' uses ArrowDown/Up; 'horizontal' uses ArrowRight/Left. */
  @Input() cxRovingTabindexAxis: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Whether to emit `itemActivated` when the user presses Enter or Space.
   * Set to false for containers whose items are native links — the browser
   * activates those natively and the keypress should not be swallowed.
   */
  @Input() cxRovingTabindexActivate = true;

  /**
   * Optional hint for the initial focused index. Set this before a data refresh
   * to control which item receives tabindex=0 after re-render. The MutationObserver
   * picks up the updated focusedIndex when it calls initTabindexes().
   */
  @Input() set cxRovingTabindexInitialIndex(value: number) {
    if (value >= 0) {
      this.focusedIndex = value;
      // Re-apply tabindexes immediately so the new focused item gets tabindex=0
      // before MutationObserver would fire (needed when items are already rendered
      // and only the focus hint changed, e.g. after a page navigation).
      this.initTabindexes();
    }
  }

  /** Emits the zero-based index of the item activated by Enter or Space. */
  @Output() itemActivated = new EventEmitter<number>();

  /** Index of the item that currently holds tabindex=0. Public for host inspection. */
  focusedIndex = 0;

  protected readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  protected readonly destroyRef = inject(DestroyRef);
  private mutationObserver: MutationObserver | undefined;

  ngAfterViewInit(): void {
    this.initTabindexes();
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
    const current = this.getCurrentFocusedIndex(items);
    const target = this.resolveTarget(event, current, items.length);
    if (target !== null) {
      this.moveFocus(items, target);
    }
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
      case ' ':
        return this.activate(event, current);
      default:
        return null;
    }
  }

  private navigate(event: KeyboardEvent, target: number | null): number | null {
    event.preventDefault();
    return target;
  }

  private activate(event: KeyboardEvent, current: number): null {
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
