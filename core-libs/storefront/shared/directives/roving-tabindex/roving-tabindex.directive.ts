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

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
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
    this.mutationObserver.observe(this.el.nativeElement, {
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

    const isVertical = this.cxRovingTabindexAxis === 'vertical';
    const forwardKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const backwardKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const currentIndex = this.getCurrentFocusedIndex(items);
    let targetIndex: number | null = null;

    switch (event.key) {
      case forwardKey:
        event.preventDefault();
        targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : null;
        break;
      case backwardKey:
        event.preventDefault();
        targetIndex = currentIndex > 0 ? currentIndex - 1 : null;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = items.length - 1;
        break;
      case 'Enter':
      case ' ':
        if (this.cxRovingTabindexActivate) {
          event.preventDefault();
          this.itemActivated.emit(currentIndex);
        }
        return;
    }

    if (targetIndex !== null) {
      this.moveFocus(items, targetIndex);
    }
  }

  getItems(): HTMLElement[] {
    return Array.from(
      this.el.nativeElement.querySelectorAll(this.itemSelector) as NodeListOf<HTMLElement>
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
    if (!items.length) return;
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
    if (typeof document === 'undefined') return this.focusedIndex;
    const active = document.activeElement as HTMLElement | null;
    if (!active) return this.focusedIndex;
    // Match the item that IS the active element or contains it as a descendant,
    // so focus on a child inside a roving row (e.g. a link in a <td>) resolves
    // to that row's index rather than falling back to the stale focusedIndex.
    const idx = items.findIndex(
      (item) => item === active || item.contains(active)
    );
    return idx >= 0 ? idx : this.focusedIndex;
  }
}
